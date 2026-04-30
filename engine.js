/**
 * 이층 : 서울, 0시 - 인터랙티브 드라마 엔진
 * 장면 관리, 대화, 선택지, 스탯, 핫스팟, 분기 플로우차트
 */

class GameEngine {
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
            datnyangi:    { name: '닷냥이',   basePath: 'assets/images/portraits/datnyangi_' },
            hwangdokgu:   { name: '황덕구',   basePath: 'assets/images/portraits/hwangdokgu_' },
            // 3장 이후 등장
            gumiho:       { name: '구미호',   basePath: 'assets/images/portraits/gumiho_' },
            imugi:        { name: '이무기',   basePath: 'assets/images/portraits/imugi_' },
            jeonwoochi:   { name: '전우치',   basePath: 'assets/images/portraits/jeonwoochi_' },
            jangsanbeom:  { name: '장산범',   basePath: 'assets/images/portraits/jangsanbeom_' },
            geuseundae:   { name: '그슨대',   basePath: 'assets/images/portraits/geuseundae_' },
            gangcheoli:   { name: '강철이',   basePath: 'assets/images/portraits/gangcheoli_' },
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
            const slot = document.createElement('div');
            slot.className = 'companion-slot';
            slot.id = `companion-slot-${c.id}`;
            slot.style.animationDelay = `${i * 0.15}s`;
            slot.innerHTML = `
                <img class="companion-slot-portrait" src="${c.portrait}" alt="">
                <div class="companion-slot-info">
                    <div class="companion-slot-affinity">
                        <span class="companion-slot-affinity-icon">♥</span>
                        <span class="companion-slot-affinity-value">${c.affinity}</span>
                    </div>
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
        }
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
            this._showAffinityNotice(charId, () => this.loadScene(eventSceneId));
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
            this.showChapter(scene.chapter.number, scene.chapter.title, () => {
                this._initScene(scene);
            });
        } else {
            this._initScene(scene);
        }
    }

    _initScene(scene) {
        // 배경 이미지 (조건부 우선)
        let bgImage = scene.image;
        if (scene.imageIf) {
            for (const cond of scene.imageIf) {
                if (this.flags[cond.flag]) {
                    bgImage = cond.image;
                    break;
                }
            }
        }
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
        const allSlots = ['left', 'center', 'right'];
        this._speakerPositionMap = {};
        if (scene.characters) {
            allSlots.forEach(pos => {
                const cfg = scene.characters[pos];
                if (!cfg) { this.hideCharacterSlot(pos); return; }
                if (cfg.condition && !this.checkCondition(cfg.condition)) {
                    this.hideCharacterSlot(pos);
                    return;
                }
                if (cfg.char) {
                    this.setCharacterByKey(pos, cfg.char, cfg.emotion || 'neutral', cfg.scale);
                    const name = cfg.name || (this.characterDefs[cfg.char] && this.characterDefs[cfg.char].name);
                    if (name) this._speakerPositionMap[name] = pos;
                } else {
                    this.showCharacterSlot(pos, cfg.src || cfg, cfg.scale);
                    if (cfg.name) this._speakerPositionMap[cfg.name] = pos;
                }
            });
        } else if (scene.character) {
            const pos = scene.characterPosition || 'right';
            allSlots.filter(s => s !== pos).forEach(s => this.hideCharacterSlot(s));
            if (typeof scene.character === 'object' && scene.character.char) {
                this.setCharacterByKey(pos, scene.character.char, scene.character.emotion || 'neutral', scene.character.scale);
            } else {
                this.showCharacterSlot(pos, scene.character);
            }
        } else if (scene.characterIf) {
            let shown = false;
            for (const cond of scene.characterIf) {
                if (this.flags[cond.flag]) {
                    if (cond.char) {
                        this.setCharacterByKey('right', cond.char, cond.emotion || 'neutral', cond.scale);
                    } else {
                        this.showCharacterSlot('right', cond.character);
                    }
                    if (cond.name) this._speakerPositionMap[cond.name] = 'right';
                    shown = true;
                    break;
                }
            }
            if (!shown) this.hideCharacterSlot('right');
            this.hideCharacterSlot('left');
            this.hideCharacterSlot('center');
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
                this.dialogueQueue = scene.dialogue;
                this.dialogueIndex = 0;
                this.el.choicesContainer.classList.add('hidden');
                this._flowchartAfterDialogue = scene.showFlowchart;
                this.showDialogue();
            } else {
                this.openFlowchart(scene.showFlowchart);
            }
            return;
        }

        if (scene.dialogue && scene.dialogue.length > 0) {
            this.dialogueQueue = scene.dialogue;
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

    // ===== 이미지 관리 =====
    setImage(src, effect = 'ken-burns') {
        const front = this.el.sceneImage;
        const back = this.el.sceneImagePrev;

        // 같은 이미지면 애니메이션 리셋 없이 유지
        if (front.src && front.src.endsWith(src) && front.classList.contains('visible')) {
            return;
        }

        // 이전 예약 취소
        if (this._imgFadeTimer) clearTimeout(this._imgFadeTimer);

        // 새 이미지를 먼저 프리로드 (캐시 여부 무관하게 안전)
        const preload = new Image();
        const currentTransform = getComputedStyle(front).transform;

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
            front.src = src;

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

        preload.src = src;
    }

    // ===== 캐릭터 오버레이 (듀얼 슬롯) =====
    _getCharSlot(position) {
        if (position === 'left') return this.el.characterLeft;
        if (position === 'center') return this.el.characterCenter;
        return this.el.characterRight;
    }

    showCharacterSlot(position, src, scale) {
        const el = this._getCharSlot(position);
        el.classList.remove('hidden', 'speaking', 'idle');
        el.classList.remove('visible');

        // 캐릭터별 스케일 적용
        el.style.height = scale ? `${75 * scale}%` : '75%';

        el.onload = () => {
            requestAnimationFrame(() => { el.classList.add('visible'); });
        };

        if (el.src && el.src.endsWith(src)) {
            el.classList.add('visible');
        } else {
            el.src = src;
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
    setCharacterByKey(position, charKey, emotion = 'neutral', scale) {
        const def = this.characterDefs[charKey];
        if (!def) {
            console.warn(`[표정] 정의되지 않은 캐릭터 키: ${charKey}`);
            return;
        }
        const resolvedEmotion = this.emotionAliases[emotion] || emotion;
        const src = `${def.basePath}${resolvedEmotion}.png`;
        this.showCharacterSlot(position, src, scale);
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

    // 같은 슬롯의 캐릭터 표정만 갱신 (대사별 호출용)
    _setPortraitEmotion(position, emotion) {
        const slot = this._getCharSlot(position);
        const charKey = slot.dataset.charKey;
        if (!charKey) return false;
        if (slot.dataset.currentEmotion === emotion) return true; // 동일 → 스킵
        const def = this.characterDefs[charKey];
        if (!def) return false;

        const resolvedEmotion = this.emotionAliases[emotion] || emotion;
        const newSrc = `${def.basePath}${resolvedEmotion}.png`;
        const fallback = `${def.basePath}neutral.png`;
        slot.dataset.currentEmotion = emotion;
        slot.onerror = () => {
            slot.onerror = null;
            if (!slot.src.endsWith(fallback)) slot.src = fallback;
        };
        slot.src = newSrc;
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

    // 라인 단위 발화자 표정 갱신
    _updatePortraitForLine(line) {
        if (!line || !line.text) return;
        const pos = line.speakerPosition || this._speakerPositionMap[line.speaker];
        if (!pos) return;
        const slot = this._getCharSlot(pos);
        if (!slot.dataset.charKey) return; // 캐릭터 키 등록된 슬롯만 자동 매칭
        const emotion = line.emotion || this.classifyEmotion(line.text);
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
        companion.affinity = companion.affinity || 0;
        this.companions.push(companion);

        // HUD에 슬롯 추가
        const hud = document.getElementById('companion-hud');
        hud.classList.remove('hidden');

        const slot = document.createElement('div');
        slot.className = 'companion-slot';
        slot.id = `companion-slot-${companion.id}`;
        slot.style.animationDelay = `${(this.companions.length - 1) * 0.15}s`;
        slot.innerHTML = `
            <img class="companion-slot-portrait" src="${companion.portrait}" alt="">
            <div class="companion-slot-info">
                <div class="companion-slot-affinity">
                    <span class="companion-slot-affinity-icon">♥</span>
                    <span class="companion-slot-affinity-value">${companion.affinity}</span>
                </div>
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
    }

    // 텍스트 + emotion으로 이펙트 자동 추론 (명시 안 됐을 때만 호출됨)
    _inferEffect(line) {
        if (!line.speaker || line.speaker === '') return null; // 내레이션 제외
        const text = (line.text || '').trim();
        const em = line.emotion;
        if (!text) return null;

        // ===== 1. 매우 명확한 패턴 우선 =====

        // tremble: 떨리는 목소리 / 작은 소리로 (지문 명시) — 긴 떨림
        if (/\(떨리는|\(작은 소리로|\(속삭이며/.test(text)) return 'tremble';

        // shake: 폭발적 놀람 ...!! 또는 ...! 단독
        if (/^[…\.]{2,}\s*!{2,}\s*$/.test(text)) return 'shake';
        if (/^[…\.]{2,}\s*!\s*$/.test(text)) return 'shake';

        // flinch: ...아 / ...어 / ...오 단독 (짧은 의외 반응)
        if (/^[…\.]{2,}\s*[아어오엇이뭐왜]\s*[\.!\?]?\s*$/.test(text)) return 'flinch';

        // tremble: 떨림 표현 단어
        if (/너무\s*무서워|두려워|어떡해/.test(text)) return 'tremble';

        // ===== 2. 결정적 임팩트 (emotion=serious) =====
        if (em === 'serious') {
            if (/천 년의\s*[—-]?\s*한|당신이.*전우치|진짜\s*[—-]?\s*분|새\s*[—-]?\s*시대|결판|승천/.test(text)) {
                return 'zoom';
            }
        }

        // ===== 3. emotion=surprised — 짧으면 shake, 길면 flinch =====
        if (em === 'surprised') {
            if (/!/.test(text)) {
                return text.length < 25 ? 'shake' : 'flinch';
            }
            return 'flinch';
        }

        // ===== 4. 두려움/걱정 — tremble =====
        if (em === 'worried' || em === 'sad') {
            if (/...어떻게|어떡|무서|두려|덜덜/.test(text)) return 'tremble';
        }

        // ===== 5. 망설임 / 자조 — sway =====
        if (/^"?\s*[…\.]{2,}\s*글쎄|모르겠어요|모르겠어/.test(text)) return 'sway';
        if (/^[…\.\s]*허[,\s]+허[,\s]+허/.test(text)) return 'sway';
        if (/^[…\.\s]*후[,\s]+후[,\s]+후/.test(text)) return 'sway'; // 이무기 자조

        // ===== 6. 결심 — nod =====
        if (/약속할게|약속해|...알겠[어요]|받아들이[겠는]|함께\s*가[자요]|같이\s*[—-]?\s*가[자요]/.test(text)) {
            return 'nod';
        }

        // ===== 7. 진심·따뜻함 (emotion=smile) — pulse =====
        if (em === 'smile') {
            if (/고마워요?|미안해요?|괜찮아|좋아해|사랑/.test(text)) return 'pulse';
        }

        // ===== 8. 기쁨·신남 — jump =====
        if (/정말\?!|진짜\?!|와아?!|좋아!/.test(text)) return 'jump';

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
        const allowed = ['shake', 'jump', 'pulse', 'flinch', 'nod', 'tremble', 'zoom', 'sway'];
        if (!allowed.includes(effect)) return;
        // 진행 중인 이펙트 제거 (re-trigger 가능하도록)
        allowed.forEach(e => slot.classList.remove(`fx-${e}`));
        // 다음 프레임에 클래스 부여 (브라우저 reflow 트리거)
        // requestAnimationFrame 한 번이면 충분
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
        if (!speaker || speaker !== '???') return speaker;
        // 하은 이름 분기: 진짜 이름 / 거짓 이름 / 모름
        if (this.flags.know_name) return '하은';
        if (this.flags.fake_name) return '유진';
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
            const comp = this.companions.find(c => c.id === id);
            if (!comp) continue;
            if (value === 0) continue;

            const start = comp.affinity || 0;
            const final = Math.max(-100, Math.min(100, start + value));
            const realDelta = final - start;
            if (realDelta === 0) continue;

            comp.affinity = final; // 내부값은 즉시 최종 (엔딩 조건 등에서 정확)

            // 호감도 이벤트 임계 감지 (20·40·60·80 — 처음 넘는 순간)
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
    _checkAffinityThresholds(id, start, final) {
        const thresholds = [20, 40, 60, 80];
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
    _showAffinityNotice(charId, callback) {
        const overlay = document.getElementById('affinity-event-overlay');
        if (!overlay) { if (callback) callback(); return; }
        const charDef = this.characterDefs[charId];
        const charName = charDef ? charDef.name : '';
        const nameEl = document.getElementById('affinity-event-name');
        if (nameEl) nameEl.textContent = charName;
        overlay.classList.remove('hidden');
        overlay.classList.add('active');
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

        // 발화자 표정 자동 매칭 (캐릭터 키 등록된 슬롯에만 동작)
        this._updatePortraitForLine(line);

        // 발화자 하이라이트 (speakerPosition 직접 지정 또는 이름 매핑)
        const speakerPos = line.speakerPosition || this._speakerPositionMap[line.speaker] || null;
        this.highlightSpeaker(speakerPos);

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

            const btn = document.createElement('button');
            btn.className = 'choice-btn';

            const isLocked = choice.requires && !this.checkRequirements(choice.requires);
            if (isLocked) {
                btn.classList.add('locked');
            }

            let html = choice.text;

            if (choice.statHint) {
                html += `<span class="choice-stat-hint">${choice.statHint}</span>`;
            }

            if (isLocked) {
                // 자동 생성 — 부족한 능력치를 한자/현재값/필요값으로 표시
                const STAT_LABEL = { love: '♥ 사랑', courage: '▲ 용기', wisdom: '◆ 지혜', calm: '● 평정' };
                const parts = [];
                for (const [rawKey, need] of Object.entries(choice.requires)) {
                    const key = this.statMigration[rawKey] || rawKey;
                    const cur = this.stats[key] ?? 0;
                    if (cur < need) parts.push(`${STAT_LABEL[key] || key} ${cur}/${need}`);
                }
                const fallbackText = choice.lockedText || `요구 ${parts.join(', ')}`;
                html += `<span class="choice-stat-hint" style="color: rgba(255,100,100,0.5);">${fallbackText}</span>`;
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

        // ===== 세로 레이아웃 상수 =====
        const STORY_H = 34, CARD_H = 34, CARD_X_GAP = 10;
        const LABEL_H = 26, Y_GAP = 50, LABEL_Y_GAP = 18;
        // 썸네일 라벨 (디트로이트 결): 선택지 scene에 image가 있고 방문한 경우 적용
        const LABEL_THUMB_H = 88, LABEL_THUMB_W = 150;
        const DIVERGE_X_GAP = 28;

        const allNodes = [];
        const allEdges = [];
        let animDelay = 0.8;

        // ===== 재귀 렌더: 위 → 아래 =====
        const renderTree = (tree, centerX, startY, initConnectors) => {
            let y = startY;
            let prev = initConnectors || null;

            for (const node of tree) {
                if (node.type === 'story') {
                    const w = Math.max(100, node.text.length * 12 + 28);
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

                        const lw = useThumb ? LABEL_THUMB_W
                            : Math.max(70, node.label.length * 11 + 22);
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

                    // ── 분기 카드 폭 계산 ──
                    const allBranches = [...merging, ...diverging];
                    const cardWidths = allBranches.map(({ b }) => {
                        const t = wasVisited || b.alwaysVisible ? b.text : '???';
                        return Math.max(80, t.length * 10 + 36);
                    });

                    // ── 합류 카드: centerX 기준 가로 스택 ──
                    const mWidths = merging.map((_, mi) => cardWidths[mi]);
                    const mTotalW = mWidths.reduce((a, b) => a + b, 0)
                        + Math.max(0, merging.length - 1) * CARD_X_GAP;
                    let bx = centerX - mTotalW / 2;

                    const mPos = merging.map(({ b, i }, mi) => {
                        const w = mWidths[mi];
                        const pos = { x: bx, y, cx: bx + w / 2, w, origIdx: i };
                        bx += w + CARD_X_GAP;
                        return pos;
                    });

                    // ── 갈라지는 카드: 합류 카드 오른쪽에 여백 두고 배치 ──
                    let divX = centerX + mTotalW / 2 + DIVERGE_X_GAP;
                    const dPos = diverging.map(({ b, i }, di) => {
                        const w = cardWidths[merging.length + di];
                        const pos = { x: divX, y, cx: divX + w / 2, w,
                            origIdx: i, branch: b };
                        divX += w + CARD_X_GAP;
                        return pos;
                    });

                    const bPos = [...mPos, ...dPos];

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
                        const text = wasVisited || b.alwaysVisible ? b.text : '???';
                        let cls = 'locked';
                        if (wasVisited && chosenIdx === i) cls = 'chosen';
                        else if (wasVisited) cls = 'unchosen';
                        const color = getBranchColor(node.sceneId, i);
                        allNodes.push({ type: 'branch', x: bp.x, y: bp.y,
                            w: bp.w, h: CARD_H, text, stateClass: cls,
                            animDelay: cardBaseDelay + bi * 0.08, color,
                            sceneId: node.sceneId, branchIdx: i });
                    });
                    animDelay += 0.3;

                    const cardBottomY = y + CARD_H;
                    y = cardBottomY + Y_GAP;

                    // ── 합류 커넥터 (다음 노드로) ──
                    prev = mPos.map(mp => ({
                        x: mp.cx, y: cardBottomY,
                        active: wasVisited && chosenIdx === mp.origIdx,
                        color: getBranchColor(node.sceneId, mp.origIdx)
                    }));

                    // ── 갈라지는 서브트리 재귀 렌더 ──
                    for (const dp of dPos) {
                        const isActive = wasVisited && chosenIdx === dp.origIdx;
                        const dpColor = getBranchColor(node.sceneId, dp.origIdx);
                        renderTree(dp.branch.children, dp.cx, cardBottomY + Y_GAP,
                            [{ x: dp.cx, y: cardBottomY, active: isActive, color: dpColor }]);
                    }
                }
            }
        };

        renderTree(fc.tree, 0, 0, null);

        // ===== 바운딩 박스 → 캔버스 =====
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        for (const n of allNodes) {
            minX = Math.min(minX, n.x);
            maxX = Math.max(maxX, n.x + n.w);
            minY = Math.min(minY, n.y);
            maxY = Math.max(maxY, n.y + n.h);
        }
        if (!isFinite(minX)) { minX = 0; maxX = 400; minY = 0; maxY = 200; }

        const PAD = 40;
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
            el.style.animationDelay = n.animDelay + 's';

            if (n.type === 'story') {
                el.innerHTML = `<div class="fc-story-node${n.isActive ? ' active' : ''}"><span class="fc-story-text">${n.text}</span></div>`;
            } else if (n.type === 'label') {
                if (n.thumbSrc) {
                    el.style.width = n.w + 'px';
                    el.innerHTML = `<div class="fc-label-node fc-label-thumb">
                        <div class="fc-label-thumb-img" style="background-image:url('${n.thumbSrc}')"></div>
                        <span class="fc-label-text">${n.text}</span>
                    </div>`;
                } else {
                    el.innerHTML = `<div class="fc-label-node"><span class="fc-label-text">${n.text}</span></div>`;
                }
            } else if (n.type === 'branch') {
                el.style.width = n.w + 'px';
                if (n.color) el.style.setProperty('--branch-color', n.color);
                // 데이터 속성 — 통계 도착 시 카드 찾기 위해
                el.dataset.sceneId = n.sceneId || '';
                el.dataset.branchIdx = n.branchIdx != null ? n.branchIdx : '';
                el.innerHTML = `<div class="fc-branch-node ${n.stateClass}">
                    <span class="fc-indicator"></span>
                    <span class="fc-branch-text">${n.text}</span>
                    <span class="fc-branch-percent" data-scene-id="${n.sceneId || ''}" data-branch-idx="${n.branchIdx != null ? n.branchIdx : ''}"></span>
                </div>`;
            }

            this.el.flowchartTree.appendChild(el);
        }

        // 스크롤 초기화 + 드래그 이동
        const scrollEl = this.el.flowchartScreen.querySelector('.flowchart-scroll');
        if (scrollEl) {
            scrollEl.scrollTop = 0;
            scrollEl.scrollLeft = Math.max(0, (canvasW - scrollEl.clientWidth) / 2);

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
            // 각 카드에 % 주입
            const slots = this.el.flowchartTree.querySelectorAll(
                `.fc-branch-percent[data-scene-id="${sceneId}"]`
            );
            slots.forEach(slot => {
                const idx = slot.dataset.branchIdx;
                const c = branchCounts[idx] || 0;
                const pct = Math.round((c / total) * 100);
                slot.innerHTML = `<span class="fc-pct-fill" style="width:${pct}%"></span><span class="fc-pct-label">${pct}%</span>`;
                slot.classList.add('visible');
            });
        }
    }

    // 세로 SVG 베지어 엣지 (delay: 노드와 동기화된 등장 지연)
    _fcDrawEdge(svg, x1, y1, x2, y2, isActive, delay = 0, color = null) {
        const svgNS = 'http://www.w3.org/2000/svg';
        const dy = Math.abs(y2 - y1);
        const cp = Math.max(15, dy * 0.4);
        const d = `M ${x1} ${y1} C ${x1} ${y1 + cp}, ${x2} ${y2 - cp}, ${x2} ${y2}`;

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
        const scene = this.scenes[this.currentSceneId];
        const nxt = scene ? this._resolveNext(scene) : null;
        if (nxt && this.scenes[nxt]) {
            this.el.flowchartScreen.classList.remove('active');
            this.el.statsBar.classList.add('visible');
            this.loadScene(nxt);
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
            if (this.stats[stat] !== undefined) {
                this.stats[stat] += value;
                this.stats[stat] = Math.max(0, Math.min(100, this.stats[stat]));

                // 스탯바 하이라이트
                const statEl = document.getElementById(`stat-${stat}`);
                if (statEl) {
                    const cls = value > 0 ? 'highlight-up' : 'highlight-down';
                    statEl.classList.add(cls);
                    setTimeout(() => statEl.classList.remove(cls), 2000);
                }

                // 바 애니메이션 약간 딜레이
                setTimeout(() => this.updateStatDisplay(stat), 300);

                const sign = value > 0 ? '+' : '';
                notifications.push({
                    key: stat,
                    value: `${sign}${value}`,
                    positive: value > 0
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
    checkCondition(condition) {
        if (condition.flag) {
            return !!this.flags[condition.flag];
        }
        if (condition.notFlag) {
            return !this.flags[condition.notFlag];
        }
        if (condition.allFlags) {
            return condition.allFlags.every(f => !!this.flags[f]);
        }
        if (condition.anyFlag) {
            return condition.anyFlag.some(f => !!this.flags[f]);
        }
        if (condition.noneOfFlags) {
            return condition.noneOfFlags.every(f => !this.flags[f]);
        }
        if (condition.stat) {
            const { stat, min, max } = condition;
            const key = this.statMigration[stat] || stat;
            const val = this.stats[key];
            if (min !== undefined && val < min) return false;
            if (max !== undefined && val > max) return false;
            return true;
        }
        return true;
    }

    checkRequirements(requires) {
        for (const [rawKey, minValue] of Object.entries(requires)) {
            const stat = this.statMigration[rawKey] || rawKey;
            if (this.stats[stat] < minValue) return false;
        }
        return true;
    }
}
