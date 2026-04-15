/**
 * 이층 : 서울, 0시 - 인터랙티브 드라마 엔진
 * 장면 관리, 대화, 선택지, 스탯, 핫스팟, 분기 플로우차트
 */

class GameEngine {
    constructor() {
        // 게임 상태
        this.stats = { courage: 0, empathy: 0, insight: 0, trust: 0, will: 0, wisdom: 0, charm: 0, composure: 0 };
        this.flags = {};
        this.currentSceneId = null;
        this.dialogueQueue = [];
        this.dialogueIndex = 0;
        this.isTyping = false;
        this.typewriterTimeout = null;
        this.scenes = {};
        this.choiceCooldown = false;

        // 오디오
        this.audioCtx = null;
        this.currentBgm = null;
        this.bgmVolumes = { title: 0.4, prologue: 0.2 }; // 타이틀 40%, 게임중 20%

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
            sceneOverlay: document.getElementById('scene-overlay'),
            characterImage: document.getElementById('character-image'),
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
        if (scene.image) {
            this.setImage(scene.image, scene.imageEffect || 'ken-burns');
        }

        // 캐릭터 오버레이
        if (scene.character) {
            this.showCharacter(scene.character);
        } else {
            this.hideCharacter();
        }

        // 장면별 BGM 전환
        if (scene.bgm) {
            this.playBgm(scene.bgm);
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
        }
    }

    // ===== 이미지 관리 =====
    setImage(src, effect = 'ken-burns') {
        const img = this.el.sceneImage;
        img.classList.remove('visible', 'ken-burns');

        img.onload = () => {
            img.classList.add('visible');
            if (effect === 'ken-burns') img.classList.add('ken-burns');
        };

        img.src = src;
    }

    // ===== 캐릭터 오버레이 =====
    showCharacter(src) {
        const charImg = this.el.characterImage;
        charImg.classList.remove('hidden');
        charImg.classList.remove('visible');

        charImg.onload = () => {
            requestAnimationFrame(() => {
                charImg.classList.add('visible');
            });
        };

        if (charImg.src && charImg.src.endsWith(src)) {
            charImg.classList.add('visible');
        } else {
            charImg.src = src;
        }
    }

    hideCharacter() {
        const charImg = this.el.characterImage;
        charImg.classList.remove('visible');
        setTimeout(() => {
            if (!charImg.classList.contains('visible')) {
                charImg.classList.add('hidden');
            }
        }, 800);
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
            } else if (scene.next) {
                this.loadScene(scene.next);
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

        this.el.dialogueContainer.classList.remove('hidden');
        this.el.speakerName.textContent = line.speaker || '';
        this.el.dialogueContinue.style.visibility = 'hidden';

        if (line.speaker) {
            this.el.dialogueContainer.classList.add('has-speaker');
        } else {
            this.el.dialogueContainer.classList.remove('has-speaker');
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
        if (this.isTyping) {
            clearTimeout(this.typewriterTimeout);
            const line = this.dialogueQueue[this.dialogueIndex];
            if (line) {
                this.el.dialogueText.textContent = line.text;
            }
            this.isTyping = false;
            this.el.dialogueContinue.style.visibility = 'visible';
            return;
        }

        this.dialogueIndex++;
        this.showDialogue();
    }

    // ===== 선택지 시스템 =====
    showChoices(choices) {
        this.el.dialogueContainer.classList.add('hidden');
        this.el.choicesContainer.classList.remove('hidden');
        this.el.choicesContainer.innerHTML = '';

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

            if (!isLocked) {
                btn.addEventListener('click', () => {
                    // 분기 기록
                    this.choiceHistory.push({
                        sceneId: this.currentSceneId,
                        chosenIndex: index,
                        chosenText: choice.text,
                        allChoices: choices.map(c => c.text),
                    });
                    this.selectChoice(choice);
                });
            }

            this.el.choicesContainer.appendChild(btn);
        });
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
    //  분기 플로우차트 시스템 (Detroit: Become Human 스타일)
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

        let animDelay = 0.3;

        fc.nodes.forEach((node, nodeIdx) => {
            // 스토리 노드 위 연결선 (첫 노드 제외)
            if (nodeIdx > 0) {
                const prevNode = fc.nodes[nodeIdx - 1];

                if (prevNode.type === 'choice') {
                    // 분기 → 스토리: 병합 SVG 선
                    const wasVisited = chosenSceneIds.has(prevNode.sceneId);
                    const chosenIdx = chosenMap[prevNode.sceneId];
                    const branchCount = prevNode.branches.length;

                    const mergeWrap = document.createElement('div');
                    mergeWrap.className = 'fc-merge-lines fc-animate';
                    mergeWrap.style.animationDelay = `${animDelay}s`;
                    animDelay += 0.08;

                    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    svg.setAttribute('viewBox', '0 0 100 20');
                    svg.setAttribute('preserveAspectRatio', 'none');

                    for (let i = 0; i < branchCount; i++) {
                        const x = this._getBranchX(i, branchCount);
                        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        line.setAttribute('x1', x);
                        line.setAttribute('y1', '0');
                        line.setAttribute('x2', '50');
                        line.setAttribute('y2', '20');
                        if (wasVisited && chosenIdx === i) line.classList.add('active');
                        svg.appendChild(line);
                    }

                    mergeWrap.appendChild(svg);
                    this.el.flowchartTree.appendChild(mergeWrap);
                } else {
                    // 스토리 → 스토리 or 스토리 → 선택: 직선
                    const connWrap = document.createElement('div');
                    connWrap.className = 'fc-connector-wrap fc-animate';
                    connWrap.style.animationDelay = `${animDelay}s`;
                    animDelay += 0.08;

                    const conn = document.createElement('div');
                    conn.className = 'fc-connector active';
                    connWrap.appendChild(conn);
                    this.el.flowchartTree.appendChild(connWrap);
                }
            }

            if (node.type === 'story') {
                const storyEl = document.createElement('div');
                storyEl.className = 'fc-animate';
                storyEl.style.animationDelay = `${animDelay}s`;
                animDelay += 0.1;

                const isActive = node.activeIf
                    ? this._checkFlowchartCondition(node.activeIf)
                    : true;

                const storyNode = document.createElement('div');
                storyNode.className = `fc-story-node${isActive ? ' active' : ''}`;
                storyNode.innerHTML = `<span class="fc-story-text">${node.text}</span>`;
                storyEl.appendChild(storyNode);
                this.el.flowchartTree.appendChild(storyEl);

            } else if (node.type === 'choice') {
                const choiceGroup = document.createElement('div');
                choiceGroup.className = 'fc-choice-group fc-animate';
                choiceGroup.style.animationDelay = `${animDelay}s`;
                animDelay += 0.12;

                // 라벨
                if (node.label) {
                    const label = document.createElement('div');
                    label.className = 'fc-choice-label';
                    label.textContent = node.label;
                    choiceGroup.appendChild(label);
                }

                // 분기 SVG 선 (위에서 각 분기로)
                const wasVisited = chosenSceneIds.has(node.sceneId);
                const chosenIdx = chosenMap[node.sceneId];
                const branchCount = node.branches.length;

                const branchLinesWrap = document.createElement('div');
                branchLinesWrap.className = 'fc-branch-lines';

                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('viewBox', '0 0 100 20');
                svg.setAttribute('preserveAspectRatio', 'none');

                for (let i = 0; i < branchCount; i++) {
                    const x = this._getBranchX(i, branchCount);
                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line.setAttribute('x1', '50');
                    line.setAttribute('y1', '0');
                    line.setAttribute('x2', x);
                    line.setAttribute('y2', '20');
                    if (wasVisited && chosenIdx === i) line.classList.add('active');
                    svg.appendChild(line);
                }

                branchLinesWrap.appendChild(svg);
                choiceGroup.appendChild(branchLinesWrap);

                // 분기 카드들
                const branches = document.createElement('div');
                branches.className = 'fc-branches';

                node.branches.forEach((branch, bIdx) => {
                    const branchEl = document.createElement('div');
                    branchEl.className = 'fc-branch';

                    if (wasVisited && chosenIdx === bIdx) {
                        branchEl.classList.add('chosen');
                    } else if (wasVisited) {
                        branchEl.classList.add('unchosen');
                    } else {
                        branchEl.classList.add('locked');
                    }

                    const text = wasVisited || branch.alwaysVisible ? branch.text : '???';

                    branchEl.innerHTML = `
                        <div class="fc-indicator"></div>
                        <div class="fc-branch-card">
                            <span class="fc-branch-text">${text}</span>
                        </div>
                    `;

                    branches.appendChild(branchEl);
                });

                choiceGroup.appendChild(branches);
                this.el.flowchartTree.appendChild(choiceGroup);
            }
        });

        const scrollEl = this.el.flowchartScreen.querySelector('.flowchart-scroll');
        if (scrollEl) scrollEl.scrollTop = 0;

        this.el.flowchartScreen.classList.add('active');
        this.el.statsBar.classList.remove('visible');
    }

    // 분기 X 좌표 계산 (SVG viewBox 0~100 기준)
    _getBranchX(index, total) {
        if (total === 1) return 50;
        if (total === 2) return index === 0 ? 25 : 75;
        if (total === 3) return [17, 50, 83][index];
        // 4개 이상
        const step = 70 / (total - 1);
        return 15 + step * index;
    }

    closeFlowchart() {
        this.el.flowchartScreen.classList.remove('active');
        this.el.statsBar.classList.add('visible');

        // 플로우차트에 nextScene이 정의되어 있으면 이동
        const scene = this.scenes[this.currentSceneId];
        if (scene && scene.next) {
            this.loadScene(scene.next);
        }
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
