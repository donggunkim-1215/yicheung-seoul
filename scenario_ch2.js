/**
 * 이층 : 서울, 0시 — 제2장: 작은 인연
 * 새벽 주택가 → 작은 소리 → 닷냥이 / 황덕구 만남 → 안전한 방 → 휴식 → 단서
 *
 * 1장 종결 플래그 활용:
 *  - has_companion (하은 동행)
 *  - with_seoyeon  (1장에서 서연 동행)
 *  - with_eoduksini (1장에서 어둑시니 동료)
 *  - clean_victory / hard_victory / escaped_injured (1장 결과)
 */

const SCENES_CH2 = {

    // ==========================================
    //  0막: 진입 — 새벽 주택가
    // ==========================================

    ch2_intro: {
        chapter: { number: '제2장', title: '작은 인연' },
        image: 'assets/images/ch2_dawn_alley.png',
        imageEffect: 'ken-burns',
        bgm: 'ch2',
        dialogue: [
            { speaker: '', text: '걷는다.' },
            { speaker: '', text: '큰길에서 좁은 길로, 좁은 길에서 더 좁은 골목으로.' },
            { speaker: '', text: '하늘이 조금씩 옅어지고 있다. 검은색에서 짙은 군청으로.' },
            { speaker: '', text: '새벽이 오고 있다 — 다만 너무 천천히.' },
            { speaker: '', text: '주택가다. 낡은 빌라들이 어깨를 맞대고 늘어선 길.' },
            { speaker: '', text: '창문 몇 개에서 불이 켜져 있다.' },
            { speaker: '', text: '하지만 안에는 — 사람의 그림자가 없다.' },
        ],
        next: 'ch2_companion_status'
    },

    // 1장에서 넘어온 동료 상태를 단일 플래그로 정리 (자동)
    ch2_companion_status: {
        image: 'assets/images/ch2_dawn_alley.png',
        setFlagsIf: [
            { condition: { flag: 'has_companion' },        flags: { ch2_haeun_in: true } },
            { condition: { flag: 'with_seoyeon' },         flags: { ch2_seoyeon_in: true } },
            { condition: { flag: 'eoduksini_companion' },  flags: { ch2_eoduksini_in: true, with_eoduksini: true } },
        ],
        next: 'ch2_walking'
    },

    ch2_walking: {
        image: 'assets/images/ch2_dawn_alley.png',
        characters: {
            left:  { char: 'haeun',   condition: { flag: 'ch2_haeun_in' } },
            right: { char: 'seoyeon', condition: { flag: 'ch2_seoyeon_in' } },
        },
        dialogue: [
            // 동료 구성별 진입 대사
            { speaker: '하은', text: '...어디까지 걸은 거야, 우리.', condition: { flag: 'ch2_haeun_in' } },
            { speaker: '하은', text: '어둠이 덜한 쪽으로 가자, 그 말 한 마디에 — 진짜 여기까지 왔네.', condition: { flag: 'ch2_haeun_in' } },
            { speaker: '서연', text: '여기는... 동네예요. 사람 사는 곳.', condition: { flag: 'ch2_seoyeon_in' } },
            { speaker: '서연', text: '근데 사람만 빼고 다 있네요.', condition: { flag: 'ch2_seoyeon_in' } },
            { speaker: '어둑시니', text: '...빛이 가까워.', condition: { flag: 'ch2_eoduksini_in' } },
            { speaker: '어둑시니', text: '나는 — 더는 못 가. 잠깐 떨어져 있을게.', condition: { flag: 'ch2_eoduksini_in' } },
            // 어둑시니가 그림자처럼 일행을 따라오는 설정 — 시각적으로는 사라졌다가 다시 나타남
            { speaker: '', text: '어둑시니의 윤곽이 옅어진다. 사라지는 게 아니다 — 다만, 보이지 않게 된다.', condition: { flag: 'ch2_eoduksini_in' } },
            { speaker: '', text: '그것은 그림자 속에서 우리를 따라온다. 알고 있다.', condition: { flag: 'ch2_eoduksini_in' } },

            // 솔로
            { speaker: '', text: '혼자다. 발소리가 둘이 아니라 하나라는 것 — 그게 이상하게 무겁다.', condition: { noneOfFlags: ['ch2_haeun_in', 'ch2_seoyeon_in', 'ch2_eoduksini_in'] } },

            // 공통
            { speaker: '', text: '한 골목 더 들어선다.' },
            { speaker: '', text: '그때 — 어디선가 작은 소리가 들린다.' },
        ],
        next: 'ch2_sound_appears'
    },

    // ==========================================
    //  1막: 작은 소리 — 핵심 분기
    // ==========================================

    ch2_sound_appears: {
        image: 'assets/images/ch2_dawn_alley.png',
        dialogue: [
            { speaker: '', text: '걸음을 멈춘다.' },
            { speaker: '', text: '귀를 기울인다.' },
            { speaker: '', text: '서울의 밤은 — 너무 조용하다. 그래서 작은 소리도 크게 들린다.' },
            { speaker: '하은', text: '...들었어?', condition: { flag: 'ch2_haeun_in' } },
            { speaker: '서연', text: '저쪽이에요.', condition: { flag: 'ch2_seoyeon_in' } },
            { speaker: '', text: '소리가 다시 들린다. 골목 안쪽 — 어딘가에서.' },
        ],
        choices: [
            { text: '"야옹..." 같은 소리다',
              setFlags: { sound_cat: true },
              stats: { wisdom: 1 },
              next: 'ch2_follow_cat' },
            { text: '"낑낑..." 같은 소리다',
              setFlags: { sound_dog: true },
              stats: { love: 1 },
              next: 'ch2_follow_dog' },
        ]
    },

    // ==========================================
    //  2막-A: 닷냥이 루트
    // ==========================================

    ch2_follow_cat: {
        image: 'assets/images/ch2_meeting_cat.png',
        imageEffect: 'ken-burns',
        characters: {
            center: { char: 'datnyangi' },
        },
        dialogue: [
            { speaker: '', text: '소리를 따라간다.' },
            { speaker: '', text: '골목 끝 — 작은 화단 옆.' },
            { speaker: '', text: '계단 밑에 — 무언가가 웅크리고 있다.' },
            { speaker: '', text: '눈이 — 빛난다. 어둠 속에서 두 개의 작은 빛.' },
            { speaker: '', text: '...고양이다.' },
            { speaker: '', text: '검은 털, 흰 발끝 네 개. 마치 양말을 신은 것처럼.' },
            { speaker: '하은', text: '(작은 소리로) ...어떡해, 너무 귀여워.', condition: { flag: 'ch2_haeun_in' } },
            { speaker: '서연', text: '...다친 데는 없는 것 같은데요.', condition: { flag: 'ch2_seoyeon_in' } },
        ],
        next: 'ch2_cat_approach'
    },

    ch2_cat_approach: {
        image: 'assets/images/ch2_meeting_cat.png',
        // 어둑시니 있으면 갈등 분기, 없으면 일반 만남
        nextIf: [
            { condition: { flag: 'ch2_eoduksini_in' }, next: 'ch2_cat_eoduksini_conflict' },
        ],
        next: 'ch2_cat_meet'
    },

    // --- 어둑시니 vs 닷냥이 갈등 ---
    ch2_cat_eoduksini_conflict: {
        image: 'assets/images/ch2_meeting_cat.png',
        dialogue: [
            { speaker: '', text: '한 발 다가간다.' },
            { speaker: '', text: '그 순간 — 고양이의 등이 활처럼 휜다.' },
            { speaker: '', text: '털이 곤두선다. 동공이 가늘어진다.' },
            { speaker: '', text: '하지만 — 고양이는 나를 보고 있는 게 아니다.' },
            { speaker: '', text: '내 뒤를 — 정확히는, 내 그림자를 보고 있다.' },
            { speaker: '어둑시니', text: '...아.', emotion: 'sad' },
            { speaker: '어둑시니', text: '저 아이는 — 나를 알아본다.', emotion: 'sad' },
            { speaker: '어둑시니', text: '이 모습이 어떤 형태든, 나는 결국 어둠이야.' },
            { speaker: '하은', text: '...(말이 없다.)', condition: { flag: 'ch2_haeun_in' } },
            { speaker: '서연', text: '저... 어떻게 해요?', condition: { flag: 'ch2_seoyeon_in' }, emotion: 'worried' },
            { speaker: '', text: '고양이는 도망가지 않는다. 다만 — 한 발짝도 다가오지 않는다.' },
            { speaker: '', text: '어둑시니가 옅어진다. 떠날 준비를 하고 있다.' },
        ],
        choices: [
            { text: '"잠깐, 어둑시니. 내가 잠깐 비켜 있을게."',
              setFlags: { cat_route_eoduksini_stays: true },
              affinity: { eoduksini: 5 },
              stats: { love: 2, wisdom: 1 },
              next: 'ch2_cat_eoduksini_stays' },
            { text: '"어둑시니, 네가 떠나는 게 — 맞을지도 몰라."',
              setFlags: { cat_route_eoduksini_leaves: true, eoduksini_left: true },
              stats: { courage: 2 },
              next: 'ch2_cat_eoduksini_leaves' },
            { text: '"우리, 둘 다 함께 갈 방법은 없을까?"',
              setFlags: { cat_route_try_both: true },
              stats: { love: 2, wisdom: 1 },
              next: 'ch2_cat_try_both' },
        ]
    },

    // 어둑시니가 잠시 비켜줌 → 닷냥이 안고 다시 합류 (긴장 유지)
    ch2_cat_eoduksini_stays: {
        image: 'assets/images/ch2_meeting_cat.png',
        dialogue: [
            { speaker: '어둑시니', text: '...너는 이상한 사람이야.', emotion: 'smile' },
            { speaker: '어둑시니', text: '나를, 어둠을 — 비켜 달라고 부탁하는 사람이 어디 있어.' },
            { speaker: '', text: '어둑시니의 윤곽이 더 옅어진다. 골목 끝, 가로등 빛이 닿지 않는 곳으로 물러난다.' },
            { speaker: '', text: '거리는 멀어졌다. 하지만 — 사라지지는 않았다.' },
            { speaker: '', text: '고양이의 등이 천천히 내려앉는다. 털이 누워간다.' },
        ],
        next: 'ch2_cat_meet'
    },

    // 어둑시니 떠남 (탈퇴)
    ch2_cat_eoduksini_leaves: {
        image: 'assets/images/ch2_meeting_cat.png',
        dialogue: [
            { speaker: '어둑시니', text: '...그래.', emotion: 'sad' },
            { speaker: '어둑시니', text: '다행이야. 네 입에서 그 말을 들어서.', emotion: 'sad' },
            { speaker: '어둑시니', text: '나는 — 어둠이고, 그 아이는 빛 가까이에 있어. 같이 있을 수가 없어.' },
            { speaker: '', text: '어둑시니가 옅어진다. 어둠 속으로 — 어둠이 돌아간다.' },
            { speaker: '어둑시니', text: '...언젠가 또 만나.', emotion: 'sad' },
            { speaker: '', text: '그리고 — 그것은 사라졌다.' },
            { speaker: '', text: '뒤에 남은 건, 골목의 어둠과 — 작은 고양이 한 마리.' },
            { speaker: '하은', text: '(말없이 나의 손을 잡는다.)', condition: { flag: 'ch2_haeun_in' } },
            { speaker: '서연', text: '...괜찮으세요?', condition: { flag: 'ch2_seoyeon_in' }, emotion: 'worried' },
            { speaker: '', text: '괜찮지 않다.' },
            { speaker: '', text: '하지만 — 지금은 이 작은 생명을 외면할 수 없다.' },
        ],
        removeCompanion: 'eoduksini',
        next: 'ch2_cat_meet'
    },

    // 둘 다 데려가려고 시도 → 어둑시니가 스스로 거리 두기로 결정
    ch2_cat_try_both: {
        image: 'assets/images/ch2_meeting_cat.png',
        dialogue: [
            { speaker: '어둑시니', text: '...방법이라.', emotion: 'serious' },
            { speaker: '어둑시니', text: '있어. 한 가지.' },
            { speaker: '어둑시니', text: '내가 너의 그림자 안에서 — 깊이, 더 깊이 가라앉으면 돼.' },
            { speaker: '어둑시니', text: '대신 — 한동안 너는 나를 못 부른다.' },
            { speaker: '', text: '어둑시니가 천천히 윤곽을 잃는다. 내 그림자 속으로, 더 깊이.' },
            { speaker: '', text: '그것의 무게가 발끝에서 느껴진다. 사라진 게 아니다 — 다만, 잠들었다.' },
            { speaker: '', text: '고양이의 시선이 풀린다. 이제 그것은 — 나만 보고 있다.' },
        ],
        setFlags: { eoduksini_dormant: true },
        next: 'ch2_cat_meet'
    },

    // --- 닷냥이 만남 (공통) ---
    ch2_cat_meet: {
        image: 'assets/images/ch2_meeting_cat.png',
        dialogue: [
            { speaker: '', text: '천천히 무릎을 꿇는다.' },
            { speaker: '', text: '손을 내민다. 강요하지 않은 채로 — 그저 거기에.' },
            { speaker: '', text: '고양이가 내 손가락 끝을 — 본다. 한참을.' },
            { speaker: '', text: '그리고, 한 발.' },
            { speaker: '', text: '두 발.' },
            { speaker: '', text: '내 손등에 코끝이 닿는다. 차갑다. 살아있다.' },
            { speaker: '하은', text: '(속삭이며) ...받아주는 거야.', condition: { flag: 'ch2_haeun_in' }, emotion: 'smile' },
            { speaker: '서연', text: '저, 저도 만져봐도 돼요...?', condition: { flag: 'ch2_seoyeon_in' }, emotion: 'smile' },
        ],
        next: 'ch2_cat_naming'
    },

    // --- 작명 ---
    ch2_cat_naming: {
        image: 'assets/images/ch2_meeting_cat.png',
        characters: {
            right: { char: 'datnyangi', emotion: 'neutral' },
        },
        dialogue: [
            { speaker: '', text: '고양이는 이제 내 무릎 위에 있다.' },
            { speaker: '', text: '몸이 작다. 따뜻하다. 골골거리는 소리가 — 작은 엔진처럼 떨린다.' },
            { speaker: '', text: '...너, 너를 뭐라고 부를까?' },
            { speaker: '', text: '입 밖으로 그 말이 나온 순간, 머릿속에 — 어디선가 들어본 것 같은 이름이 떠오른다.' },
            { speaker: '', text: '왜인지는 모르겠다. 다만, 이 아이에게 어울린다.' },
            { speaker: '', text: '"...닷냥이. 어때, 닷냥이?"' },
            { speaker: '닷냥이', text: '냐옹.', emotion: 'smile' },
            { speaker: '', text: '한 번. 짧고, 명확하게.' },
            { speaker: '', text: '마치 — 동의하듯이.' },
            { speaker: '', text: '"그래. 너는 오늘부터 닷냥이야."' },
            { speaker: '하은', text: '...닷냥이? 어디서 그 이름이 나온 거야?', condition: { flag: 'ch2_haeun_in' }, emotion: 'smile' },
            { speaker: '', text: '모르겠다. 그냥 — 떠올랐다.', condition: { flag: 'ch2_haeun_in' } },
            { speaker: '서연', text: '닷냥이... 좋은 이름이에요.', condition: { flag: 'ch2_seoyeon_in' }, emotion: 'smile' },
        ],
        addCompanion: {
            id: 'datnyangi',
            name: '닷냥이',
            portrait: 'assets/images/portraits/datnyangi_neutral.png',
            affinity: 5,
        },
        setFlags: { has_datnyangi: true },
        next: 'ch2_cat_companions_react'
    },

    // 동료별 닷냥이 반응 (호감도/스탯)
    ch2_cat_companions_react: {
        image: 'assets/images/ch2_meeting_cat.png',
        characters: {
            left:  { char: 'haeun',     condition: { flag: 'ch2_haeun_in' } },
            right: { char: 'datnyangi' },
        },
        dialogue: [
            { speaker: '하은', text: '닷냥아, 잠깐만 와볼래?', condition: { flag: 'ch2_haeun_in' }, emotion: 'smile' },
            { speaker: '', text: '닷냥이가 하은의 손등에 머리를 비빈다.', condition: { flag: 'ch2_haeun_in' } },
            { speaker: '하은', text: '(웃으며) 아, 진짜 — 살 거 같다.', condition: { flag: 'ch2_haeun_in' }, emotion: 'smile' },
            { speaker: '서연', text: '...(조심스럽게 손을 내민다.)', condition: { flag: 'ch2_seoyeon_in' } },
            { speaker: '', text: '닷냥이가 서연의 손가락을 핥는다. 까칠한 혀.', condition: { flag: 'ch2_seoyeon_in' } },
            { speaker: '서연', text: '...따뜻해.', condition: { flag: 'ch2_seoyeon_in' }, emotion: 'smile' },
            { speaker: '', text: '닷냥이가 갑자기 — 무릎에서 내려와, 골목 안쪽으로 한 걸음 걷는다.' },
            { speaker: '닷냥이', text: '냐.', emotion: 'serious' },
            { speaker: '', text: '뒤를 돌아본다. 내 눈을 본다.' },
            { speaker: '', text: '그리고 — 다시 한 걸음.' },
            { speaker: '', text: '따라오라는 듯이.' },
        ],
        affinity: {
            haeun: 3,
            student: 2,
        },
        // 호감도는 동료가 있을 때만 적용되도록 엔진이 자동 처리
        next: 'ch2_safe_house_arrive'
    },

    // ==========================================
    //  2막-B: 황덕구 루트
    // ==========================================

    ch2_follow_dog: {
        image: 'assets/images/ch2_meeting_dog.png',
        imageEffect: 'ken-burns',
        characters: {
            center: { char: 'hwangdokgu' },
        },
        dialogue: [
            { speaker: '', text: '소리를 따라간다.' },
            { speaker: '', text: '골목을 두 번 꺾는다. 좁은 길.' },
            { speaker: '', text: '낡은 빌라 주차장 — 비어있는 차들 사이.' },
            { speaker: '', text: '한 차의 뒷바퀴 옆에 — 작은 그림자가 있다.' },
            { speaker: '', text: '...강아지다.' },
            { speaker: '', text: '누런 털, 짧은 다리. 한쪽 귀가 살짝 접혀 있다.' },
            { speaker: '', text: '낑낑거리고 있다. 다친 것 같지는 않다 — 다만, 외로운 거다.' },
            { speaker: '하은', text: '(낮은 목소리로) ...어떡해.', condition: { flag: 'ch2_haeun_in' }, emotion: 'sad' },
            { speaker: '서연', text: '얼마나 혼자 있었던 걸까요...', condition: { flag: 'ch2_seoyeon_in' }, emotion: 'sad' },
        ],
        next: 'ch2_dog_approach'
    },

    ch2_dog_approach: {
        image: 'assets/images/ch2_meeting_dog.png',
        nextIf: [
            { condition: { flag: 'ch2_eoduksini_in' }, next: 'ch2_dog_eoduksini_friction' },
        ],
        next: 'ch2_dog_meet'
    },

    // 어둑시니 vs 황덕구: 도망 안 감, 으르렁대는 정도. 호감도 변화.
    ch2_dog_eoduksini_friction: {
        image: 'assets/images/ch2_meeting_dog.png',
        dialogue: [
            { speaker: '', text: '한 발 다가간다.' },
            { speaker: '', text: '강아지가 — 갑자기 고개를 든다.' },
            { speaker: '', text: '낑낑이 멈춘다. 낮은 으르렁이 시작된다.' },
            { speaker: '', text: '하지만 — 강아지는 도망가지 않는다.' },
            { speaker: '', text: '오히려 한 걸음, 내 앞으로 나선다.' },
            { speaker: '', text: '내 그림자를 — 노려본다.' },
            { speaker: '어둑시니', text: '...이 아이는 무서워하지 않아.', emotion: 'surprised' },
            { speaker: '어둑시니', text: '도망치는 게 아니라 — 맞서고 있어.' },
            { speaker: '어둑시니', text: '...재밌는 아이네.' },
            { speaker: '', text: '어둑시니가 한 걸음 물러난다. 강아지의 으르렁이 — 천천히 가라앉는다.' },
            { speaker: '', text: '서로를 노려본 채로, 둘은 — 거리를 유지한다.' },
        ],
        affinity: { eoduksini: -2 },
        setFlags: { dog_route_eoduksini_tense: true },
        next: 'ch2_dog_meet'
    },

    // --- 황덕구 만남 ---
    ch2_dog_meet: {
        image: 'assets/images/ch2_meeting_dog.png',
        dialogue: [
            { speaker: '', text: '천천히 무릎을 꿇는다.' },
            { speaker: '', text: '손등을 내민다. 손바닥이 아니라 — 등을. 위협이 아니라는 신호.' },
            { speaker: '', text: '강아지가 코를 킁킁댄다. 한참을.' },
            { speaker: '', text: '그리고 — 꼬리를 한 번, 살짝.' },
            { speaker: '', text: '두 번, 더 크게.' },
            { speaker: '', text: '곧, 머리를 내 손에 부빈다.' },
            { speaker: '하은', text: '...아, 진짜 — 진짜 좋아.', condition: { flag: 'ch2_haeun_in' }, emotion: 'smile' },
            { speaker: '서연', text: '강아지... 좋아하시는구나.', condition: { flag: 'ch2_seoyeon_in' }, emotion: 'smile' },
        ],
        next: 'ch2_dog_naming'
    },

    ch2_dog_naming: {
        image: 'assets/images/ch2_meeting_dog.png',
        characters: {
            right: { char: 'hwangdokgu', emotion: 'neutral' },
        },
        dialogue: [
            { speaker: '', text: '강아지는 이제 내 다리에 몸 전체를 기대고 있다.' },
            { speaker: '', text: '꼬리가 쉴 틈 없이 움직인다.' },
            { speaker: '', text: '"...너, 너를 뭐라고 부를까?"' },
            { speaker: '', text: '입 밖으로 그 말이 나온 순간, 어디선가 — 익숙한 이름이 머릿속에 떠오른다.' },
            { speaker: '', text: '왜 그 이름인지는 모르겠다. 다만 — 어울린다.' },
            { speaker: '', text: '"...황덕구. 어때, 황덕구?"' },
            { speaker: '황덕구', text: '컹!', emotion: 'smile' },
            { speaker: '', text: '한 번. 크고, 또렷하게.' },
            { speaker: '', text: '마치 — 부르기를 기다렸던 것처럼.' },
            { speaker: '', text: '"그래. 너는 오늘부터 황덕구야."' },
            { speaker: '하은', text: '황덕구...? 그 이름이 어디서 나온 거야?', condition: { flag: 'ch2_haeun_in' }, emotion: 'smile' },
            { speaker: '', text: '모르겠다. 그냥 — 떠올랐다.', condition: { flag: 'ch2_haeun_in' } },
            { speaker: '서연', text: '황덕구... 듬직한 이름이에요.', condition: { flag: 'ch2_seoyeon_in' }, emotion: 'smile' },
        ],
        addCompanion: {
            id: 'hwangdokgu',
            name: '황덕구',
            portrait: 'assets/images/portraits/hwangdokgu_neutral.png',
            affinity: 5,
        },
        setFlags: { has_hwangdokgu: true },
        next: 'ch2_dog_companions_react'
    },

    ch2_dog_companions_react: {
        image: 'assets/images/ch2_meeting_dog.png',
        characters: {
            left:  { char: 'haeun',      condition: { flag: 'ch2_haeun_in' } },
            right: { char: 'hwangdokgu' },
        },
        dialogue: [
            { speaker: '하은', text: '덕구야! 이리 와!', condition: { flag: 'ch2_haeun_in' }, emotion: 'smile' },
            { speaker: '', text: '황덕구가 하은에게 달려간다. 꼬리가 미친 듯이 흔들린다.', condition: { flag: 'ch2_haeun_in' } },
            { speaker: '하은', text: '(쪼그려 앉아 안으며) 아 — 따뜻해, 살아있어, 진짜로 살아있어.', condition: { flag: 'ch2_haeun_in' }, emotion: 'smile' },
            { speaker: '서연', text: '안녕, 황덕구야...', condition: { flag: 'ch2_seoyeon_in' }, emotion: 'smile' },
            { speaker: '', text: '황덕구가 서연의 무릎에 머리를 부빈다.', condition: { flag: 'ch2_seoyeon_in' } },
            { speaker: '', text: '황덕구가 갑자기 — 짖는다. 골목 안쪽을 향해.' },
            { speaker: '황덕구', text: '컹! 컹!', emotion: 'serious' },
            { speaker: '', text: '한 번 더 짖고, 그쪽으로 한 걸음.' },
            { speaker: '', text: '뒤를 돌아본다. 내 눈을 본다.' },
            { speaker: '', text: '따라오라는 듯이.' },
        ],
        affinity: {
            haeun: 5,
            student: 3,
        },
        next: 'ch2_safe_house_arrive'
    },

    // ==========================================
    //  3막: 안전한 방
    // ==========================================

    ch2_safe_house_arrive: {
        image: 'assets/images/ch2_safe_room.png',
        imageEffect: 'ken-burns',
        dialogue: [
            { speaker: '', text: '동물의 뒤를 따른다.' },
            { speaker: '', text: '골목을 한 번, 두 번 — 빌라 입구.' },
            { speaker: '', text: '문이 — 살짝 열려 있다.' },
            { speaker: '', text: '안으로 들어선다.' },
            { speaker: '', text: '복도, 계단, 그리고 — 2층 끝의 한 집.' },
            { speaker: '', text: '문은 잠겨 있지 않다.' },
            { speaker: '', text: '거실은 정돈되어 있다. 누군가의 흔적 — 따뜻한 흔적.' },
            { speaker: '', text: '식탁 위에 반쯤 마신 차. 소파 위에 접힌 담요. 텔레비전은 꺼져 있다.' },
            { speaker: '', text: '하지만, 사람은 — 없다.' },
            { speaker: '하은', text: '...여기, 누가 살던 집인가 봐.', condition: { flag: 'ch2_haeun_in' }, emotion: 'sad' },
            { speaker: '서연', text: '아직, 따뜻해요. 머그컵.', condition: { flag: 'ch2_seoyeon_in' }, emotion: 'surprised' },
            { speaker: '닷냥이', text: '냐옹.', condition: { flag: 'has_datnyangi' } },
            { speaker: '황덕구', text: '컹.', condition: { flag: 'has_hwangdokgu' } },
            { speaker: '', text: '동물이 거실 한가운데에 자리를 잡는다.' },
            { speaker: '', text: '여기는 — 안전하다. 동물이 그렇게 말하고 있다.' },
        ],
        next: 'ch2_rest_choice'
    },

    // --- 휴식 분기: 동물과의 상호작용 (호감도/스탯) ---
    ch2_rest_choice: {
        image: 'assets/images/ch2_safe_room.png',
        dialogue: [
            { speaker: '', text: '몸이 무겁다.' },
            { speaker: '', text: '하루 동안 — 너무 많은 것을 봤고, 너무 많이 걸었다.' },
            { speaker: '', text: '여기서, 잠깐만 — 쉬어가자.' },
        ],
        choices: [
            { text: '쓰다듬어 본다 (천천히, 부드럽게)',
              setFlags: { rest_pet: true },
              stats: { love: 2 },
              affinity: { datnyangi: 5, hwangdokgu: 5 },
              next: 'ch2_rest_pet' },
            { text: '관찰한다 (왜 이 집으로 데려왔을까?)',
              setFlags: { rest_observe: true },
              stats: { wisdom: 3 },
              affinity: { datnyangi: 1, hwangdokgu: 1 },
              next: 'ch2_rest_observe' },
            { text: '함께 잠든다 (잠깐만, 아주 잠깐만)',
              setFlags: { rest_sleep: true },
              stats: { calm: 2, courage: 1 },
              affinity: { datnyangi: 3, hwangdokgu: 3 },
              next: 'ch2_rest_sleep' },
        ]
    },

    ch2_rest_pet: {
        image: 'assets/images/ch2_safe_room.png',
        dialogue: [
            { speaker: '', text: '손을 천천히 — 등을 따라 쓰다듬는다.' },
            { speaker: '', text: '털의 결을 거스르지 않게.' },
            { speaker: '', text: '동물의 호흡이 깊어진다. 눈이 가늘어진다.' },
            { speaker: '닷냥이', text: '...구르릉, 구르릉.', condition: { flag: 'has_datnyangi' }, emotion: 'smile' },
            { speaker: '황덕구', text: '...(눈을 감는다.)', condition: { flag: 'has_hwangdokgu' }, emotion: 'smile' },
            { speaker: '하은', text: '나도 — 한 번만 만져봐도 돼?', condition: { flag: 'ch2_haeun_in' }, emotion: 'smile' },
            { speaker: '', text: '(고개를 끄덕인다.)', condition: { flag: 'ch2_haeun_in' } },
            { speaker: '', text: '잠깐 — 이 순간만큼은, 모든 게 괜찮은 척할 수 있다.' },
        ],
        next: 'ch2_clue_setup'
    },

    ch2_rest_observe: {
        image: 'assets/images/ch2_safe_room.png',
        dialogue: [
            { speaker: '', text: '...왜 이 집이지?' },
            { speaker: '', text: '동물이 우리를 끌어들인 데에는 — 이유가 있을 것이다.' },
            { speaker: '', text: '거실을 살핀다.' },
            { speaker: '', text: '벽의 사진들. 가족 사진. 부부와 — 어린 아이 하나.' },
            { speaker: '', text: '식탁의 컵. 두 개. 마주 앉아 있던 자리.' },
            { speaker: '', text: '소파 위 쿠션. 한쪽이 더 눌려 있다. 누군가가 자주 앉던 자리.' },
            { speaker: '', text: '...집의 흔적이다. 사람의 흔적이 아니라 — 사람들이 함께 만든 흔적.' },
            { speaker: '서연', text: '...뭐 보고 계세요?', condition: { flag: 'ch2_seoyeon_in' }, emotion: 'worried' },
            { speaker: '', text: '아무것도. 그냥 — 사람들이 살았다는 거.', condition: { flag: 'ch2_seoyeon_in' } },
        ],
        setFlags: { found_family_traces: true },
        next: 'ch2_clue_setup'
    },

    ch2_rest_sleep: {
        image: 'assets/images/ch2_safe_room.png',
        dialogue: [
            { speaker: '', text: '소파에 — 그대로 주저앉는다.' },
            { speaker: '', text: '동물이 내 옆으로 올라온다. 따뜻하다.' },
            { speaker: '', text: '눈을 감는다.' },
            { speaker: '하은', text: '...(작은 목소리로) 잠깐만 자, 내가 깨워줄게.', condition: { flag: 'ch2_haeun_in' }, emotion: 'smile' },
            { speaker: '', text: '얼마나 잤는지 모르겠다. 5분, 어쩌면 30분.' },
            { speaker: '', text: '꿈은 꾸지 않았다.' },
            { speaker: '', text: '눈을 떴을 때, 동물이 — 나를 보고 있다.' },
            { speaker: '닷냥이', text: '냐옹.', condition: { flag: 'has_datnyangi' } },
            { speaker: '황덕구', text: '컹.', condition: { flag: 'has_hwangdokgu' } },
            { speaker: '', text: '"...일어날 시간이라는 거지."' },
        ],
        next: 'ch2_clue_setup'
    },

    // ==========================================
    //  4막: 단서 — 다음 장 떡밥
    // ==========================================

    ch2_clue_setup: {
        image: 'assets/images/ch2_safe_room.png',
        dialogue: [
            { speaker: '', text: '몸이 조금 가벼워졌다.' },
            { speaker: '', text: '동물이 — 갑자기 한쪽 방향으로 걸어간다.' },
            { speaker: '', text: '복도 끝, 닫힌 문 하나.' },
            { speaker: '닷냥이', text: '냐.', condition: { flag: 'has_datnyangi' }, emotion: 'serious' },
            { speaker: '황덕구', text: '컹! 컹!', condition: { flag: 'has_hwangdokgu' }, emotion: 'serious' },
            { speaker: '', text: '저 안에 — 무언가가 있다.' },
        ],
        choices: [
            { text: '문을 연다',
              stats: { courage: 2 },
              next: 'ch2_clue_open' },
            { text: '문틈으로 먼저 본다',
              stats: { wisdom: 2 },
              setFlags: { peeked_first: true },
              next: 'ch2_clue_open' },
        ]
    },

    ch2_clue_open: {
        image: 'assets/images/ch2_clue.png',
        imageEffect: 'ken-burns',
        dialogue: [
            { speaker: '', text: '문을 연다.' },
            { speaker: '', text: '작은 방. 책상. 의자. 벽에 붙은 — 종이들.' },
            { speaker: '', text: '아주 많은 종이들.' },
            { speaker: '', text: '신문 기사. 사진. 손글씨 메모.' },
            { speaker: '', text: '실로 — 서로 연결되어 있다. 색깔별로.' },
            { speaker: '', text: '한가운데에는, 빨간 글씨로 적힌 — 단어 하나.' },
            { speaker: '', text: '"이층(裏層)."' },
            { speaker: '', text: '...그 단어다.' },
            { speaker: '하은', text: '뭐야, 이거...', condition: { flag: 'ch2_haeun_in' }, emotion: 'surprised' },
            { speaker: '서연', text: '...이거, 누군가가 — 이미 알고 있었던 거예요.', condition: { flag: 'ch2_seoyeon_in' }, emotion: 'surprised' },
            { speaker: '', text: '책상 위에, 펼쳐진 노트 한 권.' },
            { speaker: '', text: '마지막 페이지의 마지막 줄, 잉크가 아직 마르지 않은 글씨.' },
            { speaker: '', text: '"— 그들은 사라진 것이 아니다. 다만, 옮겨졌다."' },
            { speaker: '', text: '...' },
            { speaker: '', text: '"오늘 자정, 종로. 거기로 가야 한다."' },
            { speaker: '', text: '...자정. 종로.' },
            { speaker: '', text: '글씨가 끝나는 자리에, 펜이 떨어져 있다.' },
            { speaker: '', text: '집어 든다. 아직 — 따뜻하다.' },
        ],
        setFlags: { found_clue_jongno: true },
        next: 'ch2_aftermath'
    },

    // ==========================================
    //  결말: 제2장 끝
    // ==========================================

    ch2_aftermath: {
        image: 'assets/images/ch2_dawn_alley.png',
        bgm: 'ch2',
        dialogue: [
            { speaker: '', text: '집을 나선다.' },
            { speaker: '', text: '하늘이 — 더 옅어졌다. 군청에서 회색으로.' },
            { speaker: '', text: '발끝에 동물의 무게가 있다. 살아있는 무게.' },
            // 결과 분기별 내면 독백
            { speaker: '닷냥이', text: '냐옹.', condition: { flag: 'has_datnyangi' }, emotion: 'smile' },
            { speaker: '황덕구', text: '컹.', condition: { flag: 'has_hwangdokgu' }, emotion: 'smile' },
            { speaker: '', text: '어둑시니는 — 더 이상 그림자에 없다.', condition: { flag: 'eoduksini_left' } },
            { speaker: '', text: '그 빈자리가 — 무겁다.', condition: { flag: 'eoduksini_left' } },
            { speaker: '', text: '어둑시니는 그림자 깊은 곳에서 — 잠들었다.', condition: { flag: 'eoduksini_dormant' } },
            { speaker: '', text: '언젠가 다시 부를 수 있을 것이다. 다만, 지금은 아니다.', condition: { flag: 'eoduksini_dormant' } },
            // 단서 인지
            { speaker: '', text: '주머니 속, 펜 한 자루.' },
            { speaker: '', text: '"이층." "옮겨졌다." "자정." "종로."' },
            { speaker: '', text: '단서들이 — 머릿속에서, 천천히 — 모이고 있다.' },
            // 동행 마무리
            { speaker: '하은', text: '...어디로 가?', condition: { flag: 'ch2_haeun_in' } },
            { speaker: '', text: '"종로로. 자정 전에."', condition: { flag: 'ch2_haeun_in' } },
            { speaker: '하은', text: '...그래.', condition: { flag: 'ch2_haeun_in' } },
            { speaker: '서연', text: '저도, 같이 갈게요.', condition: { flag: 'ch2_seoyeon_in' }, emotion: 'serious' },
            // 솔로
            { speaker: '', text: '대답해줄 사람은 없다. 다만 — 발끝의 무게가 있다.', condition: { noneOfFlags: ['ch2_haeun_in', 'ch2_seoyeon_in', 'ch2_eoduksini_in'] } },
            // 끝
            { speaker: '', text: '발걸음을 옮긴다.' },
            { speaker: '', text: '제2장 — 끝.' },
        ],
        next: 'ch2_final'
    },

    ch2_final: {
        image: 'assets/images/ch2_dawn_alley.png',
        showFlowchart: 'ch2',
        dialogue: [],
    },
};

// ==========================================
//  제2장 플로우차트 정의
// ==========================================

const FLOWCHARTS_CH2 = {
    ch2: {
        episode: '제2장',
        title: '작은 인연',
        tree: [
            { type: 'story', text: '새벽의 주택가' },
            { type: 'choice', label: '작은 소리', sceneId: 'ch2_sound_appears',
              branches: [
                  { text: '"야옹..."', children: [
                      { type: 'story', text: '닷냥이 발견' },
                      { type: 'choice', label: '어둑시니와의 갈등', sceneId: 'ch2_cat_eoduksini_conflict',
                        branches: [
                            { text: '어둑시니가 비켜준다' },
                            { text: '어둑시니를 보낸다' },
                            { text: '함께 갈 방법' },
                        ]
                      },
                      { type: 'story', text: '닷냥이 합류' },
                  ]},
                  { text: '"낑낑..."', children: [
                      { type: 'story', text: '황덕구 발견' },
                      { type: 'story', text: '황덕구 합류' },
                  ]},
              ]
            },
            { type: 'story', text: '안전한 방에 도착' },
            { type: 'choice', label: '잠깐의 휴식', sceneId: 'ch2_rest_choice',
              branches: [
                  { text: '쓰다듬는다' },
                  { text: '관찰한다' },
                  { text: '함께 잠든다' },
              ]
            },
            { type: 'choice', label: '닫힌 문', sceneId: 'ch2_clue_setup',
              branches: [
                  { text: '문을 연다' },
                  { text: '먼저 살핀다' },
              ]
            },
            { type: 'story', text: '"이층" — 단서 발견' },
            { type: 'story', text: '"종로로. 자정 전에."' },
            { type: 'story', text: '제2장 — 끝' },
        ],
    },
};
