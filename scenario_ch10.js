/**
 * 이층 : 서울, 0시 — 제10장: 네 마리의 짐승
 * 사신(四神) 모으기 — 현무(하은), 청룡, 백호, 주작
 * 합류 수에 따라 이무기 격파 가능성 결정
 */

const SCENES_CH10 = {

    // ==========================================
    //  0막: 새벽 — 출발
    // ==========================================

    ch10_intro: {
        chapter: { number: '제10장', title: '네 마리의 짐승' },
        image: 'assets/images/ch10_seoul_dawn.png',
        imageEffect: 'ken-burns',
        bgm: 'ch10',
        dialogue: [
            { speaker: '', text: '새벽이 — 시작됐다.' },
            { speaker: '', text: '하늘이, 어제보다 — 조금 더 옅다.' },
            { speaker: '', text: '바람에는 — 비의 향기.' },
            { speaker: '', text: '오늘 안으로, 사신을 — 모아야 한다.' },
            { speaker: '', text: '네 마리. 또는 — 두 마리만이라도.' },
        ],
        next: 'ch10_status'
    },

    ch10_status: {
        image: 'assets/images/ch10_seoul_dawn.png',
        setFlagsIf: [
            { condition: { flag: 'ch9_haeun_in' },     flags: { ch10_haeun_in: true } },
            { condition: { flag: 'ch9_seoyeon_in' },   flags: { ch10_seoyeon_in: true } },
            { condition: { flag: 'ch9_eoduksini_in' }, flags: { ch10_eoduksini_in: true } },
            { condition: { flag: 'ch9_pet_cat' },      flags: { ch10_pet_cat: true } },
            { condition: { flag: 'ch9_pet_dog' },      flags: { ch10_pet_dog: true } },
            { condition: { flag: 'gumiho_companion' }, flags: { ch10_gumiho_in: true } },
        ],
        next: 'ch10_haeun_awaken_setup'
    },

    // ==========================================
    //  1막: 현무의 — 첫 — 깨어남 (하은 자동 각성)
    // ==========================================

    ch10_haeun_awaken_setup: {
        image: 'assets/images/ch10_seoul_dawn.png',
        // 하은이 동행 중이면 자동 각성, 아니면 스킵
        nextIf: [
            { condition: { flag: 'ch10_haeun_in' }, next: 'ch10_haeun_awaken' },
        ],
        next: 'ch10_route_choice'
    },

    ch10_haeun_awaken: {
        image: 'assets/images/ch10_haeun_water.png',
        imageEffect: 'ken-burns',
        bgm: 'ch10_solemn',
        characters: {
            center: { char: 'haeun', emotion: 'surprised' },
        },
        dialogue: [
            { speaker: '', text: '한강.' },
            { speaker: '', text: '도사가, 우리를 — 한강 자락으로, 데려왔다.' },
            { speaker: '', text: '강물이, 옅은 새벽 빛에 — 천천히, 흐른다.' },
            { speaker: '전우치', text: '...하은 씨.', emotion: 'smile' },
            { speaker: '전우치', text: '한강 — 가, 이 자리에 — 발을, 담가 — 보시겠어요.' },
            { speaker: '하은', text: '...물에요?', emotion: 'worried' },
            { speaker: '전우치', text: '네. 천천히, 한 발씩이요.', emotion: 'smile' },
            { speaker: '', text: '하은이가 — 신을, 벗는다.' },
            { speaker: '', text: '망설임. 그리고, 한 발.' },
            { speaker: '', text: '발끝이, 강물에 — 닿는 — 순간.' },
            { speaker: '', text: '...!' },
            { speaker: '', text: '강물이, 한 박자 — 멈춘다.' },
            { speaker: '', text: '주변의 — 작은 — 동심원이, 거대해지며, 밖으로 — 퍼져나간다.' },
        ],
        next: 'ch10_haeun_become_hyeonmu'
    },

    ch10_haeun_become_hyeonmu: {
        image: 'assets/images/ch10_haeun_awakening.png',
        characters: {
            center: { char: 'hyeonmu', emotion: 'serious' },
        },
        dialogue: [
            { speaker: '하은', text: '...아.', emotion: 'surprised' },
            { speaker: '하은', text: '...뭔가, 안에서 — 일어났어. 깊은 — 차가운 — 무언가가.', emotion: 'serious' },
            { speaker: '', text: '하은의 — 등 뒤로, 거대한 — 거북의 그림자가, 서서히 — 떠오른다.' },
            { speaker: '', text: '검은 등딱지. 휘감긴 뱀.' },
            { speaker: '', text: '...현무.' },
            { speaker: '', text: '하은이, 천천히 — 강물에서, 발을 — 뺀다.' },
            { speaker: '', text: '눈이 — 다르다. 아까보다, 아주 — 조금, 더 — 깊다.' },
            { speaker: '하은', text: '...내가, 진짜로 — 거기, 있었어.', emotion: 'serious' },
            { speaker: '하은', text: '아니, 거기에 — 내가, 있어. 지금도.' },
            { speaker: '하은', text: '...현무. 그게 — 내 안의, 이름이야.' },
            { speaker: '전우치', text: '...어서 오세요. (씩 웃으며) 천 년 — 만에, 첫 — 영물의 — 깨어남이에요.', emotion: 'smile' },
        ],
        setFlags: { hyeonmu_awakened: true, sashin_count_1: true },
        next: 'ch10_pet_react_water'
    },

    ch10_pet_react_water: {
        image: 'assets/images/ch10_haeun_awakening.png',
        nextIf: [
            { condition: { flag: 'ch10_pet_cat' },  next: 'ch10_pet_cat_react' },
            { condition: { flag: 'ch10_pet_dog' },  next: 'ch10_pet_dog_react' },
        ],
        next: 'ch10_route_choice'
    },

    ch10_pet_cat_react: {
        image: 'assets/images/ch10_haeun_awakening.png',
        dialogue: [
            { speaker: '', text: '닷냥이가 — 하은 앞에 — 와서, 머리를 — 한 번, 부빈다.' },
            { speaker: '닷냥이', text: '냐옹.', emotion: 'smile' },
            { speaker: '전우치', text: '...아, 그랬구나. (씩 웃으며)', emotion: 'smile' },
            { speaker: '전우치', text: '닷냥이는 — 사령(使靈)이었네요. 영물이 — 보낸, 안내자요.' },
            { speaker: '전우치', text: '하은 씨를 — 처음부터, 알아본 — 거예요.' },
            { speaker: '하은', text: '...어머. 너, 그래서 — 처음부터, 나한테, 그렇게 — 살갑게 — 군 거니?', emotion: 'smile' },
            { speaker: '닷냥이', text: '냐옹.', emotion: 'smile' },
        ],
        setFlags: { datnyangi_revealed_saryeong: true },
        next: 'ch10_route_choice'
    },

    ch10_pet_dog_react: {
        image: 'assets/images/ch10_haeun_awakening.png',
        dialogue: [
            { speaker: '', text: '황덕구가 — 하은의 발치에, 천천히 — 다가간다.' },
            { speaker: '', text: '꼬리를, 한 번 — 흔든다.' },
            { speaker: '', text: '그리고는 — 작게, 짖는다.' },
            { speaker: '황덕구', text: '컹.', emotion: 'smile' },
            { speaker: '전우치', text: '...아, 황덕구도 — 사령(使靈)이었네요. (씩 웃으며)', emotion: 'smile' },
            { speaker: '전우치', text: '영물이 — 보낸, 동물의 — 화신이요.' },
            { speaker: '전우치', text: '처음부터 — 하은 씨를, 지키려 — 했던 거예요.' },
            { speaker: '하은', text: '...정말? 진짜로?', emotion: 'smile' },
            { speaker: '황덕구', text: '컹! 컹!', emotion: 'smile' },
        ],
        setFlags: { hwangdokgu_revealed_saryeong: true },
        next: 'ch10_route_choice'
    },

    // ==========================================
    //  2막: 어디부터 — 갈 것인가
    // ==========================================

    ch10_route_choice: {
        image: 'assets/images/ch10_seoul_dawn.png',
        characters: {
            left:  { char: 'jeonwoochi' },
        },
        dialogue: [
            { speaker: '', text: '도사가 — 지도를 — 펼친다.' },
            { speaker: '전우치', text: '동·서·남 — 셋이, 남았어요.', emotion: 'serious' },
            { speaker: '전우치', text: '시간이 — 부족해요. 모두 — 만나려면, 새벽까지 — 다섯 — 시간이에요.' },
            { speaker: '전우치', text: '어디부터 — 갈까요?', emotion: 'smile' },
        ],
        choices: [
            { text: '동 — 청룡 (강남 카페, 학자)',
              setFlags: { ch10_route_east_first: true },
              next: 'ch10_cheongryong_arrive' },
            { text: '서 — 백호 (한강 어귀 검도장)',
              setFlags: { ch10_route_west_first: true },
              next: 'ch10_baekho_arrive' },
            { text: '남 — 주작 (명동 무당집)',
              setFlags: { ch10_route_south_first: true },
              next: 'ch10_jujak_arrive' },
        ]
    },

    // ==========================================
    //  청룡 (동) — 강남 카페
    // ==========================================

    ch10_cheongryong_arrive: {
        image: 'assets/images/ch10_gangnam_cafe.png',
        imageEffect: 'ken-burns',
        bgm: 'ch10',
        dialogue: [
            { speaker: '', text: '강남, 한 골목 안.' },
            { speaker: '', text: '24시간 카페. 사람이 사라졌는데도, 불은 — 여전히, 켜져 있다.' },
            { speaker: '', text: '문을 — 연다.' },
            { speaker: '', text: '안에, 한 사람이 — 책을, 읽고 있다.' },
            { speaker: '', text: '20대 후반. 안경. 검은 — 긴 — 머리.' },
            { speaker: '', text: '얼굴은, 깨끗하고, 수려하다.' },
        ],
        next: 'ch10_cheongryong_meet'
    },

    ch10_cheongryong_meet: {
        image: 'assets/images/ch10_gangnam_cafe.png',
        characters: {
            center: { char: 'cheongryong', emotion: 'neutral' },
        },
        dialogue: [
            { speaker: '청룡', text: '...오셨군요.', emotion: 'smile' },
            { speaker: '청룡', text: '들어오세요. 차를 — 끓여드릴게요.' },
            { speaker: '', text: '...우리를, 알고 있다.' },
            { speaker: '청룡', text: '저는, 며칠 전부터 — 이상한 꿈을 꿨어요.', emotion: 'serious' },
            { speaker: '청룡', text: '제가, 푸른 — 비늘을 — 가진 — 짐승이라는, 꿈.' },
            { speaker: '청룡', text: '하지만, 깨고 나면 — 잊어버리죠.' },
            { speaker: '청룡', text: '그래도, 한 가지만은 — 남았어요.' },
            { speaker: '청룡', text: '"오늘, 한 사람이 와. 그를 — 시험해라."' },
            { speaker: '청룡', text: '...어떻게 — 시험할지는, 모르겠지만요.' },
        ],
        next: 'ch10_cheongryong_test'
    },

    ch10_cheongryong_test: {
        image: 'assets/images/ch10_gangnam_cafe.png',
        characters: { center: { char: 'cheongryong' } },
        dialogue: [
            { speaker: '청룡', text: '한 가지만, 묻겠어요.', emotion: 'serious' },
            { speaker: '청룡', text: '이무기는 — 왜, 천 년 전에 — 승천하지 못했나요?' },
        ],
        choices: [
            { text: '"...정(正)한 마음이, 부족했기 때문이야. 한이, 너무 깊었어."',
              setFlags: { ch10_cheongryong_correct: true },
              stats: { wisdom: 1 },
              next: 'ch10_cheongryong_pass' },
            { text: '"...전우치 도사가, 막았기 때문이야."',
              setFlags: { ch10_cheongryong_partial: true },
              next: 'ch10_cheongryong_partial' },
            { text: '"...모르겠어. 솔직히."',
              setFlags: { ch10_cheongryong_humble: true },
              stats: { love: 1 },
              next: 'ch10_cheongryong_humble' },
        ]
    },

    ch10_cheongryong_pass: {
        image: 'assets/images/ch10_gangnam_cafe.png',
        characters: { center: { char: 'cheongryong', emotion: 'smile' } },
        dialogue: [
            { speaker: '청룡', text: '...정확합니다.', emotion: 'smile' },
            { speaker: '청룡', text: '도사가 막은 것은 — 결과예요. 원인은 — 한 — 그 자체.' },
            { speaker: '청룡', text: '용은, 정한 마음을 — 필요로 합니다.' },
            { speaker: '청룡', text: '이무기는, 그것이 — 부족했어요.' },
            { speaker: '', text: '청룡이 — 일어선다.' },
            { speaker: '', text: '책상 위, 펼친 책 — 한 페이지에서, 푸른 — 빛이, 한 줄기 — 새어나온다.' },
            { speaker: '청룡', text: '...깨어나겠습니다.', emotion: 'serious' },
            { speaker: '청룡', text: '청룡이라는 이름이, 이제야 — 맞는 옷처럼, 느껴지네요.' },
        ],
        addCompanion: {
            id: 'cheongryong',
            name: '청룡',
            portrait: 'assets/images/portraits/cheongryong_neutral.png',
            affinity: 8,
        },
        setFlags: { cheongryong_joined: true, sashin_count_2: true },
        next: 'ch10_route_continue'
    },

    ch10_cheongryong_partial: {
        image: 'assets/images/ch10_gangnam_cafe.png',
        characters: { center: { char: 'cheongryong', emotion: 'serious' } },
        dialogue: [
            { speaker: '청룡', text: '...반은, 맞아요.', emotion: 'serious' },
            { speaker: '청룡', text: '도사가 — 막은 것은, 사실입니다.' },
            { speaker: '청룡', text: '하지만 — 가장 — 깊은 이유는, 그것이 — 정한 마음이, 부족했기 때문이지요.' },
            { speaker: '청룡', text: '...아쉬워요.' },
            { speaker: '청룡', text: '오늘은 — 함께 가기 어려울 것 같아요.' },
            { speaker: '청룡', text: '하지만, 마음의 한 자락은 — 보내드릴게요.' },
            { speaker: '', text: '...청룡은, 동료가 되지 않는다.' },
            { speaker: '', text: '하지만, 내일 — 의식 자리에서, 멀리서 — 도와줄 거란 — 약속을, 했다.' },
        ],
        setFlags: { cheongryong_distant_aid: true },
        next: 'ch10_route_continue'
    },

    ch10_cheongryong_humble: {
        image: 'assets/images/ch10_gangnam_cafe.png',
        characters: { center: { char: 'cheongryong', emotion: 'smile' } },
        dialogue: [
            { speaker: '청룡', text: '...겸손하시네요.', emotion: 'smile' },
            { speaker: '청룡', text: '모른다고 — 답하는 것은, 사실 — 가장 — 어려운 — 답이에요.' },
            { speaker: '청룡', text: '대부분의 사람은, 모르면서도 — 안다고 — 말하니까요.' },
            { speaker: '청룡', text: '...그 마음이, 청(淸)한 자의 — 자세입니다.' },
            { speaker: '청룡', text: '함께, 가지요.', emotion: 'serious' },
        ],
        addCompanion: {
            id: 'cheongryong',
            name: '청룡',
            portrait: 'assets/images/portraits/cheongryong_neutral.png',
            affinity: 6,
        },
        setFlags: { cheongryong_joined: true, sashin_count_2: true },
        next: 'ch10_route_continue'
    },

    // ==========================================
    //  백호 (서) — 한강 검도장
    // ==========================================

    ch10_baekho_arrive: {
        image: 'assets/images/ch10_dojang.png',
        imageEffect: 'ken-burns',
        dialogue: [
            { speaker: '', text: '한강 — 어귀.' },
            { speaker: '', text: '낡은 — 검도장.' },
            { speaker: '', text: '문이, 열려 있다. 안에서 — 검을, 들어 — 정렬하는 — 소리.' },
        ],
        next: 'ch10_baekho_meet'
    },

    ch10_baekho_meet: {
        image: 'assets/images/ch10_dojang.png',
        characters: { center: { char: 'baekho', emotion: 'serious' } },
        dialogue: [
            { speaker: '', text: '한 사람이 — 정중앙에, 서 있다.' },
            { speaker: '', text: '키가 크다. 검도복.' },
            { speaker: '', text: '얼굴은, 날카롭고 — 단단하다. 눈빛이, 호랑이의 — 그것.' },
            { speaker: '백호', text: '...한 검을 — 받아라.', emotion: 'serious' },
            { speaker: '백호', text: '오늘, 누군가가 와서 — 나를 — 시험할 거라고 했지.' },
            { speaker: '백호', text: '말로 — 묻지 않겠다. 검으로, 답해라.' },
        ],
        next: 'ch10_baekho_test'
    },

    ch10_baekho_test: {
        image: 'assets/images/ch10_dojang.png',
        characters: { center: { char: 'baekho' } },
        dialogue: [
            { speaker: '', text: '나무 검 — 한 자루가, 던져진다.' },
            { speaker: '', text: '받는다.' },
            { speaker: '', text: '무겁다. 한 — 사람의 무게만큼.' },
            { speaker: '백호', text: '준비됐나? 한 합. 그 한 합으로 — 답한다.', emotion: 'serious' },
        ],
        choices: [
            { text: '정면 — 검을 — 든다',
              setFlags: { ch10_baekho_face: true },
              stats: { courage: 2 },
              requires: { courage: 8 },
              next: 'ch10_baekho_pass' },
            { text: '검을 — 내려놓고, 빈손으로 마주한다',
              setFlags: { ch10_baekho_unarmed: true },
              stats: { courage: 3, wisdom: 2 },
              requires: { courage: 8 },
              next: 'ch10_baekho_unarmed' },
            { text: '"...나는, 검사가 — 아니야. 함께 — 갈 다른 길은, 없을까?"',
              setFlags: { ch10_baekho_words: true },
              stats: { love: 1 },
              next: 'ch10_baekho_words' },
        ]
    },

    ch10_baekho_pass: {
        image: 'assets/images/ch10_dojang_combat.png',
        characters: { center: { char: 'baekho', emotion: 'serious' } },
        dialogue: [
            { speaker: '', text: '검을 든다.' },
            { speaker: '', text: '한 발 — 앞으로.' },
            { speaker: '', text: '백호가 — 미소짓는다.' },
            { speaker: '', text: '두 검이, 거의 — 동시에, 부딪힌다.' },
            { speaker: '', text: '한 합.' },
            { speaker: '', text: '백호의 검이, 한 푼 — 빠르다.' },
            { speaker: '', text: '하지만 — 내 검이, 그의 검을 — 뒤에서, 살짝 — 잡았다.' },
            { speaker: '', text: '두 사람이, 동시에 — 멈춘다.' },
            { speaker: '백호', text: '...훌륭하다.', emotion: 'smile' },
            { speaker: '백호', text: '내 검을 — 잡은 자는, 천 년에 — 처음이다.' },
            { speaker: '백호', text: '함께, 가자.' },
        ],
        addCompanion: {
            id: 'baekho',
            name: '백호',
            portrait: 'assets/images/portraits/baekho_neutral.png',
            affinity: 7,
        },
        setFlags: { baekho_joined: true, sashin_count_3: true },
        next: 'ch10_route_continue'
    },

    ch10_baekho_unarmed: {
        image: 'assets/images/ch10_dojang.png',
        characters: { center: { char: 'baekho', emotion: 'surprised' } },
        dialogue: [
            { speaker: '', text: '검을, 내려놓는다.' },
            { speaker: '', text: '두 손 — 비운 채로, 백호 앞에 — 선다.' },
            { speaker: '백호', text: '...!', emotion: 'surprised' },
            { speaker: '백호', text: '검을, 내려놓는다라.' },
            { speaker: '백호', text: '그건 — 패배가 아니라, 가장 — 큰 — 의지의 — 표현이다.' },
            { speaker: '백호', text: '...비무장의, 사람을 — 베면, 그건 — 검사가 — 아니지.' },
            { speaker: '', text: '백호가, 검을 — 천천히 — 내린다.' },
            { speaker: '백호', text: '함께 — 가자.', emotion: 'smile' },
            { speaker: '백호', text: '네 의지가 — 내 검보다 — 단단하다.' },
        ],
        addCompanion: {
            id: 'baekho',
            name: '백호',
            portrait: 'assets/images/portraits/baekho_neutral.png',
            affinity: 9,
        },
        setFlags: { baekho_joined: true, sashin_count_3: true },
        next: 'ch10_route_continue'
    },

    ch10_baekho_words: {
        image: 'assets/images/ch10_dojang.png',
        characters: { center: { char: 'baekho', emotion: 'serious' } },
        dialogue: [
            { speaker: '백호', text: '...말로, 답하시는군.', emotion: 'serious' },
            { speaker: '백호', text: '오해는, 마라. 검은, 단순한 — 무력이 아니다.' },
            { speaker: '백호', text: '하지만 — 오늘, 자네는 — 검을, 받지 못한다.' },
            { speaker: '백호', text: '...언젠가, 한 — 합 — 받아주마. 그날에, 다시 만나자.' },
            { speaker: '', text: '백호는 — 동료가 — 되지 않는다.' },
            { speaker: '', text: '하지만 — 내일의 자리에서, 멀리서 — 한 줄기, 검의 기를 — 보내준다는 — 약속.' },
        ],
        setFlags: { baekho_distant_aid: true },
        next: 'ch10_route_continue'
    },

    // ==========================================
    //  주작 (남) — 명동 무당집
    // ==========================================

    ch10_jujak_arrive: {
        image: 'assets/images/ch10_mudang.png',
        imageEffect: 'ken-burns',
        dialogue: [
            { speaker: '', text: '명동.' },
            { speaker: '', text: '비좁은 골목 안, 한 — 무당집.' },
            { speaker: '', text: '낡은 — 깃발이, 바람에 — 흔들린다.' },
            { speaker: '', text: '들어선다.' },
        ],
        next: 'ch10_jujak_meet'
    },

    ch10_jujak_meet: {
        image: 'assets/images/ch10_mudang.png',
        characters: { center: { char: 'jujak', emotion: 'sad' } },
        dialogue: [
            { speaker: '', text: '안.' },
            { speaker: '', text: '한 — 여인이, 정좌해 있다.' },
            { speaker: '', text: '한복. 머리는 단정하다.' },
            { speaker: '', text: '얼굴은 — 작고, 슬프다. 처음 보는 사람의 — 슬픔까지, 거두는 — 그런 표정.' },
            { speaker: '주작', text: '...어서 오세요.', emotion: 'sad' },
            { speaker: '주작', text: '오시는 분이 있는 줄, 알았어요.' },
            { speaker: '주작', text: '꿈에서 — 빨간 — 새가, 창공을 — 가르며 — 부르더라고요.' },
            { speaker: '주작', text: '저는, 그게 — 저인 — 줄, 몰랐는데.', emotion: 'sad' },
        ],
        next: 'ch10_jujak_test'
    },

    ch10_jujak_test: {
        image: 'assets/images/ch10_mudang.png',
        characters: { center: { char: 'jujak' } },
        dialogue: [
            { speaker: '주작', text: '저는, 한 가지만 — 보고 싶어요.', emotion: 'serious' },
            { speaker: '주작', text: '제 — 손을, 잡아 주세요.' },
            { speaker: '주작', text: '그러면 — 당신의 마음이, 저에게 — 흘러옵니다.' },
            { speaker: '주작', text: '제가 — 따라갈 — 분인지, 그것으로, 알 수 있어요.' },
        ],
        choices: [
            { text: '망설이지 않고 — 손을, 잡는다',
              setFlags: { ch10_jujak_open: true },
              stats: { love: 4 },
              next: 'ch10_jujak_open' },
            { text: '"...내 마음을, 그대로 보여줘도 돼요?"',
              setFlags: { ch10_jujak_consent: true },
              stats: { love: 1, wisdom: 1 },
              next: 'ch10_jujak_consent' },
            { text: '...주저한다. 보여주고 싶지 않은 — 마음이, 있다',
              setFlags: { ch10_jujak_hesitant: true },
              stats: { courage: 1 },
              next: 'ch10_jujak_hesitant' },
        ]
    },

    ch10_jujak_open: {
        image: 'assets/images/ch10_mudang.png',
        characters: { center: { char: 'jujak', emotion: 'smile' } },
        dialogue: [
            { speaker: '', text: '손을, 내민다.' },
            { speaker: '', text: '주작의 손은 — 따뜻하다. 그리고, 가볍다.' },
            { speaker: '', text: '내 — 안의, 마음이 — 한 자락씩, 그녀에게로 — 흘러간다.' },
            { speaker: '', text: '두려움. 의심. 그리고 — 동료들에 대한, 깊은 — 연.' },
            { speaker: '주작', text: '...아.', emotion: 'sad' },
            { speaker: '주작', text: '당신의 마음은 — 두려움이 — 큰데도, 그것을 — 동료에 대한 — 사랑으로 — 덮고 있어요.' },
            { speaker: '주작', text: '그것이, 가장 — 사람다운 — 마음이에요.' },
            { speaker: '주작', text: '...함께 가요.', emotion: 'smile' },
            { speaker: '주작', text: '제가, 그 사랑이 — 다 — 타지 않게, 정화해드릴게요.' },
        ],
        addCompanion: {
            id: 'jujak',
            name: '주작',
            portrait: 'assets/images/portraits/jujak_neutral.png',
            affinity: 10,
        },
        setFlags: { jujak_joined: true, sashin_count_4: true },
        next: 'ch10_route_continue'
    },

    ch10_jujak_consent: {
        image: 'assets/images/ch10_mudang.png',
        characters: { center: { char: 'jujak', emotion: 'smile' } },
        dialogue: [
            { speaker: '주작', text: '...허락을, 구하시는군요.', emotion: 'smile' },
            { speaker: '주작', text: '그것이 — 정중함이지요.' },
            { speaker: '주작', text: '저, 받아드릴게요. 보여주세요.' },
            { speaker: '', text: '손을 — 잡는다.' },
            { speaker: '', text: '주작의 — 따뜻함이, 손바닥을 — 통해, 들어온다.' },
            { speaker: '주작', text: '...당신은, 정중한 — 사람이에요.', emotion: 'smile' },
            { speaker: '주작', text: '함께 가지요.' },
        ],
        addCompanion: {
            id: 'jujak',
            name: '주작',
            portrait: 'assets/images/portraits/jujak_neutral.png',
            affinity: 8,
        },
        setFlags: { jujak_joined: true, sashin_count_4: true },
        next: 'ch10_route_continue'
    },

    ch10_jujak_hesitant: {
        image: 'assets/images/ch10_mudang.png',
        characters: { center: { char: 'jujak', emotion: 'sad' } },
        dialogue: [
            { speaker: '주작', text: '...주저하시는군요.', emotion: 'sad' },
            { speaker: '주작', text: '그것도, 답이에요. 사람의 마음에는 — 닫혀 있어야 — 할 — 자리도, 있으니까요.' },
            { speaker: '주작', text: '오늘은, 그 — 닫힘을, 존중할게요.' },
            { speaker: '주작', text: '함께 가지는, 못해도 — 멀리서, 노래는 — 부쳐드릴게요.' },
            { speaker: '주작', text: '내일 — 자정에, 한강 어귀에서.' },
        ],
        setFlags: { jujak_distant_aid: true },
        next: 'ch10_route_continue'
    },

    // ==========================================
    //  3막: 다음 — 사신, 그리고 마무리
    // ==========================================

    ch10_route_continue: {
        image: 'assets/images/ch10_seoul_dawn.png',
        // 안 가본 곳으로 이동 — 단순화: 모두 한 번씩 방문하는 라우팅
        nextIf: [
            { condition: { allFlags: ['ch10_route_east_first', 'cheongryong_joined'] },     next: 'ch10_route_east_done_1' },
            { condition: { allFlags: ['ch10_route_east_first', 'cheongryong_distant_aid'] }, next: 'ch10_route_east_done_1' },
            { condition: { allFlags: ['ch10_route_west_first', 'baekho_joined'] },           next: 'ch10_route_west_done_1' },
            { condition: { allFlags: ['ch10_route_west_first', 'baekho_distant_aid'] },      next: 'ch10_route_west_done_1' },
            { condition: { allFlags: ['ch10_route_south_first', 'jujak_joined'] },           next: 'ch10_route_south_done_1' },
            { condition: { allFlags: ['ch10_route_south_first', 'jujak_distant_aid'] },      next: 'ch10_route_south_done_1' },
        ],
        next: 'ch10_summary'
    },

    // 단순 라우팅: 첫 방문 후 두 곳 더 (자동으로 모두 방문)
    ch10_route_east_done_1: {
        image: 'assets/images/ch10_seoul_dawn.png',
        dialogue: [
            { speaker: '', text: '...강남에서, 한 — 일을 — 마쳤다.' },
            { speaker: '', text: '이제, 한강 — 검도장으로.' },
        ],
        next: 'ch10_baekho_arrive_2'
    },

    ch10_baekho_arrive_2: {
        image: 'assets/images/ch10_dojang.png',
        next: 'ch10_baekho_meet'
    },

    ch10_route_west_done_1: {
        image: 'assets/images/ch10_seoul_dawn.png',
        dialogue: [
            { speaker: '', text: '...한강에서, 한 — 일을 — 마쳤다.' },
            { speaker: '', text: '이제, 명동 — 무당집으로.' },
        ],
        next: 'ch10_jujak_arrive_2'
    },

    ch10_jujak_arrive_2: {
        image: 'assets/images/ch10_mudang.png',
        next: 'ch10_jujak_meet'
    },

    ch10_route_south_done_1: {
        image: 'assets/images/ch10_seoul_dawn.png',
        dialogue: [
            { speaker: '', text: '...명동에서, 한 — 일을 — 마쳤다.' },
            { speaker: '', text: '이제, 강남 — 카페로.' },
        ],
        next: 'ch10_cheongryong_arrive_2'
    },

    ch10_cheongryong_arrive_2: {
        image: 'assets/images/ch10_gangnam_cafe.png',
        next: 'ch10_cheongryong_meet'
    },

    // ==========================================
    //  4막: 사신 모두 — 또는 일부, 모은 후
    // ==========================================

    ch10_summary: {
        image: 'assets/images/ch10_seoul_noon.png',
        bgm: 'ch10',
        dialogue: [
            { speaker: '', text: '낮이 — 끝나간다.' },
            { speaker: '', text: '동·서·남·북. 네 곳을, 다 — 돌았다.' },
            { speaker: '', text: '결과를 — 정리한다.' },
            // 합류 수에 따른 다른 문장
            { speaker: '', text: '...현무 — 하은 (각성).', condition: { flag: 'hyeonmu_awakened' } },
            { speaker: '', text: '...청룡 — 함께 간다.', condition: { flag: 'cheongryong_joined' } },
            { speaker: '', text: '...청룡 — 멀리서, 도와준다.', condition: { flag: 'cheongryong_distant_aid' } },
            { speaker: '', text: '...백호 — 함께 간다.', condition: { flag: 'baekho_joined' } },
            { speaker: '', text: '...백호 — 멀리서, 도와준다.', condition: { flag: 'baekho_distant_aid' } },
            { speaker: '', text: '...주작 — 함께 간다.', condition: { flag: 'jujak_joined' } },
            { speaker: '', text: '...주작 — 멀리서, 도와준다.', condition: { flag: 'jujak_distant_aid' } },
        ],
        next: 'ch10_count_check'
    },

    ch10_count_check: {
        image: 'assets/images/ch10_seoul_noon.png',
        // 합류 수 분기 (sashin_count_*)
        nextIf: [
            { condition: { flag: 'sashin_count_4' }, next: 'ch10_count_full' },
            { condition: { flag: 'sashin_count_3' }, next: 'ch10_count_three' },
            { condition: { flag: 'sashin_count_2' }, next: 'ch10_count_two' },
        ],
        next: 'ch10_count_one'
    },

    ch10_count_full: {
        image: 'assets/images/ch10_seoul_noon.png',
        dialogue: [
            { speaker: '전우치', text: '...완벽한데요. (씩 웃으며)', emotion: 'smile' },
            { speaker: '전우치', text: '네 마리 — 다, 모셨네요. 천 년 — 만의, 사신 — 회의예요.' },
            { speaker: '전우치', text: '이무기 — 그 친구, 막을 수 — 있어요. 단, 끊을 수 — 있어요.' },
        ],
        setFlags: { sashin_full_count: true, can_defeat_imugi: true },
        next: 'ch10_aftermath'
    },

    ch10_count_three: {
        image: 'assets/images/ch10_seoul_noon.png',
        dialogue: [
            { speaker: '전우치', text: '...세 분, 모셨네요.', emotion: 'smile' },
            { speaker: '전우치', text: '이무기 — 막기엔, 충분해요.' },
            { speaker: '전우치', text: '다만 — 진정한, 의식의 — 정화는 — 살짝, 어려울 수도 — 있어요.' },
        ],
        setFlags: { can_defeat_imugi: true },
        next: 'ch10_aftermath'
    },

    ch10_count_two: {
        image: 'assets/images/ch10_seoul_noon.png',
        dialogue: [
            { speaker: '전우치', text: '...두 분이세요.', emotion: 'serious' },
            { speaker: '전우치', text: '최소한의 — 조건은, 채웠어요.' },
            { speaker: '전우치', text: '이긴다는 — 보장은, 적은데. 시도할 — 가치는, 있어요.' },
        ],
        setFlags: { can_defeat_imugi: true },
        next: 'ch10_aftermath'
    },

    ch10_count_one: {
        image: 'assets/images/ch10_seoul_noon.png',
        dialogue: [
            { speaker: '전우치', text: '...아.', emotion: 'sad' },
            { speaker: '전우치', text: '한 분 — 만이시네요.' },
            { speaker: '전우치', text: '이무기를 — 격파하는 건, 어려워요.' },
            { speaker: '전우치', text: '다른 길을 — 찾아야겠어요. 봉인이라거나, 거래라거나요.' },
            { speaker: '전우치', text: '...근데 — 그건, 의식 자리에서 — 정해야 — 할 — 거예요.' },
        ],
        setFlags: { sashin_too_few: true },
        next: 'ch10_aftermath'
    },

    ch10_aftermath: {
        image: 'assets/images/ch10_seoul_dusk.png',
        bgm: 'ch10',
        dialogue: [
            { speaker: '', text: '낮의 끝.' },
            { speaker: '', text: '하늘이, 다시 — 어두워지기 시작한다.' },
            { speaker: '', text: '사신을 — 모은 후의 — 무게가, 어깨에, 얹혀 — 있다.' },
            { speaker: '전우치', text: '...강철이가, 우리를 — 막을 거예요.', emotion: 'serious' },
            { speaker: '전우치', text: '한강 — 어귀로, 가는 길에. 이무기 — 부하 중에 — 가장, 흉포한 — 친구예요.' },
            { speaker: '', text: '강철이.' },
            { speaker: '', text: '그슨대가, 경고한 — 그 이름.' },
            { speaker: '', text: '제10장 — 끝.' },
        ],
        next: 'ch10_final'
    },

    ch10_final: {
        image: 'assets/images/ch10_seoul_dusk.png',
        showFlowchart: 'ch10',
        dialogue: [],
        next: 'ch11_intro',
    },
};

// ==========================================
//  제10장 플로우차트
// ==========================================

const FLOWCHARTS_CH10 = {
    ch10: {
        episode: '제10장',
        title: '네 마리의 짐승',
        tree: [
            { type: 'story', text: '한강 — 하은의 현무 각성' },
            { type: 'choice', label: '청룡의 시험', sceneId: 'ch10_cheongryong_test',
              branches: [
                  { text: '정한 마음 (지혜)' },
                  { text: '도사가 막았다' },
                  { text: '모르겠다 (겸손)' },
              ]
            },
            { type: 'choice', label: '백호의 시험', sceneId: 'ch10_baekho_test',
              branches: [
                  { text: '정면 검 (용기)' },
                  { text: '비무장 (의지)' },
                  { text: '말로 답함' },
              ]
            },
            { type: 'choice', label: '주작의 시험', sceneId: 'ch10_jujak_test',
              branches: [
                  { text: '망설임 없이 손' },
                  { text: '허락을 구함' },
                  { text: '주저' },
              ]
            },
            { type: 'story', text: '사신 합류 수 결정 — 이무기 격파 가능 여부' },
            { type: 'story', text: '제10장 — 끝' },
        ],
    },
};
