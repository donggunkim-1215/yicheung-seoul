/**
 * 이층(裏層) — 프롤로그 시나리오
 * 지하철에서 시작 → 소리 → 수호 등장/미등장 분기
 */

const SCENES = {

    // ==========================================
    //  프롤로그: 텅 빈 지하철에서 눈을 뜨다
    // ==========================================

    prologue_01: {
        chapter: { number: '프롤로그', title: '마지막 지하철' },
        image: 'assets/images/prologue_subway_inside.png',
        imageEffect: 'ken-burns',
        dialogue: [
            { speaker: '', text: '...' },
            { speaker: '', text: '.....' },
            { speaker: '', text: '— 삐이이이.' },
            { speaker: '', text: '익숙한 도착 알림음에 눈을 떴다.' },
            { speaker: '', text: '2호선. 을지로입구역. 막차를 탄 게 마지막 기억이다.' },
            { speaker: '', text: '졸았나 보다. 핸드폰을 꺼내본다. 전원이 꺼져 있다.' },
            { speaker: '', text: '...이상하다.' },
            { speaker: '', text: '지하철이 멈춰 있다. 문이 열려 있다.' },
            { speaker: '', text: '하지만 아무도 없다.' },
            { speaker: '', text: '아까까지 맞은편에 앉아있던 아저씨도, 문 앞에 서있던 학생도.' },
            { speaker: '', text: '가방, 우산, 반쯤 마신 커피 — 물건만 남기고, 사람이 사라졌다.' },
        ],
        choices: [
            {
                text: '침착하게 객차를 둘러본다',
                statHint: '관찰이 먼저다',
                stats: { insight: 8, composure: 5 },
                next: 'prologue_observe'
            },
            {
                text: '"여보세요? 누구 없어요?"',
                statHint: '누군가 있을지도',
                stats: { empathy: 8, charm: 5 },
                next: 'prologue_callout'
            },
            {
                text: '일단 밖으로 나간다',
                statHint: '행동이 답이다',
                stats: { courage: 8, will: 5 },
                next: 'prologue_exit'
            }
        ]
    },

    // --- 분기 1: 관찰 ---
    prologue_observe: {
        image: 'assets/images/prologue_subway_inside.png',
        dialogue: [
            { speaker: '', text: '자리에서 일어나 객차를 천천히 둘러본다.' },
            { speaker: '', text: '바닥에 떨어진 신문. 날짜가 비어있다.' },
            { speaker: '', text: '인쇄된 모든 글자가 희미하게 번져있다. 읽을 수 없다.' },
            { speaker: '', text: '객차 끝 유리창에 비친 내 모습. ...나만 있다.' },
            { speaker: '', text: '소름이 돋는다. 이건 꿈이 아니다.' },
        ],
        next: 'prologue_sound'
    },

    // --- 분기 2: 소리치기 ---
    prologue_callout: {
        image: 'assets/images/prologue_subway_inside.png',
        dialogue: [
            { speaker: '주인공', text: '여보세요? 누구 없어요?' },
            { speaker: '', text: '목소리가 텅 빈 객차에 울려퍼진다.' },
            { speaker: '', text: '대답은 없다.' },
            { speaker: '', text: '다음 칸으로 가본다. 그 다음 칸도. 전부 비어있다.' },
            { speaker: '', text: '마지막 칸의 창문에 비친 건 나뿐이다.' },
        ],
        next: 'prologue_sound'
    },

    // --- 분기 3: 바로 나감 ---
    prologue_exit: {
        image: 'assets/images/prologue_subway_inside.png',
        dialogue: [
            { speaker: '', text: '생각할 것도 없다. 일단 나가야 한다.' },
            { speaker: '', text: '열린 문을 통해 플랫폼으로 발을 내딛는다.' },
            { speaker: '', text: '을지로입구역. 형광등이 깜빡이고 있다.' },
            { speaker: '', text: '에스컬레이터, 매표소 — 전부 그대로인데 사람만 없다.' },
        ],
        next: 'prologue_sound'
    },

    // ==========================================
    //  공통 합류: 소리가 들린다
    // ==========================================

    prologue_sound: {
        image: 'assets/images/prologue_subway_inside.png',
        dialogue: [
            { speaker: '', text: '그때—' },
            { speaker: '', text: '쨍.' },
            { speaker: '', text: '플랫폼 저쪽에서 뭔가 떨어지는 소리가 났다.' },
            { speaker: '', text: '금속이 바닥에 부딪히는 날카로운 소리.' },
            { speaker: '', text: '이 적막 속에서, 그 소리는 비명처럼 크게 울렸다.' },
            { speaker: '', text: '...사람인가?' },
        ],
        choices: [
            {
                text: '소리가 난 쪽으로 가본다',
                statHint: '확인해야 한다',
                stats: { courage: 8, wisdom: 5 },
                next: 'prologue_toward_sound'
            },
            {
                text: '움직이지 않고 기다린다',
                statHint: '상대가 먼저 오게 한다',
                stats: { composure: 8, insight: 5 },
                next: 'prologue_wait'
            },
            {
                text: '반대쪽으로 도망간다',
                statHint: '위험을 피한다',
                stats: { will: 5, courage: -3 },
                next: 'prologue_run'
            }
        ]
    },

    // ==========================================
    //  분기 A: 소리 쪽으로 → 여자 등장
    // ==========================================

    prologue_toward_sound: {
        image: 'assets/images/prologue_subway_inside.png',
        dialogue: [
            { speaker: '', text: '발소리를 죽이며 소리가 난 방향으로 걷는다.' },
            { speaker: '', text: '다음 칸. 그 다음 칸. 연결문을 하나씩 열 때마다 심장이 빨라진다.' },
            { speaker: '', text: '마지막 칸—' },
            { speaker: '', text: '좌석 사이에 누군가 웅크리고 앉아 있다.' },
        ],
        next: 'encounter_girl'
    },

    // ==========================================
    //  분기 B: 기다림 → 여자가 찾아옴
    // ==========================================

    prologue_wait: {
        image: 'assets/images/prologue_subway_inside.png',
        dialogue: [
            { speaker: '', text: '움직이지 않는다. 숨을 죽인다.' },
            { speaker: '', text: '...발소리.' },
            { speaker: '', text: '가볍고, 불규칙한 발소리. 이쪽으로 오고 있다.' },
            { speaker: '', text: '연결문이 열리는 소리.' },
            { speaker: '', text: '누군가 이 칸으로 들어온다.' },
        ],
        next: 'encounter_girl'
    },

    // ==========================================
    //  여자 등장 (분기 A, B 합류)
    // ==========================================

    encounter_girl: {
        image: 'assets/images/prologue_subway_inside.png',
        character: 'assets/images/character_protagonist_2.png',
        dialogue: [
            { speaker: '', text: '주황빛 머리카락. 캐주얼한 옷차림.' },
            { speaker: '', text: '이 상황에 전혀 어울리지 않는 모습이다.' },
            { speaker: '', text: '그녀가 고개를 들어 나를 본다.' },
            { speaker: '', text: '잠깐 놀란 눈. 하지만 금방 경계하는 표정으로 바뀐다.' },
            { speaker: '???', text: '...너도 여기 갇힌 거야?', voice: 'assets/audio/voice/1.mp3' },
            { speaker: '???', text: '아까부터 여기서 나가려고 했는데, 문이 안 열려.', voice: 'assets/audio/voice/2.mp3' },
        ],
        choices: [
            {
                text: '"갇혔다니? 무슨 일이 일어난 거예요?"',
                statHint: '정보가 필요하다',
                stats: { insight: 6, wisdom: 4 },
                next: 'encounter_ask'
            },
            {
                text: '"다행이다... 나만 있는 줄 알았어요."',
                statHint: '같은 처지라는 안도감',
                stats: { empathy: 6, charm: 4 },
                next: 'encounter_relief'
            },
            {
                text: '"(경계하며) ...누구세요? 왜 여기 있어요?"',
                statHint: '함부로 믿을 수 없다',
                stats: { courage: 6, will: 4 },
                next: 'encounter_cautious'
            }
        ]
    },

    // --- 정보 요청 ---
    encounter_ask: {
        image: 'assets/images/prologue_subway_inside.png',
        character: 'assets/images/character_neutral.png',
        dialogue: [
            { speaker: '???', text: '나도 몰라. 나도 아무것도...', voice: 'assets/audio/voice/3.mp3' },
            { speaker: '', text: '그녀가 죽은 핸드폰을 보여준다.' },
            { speaker: '???', text: '지하철 타고 가다가 잠들었는데, 눈 뜨니까 이래.', voice: 'assets/audio/voice/4.mp3' },
            { speaker: '???', text: '근데...', voice: 'assets/audio/voice/5.mp3' },
            { speaker: '', text: '그녀가 객차 창문을 가리킨다.' },
            { speaker: '???', text: '밖을 봐. 역인 것 같은데... 뭔가 이상하지 않아?', voice: 'assets/audio/voice/6.mp3' },
            { speaker: '', text: '창 너머로 보이는 플랫폼. 익숙한 것 같으면서도, 미묘하게 어긋나 있다.' },
            { speaker: '', text: '역 이름 표지판의 글자가 흐릿하게 번져있다. 읽을 수 없다.' },
        ],
        next: 'encounter_more_questions'
    },

    // --- 안도 ---
    encounter_relief: {
        image: 'assets/images/prologue_subway_inside.png',
        character: 'assets/images/character_neutral.png',
        dialogue: [
            { speaker: '', text: '그녀의 굳었던 표정이 살짝 풀린다.' },
            { speaker: '???', text: '...나도. 혼자인 줄 알고 진짜 무서웠어.' },
            { speaker: '???', text: '아무리 문을 열어도 안 열리고, 핸드폰도 안 되고...' },
            { speaker: '???', text: '...근데 이상한 거 못 느꼈어?' },
            { speaker: '???', text: '공기. 여름인데 이상하게 춥고, 냄새도 달라.' },
            { speaker: '', text: '말을 듣고 보니 그렇다. 습하면서 차갑다. 지하철 안의 공기가 아니다.' },
        ],
        next: 'encounter_more_questions'
    },

    // --- 경계 ---
    encounter_cautious: {
        image: 'assets/images/prologue_subway_inside.png',
        character: 'assets/images/character_neutral.png',
        dialogue: [
            { speaker: '', text: '경계심을 드러내자, 그녀가 양손을 들어 보인다.' },
            { speaker: '???', text: '야야, 나도 겁나서 그런 건데...' },
            { speaker: '', text: '가방에 달린 키링이 달랑거린다. 위협적인 느낌은 아니다.' },
            { speaker: '???', text: '나도 여기서 눈 떴어. 아무것도 몰라, 진짜로.' },
            { speaker: '???', text: '...너도 그런 거 아냐? 지하철 타다가 잠들고...' },
            { speaker: '', text: '같은 상황이라는 건 확실해 보인다. 그녀도 똑같이 겁에 질려 있다.' },
        ],
        next: 'encounter_more_questions'
    },

    // ==========================================
    //  여자에 대해 더 알아보기
    // ==========================================

    encounter_more_questions: {
        image: 'assets/images/prologue_subway_inside.png',
        character: 'assets/images/character_neutral.png',
        dialogue: [
            { speaker: '', text: '같은 처지인 것 같다. 하지만 모르는 사람이다.' },
            { speaker: '', text: '좀 더 물어봐야 할 것 같다.' },
        ],
        choices: [
            {
                text: '"이름이 뭐예요?"',
                statHint: '기본적인 것부터',
                stats: { charm: 5, empathy: 3 },
                next: 'encounter_ask_name'
            },
            {
                text: '"여기 오기 전에 뭐 하고 있었어요?"',
                statHint: '어떤 사람인지 알고 싶다',
                stats: { insight: 5, wisdom: 3 },
                next: 'encounter_ask_before'
            },
            {
                text: '"...혹시 뭔가 숨기고 있는 거 아니에요?"',
                statHint: '너무 침착하다',
                stats: { courage: 5, will: 3 },
                next: 'encounter_ask_suspect'
            }
        ]
    },

    // --- 이름 ---
    encounter_ask_name: {
        image: 'assets/images/prologue_subway_inside.png',
        character: 'assets/images/character_neutral.png',
        dialogue: [
            { speaker: '', text: '그녀가 잠깐 망설인다.' },
            { speaker: '', text: '시선이 흔들린다. 말할지 말지 재고 있는 눈이다.' },
        ],
        choices: [
            {
                text: '"괜찮아요. 편하게 불러도 될 이름만 알려줘요."',
                statHint: '부드럽게 다가간다',
                stats: { empathy: 5, charm: 3 },
                next: 'encounter_name_real'
            },
            {
                text: '"이런 상황인데, 이름 정도는 알아야 하지 않아요?"',
                statHint: '논리적으로 설득한다',
                stats: { insight: 5, will: 3 },
                next: 'encounter_name_fake'
            },
            {
                text: '"...안 알려줘도 돼요."',
                statHint: '강요하지 않는다',
                stats: { composure: 5, empathy: 3 },
                next: 'encounter_name_unknown'
            }
        ]
    },

    // --- 이름: 진짜 이름을 알려준다 ---
    encounter_name_real: {
        image: 'assets/images/prologue_subway_inside.png',
        character: 'assets/images/character_neutral.png',
        dialogue: [
            { speaker: '', text: '부드러운 말투에 그녀의 경계가 조금 풀린다.' },
            { speaker: '???', text: '...하은. 서하은.' },
            { speaker: '???', text: '너는?' },
            { speaker: '', text: '이름을 알려준다.' },
            { speaker: '하은', text: '...그래. 알겠어.' },
            { speaker: '', text: '이름을 알게 됐다고 해서 뭐가 달라지진 않는다.' },
            { speaker: '', text: '하지만 이 적막 속에서, 이름을 부를 수 있는 상대가 있다는 건 조금 다르다.' },
        ],
        setFlags: { know_name: true },
        next: 'encounter_second_question'
    },

    // --- 이름: 거짓 이름을 알려준다 ---
    encounter_name_fake: {
        image: 'assets/images/prologue_subway_inside.png',
        character: 'assets/images/character_neutral.png',
        dialogue: [
            { speaker: '', text: '논리적으로는 맞는 말이다. 하지만 그녀의 표정이 살짝 굳는다.' },
            { speaker: '???', text: '...유진. 이유진.' },
            { speaker: '', text: '너무 빨리 나온 대답이다. 준비해둔 것 같은.' },
            { speaker: '', text: '진짜 이름인지는 알 수 없다. 하지만 지금 따질 상황은 아니다.' },
            { speaker: '유진', text: '됐지? 너는?' },
            { speaker: '', text: '이름을 알려준다.' },
            { speaker: '', text: '그녀가 고개를 끄덕인다. 어딘가 어색한 미소.' },
        ],
        setFlags: { fake_name: true },
        next: 'encounter_second_question'
    },

    // --- 이름: 알려주지 않는다 ---
    encounter_name_unknown: {
        image: 'assets/images/prologue_subway_inside.png',
        character: 'assets/images/character_neutral.png',
        dialogue: [
            { speaker: '', text: '그녀가 살짝 놀란 눈으로 나를 본다.' },
            { speaker: '???', text: '...고마워. 그렇게 말해줘서.' },
            { speaker: '', text: '잠깐 침묵이 흐른다.' },
            { speaker: '???', text: '미안한데, 지금은 좀...' },
            { speaker: '', text: '괜찮다고 했으니까 괜찮은 거다.' },
            { speaker: '', text: '이름 대신 기억되는 건 — 주황빛 머리카락, 그리고 경계하는 눈.' },
        ],
        next: 'encounter_second_question'
    },

    // --- 이전 상황 ---
    encounter_ask_before: {
        image: 'assets/images/prologue_subway_inside.png',
        character: 'assets/images/character_neutral.png',
        dialogue: [
            { speaker: '???', text: '야근하고 집에 가는 길이었어. 막차 타고.' },
            { speaker: '???', text: '평소에도 지하철에서 많이 졸거든. 근데 이번엔...' },
            { speaker: '', text: '그녀가 말을 멈춘다.' },
            { speaker: '???', text: '...잠들기 직전에 이상한 게 들렸던 것 같아.' },
            { speaker: '???', text: '뭐라고 설명해야 하지. 종소리? 아닌데... 금속 긁는 소리 같은.' },
            { speaker: '', text: '나도 잠들기 직전의 기억이 희미하다. 뭔가 있었던 것 같기도 하고.' },
        ],
        setFlags: { know_background: true },
        next: 'encounter_second_question'
    },

    // --- 의심 ---
    encounter_ask_suspect: {
        image: 'assets/images/prologue_subway_inside.png',
        character: 'assets/images/character_neutral.png',
        dialogue: [
            { speaker: '', text: '그녀의 눈이 커진다.' },
            { speaker: '???', text: '...뭘 숨겨? 나도 무서워 죽겠는데.' },
            { speaker: '', text: '하지만 잘 보면 — 그녀의 손이 미세하게 떨리고 있다.' },
            { speaker: '', text: '연기가 아니다. 진짜로 겁먹은 거다.' },
            { speaker: '???', text: '솔직히 너도 의심스러워. 근데 지금은 서로 믿는 수밖에 없잖아.' },
            { speaker: '', text: '틀린 말은 아니다.' },
        ],
        setFlags: { suspected_girl: true },
        next: 'encounter_second_question'
    },

    // ==========================================
    //  두 번째 질문
    // ==========================================

    encounter_second_question: {
        image: 'assets/images/prologue_subway_inside.png',
        character: 'assets/images/character_neutral.png',
        dialogue: [
            { speaker: '', text: '...' },
            { speaker: '', text: '아직 궁금한 게 있다.' },
        ],
        choices: [
            {
                text: '"혹시 다른 사람은 못 봤어요?"',
                statHint: '우리만 있는 건가',
                stats: { insight: 4, empathy: 3 },
                next: 'encounter_ask_others'
            },
            {
                text: '"아까 그 소리... 뭐였을까요?"',
                statHint: '아까 들은 소리',
                stats: { wisdom: 4, composure: 3 },
                next: 'encounter_ask_sound'
            },
            {
                text: '"됐어요. 이만 가보죠."',
                statHint: '더 물을 게 없다',
                stats: { courage: 4, will: 3 },
                next: 'encounter_together_choice'
            }
        ]
    },

    // --- 다른 사람 ---
    encounter_ask_others: {
        image: 'assets/images/prologue_subway_inside.png',
        character: 'assets/images/character_neutral.png',
        dialogue: [
            { speaker: '???', text: '없어. 한 명도.' },
            { speaker: '???', text: '나 여기서 몇 칸을 걸어다녔는데, 전부 비어있었어.' },
            { speaker: '???', text: '근데... 이상한 건.' },
            { speaker: '', text: '그녀가 좌석 위의 가방을 가리킨다.' },
            { speaker: '???', text: '물건은 남아있어. 사람만 없어진 거야.' },
            { speaker: '???', text: '마치... 순간적으로 증발한 것처럼.' },
            { speaker: '', text: '가방, 우산, 커피. 주인 없는 물건들이 유령처럼 남아있다.' },
        ],
        next: 'encounter_together_choice'
    },

    // --- 소리 ---
    encounter_ask_sound: {
        image: 'assets/images/prologue_subway_inside.png',
        character: 'assets/images/character_neutral.png',
        dialogue: [
            { speaker: '???', text: '...나도 들었어.' },
            { speaker: '', text: '그녀의 얼굴이 어두워진다.' },
            { speaker: '???', text: '아까 혼자 있을 때. 어디선가 긁는 소리가 났어.' },
            { speaker: '???', text: '벽을... 아니, 천장을. 뭔가가 기어가는 것 같은.' },
            { speaker: '', text: '그녀가 무의식적으로 천장을 올려다본다.' },
            { speaker: '', text: '형광등이 깜빡인다. 한 번. 두 번.' },
            { speaker: '???', text: '...여기 오래 있으면 안 돼. 그건 확실해.' },
        ],
        setFlags: { heard_scratching: true },
        next: 'encounter_together_choice'
    },

    // ==========================================
    //  함께할 것인가
    // ==========================================

    encounter_together_choice: {
        image: 'assets/images/prologue_subway_inside.png',
        character: 'assets/images/character_neutral.png',
        dialogue: [
            { speaker: '', text: '잠깐의 침묵.' },
            { speaker: '', text: '형광등이 한 번 깜빡인다. 둘 다 천장을 올려다본다.' },
            { speaker: '???', text: '...같이 움직이자. 혼자 있으면 안 될 것 같아.' },
        ],
        choices: [
            {
                text: '"그래요. 같이 나가보죠."',
                statHint: '함께하는 게 낫다',
                stats: { trust: 12, empathy: 5, charm: 3 },
                setFlags: { with_girl: true },
                next: 'prologue_end_together'
            },
            {
                text: '"좋아요, 근데 조심하면서 가요."',
                statHint: '동의하되 경계한다',
                stats: { trust: 5, courage: 7, composure: 5 },
                setFlags: { cautious_together: true },
                next: 'prologue_end_careful'
            },
            {
                text: '"...나는 혼자 알아볼게요."',
                statHint: '아직 믿을 수 없다',
                stats: { will: 10, courage: 5, trust: -5 },
                setFlags: { rejected_girl: true },
                next: 'prologue_end_reject'
            }
        ]
    },

    // --- 함께 ---
    prologue_end_together: {
        image: 'assets/images/character_haeun_back.png',
        addCompanion: {
            id: 'haeun',
            name: '???',
            portrait: 'assets/images/character_neutral.png',
            nameConditions: [
                { flag: 'know_name', name: '하은' },
                { flag: 'fake_name', name: '유진(?)' }
            ]
        },
        dialogue: [
            { speaker: '', text: '둘이서 지하철 문 앞에 선다.' },
            { speaker: '', text: '문에 손을 대자 — 쉬익.' },
            { speaker: '???', text: '...열린다? 아까는 분명히 안 열렸는데.' },
            { speaker: '', text: '열린 문 너머. 플랫폼이 보인다.' },
            { speaker: '', text: '공기가 다르다. 차갑고, 습하다. 지하철 안의 공기가 아니다.' },
            { speaker: '', text: '나란히 플랫폼에 발을 내딛는다.' },
            { speaker: '???', text: '...출구 찾자. 여기 오래 있고 싶지 않아.', affinity: { haeun: 3 } },
            { speaker: '', text: '출구 표지판을 찾는다. 글자는 번져있지만, 화살표는 읽을 수 있다.' },
        ],
        next: 'prologue_final'
    },

    // --- 조심하며 함께 ---
    prologue_end_careful: {
        image: 'assets/images/character_haeun_back.png',
        addCompanion: {
            id: 'haeun',
            name: '???',
            portrait: 'assets/images/character_neutral.png',
            nameConditions: [
                { flag: 'know_name', name: '하은' },
                { flag: 'fake_name', name: '유진(?)' }
            ]
        },
        dialogue: [
            { speaker: '', text: '문에 다가간다. 손을 대자 — 이번에는 열린다.' },
            { speaker: '???', text: '...왜 지금은 되는 거야?' },
            { speaker: '', text: '서로를 한 번 바라본다. 확인하듯.' },
            { speaker: '', text: '같이 플랫폼으로 내려선다. 공기가 차갑다.' },
            { speaker: '', text: '주위를 살피며 걷는다. 발소리가 텅 빈 역사에 울린다.' },
            { speaker: '???', text: '...저기. 출구 표지판.', affinity: { haeun: 1 } },
            { speaker: '', text: '글자는 번져있지만, 화살표만은 선명하다. 위를 가리키고 있다.' },
        ],
        next: 'prologue_final'
    },

    // --- 거절 ---
    prologue_end_reject: {
        image: 'assets/images/prologue_subway_inside.png',
        character: 'assets/images/character_neutral.png',
        dialogue: [
            { speaker: '', text: '그녀의 표정이 굳는다.' },
            { speaker: '???', text: '...진짜로? 이 상황에서?' },
            { speaker: '', text: '잠깐 서로를 바라본다.' },
            { speaker: '???', text: '알았어. 조심해.' },
            { speaker: '', text: '그녀가 반대쪽 칸으로 걸어간다. 연결문이 닫힌다.' },
            { speaker: '', text: '닫히는 문 너머, 그녀의 뒷모습이 어둠에 삼켜진다.' },
        ],
        next: 'prologue_end_alone_merge'
    },

    // ==========================================
    //  분기 C: 도망 → 여자 미등장, 혼자 진행
    // ==========================================

    prologue_run: {
        image: 'assets/images/prologue_subway_inside.png',
        setFlags: { alone_ran: true },
        dialogue: [
            { speaker: '', text: '본능적으로 반대쪽으로 뛴다.' },
            { speaker: '', text: '칸을 지나고, 또 지나고. 전부 비어있다.' },
            { speaker: '', text: '마지막 칸. 더 이상 갈 곳이 없다.' },
            { speaker: '', text: '지하철 문에 손을 대본다. 열리지 않는다.' },
            { speaker: '', text: '창밖을 본다. 플랫폼이 보이는데 — 뭔가 이상하다.' },
            { speaker: '', text: '역 이름이 읽히지 않는다. 글자가 전부 번져있다.' },
            { speaker: '', text: '핸드폰도 안 되고, 시계도 멈춰있고.' },
            { speaker: '', text: '완전히 갇혔다.' },
        ],
        next: 'prologue_alone_trapped'
    },

    prologue_alone_trapped: {
        image: 'assets/images/prologue_subway_inside.png',
        dialogue: [
            { speaker: '', text: '좌석에 주저앉는다.' },
            { speaker: '', text: '...침착해야 한다. 생각하자.' },
            { speaker: '', text: '객차의 불이 한 번 깜빡인다.' },
            { speaker: '', text: '바깥 공기가 달라진 것 같다. 환기구에서 차가운 바람이 들어온다.' },
            { speaker: '', text: '그때 — 쉬익.' },
            { speaker: '', text: '아까 꿈쩍도 안 하던 문이 열린다.' },
            { speaker: '', text: '왜 지금? 알 수 없다.' },
            { speaker: '', text: '하지만 기회를 놓칠 수는 없다.' },
        ],
        next: 'prologue_end_alone_merge'
    },

    // ==========================================
    //  혼자 루트 합류 (도망 / 거절 공통)
    // ==========================================

    prologue_end_alone_merge: {
        image: 'assets/images/prologue_station_exit.png',
        dialogue: [
            { speaker: '', text: '플랫폼에 발을 내딛는다. 혼자.' },
            { speaker: '', text: '등 뒤에서 문이 닫힌다. 지하철이 어둠 속으로 사라진다.' },
            { speaker: '', text: '역사 안은 텅 비어있다. 형광등 하나가 끝에서 깜빡이고 있을 뿐.' },
            { speaker: '', text: '출구 표지판이 보인다. 글자는 번져있지만, 화살표는 읽을 수 있다.' },
            { speaker: '', text: '갈 곳은 하나뿐이다. 위로.' },
        ],
        next: 'prologue_final'
    },

    // ==========================================
    //  프롤로그 마무리 (전 루트 합류)
    // ==========================================

    prologue_final: {
        imageIf: [
            { flag: 'with_girl', image: 'assets/images/character_haeun_back.png' },
            { flag: 'cautious_together', image: 'assets/images/character_haeun_back.png' }
        ],
        image: 'assets/images/prologue_station_exit.png',
        showFlowchart: 'prologue',
        dialogue: [
            { speaker: '', text: '계단을 올라간다. 한 칸, 또 한 칸.' },
            { speaker: '', text: '지상의 빛이 보일 줄 알았다. 하지만 —', image: 'assets/images/prologue_station_exit.png' },
            { speaker: '', text: '출구 너머에 펼쳐진 건 밤이다. 달도 별도 없는 밤.' },
            { speaker: '', text: '서울의 풍경이 보인다. 건물, 도로, 가로등.' },
            { speaker: '', text: '전부 그대로인데 — 사람이 없다.' },
            { speaker: '', text: '여기가 어디인지 모른다.' },
            { speaker: '', text: '확실한 건 하나뿐이다.' },
            { speaker: '', text: '이곳은 내가 알던 서울이 아니다.' },
        ],
        next: 'ch1_intro',
    },
};

// ==========================================
//  프롤로그 플로우차트 정의
// ==========================================

const FLOWCHARTS = {
    prologue: {
        episode: '프롤로그',
        title: '마지막 지하철',
        // tree: 배열 = 순차 흐름. branch에 children이 있으면 별도 경로로 갈라짐.
        // children이 없는 branch는 다음 노드로 합류.
        tree: [
            { type: 'story', text: '텅 빈 지하철에서 눈을 뜨다' },
            { type: 'choice', label: '아무도 없는 객차에서', sceneId: 'prologue_01',
              branches: [
                  { text: '침착하게 둘러본다' },
                  { text: '소리쳐 부른다' },
                  { text: '바로 나간다' },
              ]
            },
            { type: 'story', text: '정체불명의 소리' },
            { type: 'choice', label: '플랫폼에 울린 소리', sceneId: 'prologue_sound',
              branches: [
                  { text: '소리 쪽으로 간다' },
                  { text: '기다린다' },
                  { text: '도망간다', children: [
                      { type: 'story', text: '홀로 갇힌 객차' },
                      { type: 'story', text: '혼자 밖으로' },
                      { type: 'story', text: '프롤로그 — 끝' },
                  ]},
              ]
            },
            { type: 'story', text: '소녀와의 조우' },
            { type: 'choice', label: '첫 대화', sceneId: 'encounter_girl',
              branches: [
                  { text: '상황을 묻는다' },
                  { text: '안도한다' },
                  { text: '경계한다' },
              ]
            },
            { type: 'choice', label: '그녀에 대해', sceneId: 'encounter_more_questions',
              branches: [
                  { text: '이름을 묻는다' },
                  { text: '이전 상황을 묻는다' },
                  { text: '의심한다' },
              ]
            },
            { type: 'choice', label: '두 번째 질문', sceneId: 'encounter_second_question',
              branches: [
                  { text: '다른 사람은?' },
                  { text: '아까 그 소리' },
                  { text: '이만 가보죠' },
              ]
            },
            { type: 'choice', label: '함께할 것인가', sceneId: 'encounter_together_choice',
              branches: [
                  { text: '함께 간다' },
                  { text: '조심하며 동행' },
                  { text: '혼자 간다', children: [
                      { type: 'story', text: '거절 후 혼자' },
                      { type: 'story', text: '프롤로그 — 끝' },
                  ]},
              ]
            },
            { type: 'story', text: '함께 밖으로' },
            { type: 'story', text: '프롤로그 — 끝' },
        ],
    },
};
