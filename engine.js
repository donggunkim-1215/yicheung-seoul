/**
 * 이층 : 서울, 0시 - 인터랙티브 드라마 엔진
 * 장면 관리, 대화, 선택지, 스탯, 핫스팟, 분기 플로우차트
 */

class GameEngine {
    constructor() {
        // 게임 상태
        this.stats = { courage: 0, empathy: 0, insight: 0, trust: 0, will: 0, wisdom: 0, charm: 0, composure: 0 };
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

        const voice = new Audio(src);
        voice.volume = 0.85;
        voice.play().catch(() => {});
        voice.addEventListener('ended', () => {
            if (this.currentVoice === voice) this.currentVoice = null;
        });
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
                this.showCharacterSlot(pos, cfg.src || cfg);
                if (cfg.name) this._speakerPositionMap[cfg.name] = pos;
            });
        } else if (scene.character) {
            const pos = scene.characterPosition || 'right';
            allSlots.filter(s => s !== pos).forEach(s => this.hideCharacterSlot(s));
            this.showCharacterSlot(pos, scene.character);
        } else if (scene.characterIf) {
            let shown = false;
            for (const cond of scene.characterIf) {
                if (this.flags[cond.flag]) {
                    this.showCharacterSlot('right', cond.character);
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
                if (this.checkCondition(entry.condition)) return entry.next;
            }
        }
        return scene.next || null;
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

    showCharacterSlot(position, src) {
        const el = this._getCharSlot(position);
        el.classList.remove('hidden', 'speaking', 'idle');
        el.classList.remove('visible');

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
        setTimeout(() => {
            if (!el.classList.contains('visible')) {
                el.classList.add('hidden');
                el.src = '';
            }
        }, 800);
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

        // 발화자 하이라이트 (speakerPosition 직접 지정 또는 이름 매핑)
        const speakerPos = line.speakerPosition || this._speakerPositionMap[line.speaker] || null;
        this.highlightSpeaker(speakerPos);

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
        this.el.choicesContainer.innerHTML = '';
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

            if (isLocked && choice.lockedText) {
                html += `<span class="choice-stat-hint" style="color: rgba(255,100,100,0.5);">${choice.lockedText}</span>`;
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

        this._choiceTimerInterval = setInterval(() => {
            remaining--;
            textEl.textContent = remaining;

            if (remaining <= 3) {
                timerEl.classList.add('urgent');
                this.el.choicesContainer.classList.add('timer-shake');
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

        if (choice.setFlags) {
            Object.assign(this.flags, choice.setFlags);
        }

        if (choice.next) {
            this.loadScene(choice.next);
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
                if (spot.next) this.loadScene(spot.next);
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

        // 스탯 → 색상 매핑
        const STAT_COLORS = {
            courage:   '#ff6b6b',
            empathy:   '#51cf66',
            insight:   '#339af0',
            trust:     '#ffd43b',
            will:      '#b197fc',
            wisdom:    '#38d9a9',
            charm:     '#f783ac',
            composure: '#a8b4c2',
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
            return topStat ? STAT_COLORS[topStat] : null;
        };

        // ===== 세로 레이아웃 상수 =====
        const STORY_H = 34, CARD_H = 34, CARD_X_GAP = 10;
        const LABEL_H = 26, Y_GAP = 50, LABEL_Y_GAP = 18;
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
                        const lw = Math.max(70, node.label.length * 11 + 22);
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
                            w: lw, h: LABEL_H, text: node.label, animDelay: labelDelay });
                        animDelay += 0.15;
                        prev = [{ x: centerX, y: y + LABEL_H, active: isReachable, color: labelColor }];
                        y += LABEL_H + LABEL_Y_GAP;
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
                            animDelay: cardBaseDelay + bi * 0.08, color });
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
                el.innerHTML = `<div class="fc-label-node"><span class="fc-label-text">${n.text}</span></div>`;
            } else if (n.type === 'branch') {
                el.style.width = n.w + 'px';
                if (n.color) el.style.setProperty('--branch-color', n.color);
                el.innerHTML = `<div class="fc-branch-node ${n.stateClass}"><span class="fc-indicator"></span><span class="fc-branch-text">${n.text}</span></div>`;
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

    // ===== 스탯 시스템 =====
    applyStats(changes) {
        const statMeta = {
            courage:   { name: '용기', icon: '勇' },
            empathy:   { name: '공감', icon: '感' },
            insight:   { name: '통찰', icon: '察' },
            trust:     { name: '신뢰', icon: '信' },
            will:      { name: '의지', icon: '志' },
            wisdom:    { name: '지혜', icon: '智' },
            charm:     { name: '매력', icon: '魅' },
            composure: { name: '침착', icon: '定' },
        };

        const notifications = [];

        for (const [stat, value] of Object.entries(changes)) {
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
        if (condition.stat) {
            const { stat, min, max } = condition;
            const val = this.stats[stat];
            if (min !== undefined && val < min) return false;
            if (max !== undefined && val > max) return false;
            return true;
        }
        return true;
    }

    checkRequirements(requires) {
        for (const [stat, minValue] of Object.entries(requires)) {
            if (this.stats[stat] < minValue) return false;
        }
        return true;
    }
}
