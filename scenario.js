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
            { speaker: '???', text: '...너도 여기 갇힌 거야?' },
            { speaker: '???', text: '아까부터 여기서 나가려고 했는데, 문이 안 열려.' },
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
        character: 'assets/images/character_protagonist_2.png',
        dialogue: [
            { speaker: '???', text: '나도 몰라. 나도 아무것도...' },
            { speaker: '', text: '그녀가 죽은 핸드폰을 보여준다.' },
            { speaker: '???', text: '지하철 타고 가다가 잠들었는데, 눈 뜨니까 이래.' },
            { speaker: '???', text: '근데...' },
            { speaker: '', text: '그녀가 객차 창문을 가리킨다.' },
            { speaker: '???', text: '밖을 봐. 역인 것 같은데... 뭔가 이상하지 않아?' },
            { speaker: '', text: '창 너머로 보이는 플랫폼. 익숙한 것 같으면서도, 미묘하게 어긋나 있다.' },
            { speaker: '', text: '역 이름 표지판의 글자가 흐릿하게 번져있다. 읽을 수 없다.' },
        ],
        next: 'encounter_together_choice'
    },

    // --- 안도 ---
    encounter_relief: {
        image: 'assets/images/prologue_subway_inside.png',
        character: 'assets/images/character_protagonist_2.png',
        dialogue: [
            { speaker: '', text: '그녀의 굳었던 표정이 살짝 풀린다.' },
            { speaker: '???', text: '...나도. 혼자인 줄 알고 진짜 무서웠어.' },
            { speaker: '???', text: '아무리 문을 열어도 안 열리고, 핸드폰도 안 되고...' },
            { speaker: '???', text: '...근데 이상한 거 못 느꼈어?' },
            { speaker: '???', text: '공기. 여름인데 이상하게 춥고, 냄새도 달라.' },
            { speaker: '', text: '말을 듣고 보니 그렇다. 습하면서 차갑다. 지하철 안의 공기가 아니다.' },
        ],
        next: 'encounter_together_choice'
    },

    // --- 경계 ---
    encounter_cautious: {
        image: 'assets/images/prologue_subway_inside.png',
        character: 'assets/images/character_protagonist_2.png',
        dialogue: [
            { speaker: '', text: '경계심을 드러내자, 그녀가 양손을 들어 보인다.' },
            { speaker: '???', text: '야야, 나도 겁나서 그런 건데...' },
            { speaker: '', text: '가방에 달린 키링이 달랑거린다. 위협적인 느낌은 아니다.' },
            { speaker: '???', text: '나도 여기서 눈 떴어. 아무것도 몰라, 진짜로.' },
            { speaker: '???', text: '...너도 그런 거 아냐? 지하철 타다가 잠들고...' },
            { speaker: '', text: '같은 상황이라는 건 확실해 보인다. 그녀도 똑같이 겁에 질려 있다.' },
        ],
        next: 'encounter_together_choice'
    },

    // ==========================================
    //  함께할 것인가
    // ==========================================

    encounter_together_choice: {
        image: 'assets/images/prologue_subway_inside.png',
        character: 'assets/images/character_protagonist_2.png',
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
        image: 'assets/images/prologue_subway_inside.png',
        character: 'assets/images/character_protagonist_2.png',
        dialogue: [
            { speaker: '', text: '둘이서 지하철 문 앞에 선다.' },
            { speaker: '', text: '문에 손을 대자 — 쉬익.' },
            { speaker: '???', text: '...열린다? 아까는 분명히 안 열렸는데.' },
            { speaker: '', text: '열린 문 너머. 플랫폼이 보인다.' },
            { speaker: '', text: '그런데 — 공기가 다르다. 차갑고, 무겁다.' },
            { speaker: '', text: '플랫폼 벽에 무언가 적혀있다. 페인트가 아니다. 긁어서 쓴 것 같다.' },
            { speaker: '', text: '"나가지 마"' },
            { speaker: '', text: '그리고 멀리서 — 사람의 것이 아닌 울음소리가 들린다.' },
            { speaker: '???', text: '...뭐야 저거.' },
        ],
        next: 'prologue_final'
    },

    // --- 조심하며 함께 ---
    prologue_end_careful: {
        image: 'assets/images/prologue_subway_inside.png',
        character: 'assets/images/character_protagonist_2.png',
        dialogue: [
            { speaker: '', text: '문에 다가간다. 손을 대자 — 이번에는 열린다.' },
            { speaker: '???', text: '...왜 지금은 되는 거야?' },
            { speaker: '', text: '한 발 내딛는 순간, 등 뒤에서 기척이 느껴진다.' },
            { speaker: '', text: '돌아보니 — 아무것도 없다.' },
            { speaker: '', text: '하지만 객차 안의 형광등이 끝쪽부터 하나씩 꺼지고 있다.' },
            { speaker: '', text: '마치 무언가가 다가오는 것처럼.' },
            { speaker: '???', text: '...뛰자. 지금 당장.' },
        ],
        next: 'prologue_final'
    },

    // --- 거절 ---
    prologue_end_reject: {
        image: 'assets/images/prologue_subway_inside.png',
        character: 'assets/images/character_protagonist_2.png',
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
            { speaker: '', text: '그때, 객차의 불이 한 번 깜빡인다.' },
            { speaker: '', text: '그리고 — 창문에 뭔가가 비친다.' },
            { speaker: '', text: '내 뒤에, 아무것도 없어야 할 좌석 위에.' },
            { speaker: '', text: '그림자가 있다. 형체 없는, 어둠보다 짙은 무언가.' },
            { speaker: '', text: '— 어둑시니.' },
            { speaker: '', text: '알 수 없는 단어가 머릿속을 스친다.' },
            { speaker: '', text: '돌아보니 — 아무것도 없다.' },
            { speaker: '', text: '하지만 불이 다시 깜빡일 때, 그것은 더 가까이 와 있었다.' },
        ],
        next: 'prologue_end_alone_merge'
    },

    // ==========================================
    //  혼자 루트 합류 (도망 / 거절 공통)
    // ==========================================

    prologue_end_alone_merge: {
        image: 'assets/images/prologue_subway_inside.png',
        dialogue: [
            { speaker: '', text: '혼자다. 이 텅 빈 지하철에, 완전히 혼자다.' },
            { speaker: '', text: '형광등이 하나씩 꺼지기 시작한다.' },
            { speaker: '', text: '어둠이 객차를 삼키고 있다.' },
            { speaker: '', text: '...아니. 혼자가 아닌지도 모른다.' },
            { speaker: '', text: '보이지 않는 무언가가 — 이 어둠 속에 있다.' },
        ],
        next: 'prologue_final'
    },

    // ==========================================
    //  프롤로그 마무리 (전 루트 합류)
    // ==========================================

    prologue_final: {
        image: 'assets/images/prologue_subway_inside.png',
        overlayColor: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,20,0.8) 70%, rgba(0,0,0,1) 100%)',
        showFlowchart: 'prologue',
        dialogue: [
            { speaker: '', text: '여기가 어디인지 모른다.' },
            { speaker: '', text: '무슨 일이 일어난 건지도 모른다.' },
            { speaker: '', text: '확실한 건 하나뿐이다.' },
            { speaker: '', text: '이곳은 내가 알던 서울이 아니다.' },
        ],
    },
};

// ==========================================
//  프롤로그 플로우차트 정의
// ==========================================

const FLOWCHARTS = {
    prologue: {
        episode: '프롤로그',
        title: '마지막 지하철',
        nodes: [
            {
                type: 'story',
                text: '텅 빈 지하철에서 눈을 뜨다',
            },
            {
                type: 'choice',
                label: '아무도 없는 객차에서',
                sceneId: 'prologue_01',
                branches: [
                    { text: '침착하게 둘러본다' },
                    { text: '소리쳐 부른다' },
                    { text: '바로 나간다' },
                ],
            },
            {
                type: 'story',
                text: '정체불명의 소리',
            },
            {
                type: 'choice',
                label: '플랫폼에 울린 소리',
                sceneId: 'prologue_sound',
                branches: [
                    { text: '소리 쪽으로 간다' },
                    { text: '기다린다' },
                    { text: '도망간다' },
                ],
            },
            {
                type: 'story',
                text: '소녀와의 조우 / 홀로 객차',
            },
            {
                type: 'choice',
                label: '함께할 것인가',
                sceneId: 'encounter_together_choice',
                branches: [
                    { text: '따라간다' },
                    { text: '경계하며 동행' },
                    { text: '혼자 간다' },
                ],
            },
            {
                type: 'story',
                text: '프롤로그 — 끝',
            },
        ],
    },
};
