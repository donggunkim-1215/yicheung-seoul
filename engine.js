/**
 * 이층 : 서울, 0시 - 인터랙티브 드라마 엔진
 * 장면 관리, 대화, 선택지, 스탯, 핫스팟, 분기 플로우차트
 */

class GameEngine {
    // 호감도 시스템에서 제외할 동료 (사신: 너무 늦게 등장 + 임계 도달 비현실)
    static get NO_AFFINITY_IDS() {
        return new Set(['cheongryong', 'baekho', 'jujak']);
    }

    constructor() {
        // 게임 상태
        // 4감정 — 인간 마음의 핵심 4축
        this.stats = { love: 0, courage: 0, wisdom: 0, calm: 0 };
        // 옛 키들 → 새 4감정 마이그레이션 (시나리오에서 옛 키가 와도 자동 변환)
        this.statMigration = {
            // 옛 8개
            empathy: 'love', charm: 'love', trust: 'love',
            will: 'courage',
            insight: 'wisdom',
            composure: 'calm',
            // 중간 4정 단계
            jeong: 'love', yong: 'courage', ji: 'wisdom', pyeong: 'calm',
        };
        this.flags = {};
        this.companions = []; // { id, name, portrait }
        this.currentSceneId = null;
        this.dialogueQueue = [];
        this.dialogueIndex = 0;
        this.isTyping = false;
        this.typewriterTimeout = null;
        this.scenes = {};
        this.choiceCooldown = false;
        this.hasInteracted = false;  // 첫 대화 진행 힌트용

        // 오디오
        this.audioCtx = null;
        this.currentBgm = null;
        this.bgmVolumes = { title: 0.4, prologue: 0.2 }; // 타이틀 40%, 게임중 20%
        this.currentVoice = null;  // 현재 재생 중인 음성 Audio 객체

        // 분기 기록 (플로우차트용)
        this.choiceHistory = [];  // { sceneId, chosenIndex, chosenText, choices }
        this.flowcharts = {};     // 에피소드별 플로우차트 정의

        // 캐릭터 정의 (키 → 베이스 경로). 표정 이미지는 `${basePath}${emotion}.png`
        this.characterDefs = {
            haeun:        { name: '하은',     basePath: 'assets/images/portraits/haeun_' },
            seoyeon:      { name: '서연',     basePath: 'assets/images/portraits/seoyeon_' },
            eoduksini:    { name: '어둑시니',  basePath: 'assets/images/portraits/eoduksini_' },
            datnyangi:    { name: '닷냥이',   basePath: 'assets/images/portraits/datnyangi_',  scale: 0.5, kind: 'pet' },
            hwangdokgu:   { name: '황덕구',   basePath: 'assets/images/portraits/hwangdokgu_', scale: 0.5, kind: 'pet' },
            // 3장 이후 등장
            // revealedBy: 정체 공개 flag. 켜지기 전엔 발화자명 자동 '???' (또는 aliases 단계 우선 매칭)
            // aliases: 정체 공개 전 단계별 대체 이름. 위쪽 항목이 우선순위 높음.
            //   ex) 구미호 — 처음엔 ???, '호'라고 이름만 알려준 후엔 '호', 정체 공개 후 '구미호'
            gumiho: {
                name: '구미호', basePath: 'assets/images/portraits/gumiho_',
                revealedBy: 'gumiho_revealed',
                aliases: [{ flag: 'gumiho_name_known', name: '호' }],
            },
            imugi: {
                name: '이무기', basePath: 'assets/images/portraits/imugi_',
                revealedBy: 'imugi_revealed',
            },
            jeonwoochi:   { name: '전우치',   basePath: 'assets/images/portraits/jeonwoochi_' },
            jangsanbeom:  { name: '장산범',   basePath: 'assets/images/portraits/jangsanbeom_' },
            geuseundae:   { name: '그슨대',   basePath: 'assets/images/portraits/geuseundae_' },
            gangcheoli:   { name: '강철이',   basePath: 'assets/images/portraits/gangcheoli_' },
            // 자료벽 주인 — 종묘 옆 약방의 80대 노부인, 무당 후손 3대째
            lee_hyang:    { name: '이향',     basePath: 'assets/images/portraits/lee_hyang_' },
            // 사신 (영물)
            cheongryong:  { name: '청룡',     basePath: 'assets/images/portraits/cheongryong_' },
            baekho:       { name: '백호',     basePath: 'assets/images/portraits/baekho_' },
            jujak:        { name: '주작',     basePath: 'assets/images/portraits/jujak_' },
            hyeonmu:      { name: '현무',     basePath: 'assets/images/portraits/hyeonmu_' }, // 하은 각성 시
        };
        // 발화자 이름 → 캐릭터 키 (??? 등 익명/위장 케이스 대응)
        this.speakerToCharKey = {
            '하은': 'haeun', '유진': 'haeun',
            '서연': 'seoyeon',
            '어둑시니': 'eoduksini',
            '닷냥이': 'datnyangi',
            '황덕구': 'hwangdokgu',
            '구미호': 'gumiho',
            '이무기': 'imugi',
            '전우치': 'jeonwoochi',
            '장산범': 'jangsanbeom',
            '그슨대': 'geuseundae',
            '강철이': 'gangcheoli',
            '청룡': 'cheongryong',
            '백호': 'baekho',
            '주작': 'jujak',
            '현무': 'hyeonmu',
            '이향': 'lee_hyang',
        };
        this._debugEmotion = true; // 콘솔에 [감정] 로그 출력

        // emotion 별칭 — 'serious'는 별도 포트레이트 안 만들고 'neutral_2' 변형으로 매핑
        // (neutral_2.png 없으면 자동으로 neutral.png 폴백)
        this.emotionAliases = {
            serious: 'neutral_2',
        };

        // DOM 요소
        this.el = {
            introScreen: document.getElementById('intro-screen'),
            titleScreen: document.getElementById('title-screen'),
            gameScreen: document.getElementById('game-screen'),
            chapterScreen: document.getElementById('chapter-screen'),
            flowchartScreen: document.getElementById('flowchart-screen'),
            sceneImage: document.getElementById('scene-image'),
            sceneImagePrev: document.getElementById('scene-image-prev'),
            sceneOverlay: document.getElementById('scene-overlay'),
            characterLeft: document.getElementById('character-left'),
            characterCenter: document.getElementById('character-center'),
            characterRight: document.getElementById('character-right'),
            dialogueContainer: document.getElementById('dialogue-container'),
            speakerName: document.getElementById('speaker-name'),
            dialogueText: document.getElementById('dialogue-text'),
            dialogueContinue: document.getElementById('dialogue-continue'),
            choicesContainer: document.getElementById('choices-container'),
            hotspotContainer: document.getElementById('hotspot-container'),
            statsBar: document.getElementById('stats-bar'),
            statNotification: document.getElementById('stat-notification'),
            chapterNumber: document.querySelector('.chapter-number'),
            chapterTitle: document.querySelector('.chapter-title'),
            flowchartTree: document.getElementById('flowchart-tree'),
            flowchartEpisode: document.querySelector('.flowchart-episode'),
            flowchartTitle: document.querySelector('.flowchart-title'),
        };

        this.bindEvents();
    }

    bindEvents() {
        document.getElementById('btn-start').addEventListener('click', () => this.startGame());
        this.el.dialogueContainer.addEventListener('click', () => this.advanceDialogue());
        document.getElementById('btn-flowchart-close').addEventListener('click', () => this.closeFlowchart());

        // 인트로 화면 버튼
        document.getElementById('btn-intro-yes').addEventListener('click', () => this.introToTitle());
        document.getElementById('btn-intro-no').addEventListener('click', () => this.introNo());

        // 이어하기
        const btnContinue = document.getElementById('btn-continue');
        if (btnContinue) btnContinue.addEventListener('click', () => this.continueGame());

        // 개발자 치트 — Ctrl+Shift+D 로 점프 패널 토글
        this._initDevPanel();
    }

    // ===== 개발자 치트 패널 (Ctrl+Shift+D) =====
    _initDevPanel() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
                e.preventDefault();
                this._toggleDevPanel();
            }
        });
    }

    _toggleDevPanel() {
        const existing = document.getElementById('dev-panel');
        if (existing) { existing.remove(); return; }

        const chapters = [
            ['prologue_01', '프롤로그'],
            ['ch1_intro', '제1장 어둑시니'],
            ['ch2_intro', '제2장 작은 인연'],
            ['ch3_intro', '제3장 자정의 종로'],
            ['ch4_intro', '제4장 천 년의 그림자'],
            ['ch5_intro', '제5장 푸른 옷의 도사'],
            ['ch6_intro', '제6장 천 년의 이야기'],
            ['ch7_intro', '제7장 인왕산의 목소리'],
            ['ch8_intro', '제8장 키다리의 길목'],
            ['ch9_intro', '제9장 거짓 위에 자란 마음'],
            ['ch10_intro', '제10장 네 마리의 짐승'],
            ['ch11_intro', '제11장 가뭄의 짐승'],
            ['ch12_intro', '제12장 한강의 자정'],
            ['ch13_intro', '제13장 일곱 개의 새벽'],
        ];
        const endings = [
            ['ch13_true_purified', 'TRUE · 정화'],
            ['ch13_true_end', 'TRUE'],
            ['ch13_save_end', 'SAVE · 구원'],
            ['ch13_ascend_end', 'ASCEND · 승천'],
            ['ch13_together_end', 'TOGETHER · 함께'],
            ['ch13_quiet_end', 'QUIET · 조용한'],
            ['ch13_lost_end', 'LOST · 상실'],
            ['ch13_forget_end', 'FORGET · 망각'],
        ];
        // 결과화면(플로우차트) 미리보기 — 진행도와 무관하게 화면만 열어봄
        const flowcharts = [
            ['fc:prologue', '프롤로그'],
            ['fc:ch1',  '제1장'],
            ['fc:ch2',  '제2장'],
            ['fc:ch3',  '제3장'],
            ['fc:ch4',  '제4장'],
            ['fc:ch5',  '제5장'],
            ['fc:ch6',  '제6장'],
            ['fc:ch7',  '제7장'],
            ['fc:ch8',  '제8장'],
            ['fc:ch9',  '제9장'],
            ['fc:ch10', '제10장'],
            ['fc:ch11', '제11장'],
            ['fc:ch12', '제12장'],
            ['fc:ch13', '제13장'],
        ];

        const btnHtml = (list) => list.map(([id, label]) =>
            `<button class="dev-btn" data-jump="${id}">${label}</button>`).join('');

        const panel = document.createElement('div');
        panel.id = 'dev-panel';
        panel.innerHTML = `
            <div class="dev-header">
                <span>DEV — 점프 (Ctrl+Shift+D)</span>
                <button class="dev-close" aria-label="close">×</button>
            </div>
            <div class="dev-section">
                <div class="dev-section-title">CHAPTER</div>
                <div class="dev-grid">${btnHtml(chapters)}</div>
            </div>
            <div class="dev-section">
                <div class="dev-section-title">ENDING</div>
                <div class="dev-grid">${btnHtml(endings)}</div>
            </div>
            <div class="dev-section">
                <div class="dev-section-title">FLOWCHART (결과화면 미리보기)</div>
                <div class="dev-grid">${btnHtml(flowcharts)}</div>
            </div>
        `;
        panel.addEventListener('click', (e) => {
            const t = e.target;
            if (t.dataset && t.dataset.jump) {
                const jump = t.dataset.jump;
                if (jump.startsWith('fc:')) {
                    this._devShowFlowchart(jump.slice(3));
                } else {
                    this._devJump(jump);
                }
            } else if (t.classList && t.classList.contains('dev-close')) {
                panel.remove();
            }
        });
        document.body.appendChild(panel);
    }

    // 결과화면(플로우차트) 미리보기 — 진행도 손대지 않고 화면만 띄움.
    // closeFlowchart는 다음 장 진행을 시도하지 않고 타이틀로 복귀.
    _devShowFlowchart(fcId) {
        if (!this.flowcharts[fcId]) {
            console.warn(`[DEV] Flowchart not found: ${fcId}`);
            return;
        }
        this._flowchartPreviewMode = true;
        // 다른 화면 정리 — flowchart-screen은 openFlowchart가 active 처리
        ['intro-screen','title-screen','chapter-screen','game-screen']
            .forEach(id => document.getElementById(id)?.classList.remove('active'));
        this.el.statsBar.classList.remove('visible');
        this.openFlowchart(fcId);
        document.getElementById('dev-panel')?.remove();
    }

    _devJump(sceneId) {
        if (!this.scenes[sceneId]) {
            console.warn(`[DEV] Scene not found: ${sceneId}`);
            return;
        }
        // 화면 정리 — game 화면으로
        ['intro-screen','title-screen','flowchart-screen','chapter-screen']
            .forEach(id => document.getElementById(id)?.classList.remove('active'));
        this.el.gameScreen.classList.add('active');
        this.el.statsBar.classList.add('visible');
        // 호감도 큐 초기화 (점프 시 잔재 방지)
        this._pendingAffinityEvent = null;
        this._pendingAffinityCharId = null;
        this._resumeAfterAffinity = null;
        this.loadScene(sceneId);
        document.getElementById('dev-panel')?.remove();
    }

    // ===== 세이브 / 로드 =====
    static get SAVE_KEY() { return 'ihyung_save_v1'; }
    static get ENDINGS_KEY() { return 'ihyung_endings_v1'; }

    saveGame() {
        if (!this.currentSceneId) return;
        // 엔딩 라우터/플로우차트 화면 등은 저장 안 함 (재진입시 꼬임)
        if (this.currentSceneId.endsWith('_router') || this.currentSceneId.endsWith('_final')) return;
        try {
            const state = {
                sceneId: this.currentSceneId,
                stats: this.stats,
                flags: this.flags,
                companions: this.companions,
                choiceHistory: this.choiceHistory,
                currentBgm: this.currentBgm,
                removedCompanionAffinity: this._removedCompanionAffinity || {},
                savedAt: Date.now(),
            };
            localStorage.setItem(GameEngine.SAVE_KEY, JSON.stringify(state));
        } catch (e) { /* localStorage 차단 환경 */ }
    }

    hasSave() {
        try { return !!localStorage.getItem(GameEngine.SAVE_KEY); } catch (e) { return false; }
    }

    clearSave() {
        try { localStorage.removeItem(GameEngine.SAVE_KEY); } catch (e) {}
    }

    loadSavedState() {
        try {
            const raw = localStorage.getItem(GameEngine.SAVE_KEY);
            if (!raw) return null;
            return JSON.parse(raw);
        } catch (e) { return null; }
    }

    getClearedEndings() {
        try {
            const raw = localStorage.getItem(GameEngine.ENDINGS_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) { return []; }
    }

    markEndingCleared(key) {
        try {
            const list = this.getClearedEndings();
            if (!list.includes(key)) {
                list.push(key);
                localStorage.setItem(GameEngine.ENDINGS_KEY, JSON.stringify(list));
            }
        } catch (e) {}
    }

    // 현재 flags에서 ending_reached_* 감지
    _detectEnding() {
        const map = {
            ending_reached_true_purified: 'true_purified',
            ending_reached_true: 'true_end',
            ending_reached_save: 'save_end',
            ending_reached_ascend: 'ascend_end',
            ending_reached_together: 'together_end',
            ending_reached_quiet: 'quiet_end',
            ending_reached_lost: 'lost_end',
            ending_reached_forget: 'forget_end',
        };
        for (const flagKey of Object.keys(map)) {
            if (this.flags[flagKey]) return map[flagKey];
        }
        return null;
    }

    // ===== 이어하기 =====
    continueGame() {
        const state = this.loadSavedState();
        if (!state) return;
        this.stats = state.stats || { love: 0, courage: 0, wisdom: 0, calm: 0 };
        this.flags = state.flags || {};
        this.companions = state.companions || [];
        this.choiceHistory = state.choiceHistory || [];
        this._removedCompanionAffinity = state.removedCompanionAffinity || {};
        ['love', 'courage', 'wisdom', 'calm'].forEach(s => this.updateStatDisplay(s));
        this._rebuildCompanionHud();
        // BGM 우선 게임 화면 BGM으로
        this.playBgm(state.currentBgm || 'prologue');
        this.switchScreen('title', 'game');
        this.el.statsBar.classList.add('visible');
        this.loadScene(state.sceneId);
    }

    // 저장된 동료 배열로부터 HUD 재구성
    _rebuildCompanionHud() {
        const hud = document.getElementById('companion-hud');
        if (!hud) return;
        hud.innerHTML = '';
        if (this.companions.length === 0) {
            hud.classList.add('hidden');
            return;
        }
        hud.classList.remove('hidden');
        for (let i = 0; i < this.companions.length; i++) {
            const c = this.companions[i];
            const hideAffinity = GameEngine.NO_AFFINITY_IDS.has(c.id);
            const slot = document.createElement('div');
            slot.className = 'companion-slot' + (hideAffinity ? ' companion-slot-no-affinity' : '');
            slot.id = `companion-slot-${c.id}`;
            slot.style.animationDelay = `${i * 0.15}s`;
            slot.innerHTML = `
                <div class="companion-slot-portrait-wrap">
                    <img class="companion-slot-portrait" src="${c.portrait}" alt="">
                </div>
                <div class="companion-slot-info">
                    ${hideAffinity ? '' : `
                    <div class="companion-slot-affinity">
                        <span class="companion-slot-affinity-icon">♥</span>
                        <span class="companion-slot-affinity-value">${c.affinity}</span>
                    </div>`}
                    <span class="companion-slot-name">${c.name}</span>
                </div>
            `;
            hud.appendChild(slot);
        }
    }

    // 타이틀 화면 진입 시 — 이어하기 버튼 + 엔딩 카운터 갱신
    refreshTitleScreen() {
        const cleared = this.getClearedEndings();
        const btnContinue = document.getElementById('btn-continue');
        const counter = document.getElementById('title-endings-counter');
        if (btnContinue) btnContinue.classList.toggle('hidden', !this.hasSave());
        if (counter) {
            counter.textContent = `엔딩 ${cleared.length} / 8`;
            counter.classList.toggle('hidden', cleared.length === 0);
            counter.onclick = () => this.openEndingsGallery();
        }
    }

    // 엔딩 도감 데이터
    static get ENDINGS_CATALOG() {
        return [
            { key: 'true_purified', symbol: '眞-淨', name: '정화 트루엔딩',  desc: '천 년의 한이 풀려 모두가 깨어나다.',         image: 'assets/images/ch13_ending_dawn_full.png' },
            { key: 'true_end',      symbol: '眞',    name: '정화엔딩',       desc: '한이 풀리고, 1할이 9할에게 합쳐지다.',        image: 'assets/images/ch13_ending_dawn_simple.png' },
            { key: 'save_end',      symbol: '救',    name: '구원엔딩',       desc: '천 년 약속을 마저 지키러, 이층으로.',          image: 'assets/images/ch13_ending_save.png' },
            { key: 'ascend_end',    symbol: '昇',    name: '승천엔딩',       desc: '둘이서, 강 깊은 곳으로 함께 잠들다.',         image: 'assets/images/ch13_ending_ascend.png' },
            { key: 'together_end',  symbol: '共',    name: '공엔딩',         desc: '뒤집어진 이층에서, 새 시대를 짓다.',          image: 'assets/images/ch13_ending_together.png' },
            { key: 'quiet_end',     symbol: '靜',    name: '정엔딩',         desc: '완전하지는 않아도, 평화가 돌아오다.',         image: 'assets/images/ch13_ending_quiet.png' },
            { key: 'lost_end',      symbol: '失',    name: '상실엔딩',       desc: '서울은, 영영 0시에 멈춰버렸다.',              image: 'assets/images/ch13_ending_lost.png' },
            { key: 'forget_end',    symbol: '忘',    name: '망각엔딩',       desc: '아무 일도 없었던 듯, 평범한 일상으로.',       image: 'assets/images/ch13_ending_forget.png' },
        ];
    }

    openEndingsGallery() {
        const gallery = document.getElementById('endings-gallery');
        const grid = document.getElementById('endings-gallery-grid');
        const countEl = document.getElementById('endings-gallery-count');
        if (!gallery || !grid) return;

        const cleared = new Set(this.getClearedEndings());
        if (countEl) countEl.textContent = String(cleared.size);

        grid.innerHTML = '';
        for (const e of GameEngine.ENDINGS_CATALOG) {
            const owned = cleared.has(e.key);
            const card = document.createElement('div');
            card.className = 'ending-card' + (owned ? ' is-owned' : ' is-locked');
            card.innerHTML = `
                <div class="ending-card-thumb">
                    ${owned
                        ? `<img src="${e.image}" alt="${e.name}">`
                        : `<div class="ending-card-locked"><span class="ending-card-lock">?</span></div>`
                    }
                    <div class="ending-card-symbol">${owned ? e.symbol : '???'}</div>
                </div>
                <div class="ending-card-meta">
                    <div class="ending-card-name">${owned ? e.name : '미해금'}</div>
                    <div class="ending-card-desc">${owned ? e.desc : '엔딩에 도달하면 공개됩니다'}</div>
                </div>
            `;
            grid.appendChild(card);
        }

        gallery.classList.remove('hidden');
        const closeBtn = document.getElementById('btn-endings-gallery-close');
        const backdrop = gallery.querySelector('.endings-gallery-backdrop');
        const close = () => this.closeEndingsGallery();
        if (closeBtn) closeBtn.onclick = close;
        if (backdrop) backdrop.onclick = close;
    }

    closeEndingsGallery() {
        const gallery = document.getElementById('endings-gallery');
        if (gallery) gallery.classList.add('hidden');
    }

    // ===== 인트로 화면 =====
    introToTitle() {
        // AudioContext 초기화 (유저 인터랙션 후)
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }

        // 타이틀 BGM 시작
        this.playBgm('title');

        // 인트로 페이드아웃 → 타이틀 전환
        this.el.introScreen.classList.add('fade-out');
        setTimeout(() => {
            this.el.introScreen.classList.remove('active', 'fade-out');
            this.el.titleScreen.classList.add('active');
            this.refreshTitleScreen();
        }, 1500);
    }

    introNo() {
        this.el.introScreen.classList.add('glitch-burst');
        const whisper = document.getElementById('se-intro-whisper');
        if (whisper) {
            whisper.currentTime = 0;
            whisper.volume = 0.45;
            whisper.play().catch(() => {});
        }
        setTimeout(() => this.introToTitle(), 1800);
    }

    fadeAudio(audio, from, to, duration) {
        audio.volume = from;
        const steps = 30;
        const stepTime = duration / steps;
        const stepValue = (to - from) / steps;
        let current = 0;
        const interval = setInterval(() => {
            current++;
            audio.volume = Math.min(1, Math.max(0, from + stepValue * current));
            if (current >= steps) clearInterval(interval);
        }, stepTime);
        return interval;
    }

    // ===== BGM 통합 관리 =====
    playBgm(name) {
        if (this.currentBgm === name) return;

        // 기존 BGM 페이드아웃
        if (this.currentBgm) {
            const oldBgm = document.getElementById(`bgm-${this.currentBgm}`);
            if (oldBgm && !oldBgm.paused) {
                this.fadeAudio(oldBgm, oldBgm.volume, 0, 1500);
                setTimeout(() => { oldBgm.pause(); oldBgm.currentTime = 0; }, 1600);
            }
        }

        // 새 BGM 페이드인
        const newBgm = document.getElementById(`bgm-${name}`);
        if (newBgm) {
            const targetVol = this.bgmVolumes[name] || 0.3;
            newBgm.volume = 0;
            newBgm.play().then(() => {
                this.fadeAudio(newBgm, 0, targetVol, 2000);
            }).catch(() => {});
        }

        this.currentBgm = name;
    }

    // ===== 음성 재생 =====
    playVoice(src) {
        // 이전 음성 즉시 정리
        this.stopVoice(true);

        const voice = new Audio();
        voice.preload = 'auto';
        voice.volume = 0.85;
        voice.src = src;

        voice.addEventListener('canplaythrough', () => {
            voice.play().catch(e => console.warn('[Voice] 재생 실패:', src, e.message));
        }, { once: true });
        voice.addEventListener('error', () => {
            console.warn('[Voice] 로드 실패:', src);
        });
        voice.addEventListener('ended', () => {
            if (this.currentVoice === voice) this.currentVoice = null;
        });
        voice.load();
        this.currentVoice = voice;
    }

    stopVoice(immediate = false) {
        if (!this.currentVoice) return;
        const v = this.currentVoice;
        this.currentVoice = null;

        if (immediate || v.duration - v.currentTime < 0.5) {
            // 거의 끝났거나 즉시 정지 요청: 바로 정지
            v.pause();
        } else {
            // 자연스럽게 페이드아웃 (300ms)
            this.fadeAudio(v, v.volume, 0, 300);
            setTimeout(() => v.pause(), 350);
        }
    }

    // ===== 게임 시작 =====
    startGame() {
        // 새 게임이면 상태 + 저장본 초기화
        this.stats = { love: 0, courage: 0, wisdom: 0, calm: 0 };
        this.flags = {};
        this.companions = [];
        this.choiceHistory = [];
        this.clearSave();
        ['love', 'courage', 'wisdom', 'calm'].forEach(s => this.updateStatDisplay(s));
        this._rebuildCompanionHud();

        // 타이틀 → 프롤로그 BGM 크로스페이드
        this.playBgm('prologue');

        this.switchScreen('title', 'game');
        this.el.statsBar.classList.add('visible');
        this.loadScene('prologue_01');
    }

    // ===== 화면 전환 =====
    switchScreen(from, to) {
        const screens = {
            intro: this.el.introScreen,
            title: this.el.titleScreen,
            game: this.el.gameScreen,
            chapter: this.el.chapterScreen,
            flowchart: this.el.flowchartScreen,
        };
        if (screens[from]) screens[from].classList.remove('active');
        if (screens[to]) screens[to].classList.add('active');
    }

    // ===== 챕터 표시 =====
    showChapter(number, title, callback) {
        this.el.chapterNumber.textContent = number;
        this.el.chapterTitle.textContent = title;
        this.el.chapterScreen.classList.add('active');

        const content = this.el.chapterScreen.querySelector('.chapter-content');
        content.style.animation = 'none';
        content.offsetHeight;
        content.style.animation = 'chapterFade 3s ease forwards';

        setTimeout(() => {
            this.el.chapterScreen.classList.remove('active');
            if (callback) callback();
        }, 3500);
    }

    // ===== 장면 등록 =====
    registerScenes(scenes) {
        this.scenes = { ...this.scenes, ...scenes };
    }

    // ===== 플로우차트 정의 등록 =====
    registerFlowcharts(flowcharts) {
        this.flowcharts = { ...this.flowcharts, ...flowcharts };
    }

    // ===== 장면 로드 =====
    loadScene(sceneId) {
        // 호감도 이벤트 큐가 있으면 가로채서 이벤트 먼저 — 원래 목적지는 _resumeAfterAffinity에 보관
        if (this._pendingAffinityEvent && sceneId !== this._pendingAffinityEvent) {
            const eventSceneId = this._pendingAffinityEvent;
            const charId = this._pendingAffinityCharId;
            this._pendingAffinityEvent = null;
            this._pendingAffinityCharId = null;
            this._resumeAfterAffinity = sceneId;
            // 본 표시 — 중복 방지
            const m = eventSceneId.match(/^affinity_event_(.+)_(\d+)$/);
            if (m) this.flags[`affinity_event_${m[1]}_${m[2]}_seen`] = true;
            // 오버레이 띄우고 그 다음 이벤트 scene 로드
            // (오버레이 활성 동안 이벤트 BG를 미리 cross-fade — 페이드아웃 시 새 BG가 자연스럽게 드러남)
            this._showAffinityNotice(charId, eventSceneId, () => this.loadScene(eventSceneId));
            return;
        }

        const scene = this.scenes[sceneId];
        if (!scene) {
            console.error(`Scene not found: ${sceneId}`);
            return;
        }

        this.currentSceneId = sceneId;
        this.clearHotspots();

        if (scene.chapter) {
            // 챕터 인트로 검은 화면이 가리는 동안 새 BG로 즉시 교체 (cross-fade 없이)
            // → 인트로 페이드아웃 시 이전 장 마지막 배경 잔상이 보이는 현상 방지
            const preBg = this._resolveSceneImage(scene);
            if (preBg) this.setImage(preBg, scene.imageEffect || 'ken-burns', true);
            this.showChapter(scene.chapter.number, scene.chapter.title, () => {
                this._initScene(scene);
            });
        } else {
            this._initScene(scene);
        }
    }

    // 조건부 image / imageIf 해석 — _initScene과 챕터 프리로드에서 공용
    _resolveSceneImage(scene) {
        let bgImage = scene.image;
        if (scene.imageIf) {
            for (const cond of scene.imageIf) {
                if (this.flags[cond.flag]) {
                    bgImage = cond.image;
                    break;
                }
            }
        }
        return bgImage;
    }

    _initScene(scene) {
        // 배경 이미지 (조건부 우선)
        const bgImage = this._resolveSceneImage(scene);
        if (bgImage) {
            this.setImage(bgImage, scene.imageEffect || 'ken-burns');
        }

        // 조건부 플래그 설정 (setFlagsIf: 라우팅 씬용)
        if (scene.setFlagsIf) {
            for (const entry of scene.setFlagsIf) {
                if (this.checkCondition(entry.condition)) {
                    Object.assign(this.flags, entry.flags);
                }
            }
        }

        // 캐릭터 오버레이 (3슬롯: left / center / right)
        // 정책: 활성 슬롯이 1명이고 사람 캐릭터면 자동으로 center 로 이동
        const allSlots = ['left', 'center', 'right'];
        this._speakerPositionMap = {};
        if (scene.characters) {
            // 조건 통과한 슬롯만 추리기.
            // 슬롯 값이 배열이면 첫 번째 condition 매칭 cfg를 채택 (분기 후보용).
            const activeMap = {};
            allSlots.forEach(pos => {
                const slotVal = scene.characters[pos];
                if (!slotVal) return;
                const candidates = Array.isArray(slotVal) ? slotVal : [slotVal];
                for (const cfg of candidates) {
                    if (cfg.condition && !this.checkCondition(cfg.condition)) continue;
                    activeMap[pos] = cfg;
                    break;
                }
            });
            const activeKeys = Object.keys(activeMap);
            // 슬롯 정규화 정책:
            //  - 단독 사람 캐릭터 → center 로 강제 이동
            //  - 두 명 다 사람일 때 → left + right로 강제 (center는 동물/아이템에 양보)
            let normalized = activeMap;
            const isHuman = (cfg) => cfg && cfg.kind !== 'pet' && cfg.kind !== 'item';
            if (activeKeys.length === 1 && activeKeys[0] !== 'center') {
                const onlyCfg = activeMap[activeKeys[0]];
                if (isHuman(onlyCfg)) {
                    normalized = { center: onlyCfg };
                }
            } else if (activeKeys.length === 2 && activeKeys.every(k => isHuman(activeMap[k]))) {
                // 두 사람이 등장하면 무조건 left+right로 (가운데 몰림 방지)
                if (activeMap.left && activeMap.center && !activeMap.right) {
                    normalized = { left: activeMap.left, right: activeMap.center };
                } else if (activeMap.right && activeMap.center && !activeMap.left) {
                    normalized = { left: activeMap.center, right: activeMap.right };
                }
                // left+right 또는 다른 조합은 그대로
            }
            allSlots.forEach(pos => {
                const cfg = normalized[pos];
                if (!cfg) { this.hideCharacterSlot(pos); return; }
                if (cfg.char) {
                    this.setCharacterByKey(pos, cfg.char, cfg.emotion || 'neutral', cfg.scale, cfg.kind, cfg.shrouded);
                    const slot = this._getCharSlot(pos);
                    // lockEmotion: 라인 단위 emotion 자동 갱신 무시 (노드 내내 portrait 고정)
                    if (cfg.lockEmotion) slot.dataset.lockEmotion = 'true';
                    else delete slot.dataset.lockEmotion;
                    // appearOnSpeak: 발화 라인에서만 등장. 내레이션·다른 캐릭터 발화 시엔 fade-out
                    // (예: 도사가 길 안내하는 노드에서 배경이 가려지지 않도록)
                    if (cfg.appearOnSpeak) {
                        slot.dataset.appearOnSpeak = 'true';
                        slot.classList.remove('visible');  // 노드 진입 시 숨김 — 발화 라인에서 등장
                    } else {
                        delete slot.dataset.appearOnSpeak;
                    }
                    const name = cfg.name || (this.characterDefs[cfg.char] && this.characterDefs[cfg.char].name);
                    if (name) this._speakerPositionMap[name] = pos;
                    // alias — 이름 공개 전 '???' 같은 별칭 매핑 (배열 또는 단일 문자열)
                    if (cfg.alias) {
                        const aliases = Array.isArray(cfg.alias) ? cfg.alias : [cfg.alias];
                        aliases.forEach(a => { this._speakerPositionMap[a] = pos; });
                    }
                } else {
                    this.showCharacterSlot(pos, cfg.src || cfg, cfg.scale, cfg.kind, cfg.shrouded);
                    if (cfg.name) this._speakerPositionMap[cfg.name] = pos;
                    if (cfg.alias) {
                        const aliases = Array.isArray(cfg.alias) ? cfg.alias : [cfg.alias];
                        aliases.forEach(a => { this._speakerPositionMap[a] = pos; });
                    }
                }
            });
        } else if (scene.character) {
            const pos = scene.characterPosition || 'center';
            allSlots.filter(s => s !== pos).forEach(s => this.hideCharacterSlot(s));
            if (typeof scene.character === 'object' && scene.character.char) {
                const cfg = scene.character;
                this.setCharacterByKey(pos, cfg.char, cfg.emotion || 'neutral', cfg.scale, cfg.kind);
                // _speakerPositionMap 매핑 — 발화자 효과/포커스가 작동하려면 필수
                const name = cfg.name || (this.characterDefs[cfg.char] && this.characterDefs[cfg.char].name);
                if (name) this._speakerPositionMap[name] = pos;
                if (cfg.alias) {
                    const aliases = Array.isArray(cfg.alias) ? cfg.alias : [cfg.alias];
                    aliases.forEach(a => { this._speakerPositionMap[a] = pos; });
                }
            } else {
                this.showCharacterSlot(pos, scene.character);
                // 직접 src 형식도 매핑 — scene.characterAlias 또는 line.speakerPosition 으로 보완
                if (scene.characterName) this._speakerPositionMap[scene.characterName] = pos;
                if (scene.characterAlias) {
                    const aliases = Array.isArray(scene.characterAlias) ? scene.characterAlias : [scene.characterAlias];
                    aliases.forEach(a => { this._speakerPositionMap[a] = pos; });
                }
            }
        } else if (scene.characterIf) {
            let shown = false;
            for (const cond of scene.characterIf) {
                if (this.flags[cond.flag]) {
                    const pos = cond.position || 'center';
                    if (cond.char) {
                        this.setCharacterByKey(pos, cond.char, cond.emotion || 'neutral', cond.scale);
                    } else {
                        this.showCharacterSlot(pos, cond.character);
                    }
                    if (cond.name) this._speakerPositionMap[cond.name] = pos;
                    allSlots.filter(s => s !== pos).forEach(s => this.hideCharacterSlot(s));
                    shown = true;
                    break;
                }
            }
            if (!shown) allSlots.forEach(s => this.hideCharacterSlot(s));
        } else {
            allSlots.forEach(s => this.hideCharacterSlot(s));
        }

        // 장면별 BGM 전환
        if (scene.bgm) {
            this.playBgm(scene.bgm);
        }

        // 장면 레벨 플래그
        if (scene.setFlags) {
            Object.assign(this.flags, scene.setFlags);
        }

        // 엔딩 도달 감지 → 클리어 기록 + 저장 삭제
        const reachedEnding = this._detectEnding();
        if (reachedEnding) {
            this.markEndingCleared(reachedEnding);
            this.clearSave();
        } else {
            // 일반 진행 — 자동 저장
            this.saveGame();
        }

        // 동료 추가
        if (scene.addCompanion) {
            const comp = { ...scene.addCompanion };
            // 다중 플래그 조건으로 이름 결정
            if (comp.nameConditions) {
                for (const cond of comp.nameConditions) {
                    if (this.flags[cond.flag]) {
                        comp.name = cond.name;
                        break;
                    }
                }
                delete comp.nameConditions;
            }
            // 단일 플래그 조건 (하위 호환)
            if (comp.nameIfFlag && this.flags[comp.nameIfFlag]) {
                comp.name = comp.nameValue;
            }
            this.addCompanion(comp);
        }

        // 동료 제거 (scene 단위)
        if (scene.removeCompanion) {
            const ids = Array.isArray(scene.removeCompanion) ? scene.removeCompanion : [scene.removeCompanion];
            ids.forEach(id => this.removeCompanion(id));
        }

        // 호감도 변경 (scene 단위) — 동행 중인 동료에게만 적용됨
        if (scene.affinity) {
            this.applyAffinity(scene.affinity);
        }

        // 능력치 변경 (scene 단위)
        if (scene.stats) {
            this.applyStats(scene.stats);
        }

        if (scene.overlayColor) {
            this.el.sceneOverlay.style.background = scene.overlayColor;
        }

        // 에피소드 종료 → 플로우차트 표시
        if (scene.showFlowchart) {
            // 대화가 있으면 대화 먼저, 끝나면 플로우차트
            if (scene.dialogue && scene.dialogue.length > 0) {
                // 얕은 복사 — react 픽 시 splice가 원본 scene.dialogue를 변경하지 않게
                this.dialogueQueue = [...scene.dialogue];
                this.dialogueIndex = 0;
                this.el.choicesContainer.classList.add('hidden');
                this._flowchartAfterDialogue = scene.showFlowchart;
                this.showDialogue();
            } else {
                this.openFlowchart(scene.showFlowchart);
            }
            return;
        }

        // 엔딩 직후 — 검은 화면 + "감사합니다" → 타이틀 복귀
        if (scene.endsGame) {
            this._endingToTitle();
            return;
        }

        if (scene.dialogue && scene.dialogue.length > 0) {
            this.dialogueQueue = [...scene.dialogue];
            this.dialogueIndex = 0;
            this.el.choicesContainer.classList.add('hidden');
            this._flowchartAfterDialogue = null;
            this.showDialogue();
        } else if (scene.hotspots) {
            this.showHotspots(scene.hotspots);
        } else if (scene.choices) {
            this.showChoices(scene.choices);
        } else {
            const nxt = this._resolveNext(scene);
            if (nxt) this.loadScene(nxt);
        }
    }

    // 엔딩 후 — 검은 화면에 "감사합니다" 페이드인 → 타이틀
    _endingToTitle() {
        // 기존 BGM 정리
        this.stopVoice();
        this.el.statsBar.classList.remove('visible');

        const overlay = document.createElement('div');
        overlay.className = 'thanks-overlay';
        overlay.innerHTML = '<div class="thanks-text">감사합니다.</div>';
        document.body.appendChild(overlay);

        // 스킵용 — 클릭하면 다음 단계로 점프
        let stage = 0;  // 0=fade-in, 1=text-show, 2=transition-to-title
        const timers = [];
        const clearTimers = () => timers.forEach(t => clearTimeout(t));

        const goToTitle = () => {
            clearTimers();
            ['intro-screen','game-screen','flowchart-screen','chapter-screen']
                .forEach(id => document.getElementById(id)?.classList.remove('active'));
            this.el.statsBar.classList.remove('visible');
            this.el.titleScreen.classList.add('active');
            this.refreshTitleScreen();
            this.playBgm('title');
            // 오버레이 페이드아웃 (타이틀이 깔린 후)
            timers.push(setTimeout(() => {
                overlay.classList.remove('visible');
                timers.push(setTimeout(() => overlay.remove(), 1500));
            }, 200));
        };

        overlay.addEventListener('click', () => {
            if (stage === 0) {
                // 1단계 스킵 — 텍스트 즉시 표시
                clearTimers();
                overlay.classList.add('visible', 'text-show');
                stage = 1;
                timers.push(setTimeout(() => { stage = 2; goToTitle(); }, 1800));
            } else if (stage === 1) {
                // 2단계 스킵 — 바로 타이틀로
                stage = 2;
                goToTitle();
            }
        });

        // 자동 흐름: 페이드인 → 텍스트 → 타이틀
        requestAnimationFrame(() => overlay.classList.add('visible'));
        timers.push(setTimeout(() => {
            overlay.classList.add('text-show');
            stage = 1;
        }, 1500));
        timers.push(setTimeout(() => {
            stage = 2;
            goToTitle();
        }, 5500));
    }

    _resolveNext(scene) {
        if (scene.nextIf) {
            for (const entry of scene.nextIf) {
                if (this.checkCondition(entry.condition)) return this._resolveSpecialNext(entry.next);
            }
        }
        return this._resolveSpecialNext(scene.next || null);
    }

    // 특수 토큰 처리: '_resume_main' → 호감도 이벤트 종료 후 원래 가던 scene으로
    _resolveSpecialNext(nextId) {
        if (nextId === '_resume_main') {
            const target = this._resumeAfterAffinity;
            this._resumeAfterAffinity = null;
            return target || null;
        }
        return nextId;
    }

    // ===== 이미지 캐시 무력화 (dev 환경 전용) =====
    // localhost / 127.0.0.1 에서 src에 timestamp 쿼리 추가 → 이미지 교체가 즉시 반영
    // 운영 환경(GitHub Pages 등)에선 그대로 반환하여 정상 캐싱
    _bustCache(src) {
        if (!src) return src;
        const host = (typeof location !== 'undefined') ? location.hostname : '';
        if (host === 'localhost' || host === '127.0.0.1' || host === '') {
            return src + (src.includes('?') ? '&' : '?') + 't=' + Date.now();
        }
        return src;
    }

    // ===== 이미지 관리 =====
    // instant: true면 cross-fade 없이 즉시 교체 (챕터 인트로 등 가림막 뒤에서 BG 갈 때 잔상 방지)
    setImage(src, effect = 'ken-burns', instant = false) {
        const front = this.el.sceneImage;
        const back = this.el.sceneImagePrev;

        // 같은 이미지면 애니메이션 리셋 없이 유지 (base src 비교 — cache-bust ?t= 무시)
        if (front.dataset.baseSrc === src && front.classList.contains('visible')) {
            return;
        }

        // instant 모드 — cross-fade 끄고 즉시 새 BG 깔기
        if (instant) {
            if (this._imgFadeTimer) clearTimeout(this._imgFadeTimer);
            const loadSrc = this._bustCache(src);
            back.classList.remove('visible', 'ken-burns');
            back.style.transform = '';
            back.src = '';
            front.style.transition = 'none';
            front.classList.remove('visible', 'ken-burns');
            front.style.transform = '';
            front.dataset.baseSrc = src;
            front.src = loadSrc;
            // 강제 리플로우 후 즉시 visible
            front.offsetHeight;
            front.style.transition = '';
            front.classList.add('visible');
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (effect === 'ken-burns') front.classList.add('ken-burns');
                });
            });
            return;
        }

        // 이전 예약 취소
        if (this._imgFadeTimer) clearTimeout(this._imgFadeTimer);

        // 새 이미지를 먼저 프리로드 (캐시 여부 무관하게 안전)
        const preload = new Image();
        const currentTransform = getComputedStyle(front).transform;
        const loadSrc = this._bustCache(src);

        preload.onload = () => {
            // 1) 현재 front → back으로 스냅샷 (페이드아웃 역할)
            if (front.src && front.classList.contains('visible')) {
                back.src = front.src;
                back.className = 'scene-img-layer visible';
                if (currentTransform && currentTransform !== 'none') {
                    back.style.transform = currentTransform;
                }
            }

            // 2) front: 트랜지션 끄고 즉시 투명하게 + 새 이미지 세팅
            front.style.transition = 'none';
            front.classList.remove('visible', 'ken-burns');
            front.style.transform = '';
            front.dataset.baseSrc = src;
            front.src = loadSrc;

            // 3) 강제 리플로우 후 트랜지션 복원 → 크로스페이드 시작
            // eslint-disable-next-line no-unused-expressions
            front.offsetHeight;

            front.style.transition = '';

            // ken-burns 위치 이어받기
            if (effect === 'ken-burns' && currentTransform && currentTransform !== 'none') {
                front.style.transform = currentTransform;
            }

            // front 페이드인
            front.classList.add('visible');

            // ken-burns 재시작 (이전 위치 → 자연스러운 전환)
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    front.style.transform = '';
                    if (effect === 'ken-burns') front.classList.add('ken-burns');
                });
            });

            // back 페이드아웃
            back.classList.remove('visible');

            // 페이드아웃 완료 후 back 정리
            this._imgFadeTimer = setTimeout(() => {
                back.classList.remove('ken-burns');
                back.style.transform = '';
                back.src = '';
            }, 1400);
        };

        preload.src = loadSrc;
    }

    // ===== 캐릭터 오버레이 (듀얼 슬롯) =====
    _getCharSlot(position) {
        if (position === 'left') return this.el.characterLeft;
        if (position === 'center') return this.el.characterCenter;
        return this.el.characterRight;
    }

    showCharacterSlot(position, src, scale, kind, shrouded) {
        const el = this._getCharSlot(position);

        const currentSrcAttr = el.getAttribute('src');

        // 같은 src 재요청 — visible 보장 + kind/shrouded 동기화 (이전 노드에서 잘못 남은 클래스 정정)
        // base src 비교 (cache-bust ?t= 부분 무시)
        if (currentSrcAttr && el.dataset.baseSrc === src && !el.classList.contains('hidden')) {
            el.classList.remove('speaking', 'idle');
            el.classList.add('visible');
            el.classList.remove('companion-pet', 'prop-item');
            if (kind === 'pet') el.classList.add('companion-pet');
            else if (kind === 'item') el.classList.add('prop-item');
            if (shrouded) el.classList.add('shrouded');
            else el.classList.remove('shrouded');
            return;
        }

        const loadSrc = this._bustCache(src);
        const wasVisible = el.classList.contains('visible') && currentSrcAttr;

        // dataset만 즉시 갱신 — 같은 src 재호출 가드용 (시각 변화 X)
        el.dataset.baseSrc = src;

        // 클래스/사이즈를 신상태로 적용하는 함수 — wasVisible일 땐 swap 시점에, 아닐 땐 즉시
        const applyNewState = () => {
            el.classList.remove('hidden', 'speaking', 'idle', 'companion-pet', 'prop-item');
            if (kind === 'pet') el.classList.add('companion-pet');
            else if (kind === 'item') el.classList.add('prop-item');
            if (shrouded) el.classList.add('shrouded');
            else el.classList.remove('shrouded');
            if (scale) el.style.height = `${100 * scale}%`;
            else el.style.height = '';
        };

        if (wasVisible) {
            // Cross-fade: preload 완료될 때까지 본체는 옛 상태 그대로. preload 후에 clone(옛 상태 스냅샷)
            // 삽입 → 본체 클래스/src 일괄 갱신 → clone fade-out
            const doSwap = (srcToShow) => {
                // 본체가 의도와 다른 src로 바뀌었으면(다른 호출이 가로챔) 무시
                if (el.dataset.baseSrc !== src) return;

                // 옛 상태 스냅샷 (이 시점까지 본체는 옛 클래스/사이즈/src 유지)
                const cs = getComputedStyle(el);
                const oldClasses = el.className;
                const oldWidth = cs.width;
                const oldHeight = cs.height;
                const oldSrc = el.getAttribute('src');

                // clone — 옛 상태 그대로, fade-out 담당
                const prev = el.cloneNode(false);
                prev.id = '';
                prev.className = oldClasses;
                prev.classList.remove('hidden');
                prev.classList.add('character-slot-prev', `prev-${position}`, 'visible');
                prev.style.transition = 'opacity 0.9s ease';
                prev.style.width = oldWidth;
                prev.style.height = oldHeight;
                if (oldSrc) prev.setAttribute('src', oldSrc);
                el.parentNode.insertBefore(prev, el.nextSibling);
                requestAnimationFrame(() => prev.classList.remove('visible'));
                setTimeout(() => prev.remove(), 1100);

                // clone이 옛 모습으로 본체를 덮은 직후 — 본체 클래스/src 일괄 신상태로
                applyNewState();
                el.onload = null;
                el.src = srcToShow;
            };

            const preload = new Image();
            preload.onload = () => doSwap(loadSrc);
            preload.onerror = () => doSwap(loadSrc); // 실패해도 swap 시도
            preload.src = loadSrc;
        } else {
            // 처음 등장 (또는 hidden 상태) — fade-in
            applyNewState();
            el.classList.remove('visible');
            el.onload = () => {
                requestAnimationFrame(() => { el.classList.add('visible'); });
            };
            el.src = loadSrc;
        }
    }

    hideCharacterSlot(position) {
        const el = this._getCharSlot(position);
        el.classList.remove('visible', 'speaking', 'idle');
        delete el.dataset.charKey;
        delete el.dataset.currentEmotion;
        setTimeout(() => {
            if (!el.classList.contains('visible')) {
                el.classList.add('hidden');
                el.src = '';
            }
        }, 800);
    }

    // ===== 캐릭터 키 기반 표시 (감정 자동 매칭의 진입점) =====
    setCharacterByKey(position, charKey, emotion = 'neutral', scale, kind, shrouded) {
        const def = this.characterDefs[charKey];
        if (!def) {
            console.warn(`[표정] 정의되지 않은 캐릭터 키: ${charKey}`);
            return;
        }
        const resolvedEmotion = this.emotionAliases[emotion] || emotion;
        const src = `${def.basePath}${resolvedEmotion}.png`;
        // scale/kind: 시나리오 명시값 우선, 없으면 characterDefs 기본값 (동물 = 0.5 + pet)
        const finalScale = scale != null ? scale : def.scale;
        const finalKind = kind != null ? kind : def.kind;
        // shrouded는 시나리오에서 명시할 때만 적용 (자동 처리 X — 캐릭터마다 연출 의도가 다름).
        // ex) 이무기는 ch3_man_speaks에서 shrouded:true 명시, 구미호는 첫 등장부터 외형 그대로 노출
        this.showCharacterSlot(position, src, finalScale, finalKind, shrouded);
        const slot = this._getCharSlot(position);
        slot.dataset.charKey = charKey;
        slot.dataset.currentEmotion = emotion;
        // 표정 이미지 누락 시 neutral로 자동 폴백
        slot.onerror = () => {
            slot.onerror = null;
            const fallback = `${def.basePath}neutral.png`;
            if (!slot.src.endsWith(fallback)) slot.src = fallback;
        };
    }

    // 같은 슬롯의 캐릭터 표정만 갱신 (대사별 호출용) — preload 후 cross-fade
    // 본체 src를 즉시 교체하지 않고, 새 이미지를 먼저 프리로드한 뒤에야 swap
    // → cache-bust로 새 URL이라도 본체가 빈 상태(검정)로 노출되는 깜빡임 방지
    _setPortraitEmotion(position, emotion) {
        const slot = this._getCharSlot(position);
        const charKey = slot.dataset.charKey;
        if (!charKey) return false;
        if (slot.dataset.currentEmotion === emotion) return true; // 동일 → 스킵
        const def = this.characterDefs[charKey];
        if (!def) return false;

        const resolvedEmotion = this.emotionAliases[emotion] || emotion;
        const newSrc = `${def.basePath}${resolvedEmotion}.png`;
        // 같은 base src(매핑 결과 동일)면 skip — emotion 키만 다르고 portrait 파일 같은 경우
        if (slot.dataset.baseSrc === newSrc) {
            slot.dataset.currentEmotion = emotion;
            return true;
        }
        const fallback = `${def.basePath}neutral.png`;
        const loadSrc = this._bustCache(newSrc);

        // dataset은 즉시 갱신 (중복 호출 방지 — 같은 emotion 두 번 들어오면 두 번째는 위 early return)
        slot.dataset.currentEmotion = emotion;
        slot.dataset.baseSrc = newSrc;

        const swap = (srcToShow) => {
            const wasVisible = slot.classList.contains('visible') && slot.getAttribute('src');
            if (wasVisible) {
                const cs = getComputedStyle(slot);
                const prev = slot.cloneNode(false);
                prev.id = '';
                prev.classList.add('character-slot-prev', `prev-${position}`);
                prev.classList.add('visible');
                prev.style.transition = 'opacity 0.7s ease';
                prev.style.width = cs.width;
                prev.style.height = cs.height;
                slot.parentNode.insertBefore(prev, slot.nextSibling);
                requestAnimationFrame(() => prev.classList.remove('visible'));
                setTimeout(() => prev.remove(), 900);
            }
            slot.onerror = null;
            slot.src = srcToShow;
        };

        const preload = new Image();
        preload.onload = () => swap(loadSrc);
        preload.onerror = () => swap(this._bustCache(fallback));
        preload.src = loadSrc;
        return true;
    }

    // ===== 감정 분류기 (룰 베이스) =====
    classifyEmotion(text) {
        if (!text) return 'neutral';

        // 1) 지문(괄호) 안에 명시된 감정 단서가 가장 강력한 신호
        const stage = (text.match(/\((.*?)\)/g) || []).join(' ');
        if (stage) {
            if (/(웃|미소|기쁘|반갑|다행|환하)/.test(stage)) return 'smile';
            if (/(놀라|놀란|당황|움찔|화들짝|헉)/.test(stage)) return 'surprised';
            if (/(슬프|울|체념|아프|쓰린|눈물|침울|시무룩)/.test(stage)) return 'sad';
            if (/(걱정|불안|초조|두려|떨리|긴장|조심)/.test(stage)) return 'worried';
            if (/(단호|결연|진지|굳은|결의|노려|매섭)/.test(stage)) return 'serious';
        }

        // 2) 강한 구두점 — 놀람
        if (/[?!]{2,}|!\?|\?!/.test(text)) return 'surprised';
        if (/(^|[^가-힣])(어|뭐|이게|설마|진짜)\?/.test(text)) return 'surprised';

        // 3) 웃음/안도
        if (/(ㅎㅎ|ㅋㅋ|하하|헤헤)/.test(text)) return 'smile';
        if (/(다행|좋아|고마워|감사|반가|살았)/.test(text) && /[!.]/.test(text)) return 'smile';

        // 4) 말줄임표 — 슬픔/걱정
        if (/\.\.\./.test(text)) {
            if (/(없|아무도|혼자|모르|못|미안|죄송|죽|사라|놓쳐|끝났|소용)/.test(text)) return 'sad';
            if (/(어떻게|어디|왜|어쩌|이상|뭐지)/.test(text)) return 'worried';
        }

        // 5) 걱정/불안
        if (/(괜찮아\?|괜찮니|걱정|위험|조심해|불안|이상해|어떡해)/.test(text)) return 'worried';

        // 6) 결의/단호 — 명령형 + 느낌표
        if (/!/.test(text)) {
            if (/(가자|하자|움직|버텨|기다려|봐|와|일어나|막아|피해|뛰어|잡아)/.test(text)) return 'serious';
        }

        return 'neutral';
    }

    // 발화자가 슬롯에 없으면 빈 자리에 자동 표시 — 시나리오에 portrait 등록 안 된 NPC도 등장
    _autoShowSpeaker(line) {
        if (!line || !line.speaker) return;          // 내레이션
        if (line.speakerPosition) return;            // 명시적 위치 → 시나리오가 직접 통제
        // BG가 메인인 씬은 자동 등장 차단 — 일러스트가 가려지지 않게
        // (호감도 씬 affinity_event_*, 엔딩 씬 ch13_*, 명시적 bgOnly 씬)
        const sceneId = this.currentSceneId;
        if (sceneId && (sceneId.startsWith('affinity_event_') || sceneId.startsWith('ch13_'))) return;
        const scene = this.scenes[sceneId];
        if (scene && scene.bgOnly) return;
        const charKey = this.speakerToCharKey[line.speaker];
        if (!charKey) return;                        // ??? / 주인공 / 모르는 발화자 → 패스
        const def = this.characterDefs[charKey];
        if (!def) return;
        // 정체 미공개 캐릭터 — 자동 등장 X (의도치 않은 정체 노출 방지)
        // 정체 공개되기 전엔 시나리오가 직접 shrouded 처리하도록 둠
        if (def.revealedBy && !this.flags[def.revealedBy]) return;

        // 이미 어떤 슬롯에든 표시되어 있으면 스킵
        const positions = ['left', 'center', 'right'];
        for (const pos of positions) {
            const slot = this._getCharSlot(pos);
            if (slot.dataset.charKey === charKey && !slot.classList.contains('hidden')) {
                // 이미 보임 — 위치 매핑만 보장
                this._speakerPositionMap[line.speaker] = pos;
                return;
            }
        }

        // 빈 슬롯 찾기 — center 우선 (가장 두드러지는 자리), 없으면 right → left
        let targetPos = null;
        for (const pos of ['center', 'right', 'left']) {
            const slot = this._getCharSlot(pos);
            const empty = !slot.dataset.charKey || slot.classList.contains('hidden');
            if (empty) { targetPos = pos; break; }
        }
        if (!targetPos) return;                      // 세 슬롯 다 차있음 → 시나리오 의도 존중, 끼어들지 않음

        this.setCharacterByKey(targetPos, charKey, line.emotion || 'neutral');
        this._speakerPositionMap[line.speaker] = targetPos;
        // 캐릭터 정의의 alias 발화자명도 같은 위치로 매핑
        if (def.aliases) {
            def.aliases.forEach(a => { this._speakerPositionMap[a.name] = targetPos; });
        }
        if (def.name && def.name !== line.speaker) {
            this._speakerPositionMap[def.name] = targetPos;
        }
    }

    // 라인 단위 발화자 표정 갱신
    _updatePortraitForLine(line) {
        if (!line || !line.text) return;
        const pos = line.speakerPosition || this._speakerPositionMap[line.speaker];
        if (!pos) return;
        const slot = this._getCharSlot(pos);
        if (!slot.dataset.charKey) return; // 캐릭터 키 등록된 슬롯만 자동 매칭
        // lockEmotion: 노드에서 명시한 emotion 고정 — 라인의 emotion으로 변경 안 함
        // (예: 구미호 꼬리 펼친 portrait은 노드 내내 유지)
        if (slot.dataset.lockEmotion === 'true') return;
        // 라인에 emotion 명시되지 않은 경우 자동 추론.
        // 단 자동 추론 결과가 'neutral'이면 변경 무시 (이전 emotion 유지)
        // → 강한 감정 키워드 있을 때만 portrait 토글, 평범한 라인엔 깜빡 X
        const inferred = line.emotion || this.classifyEmotion(line.text);
        if (!inferred) return;
        if (!line.emotion && inferred === 'neutral') return;
        const emotion = inferred;
        const changed = this._setPortraitEmotion(pos, emotion);
        if (this._debugEmotion && changed) {
            const snippet = line.text.length > 40 ? line.text.slice(0, 40) + '…' : line.text;
            console.log(`[감정] ${line.speaker || '내레이션'} → ${emotion}  | "${snippet}"`);
        }
    }

    highlightSpeaker(position) {
        const slots = [this.el.characterLeft, this.el.characterCenter, this.el.characterRight];
        slots.forEach(el => el.classList.remove('speaking', 'idle'));
        if (!position) return;
        const active = this._getCharSlot(position);
        active.classList.add('speaking');
        slots.filter(el => el !== active && el.classList.contains('visible'))
             .forEach(el => el.classList.add('idle'));
    }

    // ===== 동료 시스템 =====
    addCompanion(companion) {
        if (this.companions.find(c => c.id === companion.id)) return;
        const hideAffinity = GameEngine.NO_AFFINITY_IDS.has(companion.id);
        // 호감도 — 재합류는 이전 값 보존, 첫 합류는 시나리오 지정값(없으면 0)
        // (펫·요괴처럼 합류 시점에 이미 친밀한 캐릭터는 시나리오에서 시작 ♥를 줄 수 있음)
        const initialAffinity = (companion.affinity != null) ? companion.affinity : 0;
        if (hideAffinity) {
            companion.affinity = null; // 호감도 미추적 캐릭터
        } else if (this._removedCompanionAffinity && this._removedCompanionAffinity[companion.id] != null) {
            companion.affinity = this._removedCompanionAffinity[companion.id];
            delete this._removedCompanionAffinity[companion.id];
        } else {
            companion.affinity = initialAffinity;
        }
        this.companions.push(companion);

        // HUD에 슬롯 추가
        const hud = document.getElementById('companion-hud');
        hud.classList.remove('hidden');

        const slot = document.createElement('div');
        slot.className = 'companion-slot' + (hideAffinity ? ' companion-slot-no-affinity' : '');
        slot.id = `companion-slot-${companion.id}`;
        slot.style.animationDelay = `${(this.companions.length - 1) * 0.15}s`;
        slot.innerHTML = `
            <div class="companion-slot-portrait-wrap">
                <img class="companion-slot-portrait" src="${companion.portrait}" alt="">
            </div>
            <div class="companion-slot-info">
                ${hideAffinity ? '' : `
                <div class="companion-slot-affinity">
                    <span class="companion-slot-affinity-icon">♥</span>
                    <span class="companion-slot-affinity-value">${companion.affinity}</span>
                </div>`}
                <span class="companion-slot-name">${companion.name}</span>
            </div>
        `;
        hud.appendChild(slot);

        // 획득 알림
        const notify = document.getElementById('companion-notify');
        document.getElementById('companion-notify-portrait').src = companion.portrait;
        document.getElementById('companion-notify-name').textContent = companion.name;
        notify.classList.remove('hidden');
        // 애니메이션 리셋
        const inner = notify.querySelector('.companion-notify-inner');
        inner.style.animation = 'none';
        inner.offsetHeight;
        inner.style.animation = '';
        setTimeout(() => notify.classList.add('hidden'), 3500);

        // 시작 호감도가 임계 이상이면 합류 직후 호감도 이벤트도 큐에 적재
        // (구미호처럼 천 년 인연으로 합류 시점에 이미 친밀한 케이스)
        if (!hideAffinity && typeof companion.affinity === 'number') {
            this._checkAffinityThresholds(companion.id, -1, companion.affinity);
        }
    }

    // 텍스트 + emotion으로 이펙트 자동 추론 (명시 안 됐을 때만 호출됨)
    _inferEffect(line) {
        if (!line.speaker || line.speaker === '') return null; // 내레이션 제외
        const text = (line.text || '').trim();
        const em = line.emotion;
        if (!text) return null;

        // ===== 1. 지문 명시 (가장 우선) =====
        if (/\(떨리는|\(작은 소리로|\(속삭이며|덜덜|벌벌/.test(text)) return 'tremble';
        if (/\(고개를?\s*숙이며|\(머리를?\s*숙이며/.test(text)) return 'bow';
        if (/\(뒷걸음|\(물러서/.test(text)) return 'step-back';

        // ===== 2. 거부 / 사과 / 결심 — 의도 명확 =====
        if (/안\s*[—-]?\s*돼|싫[어다습]|그만\s*[해두]|저리|물러서|꺼져|하지\s*마/.test(text)) return 'step-back';
        if (/죄송|미안해?요?|용서해|부탁드립니다|부탁이[야에요]/.test(text)) return 'bow';
        if (/약속할게|약속해|알겠[어요습]|받아들이[겠는]|함께\s*가|같이\s*[—-]?\s*가|해보[자겠]|결심|결정했[어다]/.test(text)) return 'nod';

        // ===== 3. 폭발적 놀람 / 충격 — shake =====
        if (/!{2,}/.test(text)) return 'shake';
        if (/^[…\.]{2,}\s*!\s*$/.test(text)) return 'shake';
        if (/말도\s*안\s*돼|이럴\s*수가|어떻게\s*이런/.test(text)) return 'shake';

        // ===== 4. 짧은 의외 반응 — flinch =====
        if (/^"?[…\.]{2,}\s*[아어오우엇이뭐왜네]\s*[\.\?]?\s*"?$/.test(text)) return 'flinch';
        if (/^"?[아어어엇이뭐왜네]\s*[?!]\s*"?$/.test(text)) return 'flinch';

        // ===== 5. 망설임 / 자조 / 한숨 — sway =====
        if (/글쎄|모르겠[어요]|글쎄요|어쩌면|아마|어떡하지/.test(text)) return 'sway';
        if (/^[…\.\s"]*[허후하]\s*[,\s]\s*[허후하]\s*[,\s]\s*[허후하]/.test(text)) return 'sway'; // 허허허/후후후
        if (/[...…]+\s*그렇구나|[...…]+\s*그래|[...…]+\s*그러게/.test(text)) return 'sway';

        // ===== 6. 두려움 / 걱정 — tremble =====
        if (/무서[워운]|두려[워운]|어떡해|어쩌지|어떻게\s*하지|덜덜|벌벌|떨려/.test(text)) return 'tremble';

        // ===== 7. 기쁨 / 신남 — jump =====
        if (/정말\?!|진짜\?!|와아?!|좋아!|대박|최고|신난다|만세|야호/.test(text)) return 'jump';
        if (/해냈[어다]|성공[했했이]/.test(text)) return 'jump';

        // ===== 8. 진심·따뜻함 — pulse =====
        if (/고마[워운]요?|괜찮아요?|좋아해요?|사랑[해한]|아껴|소중해|보고\s*싶[었어다]/.test(text)) return 'pulse';

        // ===== 9. 결정적 임팩트 — zoom =====
        if (em === 'serious') {
            if (/천 년의\s*[—-]?\s*한|당신이.*전우치|진짜\s*[—-]?\s*분|새\s*[—-]?\s*시대|결판|승천|도사|이무기.*핵|청풍천검/.test(text)) {
                return 'zoom';
            }
        }
        if (/이번에는|마지막이[야다에요]|끝낸다|끝내자/.test(text)) return 'zoom';

        // ===== 10. emotion 기반 폴백 — 매칭 안 된 라인도 감정으로 가벼운 모션 =====
        // 짧은~중간 길이 대사에만 (긴 서사 대사는 호흡만)
        if (text.length < 35) {
            if (em === 'surprised') return /!/.test(text) ? 'shake' : 'flinch';
            if (em === 'sad')       return 'sway';
            if (em === 'worried')   return 'tremble';
            if (em === 'smile' && /[ㅎ후허하]{2,}/.test(text)) return 'pulse';
            if (em === 'serious' && text.length < 18 && /[!?]/.test(text)) return 'nod';
        }

        return null;
    }

    // 포트레이트 감정 이펙트 — 단발 클래스 토글 (animationend 시 자동 제거)
    _applyPortraitEffect(pos, effect) {
        if (!pos || !effect) return;
        const slot = pos === 'left' ? this.el.characterLeft
                  : pos === 'right' ? this.el.characterRight
                  : pos === 'center' ? this.el.characterCenter
                  : null;
        if (!slot || slot.classList.contains('hidden')) return;
        const allowed = ['shake', 'jump', 'pulse', 'flinch', 'nod', 'tremble', 'zoom', 'sway', 'bow', 'step-back'];
        if (!allowed.includes(effect)) return;

        // Cross-fade clone이 본체 위에 있으면 fx 적용 시 본체만 흔들리고 clone은 가만 → 시각적 "튀는" 현상
        // 같은 슬롯의 prev clone이 있으면 cross-fade 종료까지 대기
        const prevClone = slot.parentNode && slot.parentNode.querySelector(`.character-slot-prev.prev-${pos}`);
        if (prevClone) {
            setTimeout(() => this._applyPortraitEffect(pos, effect), 500);
            return;
        }

        // 진행 중인 이펙트 제거 (re-trigger 가능하도록)
        allowed.forEach(e => slot.classList.remove(`fx-${e}`));
        // 다음 프레임에 클래스 부여 (브라우저 reflow 트리거)
        requestAnimationFrame(() => {
            slot.classList.add(`fx-${effect}`);
            const onEnd = () => {
                slot.classList.remove(`fx-${effect}`);
                slot.removeEventListener('animationend', onEnd);
            };
            slot.addEventListener('animationend', onEnd);
        });
    }

    // 대사의 speaker를 플래그에 따라 치환
    _resolveSpeaker(speaker) {
        if (!speaker) return speaker;
        // 정체 미공개 캐릭터 → 단계별 alias 또는 '???'로 자동 마스킹
        // (시나리오에서 '구미호' 등 본명을 적어도, revealedBy flag가 false면 단계별 노출)
        for (const def of Object.values(this.characterDefs)) {
            if (def.name !== speaker) continue;
            if (!def.revealedBy || this.flags[def.revealedBy]) break; // 정체 공개 → 본명 그대로
            // 정체 미공개 → aliases 단계 매칭 (위쪽 우선)
            if (def.aliases) {
                for (const a of def.aliases) {
                    if (this.flags[a.flag]) return a.name;
                }
            }
            return '???';
        }
        if (speaker !== '???') return speaker;
        // '???' 변환 — 현재 슬롯에 매핑된 캐릭터가 누구냐에 따라
        // (이무기·전우치 등 다른 캐릭터도 '???' alias를 쓰므로, 슬롯 charKey로 분기)
        const pos = this._speakerPositionMap['???'];
        if (pos) {
            const slot = this._getCharSlot(pos);
            if (slot.dataset.charKey === 'haeun') {
                if (this.flags.know_name) return '하은';
                if (this.flags.fake_name) return '유진';
            }
        }
        return '???';
    }

    updateCompanion(id, updates) {
        const comp = this.companions.find(c => c.id === id);
        if (!comp) return;
        Object.assign(comp, updates);
        const slot = document.getElementById(`companion-slot-${id}`);
        if (slot) {
            if (updates.name) slot.querySelector('.companion-slot-name').textContent = updates.name;
            if (updates.portrait) slot.querySelector('.companion-slot-portrait').src = updates.portrait;
            if (updates.affinity !== undefined) {
                slot.querySelector('.companion-slot-affinity-value').textContent = updates.affinity;
            }
        }
    }

    removeCompanion(id) {
        // 재합류 시 호감도 보존용 — 떠난 시점의 호감도 저장
        const leaving = this.companions.find(c => c.id === id);
        if (leaving) {
            this._removedCompanionAffinity = this._removedCompanionAffinity || {};
            this._removedCompanionAffinity[id] = leaving.affinity || 0;
        }
        this.companions = this.companions.filter(c => c.id !== id);
        const slot = document.getElementById(`companion-slot-${id}`);
        if (slot) {
            slot.style.opacity = '0';
            slot.style.transform = 'translateX(-30px)';
            slot.style.transition = 'all 0.4s ease';
            setTimeout(() => slot.remove(), 400);
        }
        if (this.companions.length === 0) {
            setTimeout(() => {
                document.getElementById('companion-hud').classList.add('hidden');
            }, 500);
        }
    }

    // ===== 호감도 변경 — 1단위 카운트업 (호감도 하나하나가 소중하게) =====
    applyAffinity(changes) {
        for (const [id, value] of Object.entries(changes)) {
            if (GameEngine.NO_AFFINITY_IDS.has(id)) continue;
            const comp = this.companions.find(c => c.id === id);
            if (!comp) continue;
            if (value === 0) continue;

            // 메커니즘: 한 액션당 ±1 만 변화 (작은 단위가 소중하다는 톤)
            // 시나리오 데이터의 큰 값(예: 5)도 부호만 따져서 ±1로 정규화
            const delta = value > 0 ? 1 : -1;
            const start = comp.affinity || 0;
            const final = Math.max(-100, Math.min(100, start + delta));
            const realDelta = final - start;
            if (realDelta === 0) continue;

            comp.affinity = final; // 내부값은 즉시 최종 (엔딩 조건 등에서 정확)

            // 호감도 이벤트 임계 감지 (20·40·60 — 처음 넘는 순간)
            this._checkAffinityThresholds(id, start, final);

            const slot = document.getElementById(`companion-slot-${id}`);
            const valueEl = slot ? slot.querySelector('.companion-slot-affinity-value') : null;
            const sign = realDelta > 0 ? 1 : -1;
            const totalSteps = Math.abs(realDelta);
            let displayed = start;
            let step = 0;

            const tick = () => {
                displayed += sign;
                if (valueEl) valueEl.textContent = displayed;
                this._spawnAffinityMini(id, sign);
                step++;
                if (step < totalSteps) {
                    setTimeout(tick, 130);
                }
            };
            tick();
        }
    }

    // 호감도 임계 감지 — 처음 넘은 임계만 큐에 적재
    // 1단위 카운트업 톤 + 캐릭터별 등장 빈도 차이를 고려해 10/25/50으로 설정
    _checkAffinityThresholds(id, start, final) {
        const thresholds = [10, 25, 50];
        for (const t of thresholds) {
            if (start < t && final >= t) {
                const flagKey = `affinity_event_${id}_${t}_seen`;
                if (this.flags[flagKey]) continue; // 이미 본 이벤트
                const eventSceneId = `affinity_event_${id}_${t}`;
                if (!this.scenes[eventSceneId]) continue; // 정의 안 됨 → 스킵
                // 가장 낮은 임계 하나만 큐에 (한 선택지에서 여러 임계는 드물지만 안전장치)
                if (!this._pendingAffinityEvent) {
                    this._pendingAffinityEvent = eventSceneId;
                    this._pendingAffinityCharId = id;
                }
            }
        }
    }

    // 호감도 이벤트 진입 오버레이 (♥ 호감도 이벤트 — 캐릭터명)
    // eventSceneId가 주어지면 오버레이 활성 동안 BG를 미리 cross-fade — 페이드아웃 시 새 BG가 깔려있도록
    _showAffinityNotice(charId, eventSceneId, callback) {
        const overlay = document.getElementById('affinity-event-overlay');
        if (!overlay) { if (callback) callback(); return; }
        const charDef = this.characterDefs[charId];
        const charName = charDef ? charDef.name : '';
        const nameEl = document.getElementById('affinity-event-name');
        if (nameEl) nameEl.textContent = charName;
        overlay.classList.remove('hidden');
        overlay.classList.add('active');

        // 오버레이가 화면을 가리는 동안(라벨이 잘 보일 때쯤) 이벤트 BG를 살짝 미리 깔아둔다
        if (eventSceneId) {
            const eventScene = this.scenes[eventSceneId];
            if (eventScene) {
                const preBg = this._resolveSceneImage(eventScene);
                if (preBg) {
                    setTimeout(() => {
                        this.setImage(preBg, eventScene.imageEffect || 'ken-burns');
                    }, 1200);
                }
            }
        }

        setTimeout(() => {
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.classList.add('hidden');
                if (callback) callback();
            }, 600);
        }, 2200);
    }

    _spawnAffinityMini(id, sign) {
        const slot = document.getElementById(`companion-slot-${id}`);
        if (!slot) return;
        const mini = document.createElement('span');
        mini.className = `affinity-change-mini ${sign > 0 ? 'positive' : 'negative'}`;
        mini.textContent = sign > 0 ? '+1' : '-1';
        slot.appendChild(mini);
        setTimeout(() => mini.remove(), 900);
    }

    // ===== 대화 시스템 =====
    showDialogue() {
        if (this.dialogueIndex >= this.dialogueQueue.length) {
            const scene = this.scenes[this.currentSceneId];
            this.el.dialogueContainer.classList.add('hidden');

            // 대화 끝난 후 플로우차트 표시
            if (this._flowchartAfterDialogue) {
                const fcId = this._flowchartAfterDialogue;
                this._flowchartAfterDialogue = null;
                this.openFlowchart(fcId);
                return;
            }

            if (scene.hotspots) {
                this.showHotspots(scene.hotspots);
            } else if (scene.choices) {
                this.showChoices(scene.choices);
            } else {
                const nxt = this._resolveNext(scene);
                if (nxt) this.loadScene(nxt);
            }
            return;
        }

        const line = this.dialogueQueue[this.dialogueIndex];

        // 인라인 반응 — 분기 없이 주인공 톤만 고르는 짧은 선택
        // line: { react: [{ text, say?, lines?, stats?, affinity?, setFlags?, condition? }, ...] }
        if (line.react) {
            if (line.condition && !this.checkCondition(line.condition)) {
                this.dialogueIndex++;
                this.showDialogue();
                return;
            }
            this._showInlineReact(line.react);
            return;
        }

        if (line.image) {
            this.setImage(line.image, line.imageEffect || 'ken-burns');
        }

        if (line.condition && !this.checkCondition(line.condition)) {
            this.dialogueIndex++;
            this.showDialogue();
            return;
        }

        // 대사별 캐릭터 변경 (showCharacter/hideCharacter per line)
        if (line.showCharacter) {
            for (const [pos, src] of Object.entries(line.showCharacter)) {
                this.showCharacterSlot(pos, src);
            }
        }
        if (line.hideCharacter) {
            const positions = Array.isArray(line.hideCharacter) ? line.hideCharacter : [line.hideCharacter];
            positions.forEach(pos => this.hideCharacterSlot(pos));
        }

        // 발화자 자동 포트레이트 — 슬롯에 없으면 빈 자리에 자동 등장
        this._autoShowSpeaker(line);

        // 발화자 표정 자동 매칭 (캐릭터 키 등록된 슬롯에만 동작)
        this._updatePortraitForLine(line);

        // 발화자 하이라이트 (speakerPosition 직접 지정 또는 이름 매핑)
        // 내레이션(speaker 없음) 라인에선 이전 발화자 강조를 그대로 유지 — 매 라인 brightness 토글 방지
        const speakerPos = line.speakerPosition || this._speakerPositionMap[line.speaker] || null;
        if (speakerPos) {
            this.highlightSpeaker(speakerPos);
        }

        // appearOnSpeak 슬롯 처리 — 자기 발화 라인에서만 visible, 그 외엔 fade-out
        ['left', 'center', 'right'].forEach(pos => {
            const slot = this._getCharSlot(pos);
            if (slot.dataset.appearOnSpeak !== 'true') return;
            if (pos === speakerPos) slot.classList.add('visible');
            else slot.classList.remove('visible');
        });

        // 감정 이펙트 — line.effect 명시 우선, 없으면 텍스트/emotion으로 자동 추론
        const fxToApply = line.effect !== undefined ? line.effect : this._inferEffect(line);
        if (fxToApply) {
            const fxTarget = line.effectTarget || speakerPos;
            this._applyPortraitEffect(fxTarget, fxToApply);
        }

        // 대사 라인에서 플래그 설정 (이름 공개 등)
        if (line.setFlags) {
            Object.assign(this.flags, line.setFlags);
            // 이름 공개 시 동행자 HUD 이름 갱신
            if (line.setFlags.know_name) {
                this.updateCompanion('haeun', { name: '하은' });
            }
        }

        // 라인 시점에 캐릭터 portrait emotion 강제 변경 (lockEmotion 무시)
        // ex) 노드 진입 시엔 neutral, '아홉 개의 꼬리' 라인부터 revealed로 전환
        if (line.setEmotion) {
            const targetPos = line.setEmotionPosition || 'center';
            const slot = this._getCharSlot(targetPos);
            if (slot && slot.dataset.charKey) {
                this._setPortraitEmotion(targetPos, line.setEmotion);
            }
        }

        // 대사 라인에서 호감도 변경
        if (line.affinity) {
            this.applyAffinity(line.affinity);
        }

        this.el.dialogueContainer.classList.remove('hidden');
        this.el.speakerName.textContent = this._resolveSpeaker(line.speaker) || '';
        this.el.dialogueContinue.style.visibility = 'hidden';

        // 첫 대화: 탭 힌트 표시
        if (!this.hasInteracted) {
            this.el.dialogueContainer.classList.add('show-tap-hint');
        }

        if (line.speaker) {
            this.el.dialogueContainer.classList.add('has-speaker');
        } else {
            this.el.dialogueContainer.classList.remove('has-speaker');
        }

        // 음성 재생
        if (line.voice) {
            this.playVoice(line.voice);
        }

        this.typewriterEffect(line.text, () => {
            this.el.dialogueContinue.style.visibility = 'visible';
        });
    }

    typewriterEffect(text, onComplete) {
        this.isTyping = true;
        this.el.dialogueText.textContent = '';
        let i = 0;
        const speed = 35;

        const type = () => {
            if (i < text.length) {
                const char = text.charAt(i);
                this.el.dialogueText.textContent += char;
                // 공백·줄임표가 아닌 글자에만 효과음
                if (char !== ' ' && char !== '.' && char !== '…') {
                    this.playTypingSound();
                }
                i++;
                this.typewriterTimeout = setTimeout(type, speed);
            } else {
                this.isTyping = false;
                if (onComplete) onComplete();
            }
        };

        type();
    }

    // Web Audio API 타이핑 효과음
    playHoverSound() {
        if (!this.audioCtx) return;
        const ctx = this.audioCtx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.value = 680;

        const now = ctx.currentTime;
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.start(now);
        osc.stop(now + 0.08);
    }

    playTypingSound() {
        if (!this.audioCtx) return;
        const ctx = this.audioCtx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        // 부드러운 클릭음: 짧은 사인파 + 빠른 감쇠
        osc.type = 'sine';
        osc.frequency.value = 440 + Math.random() * 60; // 약간의 랜덤으로 기계적이지 않게

        const now = ctx.currentTime;
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.start(now);
        osc.stop(now + 0.06);
    }

    advanceDialogue() {
        // 첫 탭 → 힌트 제거
        if (!this.hasInteracted) {
            this.hasInteracted = true;
            this.el.dialogueContainer.classList.remove('show-tap-hint');
        }

        if (this.isTyping) {
            clearTimeout(this.typewriterTimeout);
            const line = this.dialogueQueue[this.dialogueIndex];
            if (line) {
                this.el.dialogueText.textContent = line.text;
            }
            this.isTyping = false;
            this.el.dialogueContinue.style.visibility = 'visible';
            // 타이핑 스킵 시 음성은 계속 재생 (자연스러움)
            return;
        }

        // 다음 대사로 넘어갈 때 → 현재 음성 페이드아웃
        this.stopVoice();

        this.dialogueIndex++;
        this.showDialogue();
    }

    // ===== 선택지 시스템 =====
    showChoices(choices) {
        this.el.dialogueContainer.classList.add('hidden');
        this.el.choicesContainer.classList.remove('hidden');
        // 타이머는 보존하고 선택지 버튼만 제거
        this.el.choicesContainer.querySelectorAll('.choice-btn').forEach(b => b.remove());
        this._visibleChoiceBtns = [];

        this.el.choicesContainer.classList.add('cooldown');
        setTimeout(() => {
            this.el.choicesContainer.classList.remove('cooldown');
        }, 600);

        choices.forEach((choice, index) => {
            if (choice.condition && !this.checkCondition(choice.condition)) {
                return;
            }

            const hasRequires = choice.requires && Object.keys(choice.requires).length > 0;
            const isLocked = hasRequires && !this.checkRequirements(choice.requires);
            // 동료 게이트(hasCompanion 또는 affinity의 동료 미보유)가 잠긴 경우 → 선택지 자체 숨김
            // 동료 없는 플레이에선 도달 불가능한 분기라 노이즈만 됨
            // stat 게이트는 잠긴 채 노출 (다회차 빌드 힌트)
            if (isLocked) {
                const req = choice.requires;
                if (req.hasCompanion) {
                    const ids = Array.isArray(req.hasCompanion) ? req.hasCompanion : [req.hasCompanion];
                    if (ids.some(id => !this.companions.find(c => c.id === id))) return;
                }
                if (req.affinity) {
                    if (Object.keys(req.affinity).some(id => !this.companions.find(c => c.id === id))) return;
                }
            }
            const isStatUnlocked = hasRequires && !isLocked;

            const btn = document.createElement('button');
            btn.className = 'choice-btn';

            if (isLocked) btn.classList.add('locked');
            if (isStatUnlocked) btn.classList.add('stat-unlocked');

            let html = choice.text;

            const STAT_LABEL = { love: '♥ 사랑', courage: '▲ 용기', wisdom: '◆ 지혜', calm: '● 평정' };

            if (choice.statHint) {
                html += `<span class="choice-stat-hint">${choice.statHint}</span>`;
            }

            // requires 항목들을 사용자 친화적 텍스트로 (stat / affinity / hasCompanion)
            const formatRequires = (showOnlyMissing) => {
                const parts = [];
                for (const [rawKey, need] of Object.entries(choice.requires)) {
                    if (rawKey === 'affinity') {
                        for (const [id, min] of Object.entries(need)) {
                            const cdef = this.characterDefs[id];
                            const charName = (cdef && cdef.name) || id;
                            const cur = (this.companions.find(c => c.id === id) || {}).affinity || 0;
                            if (showOnlyMissing && cur >= min) continue;
                            parts.push(`♥ ${charName} ${cur}/${min}`);
                        }
                        continue;
                    }
                    if (rawKey === 'hasCompanion') {
                        const ids = Array.isArray(need) ? need : [need];
                        ids.forEach(id => {
                            const cdef = this.characterDefs[id];
                            const charName = (cdef && cdef.name) || id;
                            const have = !!this.companions.find(c => c.id === id);
                            if (showOnlyMissing && have) return;
                            parts.push(`👥 ${charName}`);
                        });
                        continue;
                    }
                    const key = this.statMigration[rawKey] || rawKey;
                    const cur = this.stats[key] ?? 0;
                    if (showOnlyMissing && cur >= need) continue;
                    parts.push(`${STAT_LABEL[key] || key} ${cur}/${need}`);
                }
                return parts.join(', ');
            };

            if (isLocked) {
                const text = choice.lockedText || formatRequires(true);
                html += `<span class="choice-stat-hint stat-locked-hint">🔒 ${text}</span>`;
            } else if (isStatUnlocked) {
                html += `<span class="choice-stat-hint stat-unlocked-hint">✦ ${formatRequires(false)}</span>`;
            }

            btn.innerHTML = html;

            // 호버 사운드 (locked 포함 모든 버튼)
            btn.addEventListener('mouseenter', () => this.playHoverSound());
            btn.addEventListener('touchstart', () => this.playHoverSound(), { passive: true });

            if (!isLocked) {
                btn.addEventListener('click', () => {
                    // 이미 선택 연출 중이면 무시
                    if (this.el.choicesContainer.classList.contains('choice-exit')) return;
                    this.clearChoiceTimer();
                    this.el.choicesContainer.classList.add('choice-exit');

                    // 분기 기록
                    this.choiceHistory.push({
                        sceneId: this.currentSceneId,
                        chosenIndex: index,
                        chosenText: choice.text,
                        allChoices: choices.map(c => c.text),
                    });

                    // 전 세계 통계 — Firestore 카운터 +1 (같은 유저 1회만)
                    if (window.GameStats) {
                        window.GameStats.recordChoice(this.currentSceneId, index);
                    }

                    // 선택 연출: 선택 버튼 강조, 나머지 퇴장
                    const allBtns = this.el.choicesContainer.querySelectorAll('.choice-btn');
                    allBtns.forEach(b => {
                        if (b === btn) b.classList.add('choice-selected');
                        else b.classList.add('choice-dismissed');
                    });

                    // 연출 후 장면 전환
                    setTimeout(() => {
                        this.el.choicesContainer.classList.remove('choice-exit');
                        this.selectChoice(choice);
                    }, 650);
                });
            }

            this.el.choicesContainer.appendChild(btn);
            this._visibleChoiceBtns.push(btn);
        });

        // 타이머 (전투용)
        const scene = this.scenes[this.currentSceneId];
        if (scene.choiceTimer) {
            this.startChoiceTimer(scene.choiceTimer);
        }
    }

    // 인라인 반응 — 주인공 톤만 고르고 대화 흐름에 합류 (분기 X, 진행도 기록 X)
    // 분기 선택지와 동일한 위치·사이즈를 사용 — 시각적으로 구분 없음
    _showInlineReact(reacts) {
        this.el.dialogueContainer.classList.add('hidden');
        const ctn = this.el.choicesContainer;
        ctn.classList.remove('hidden');
        ctn.querySelectorAll('.choice-btn').forEach(b => b.remove());

        // 짧은 등장 쿨다운 — 즉시 클릭 방지
        ctn.classList.add('cooldown');
        setTimeout(() => ctn.classList.remove('cooldown'), 350);

        const visible = reacts.filter(r => !r.condition || this.checkCondition(r.condition));
        if (visible.length === 0) {
            // 조건이 모두 거짓 → 그냥 통과
            ctn.classList.add('hidden');
            this.el.dialogueContainer.classList.remove('hidden');
            this.dialogueIndex++;
            this.showDialogue();
            return;
        }

        visible.forEach((r) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = r.text;
            btn.addEventListener('mouseenter', () => this.playHoverSound());
            btn.addEventListener('touchstart', () => this.playHoverSound(), { passive: true });
            btn.addEventListener('click', () => {
                if (ctn.classList.contains('cooldown')) return;
                if (ctn.classList.contains('choice-exit')) return;

                // 사이드 이펙트 (있을 때만)
                if (r.stats)    this.applyStats(r.stats);
                if (r.affinity) this.applyAffinity(r.affinity);
                if (r.setFlags) Object.assign(this.flags, r.setFlags);

                // 응답 라인 빌드 — lines(완전한 dialogue 라인 배열) 우선,
                // 없으면 say(string|string[])를 protagonist 내레이션으로,
                // say도 없으면 text 자체를 사용
                const responseLines = [];
                if (Array.isArray(r.lines)) {
                    responseLines.push(...r.lines);
                } else {
                    const sayVal = r.say !== undefined ? r.say : r.text;
                    const arr = Array.isArray(sayVal) ? sayVal : [sayVal];
                    arr.forEach(t => responseLines.push({ speaker: '', text: t }));
                }

                // 분기 선택지와 동일한 퇴장 연출 — 선택한 버튼 강조, 나머지 dismiss
                ctn.classList.add('choice-exit');
                const allBtns = ctn.querySelectorAll('.choice-btn');
                allBtns.forEach(b => {
                    if (b === btn) b.classList.add('choice-selected');
                    else b.classList.add('choice-dismissed');
                });

                setTimeout(() => {
                    ctn.classList.remove('choice-exit');
                    // 현재 react 항목을 응답 라인들로 교체 → 같은 인덱스에서 자연스럽게 이어감
                    this.dialogueQueue.splice(this.dialogueIndex, 1, ...responseLines);
                    ctn.classList.add('hidden');
                    this.el.dialogueContainer.classList.remove('hidden');
                    this.showDialogue();
                }, 650);
            });
            ctn.appendChild(btn);
        });
    }

    startChoiceTimer(seconds) {
        this.clearChoiceTimer();
        let remaining = seconds;
        const timerEl = document.getElementById('choice-timer');
        const textEl = document.getElementById('choice-timer-text');
        const barEl = document.getElementById('choice-timer-bar');

        timerEl.classList.remove('hidden');
        textEl.textContent = remaining;
        barEl.style.transition = 'none';
        barEl.style.width = '100%';
        barEl.offsetHeight;
        barEl.style.transition = `width ${seconds}s linear`;
        barEl.style.width = '0%';

        // 처음부터 떨림 적용
        this.el.choicesContainer.classList.add('timer-shake');

        this._choiceTimerInterval = setInterval(() => {
            remaining--;
            textEl.textContent = remaining;

            if (remaining <= 3) {
                timerEl.classList.add('urgent');
            }

            if (remaining <= 0) {
                this.clearChoiceTimer();
                // 마지막 선택지 자동 선택 (패닉 옵션)
                const lastBtn = this._visibleChoiceBtns[this._visibleChoiceBtns.length - 1];
                if (lastBtn) lastBtn.click();
            }
        }, 1000);
    }

    clearChoiceTimer() {
        if (this._choiceTimerInterval) {
            clearInterval(this._choiceTimerInterval);
            this._choiceTimerInterval = null;
        }
        const timerEl = document.getElementById('choice-timer');
        if (timerEl) {
            timerEl.classList.add('hidden');
            timerEl.classList.remove('urgent');
        }
        this.el.choicesContainer.classList.remove('timer-shake');
    }

    selectChoice(choice) {
        this.el.choicesContainer.classList.add('hidden');

        if (choice.stats) {
            this.applyStats(choice.stats);
        }

        if (choice.affinity) {
            this.applyAffinity(choice.affinity);
        }

        if (choice.setFlags) {
            Object.assign(this.flags, choice.setFlags);
        }

        if (choice.next) {
            const target = this._resolveSpecialNext(choice.next);
            if (target) this.loadScene(target);
        }
    }

    // ===== 핫스팟 시스템 =====
    showHotspots(hotspots) {
        this.el.dialogueContainer.classList.add('hidden');
        this.el.choicesContainer.classList.add('hidden');
        this.el.hotspotContainer.classList.add('active');
        this.el.hotspotContainer.innerHTML = '';

        hotspots.forEach((spot) => {
            const hotspot = document.createElement('div');
            hotspot.className = 'hotspot';
            hotspot.style.left = spot.x;
            hotspot.style.top = spot.y;
            hotspot.style.width = spot.size || '50px';
            hotspot.style.height = spot.size || '50px';

            if (spot.label) {
                const label = document.createElement('span');
                label.className = 'hotspot-label';
                label.textContent = spot.label;
                hotspot.appendChild(label);
            }

            hotspot.addEventListener('click', () => {
                this.clearHotspots();
                if (spot.stats) this.applyStats(spot.stats);
                if (spot.setFlags) Object.assign(this.flags, spot.setFlags);
                if (spot.next) {
                    const target = this._resolveSpecialNext(spot.next);
                    if (target) this.loadScene(target);
                }
            });

            this.el.hotspotContainer.appendChild(hotspot);
        });
    }

    clearHotspots() {
        if (this.el.hotspotContainer) {
            this.el.hotspotContainer.classList.remove('active');
            this.el.hotspotContainer.innerHTML = '';
        }
    }

    // ============================================
    //  분기 플로우차트 시스템 (Detroit 스타일 — 세로 흐름 + 드래그 이동)
    // ============================================

    openFlowchart(flowchartId) {
        const fc = this.flowcharts[flowchartId];
        if (!fc) {
            console.error(`Flowchart not found: ${flowchartId}`);
            return;
        }

        this.el.flowchartEpisode.textContent = fc.episode;
        this.el.flowchartTitle.textContent = fc.title;
        this.el.flowchartTree.innerHTML = '';

        const chosenSceneIds = new Set(this.choiceHistory.map(h => h.sceneId));
        const chosenMap = {};
        this.choiceHistory.forEach(h => {
            chosenMap[h.sceneId] = h.chosenIndex;
        });

        // 4감정 → 색상 매핑
        const STAT_COLORS = {
            love:    '#f783ac',  // 心 분홍 — 사랑
            courage: '#ff6b6b',  // 勇 진홍 — 용기
            wisdom:  '#339af0',  // 智 파랑 — 지혜
            calm:    '#a8b4c2',  // 平 회색 — 평정
        };

        // 선택지의 주요 스탯 색상 조회 (가장 높은 스탯 기준)
        const getBranchColor = (sceneId, branchIdx) => {
            const scene = this.scenes[sceneId];
            if (!scene || !scene.choices || !scene.choices[branchIdx]) return null;
            const stats = scene.choices[branchIdx].stats;
            if (!stats) return null;
            let topStat = null, topVal = -Infinity;
            for (const [k, v] of Object.entries(stats)) {
                if (v > topVal) { topVal = v; topStat = k; }
            }
            if (!topStat) return null;
            const mapped = this.statMigration[topStat] || topStat;
            return STAT_COLORS[mapped] || null;
        };

        // ===== 세로 레이아웃 상수 — 단일 컬럼, 모든 카드 동일 폭/간격 =====
        const FIXED_W = 110;        // 모든 분기 카드 공통 폭
        const STORY_W = 200;        // 스토리 노드만 살짝 넓게 (지문 가독)
        const STORY_H = 38, CARD_H = 46, LABEL_H = 28;
        const CARD_X_GAP = 12;      // 가로 간격 (균일, 좁게)
        const Y_GAP = 48, LABEL_Y_GAP = 16;
        // 썸네일 라벨: 선택지 scene에 image가 있고 방문한 경우 적용
        const LABEL_THUMB_H = 88, LABEL_THUMB_W = 150;
        // 스큐(-6deg) 시각 오버플로우 보정
        const SKEW_OVERFLOW = 14;

        const allNodes = [];
        const allEdges = [];
        let animDelay = 0.8;

        // ===== 재귀 렌더: 위 → 아래 =====
        // 반환값: { lastPrev, lastY } — 호출부가 자식 트리의 마지막 connector를 carry forward 가능
        const renderTree = (tree, centerX, startY, initConnectors) => {
            let y = startY;
            let prev = initConnectors || null;

            for (const node of tree) {
                if (node.type === 'story') {
                    const w = STORY_W;
                    // 도달 여부: 이전 커넥터 중 하나라도 active면 도달한 것
                    const isReachable = prev ? prev.some(p => p.active) : true;
                    const isActive = node.activeIf
                        ? this._checkFlowchartCondition(node.activeIf) : isReachable;

                    const nodeDelay = animDelay;
                    // 활성 커넥터의 색상 계승
                    const activeColor = prev ? (prev.find(p => p.active) || {}).color || null : null;
                    if (prev) {
                        for (const p of prev) {
                            allEdges.push({ x1: p.x, y1: p.y,
                                x2: centerX, y2: y, active: p.active,
                                delay: nodeDelay, color: p.active ? p.color : null });
                        }
                    }

                    allNodes.push({ type: 'story', x: centerX - w / 2, y, w, h: STORY_H,
                        text: node.text, isActive, animDelay: nodeDelay });
                    animDelay += 0.3;
                    prev = [{ x: centerX, y: y + STORY_H, active: isActive, color: activeColor }];
                    y += STORY_H + Y_GAP;

                } else if (node.type === 'choice') {
                    const wasVisited = chosenSceneIds.has(node.sceneId);
                    const chosenIdx = chosenMap[node.sceneId];
                    // 이 선택지에 도달했는가
                    const isReachable = prev ? prev.some(p => p.active) : true;

                    const merging = [], diverging = [];
                    node.branches.forEach((b, i) => {
                        (b.children ? diverging : merging).push({ b, i });
                    });

                    // ── 라벨 ──
                    if (node.label) {
                        // 시나리오 scene에서 이미지 자동 매핑 — 방문했을 때만 노출
                        const sceneObj = node.sceneId ? this.scenes[node.sceneId] : null;
                        const thumbSrc = (sceneObj && sceneObj.image && wasVisited) ? sceneObj.image : null;
                        const useThumb = !!thumbSrc;

                        const lw = useThumb ? LABEL_THUMB_W : FIXED_W;
                        const lh = useThumb ? LABEL_THUMB_H : LABEL_H;
                        const labelDelay = animDelay;
                        const labelColor = prev ? (prev.find(p => p.active) || {}).color || null : null;
                        if (prev) {
                            for (const p of prev) {
                                allEdges.push({ x1: p.x, y1: p.y,
                                    x2: centerX, y2: y, active: p.active,
                                    delay: labelDelay, color: p.active ? p.color : null });
                            }
                        }
                        allNodes.push({ type: 'label', x: centerX - lw / 2, y,
                            w: lw, h: lh, text: node.label,
                            thumbSrc, animDelay: labelDelay });
                        animDelay += 0.15;
                        prev = [{ x: centerX, y: y + lh, active: isReachable, color: labelColor }];
                        y += lh + LABEL_Y_GAP;
                    }

                    // ── 분기 카드 폭 — 모두 동일 ──
                    const allBranches = [...merging, ...diverging];
                    const cardWidths = allBranches.map(() => FIXED_W);

                    // ── 모든 분기 카드: centerX 기준 한 줄에 등간격 배치 ──
                    const totalW = allBranches.length * FIXED_W
                        + Math.max(0, allBranches.length - 1) * CARD_X_GAP;
                    let bx = centerX - totalW / 2;

                    const allPos = allBranches.map(({ b, i }, idx) => {
                        const pos = { x: bx, y, cx: bx + FIXED_W / 2, w: FIXED_W,
                            origIdx: i, branch: b, isMerging: !b.children };
                        bx += FIXED_W + CARD_X_GAP;
                        return pos;
                    });

                    const mPos = allPos.filter(p => p.isMerging);
                    const dPos = allPos.filter(p => !p.isMerging);
                    const bPos = allPos;

                    // ── 라벨/이전 → 각 카드 엣지 ──
                    const cardBaseDelay = animDelay;
                    if (prev) {
                        for (const bp of bPos) {
                            const isChosen = wasVisited && chosenIdx === bp.origIdx;
                            const edgeColor = isChosen ? getBranchColor(node.sceneId, bp.origIdx) : null;
                            for (const p of prev) {
                                allEdges.push({ x1: p.x, y1: p.y,
                                    x2: bp.cx, y2: bp.y,
                                    active: p.active && isChosen,
                                    delay: cardBaseDelay,
                                    color: edgeColor });
                            }
                        }
                    }

                    // ── 카드 렌더 ──
                    bPos.forEach((bp, bi) => {
                        const { b, i } = allBranches[bi];
                        const flagReached = b.flag && this.flags[b.flag];
                        const text = wasVisited || b.alwaysVisible || flagReached ? b.text : '???';
                        let cls = 'locked';
                        if (wasVisited && chosenIdx === i) cls = 'chosen';
                        else if (flagReached) cls = 'chosen';
                        else if (wasVisited) cls = 'unchosen';
                        else if (b.alwaysVisible) cls = 'unchosen';
                        const color = getBranchColor(node.sceneId, i);
                        allNodes.push({ type: 'branch', x: bp.x, y: bp.y,
                            w: bp.w, h: CARD_H, text, stateClass: cls,
                            animDelay: cardBaseDelay + bi * 0.08, color,
                            sceneId: node.sceneId, branchIdx: i });
                    });
                    animDelay += 0.3;

                    const cardBottomY = y + CARD_H;
                    y = cardBottomY + Y_GAP;

                    // ── 합류 커넥터 (메인 흐름 carry forward) ──
                    prev = mPos.map(mp => ({
                        x: mp.cx, y: cardBottomY,
                        active: wasVisited && chosenIdx === mp.origIdx,
                        color: getBranchColor(node.sceneId, mp.origIdx)
                    }));

                    // ── 갈라지는 서브트리 재귀 렌더 ──
                    // 정책: 자식 컬럼이 1개면 메인 우측에. 2개 이상이면 메인 기준 좌우 대칭으로 펼침.
                    //       (3개·홀수일 땐 가운데 자식이 메인 컬럼과 겹치지 않게 슬롯을 비우고 외곽으로 분산)
                    const SUB_COLUMN_GAP = 90;
                    const MAIN_HALF = Math.max(STORY_W, BRANCH_ROW_W) / 2;
                    const SUB_COLUMN_W = Math.max(STORY_W, BRANCH_ROW_W);
                    const COL_PITCH = SUB_COLUMN_W + SUB_COLUMN_GAP;

                    // 각 자식 컬럼의 X 좌표 미리 계산 (메인 = centerX 비워둠)
                    const subXs = [];
                    if (dPos.length === 1) {
                        subXs.push(centerX + MAIN_HALF + SUB_COLUMN_GAP + SUB_COLUMN_W / 2);
                    } else {
                        // 메인 컬럼 양옆 슬롯: -k…-1, +1…+k (k = ceil(n/2))
                        const half = Math.ceil(dPos.length / 2);
                        const slots = [];
                        for (let k = 1; k <= half; k++) slots.push(-k);
                        for (let k = 1; k <= dPos.length - half; k++) slots.push(k);
                        slots.sort((a, b) => a - b);  // 좌→우 정렬
                        for (const s of slots) {
                            subXs.push(centerX + s * COL_PITCH);
                        }
                    }

                    let subMaxY = y;  // 자식 트리 중 가장 아래까지 내려간 끝 y
                    dPos.forEach((dp, idx) => {
                        const isActive = wasVisited && chosenIdx === dp.origIdx;
                        const dpColor = getBranchColor(node.sceneId, dp.origIdx);
                        const subResult = renderTree(dp.branch.children, subXs[idx], cardBottomY + Y_GAP,
                            [{ x: dp.cx, y: cardBottomY, active: isActive, color: dpColor }]);
                        // 자식 트리 끝 connector를 메인 컬럼으로 끌어옴 — 자식 컬럼이 화면 밖이어도
                        // 메인 흐름 안에서 carry forward가 보이게 하기 위함.
                        // 자식 끝 → 메인 컬럼 same y로 horizontal edge 명시 그리고,
                        // carry forward 위치는 (centerX, 자식 끝 y)로 통일 → 다음 메인 노드와 vertical만.
                        if (subResult) {
                            if (subResult.lastPrev) {
                                for (const lp of subResult.lastPrev) {
                                    if (Math.abs(lp.x - centerX) > 1) {
                                        allEdges.push({
                                            x1: lp.x, y1: lp.y,
                                            x2: centerX, y2: lp.y,
                                            active: lp.active,
                                            delay: animDelay,
                                            color: lp.active ? lp.color : null,
                                        });
                                    }
                                    prev.push({ x: centerX, y: lp.y, active: lp.active, color: lp.color });
                                }
                            }
                            if (typeof subResult.lastY === 'number') {
                                subMaxY = Math.max(subMaxY, subResult.lastY);
                            }
                        }
                    });
                    // 메인 컬럼의 다음 노드는 자식 트리 끝보다 항상 아래에서 시작
                    // → "동물 만남 → 안전한 방에 도착" 같은 시간 순서가 시각적으로 일치
                    y = Math.max(y, subMaxY);
                }
            }
            return { lastPrev: prev, lastY: y };
        };

        // 트리 walk — 최대 분기 수 + 자식 트리 컬럼 수 추적 (균형 시프트용)
        function walkTreeStats(tree) {
            let maxB = 0, maxDiverge = 0;
            for (const node of tree) {
                if (node.type === 'choice') {
                    maxB = Math.max(maxB, node.branches.length);
                    const dCount = node.branches.filter(b => b.children).length;
                    maxDiverge = Math.max(maxDiverge, dCount);
                    for (const b of node.branches) {
                        if (b.children) {
                            const sub = walkTreeStats(b.children);
                            maxB = Math.max(maxB, sub.maxB);
                            maxDiverge = Math.max(maxDiverge, sub.maxDiverge);
                        }
                    }
                }
            }
            return { maxB: Math.max(maxB, 1), maxDiverge };
        }
        const stats = walkTreeStats(fc.tree);
        const maxBranches = stats.maxB;
        // 분기 줄 폭 — 메인/자식 컬럼 모두 이걸로 통일 (자식 안의 분기도 fit)
        const BRANCH_ROW_W = maxBranches * FIXED_W
            + Math.max(0, maxBranches - 1) * CARD_X_GAP;
        const COLUMN_W = Math.max(STORY_W, BRANCH_ROW_W);
        // 메인 컬럼은 가운데 (centerX=0). 자식 컬럼은 우측에 펼침. 가로 스크롤로 보기.
        // 너무 좌측 시프트하면 메인 컬럼이 화면 밖으로 나가 오히려 어색
        const visualShift = 0;

        renderTree(fc.tree, visualShift, 0, null);

        // ===== 바운딩 박스 → 캔버스 =====
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        for (const n of allNodes) {
            // 스큐 오버플로우 보정 — 박스가 좌우로 ~14px씩 더 차지
            const skewPad = (n.type === 'branch' || n.type === 'story') ? SKEW_OVERFLOW : 0;
            minX = Math.min(minX, n.x - skewPad);
            maxX = Math.max(maxX, n.x + n.w + skewPad);
            minY = Math.min(minY, n.y);
            maxY = Math.max(maxY, n.y + n.h);
        }
        if (!isFinite(minX)) { minX = 0; maxX = 400; minY = 0; maxY = 200; }

        const PAD = 50;  // 양옆 여백 (라인 잘림 방지)
        const offsetX = -minX + PAD;
        const offsetY = -minY + PAD;
        const canvasW = maxX - minX + PAD * 2;
        const canvasH = maxY - minY + PAD * 2;

        this.el.flowchartTree.style.width = canvasW + 'px';
        this.el.flowchartTree.style.height = canvasH + 'px';

        // SVG 엣지 레이어
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.classList.add('fc-edges');
        svg.setAttribute('width', canvasW);
        svg.setAttribute('height', canvasH);
        svg.style.width = canvasW + 'px';
        svg.style.height = canvasH + 'px';

        for (const e of allEdges) {
            this._fcDrawEdge(svg,
                e.x1 + offsetX, e.y1 + offsetY,
                e.x2 + offsetX, e.y2 + offsetY, e.active, e.delay, e.color);
        }
        this.el.flowchartTree.appendChild(svg);

        // 노드 렌더
        for (const n of allNodes) {
            const el = document.createElement('div');
            el.className = 'fc-node';
            el.style.left = (n.x + offsetX) + 'px';
            el.style.top = (n.y + offsetY) + 'px';
            el.style.width = n.w + 'px';
            el.style.animationDelay = n.animDelay + 's';

            if (n.type === 'story') {
                el.innerHTML = `<div class="fc-story-node${n.isActive ? ' active' : ''}"><span class="fc-story-text">${n.text}</span></div>`;
            } else if (n.type === 'label') {
                if (n.thumbSrc) {
                    el.style.height = n.h + 'px';
                    el.innerHTML = `<div class="fc-label-node fc-label-thumb">
                        <div class="fc-label-thumb-img" style="background-image:url('${n.thumbSrc}')"></div>
                        <span class="fc-label-text">${n.text}</span>
                    </div>`;
                } else {
                    el.innerHTML = `<div class="fc-label-node"><span class="fc-label-text">${n.text}</span></div>`;
                }
            } else if (n.type === 'branch') {
                if (n.color) el.style.setProperty('--branch-color', n.color);
                // 데이터 속성 — 통계 도착 시 카드 찾기 위해
                el.dataset.sceneId = n.sceneId || '';
                el.dataset.branchIdx = n.branchIdx != null ? n.branchIdx : '';
                el.innerHTML = `<div class="fc-branch-node ${n.stateClass}">
                    <span class="fc-indicator"></span>
                    <span class="fc-branch-text">${n.text}</span>
                    <span class="fc-pct-text" data-scene-id="${n.sceneId || ''}" data-branch-idx="${n.branchIdx != null ? n.branchIdx : ''}"></span>
                    <span class="fc-branch-percent" data-scene-id="${n.sceneId || ''}" data-branch-idx="${n.branchIdx != null ? n.branchIdx : ''}"></span>
                </div>`;
            }

            this.el.flowchartTree.appendChild(el);
        }

        // 스크롤 초기화 + 드래그 이동
        const scrollEl = this.el.flowchartScreen.querySelector('.flowchart-scroll');
        if (scrollEl) {
            scrollEl.scrollTop = 0;
            // 메인 컬럼(centerX=0) 을 화면 가로 가운데에 — 자식 컬럼은 우측에 있으니 사용자 스크롤로 탐색
            scrollEl.scrollLeft = Math.max(0, offsetX - scrollEl.clientWidth / 2);

            // 드래그 이동 (한 번만 바인딩)
            if (!this._fcDragInit) {
                this._fcDragInit = true;
                let dragging = false, sx, sy, sl, st;
                scrollEl.addEventListener('pointerdown', (e) => {
                    if (e.target.closest('.flowchart-close-btn')) return;
                    dragging = true;
                    sx = e.clientX; sy = e.clientY;
                    sl = scrollEl.scrollLeft; st = scrollEl.scrollTop;
                    scrollEl.setPointerCapture(e.pointerId);
                    scrollEl.style.cursor = 'grabbing';
                });
                scrollEl.addEventListener('pointermove', (e) => {
                    if (!dragging) return;
                    scrollEl.scrollLeft = sl - (e.clientX - sx);
                    scrollEl.scrollTop = st - (e.clientY - sy);
                });
                const endDrag = () => { dragging = false; scrollEl.style.cursor = ''; };
                scrollEl.addEventListener('pointerup', endDrag);
                scrollEl.addEventListener('pointercancel', endDrag);
            }
        }

        this.el.flowchartScreen.classList.add('active');
        this.el.statsBar.classList.remove('visible');

        // ── 계속하기 버튼: 결과 연출이 끝난 후에 등장 ──
        // 모든 노드/엣지 애니메이션의 최대 종료 시점 계산
        let maxEnd = 0;
        for (const n of allNodes) {
            maxEnd = Math.max(maxEnd, n.animDelay + 0.8);  // .fc-node animation-duration
        }
        for (const e of allEdges) {
            maxEnd = Math.max(maxEnd, e.delay + 0.65);     // edge draw 0.5 + dot 0.3 (overlap)
        }
        const btn = document.getElementById('btn-flowchart-close');
        // 재오픈 대비 — inline 잔재(끝 메시지에서 흐려놓은 것)와 .revealed 초기화
        btn.classList.remove('revealed');
        btn.style.opacity = '';
        btn.style.pointerEvents = '';
        btn.style.animation = '';
        if (this._endMsgShown) {
            const oldMsg = btn.parentNode.querySelector('.flowchart-end-msg');
            if (oldMsg) oldMsg.remove();
            this._endMsgShown = false;
        }
        clearTimeout(this._fcRevealTimer);
        this._fcRevealTimer = setTimeout(() => {
            if (this.el.flowchartScreen.classList.contains('active')) {
                btn.classList.add('revealed');
            }
        }, (maxEnd + 0.25) * 1000);

        // 전 세계 선택 통계 — 백그라운드로 가져와서 카드에 % 채워넣기
        this._fetchAndApplyStats(allNodes);
    }

    // 노드들에서 sceneId 모아 통계 일괄 조회 → 각 카드에 % 표시
    async _fetchAndApplyStats(allNodes) {
        if (!window.GameStats) return;
        const sceneIds = Array.from(new Set(
            allNodes.filter(n => n.type === 'branch' && n.sceneId).map(n => n.sceneId)
        ));
        if (sceneIds.length === 0) return;
        let stats = {};
        try { stats = await window.GameStats.fetchStats(sceneIds); } catch { return; }

        // 화면이 그 사이에 닫혔으면 무시
        if (!this.el.flowchartScreen.classList.contains('active')) return;

        for (const sceneId of sceneIds) {
            const counts = stats[sceneId];
            if (!counts) continue;
            // 합계 계산
            let total = 0;
            const branchCounts = {};
            for (const [k, v] of Object.entries(counts)) {
                const m = k.match(/^b(\d+)$/);
                if (m && typeof v === 'number') {
                    branchCounts[m[1]] = v;
                    total += v;
                }
            }
            if (total < 5) continue; // 표본 너무 적음 → 표시 안 함
            // 각 카드에 % 주입 — 막대 + 카드 레벨 텍스트 라벨 (둘 다 갱신)
            const bars = this.el.flowchartTree.querySelectorAll(
                `.fc-branch-percent[data-scene-id="${sceneId}"]`
            );
            bars.forEach(bar => {
                const idx = bar.dataset.branchIdx;
                const c = branchCounts[idx] || 0;
                const pct = Math.round((c / total) * 100);
                bar.innerHTML = `<span class="fc-pct-fill" style="width:${pct}%"></span>`;
                bar.classList.add('visible');
            });
            const labels = this.el.flowchartTree.querySelectorAll(
                `.fc-pct-text[data-scene-id="${sceneId}"]`
            );
            labels.forEach(label => {
                const idx = label.dataset.branchIdx;
                const c = branchCounts[idx] || 0;
                const pct = Math.round((c / total) * 100);
                label.textContent = `${pct}%`;
                label.classList.add('visible');
            });
        }
    }

    // 세로 SVG 베지어 엣지 (delay: 노드와 동기화된 등장 지연)
    _fcDrawEdge(svg, x1, y1, x2, y2, isActive, delay = 0, color = null) {
        const svgNS = 'http://www.w3.org/2000/svg';
        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);
        let d;
        if (dx > 60) {
            // 가로 거리 큰 경우 — elbow(ㄱ자) + 부드러운 corner. 자식 트리↔메인 흐름 connector 가 사선으로 꼬여 보이지 않게
            const midY = y1 + dy / 2;
            const r = Math.min(18, dx / 2, dy / 2);
            const sx = x2 > x1 ? 1 : -1;
            d = `M ${x1} ${y1}` +
                ` V ${midY - r}` +
                ` Q ${x1} ${midY} ${x1 + sx * r} ${midY}` +
                ` H ${x2 - sx * r}` +
                ` Q ${x2} ${midY} ${x2} ${midY + r}` +
                ` V ${y2}`;
        } else {
            // 가까운 경우 — 베지어 곡선 (일반 vertical flow)
            const cp = Math.max(15, dy * 0.4);
            d = `M ${x1} ${y1} C ${x1} ${y1 + cp}, ${x2} ${y2 - cp}, ${x2} ${y2}`;
        }

        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', d);
        path.classList.add('fc-edge');
        if (isActive) path.classList.add('active');
        if (isActive && color) path.style.stroke = color;

        svg.appendChild(path);

        // 선 그리기 애니메이션: stroke-dashoffset로 선이 흘러가듯 등장
        const len = path.getTotalLength ? path.getTotalLength() : dy + Math.abs(x2 - x1);
        path.style.strokeDasharray = len;
        path.style.strokeDashoffset = len;
        path.style.animation = `fcEdgeDraw 0.5s ease ${delay}s forwards`;

        const dot = document.createElementNS(svgNS, 'circle');
        dot.setAttribute('cx', x2);
        dot.setAttribute('cy', y2);
        dot.setAttribute('r', '3');
        dot.classList.add('fc-edge-dot');
        if (isActive) dot.classList.add('active');
        if (isActive && color) dot.style.fill = color;
        dot.style.opacity = '0';
        dot.style.animation = `fcDotAppear 0.3s ease ${delay + 0.35}s forwards`;

        svg.appendChild(dot);
    }

    closeFlowchart() {
        clearTimeout(this._fcRevealTimer);
        // 스크롤 위치 초기화 — 다음 챕터가 스크롤된 상태로 시작하지 않도록
        const scrollEl = this.el.flowchartScreen.querySelector('.flowchart-scroll');
        if (scrollEl) {
            scrollEl.scrollTop = 0;
            scrollEl.scrollLeft = 0;
        }
        // 페이지 자체 스크롤도 reset (모바일 환경 대비)
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }

        // 치트 미리보기 모드 — 다음 장 로드 X, 타이틀로 복귀
        if (this._flowchartPreviewMode) {
            this._flowchartPreviewMode = false;
            this.el.flowchartScreen.classList.remove('active');
            this.el.titleScreen.classList.add('active');
            this.refreshTitleScreen();
            return;
        }

        const scene = this.scenes[this.currentSceneId];
        const nxt = scene ? this._resolveNext(scene) : null;
        if (nxt && this.scenes[nxt]) {
            // flowchart 화면이 game-screen을 덮고 있는 동안 다음 장 로드 → 배경 cross-fade 시작
            // 그 다음 flowchart 화면을 닫으면, 닫히는 순간 이미 새 배경이 깔려 있음
            this.el.statsBar.classList.add('visible');
            this.loadScene(nxt);
            this.el.flowchartScreen.classList.remove('active');
        } else {
            this.showEndOfContent();
        }
    }

    showEndOfContent() {
        const btn = document.getElementById('btn-flowchart-close');
        if (this._endMsgShown) return;
        this._endMsgShown = true;

        const msg = document.createElement('p');
        msg.className = 'flowchart-end-msg';
        msg.textContent = '아직 당신은 진실을 알기에 준비가 되어 있지 않습니다.';
        btn.parentNode.insertBefore(msg, btn.nextSibling);

        btn.style.opacity = '0.3';
        btn.style.pointerEvents = 'none';
        btn.style.animation = 'none';  // 게임 끝 — 호흡 펄스 정지

        setTimeout(() => { msg.classList.add('visible'); }, 50);
    }

    _checkFlowchartCondition(condition) {
        if (condition.flag) return !!this.flags[condition.flag];
        if (condition.visited) return this.choiceHistory.some(h => h.sceneId === condition.visited);
        return true;
    }

    // ===== 스탯 시스템 (4감정: 사랑·용기·지혜·평정) =====
    applyStats(changes) {
        const statMeta = {
            love:    { name: '사랑', icon: '♥' },
            courage: { name: '용기', icon: '▲' },
            wisdom:  { name: '지혜', icon: '◆' },
            calm:    { name: '평정', icon: '●' },
        };

        const notifications = [];

        for (const [rawKey, value] of Object.entries(changes)) {
            // 옛 8개 키 → 새 4정 자동 변환
            const stat = this.statMigration[rawKey] || rawKey;
            if (this.stats[stat] !== undefined && value !== 0) {
                // 메커니즘: 한 액션당 ±1만 변화 (호감도와 동일 — 1씩 소중하게)
                const delta = value > 0 ? 1 : -1;
                this.stats[stat] += delta;
                this.stats[stat] = Math.max(0, Math.min(100, this.stats[stat]));

                // 스탯바 하이라이트
                const statEl = document.getElementById(`stat-${stat}`);
                if (statEl) {
                    const cls = delta > 0 ? 'highlight-up' : 'highlight-down';
                    statEl.classList.add(cls);
                    setTimeout(() => statEl.classList.remove(cls), 2000);
                }

                // 바 애니메이션 약간 딜레이
                setTimeout(() => this.updateStatDisplay(stat), 300);

                const sign = delta > 0 ? '+' : '';
                notifications.push({
                    key: stat,
                    value: `${sign}${delta}`,
                    positive: delta > 0
                });
            }
        }

        this.showStatNotifications(notifications);
    }

    updateStatDisplay(stat) {
        const fill = document.querySelector(`.stat-fill[data-stat="${stat}"]`);
        const value = document.querySelector(`.stat-value[data-stat="${stat}"]`);
        if (fill) fill.style.width = `${this.stats[stat]}%`;
        if (value) value.textContent = this.stats[stat];
    }

    showStatNotifications(notifications) {
        notifications.forEach((n, i) => {
            const statEl = document.getElementById(`stat-${n.key}`);
            if (!statEl) return;

            // 기존 미니 알림 제거
            const old = statEl.querySelector('.stat-change-mini');
            if (old) old.remove();

            setTimeout(() => {
                const mini = document.createElement('span');
                mini.className = `stat-change-mini ${n.positive ? 'positive' : 'negative'}`;
                mini.textContent = n.value;
                statEl.appendChild(mini);

                // 애니메이션 후 제거
                setTimeout(() => mini.remove(), 2200);
            }, i * 200);
        });
    }

    // ===== 조건 체크 =====
    // multi-key AND 조합 — 한 condition 객체에 여러 키가 있으면 모두 충족해야 통과
    checkCondition(condition) {
        if (condition.flag !== undefined && !this.flags[condition.flag]) return false;
        if (condition.notFlag !== undefined && this.flags[condition.notFlag]) return false;
        if (condition.allFlags && !condition.allFlags.every(f => !!this.flags[f])) return false;
        if (condition.anyFlag && !condition.anyFlag.some(f => !!this.flags[f])) return false;
        if (condition.noneOfFlags && !condition.noneOfFlags.every(f => !this.flags[f])) return false;
        if (condition.stat) {
            const { stat, min, max } = condition;
            const key = this.statMigration[stat] || stat;
            const val = this.stats[key];
            if (min !== undefined && val < min) return false;
            if (max !== undefined && val > max) return false;
        }
        // 동료 보유 여부 — 'hasCompanion: "haeun"' 또는 배열로 다중 (전부 보유)
        if (condition.hasCompanion) {
            const need = Array.isArray(condition.hasCompanion) ? condition.hasCompanion : [condition.hasCompanion];
            if (!need.every(id => this.companions.find(c => c.id === id))) return false;
        }
        // 동료 없음 — 'noCompanion: "haeun"' (그 동료가 없을 때만)
        if (condition.noCompanion) {
            const exclude = Array.isArray(condition.noCompanion) ? condition.noCompanion : [condition.noCompanion];
            if (!exclude.every(id => !this.companions.find(c => c.id === id))) return false;
        }
        // 호감도 임계 — 'affinity: { haeun: 60 }' (모두 충족)
        if (condition.affinity) {
            for (const [id, min] of Object.entries(condition.affinity)) {
                const comp = this.companions.find(c => c.id === id);
                if (!comp || (comp.affinity || 0) < min) return false;
            }
        }
        return true;
    }

    // requires: { stat 키들..., affinity: { id: 값 }, hasCompanion: 'id' }
    // stat 키는 예전 호환을 위해 평문, affinity/hasCompanion은 명시 키
    checkRequirements(requires) {
        for (const [rawKey, val] of Object.entries(requires)) {
            if (rawKey === 'affinity') {
                for (const [id, min] of Object.entries(val)) {
                    const comp = this.companions.find(c => c.id === id);
                    if (!comp || (comp.affinity || 0) < min) return false;
                }
                continue;
            }
            if (rawKey === 'hasCompanion') {
                const need = Array.isArray(val) ? val : [val];
                if (!need.every(id => this.companions.find(c => c.id === id))) return false;
                continue;
            }
            // 그 외엔 stat 키
            const stat = this.statMigration[rawKey] || rawKey;
            if (this.stats[stat] === undefined || this.stats[stat] < val) return false;
        }
        return true;
    }
}
