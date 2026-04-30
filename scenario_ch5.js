/**
 * 이층 : 서울, 0시 — 제5장: 푸른 옷의 도사
 * 이무기 vs 전우치 — 일행 구원, 은신처로
 */

const SCENES_CH5 = {

    // ==========================================
    //  0막: 시간이 멈춘 듯한 — 그 순간
    // ==========================================

    ch5_intro: {
        chapter: { number: '제5장', title: '푸른 옷의 도사' },
        image: 'assets/images/ch5_jeonwoochi_back.png',
        imageEffect: 'ken-burns',
        bgm: 'ch5',
        dialogue: [
            { speaker: '', text: '시간이 — 멈춘 것 같다.' },
            { speaker: '', text: '아니, 정확히는 — 둘 사이에서만, 멈췄다.' },
            { speaker: '', text: '나는 여전히 공중에 떠 있다.' },
            { speaker: '', text: '하지만 — 이무기의 손이, 더는 다가오지 않는다.' },
        ],
        next: 'ch5_status'
    },

    ch5_status: {
        image: 'assets/images/ch5_jeonwoochi_back.png',
        setFlagsIf: [
            { condition: { flag: 'ch4_haeun_in' },     flags: { ch5_haeun_in: true } },
            { condition: { flag: 'ch4_seoyeon_in' },   flags: { ch5_seoyeon_in: true } },
            { condition: { flag: 'ch4_eoduksini_in' }, flags: { ch5_eoduksini_in: true } },
            { condition: { flag: 'ch4_pet_cat' },      flags: { ch5_pet_cat: true } },
            { condition: { flag: 'ch4_pet_dog' },      flags: { ch5_pet_dog: true } },
        ],
        next: 'ch5_facing'
    },

    ch5_facing: {
        image: 'assets/images/ch5_face_off.png',
        characters: {
            left:   { char: 'jeonwoochi', emotion: 'serious' },
            right:  { char: 'imugi', emotion: 'serious' },
        },
        dialogue: [
            { speaker: '', text: '두 사람이 — 마주 본다.' },
            { speaker: '', text: '한쪽은, 푸른 도복.' },
            { speaker: '', text: '다른 한쪽은, 검은 정장.' },
            { speaker: '', text: '풍경이 — 서로 어울리지 않는다.' },
            { speaker: '', text: '하지만, 둘은 — 서로를, 너무, 잘, 알고 있다.' },
            { speaker: '이무기', text: '...돌아가신, 줄 알았어요.', emotion: 'smile' },
            { speaker: '이무기', text: '천 년 전 — 그 자리에서, 분명히 — 끝낸, 줄 — 알았는데요.' },
            { speaker: '전우치', text: '...아, 몸은요. (어깨를 으쓱) 그건, 진짜로 — 끝났었죠.', emotion: 'smile' },
            { speaker: '전우치', text: '근데 — 도술이라는 게, 꼭 — 몸에만 — 깃드는 게, 아니거든요.' },
            { speaker: '전우치', text: '1할쯤은, 슬쩍 — 빼서 — 어딘가에 — 둬봤어요. 보험으로요.' },
            { speaker: '전우치', text: '...오늘 같은 — 날을, 위해서요.' },
            { speaker: '이무기', text: '...후후.', emotion: 'smile' },
            { speaker: '이무기', text: '예감하셨나요. 도사 — 그분.' },
            { speaker: '전우치', text: '...예감이 아니라, 추론이에요. (씩 웃으며)' },
            { speaker: '전우치', text: '용 — 못 된 뱀의 한은, 사라지지 — 않으니까요.', emotion: 'serious' },
        ],
        next: 'ch5_release'
    },

    ch5_release: {
        image: 'assets/images/ch5_face_off.png',
        characters: {
            left:   { char: 'jeonwoochi' },
            right:  { char: 'imugi' },
        },
        dialogue: [
            { speaker: '전우치', text: '자, 손에 — 매달고 — 계신 그 분. 내려놓으시지요.' },
            { speaker: '이무기', text: '...왜 — 그래야, 하나요.', emotion: 'smile' },
            { speaker: '전우치', text: '그 — 분은, 당신 — 손이 — 닿을, 분이 아니에요.' },
            { speaker: '전우치', text: '그건 — 당신도, 잘 — 아실 텐데요.' },
            { speaker: '', text: '이무기의 표정이 — 미세하게 일그러진다.' },
            { speaker: '이무기', text: '...설마.', emotion: 'surprised' },
            { speaker: '이무기', text: '...아니. 그럴 — 리가, 없을 텐데요.', emotion: 'serious' },
            { speaker: '전우치', text: '...직접 — 확인해 보세요. 손에서, 푸른 빛이 — 났을 거예요.', emotion: 'smile' },
            { speaker: '이무기', text: '...!', emotion: 'surprised' },
            { speaker: '', text: '이무기의 손이 — 풀린다.' },
            { speaker: '', text: '나는 — 천천히, 바닥에 내려선다.' },
            { speaker: '이무기', text: '...어떻게, 이런 일이...', emotion: 'serious' },
            { speaker: '이무기', text: '...아니, 좋아요. 오히려 — 흥미로워졌네요.', emotion: 'smile' },
        ],
        next: 'ch5_imugi_warns'
    },

    ch5_imugi_warns: {
        image: 'assets/images/ch5_face_off.png',
        characters: {
            left:   { char: 'jeonwoochi' },
            right:  { char: 'imugi', emotion: 'serious' },
        },
        dialogue: [
            { speaker: '이무기', text: '...오늘은, 봐드릴게요. 도사 — 그분.', emotion: 'smile' },
            { speaker: '이무기', text: '하지만 — 저의 승천까지, 며칠 — 남지 않았어요.' },
            { speaker: '이무기', text: '서울이 — 다, 익었거든요.' },
            { speaker: '이무기', text: '그날엔 — 천 명의 도사가, 오셔도 — 막으실 수, 없을 거예요.' },
            { speaker: '전우치', text: '...글쎄요. (씩 웃으며) 해보면 — 알겠지요.', emotion: 'smile' },
            { speaker: '이무기', text: '...재미있는 — 게임이, 시작됐네요.', emotion: 'smile' },
            { speaker: '', text: '이무기가 — 한 번 더 손을 까딱한다.' },
            { speaker: '', text: '카페의 — 무너진 벽이, 바람을 일으킨다.' },
            { speaker: '', text: '그 바람 속에서, 그가 — 사라진다.' },
            { speaker: '', text: '연기처럼, 흔적조차 — 남기지 않고.' },
            { speaker: '하은', text: '...!', condition: { flag: 'ch5_haeun_in' }, emotion: 'surprised' },
            { speaker: '서연', text: '사라졌어요...', condition: { flag: 'ch5_seoyeon_in' }, emotion: 'surprised' },
        ],
        next: 'ch5_jeonwoochi_turns'
    },

    // ==========================================
    //  1막: 푸른 옷의 도사 — 정면
    // ==========================================

    ch5_jeonwoochi_turns: {
        image: 'assets/images/ch5_jeonwoochi_face.png',
        characters: {
            center: { char: 'jeonwoochi', emotion: 'neutral' },
        },
        dialogue: [
            { speaker: '', text: '도사가 — 천천히, 돌아선다.' },
            { speaker: '', text: '얼굴이, 처음으로 — 보인다.' },
            { speaker: '', text: '젊다.' },
            { speaker: '', text: '아니, 정확히 말하면 — 나이를 가늠할 수 없다.' },
            { speaker: '', text: '20대 같기도, 천 살 같기도 — 한.' },
            { speaker: '', text: '머리는 길고, 묶어 올렸다. 눈은 — 깊다.' },
            { speaker: '', text: '도복은, 푸른색이지만 — 닳았다. 오래 입은 옷처럼.' },
            { speaker: '전우치', text: '...괜찮으세요?', emotion: 'smile' },
            { speaker: '전우치', text: '꽤, 많이 — 굴리셨던 — 것 같은데.' },
            { speaker: '', text: '몸을 살펴본다.' },
            { speaker: '', text: '...상처가 없다.' },
            { speaker: '', text: '있어야 할 곳에, 상처가 없다.' },
            { speaker: '', text: '머리를 — 세게 흔든다. 어지럽다.' },
            { speaker: '하은', text: '...누구세요? 아저씨...?', condition: { flag: 'ch5_haeun_in' }, emotion: 'worried' },
            { speaker: '전우치', text: '아저씨라기엔, 좀 미안하네요.', emotion: 'smile' },
            { speaker: '전우치', text: '저는 — 나이가, 좀, 많아서요.' },
        ],
        next: 'ch5_intro_self'
    },

    ch5_intro_self: {
        image: 'assets/images/ch5_jeonwoochi_face.png',
        characters: {
            center: { char: 'jeonwoochi' },
        },
        dialogue: [
            { speaker: '전우치', text: '제 이름은, 전우치라고 해요.', emotion: 'smile' },
            { speaker: '전우치', text: '...들어보신 분, 계시려나요? (씩 웃으며)' },
            { speaker: '서연', text: '...전우치라면, 책에 나오는 그 도사?', condition: { flag: 'ch5_seoyeon_in' }, emotion: 'surprised' },
            { speaker: '서연', text: '소설 속 인물 아니에요?', condition: { flag: 'ch5_seoyeon_in' } },
            { speaker: '전우치', text: '그 소설은 — 몇 백 년 — 후에, 후세 사람들이 — 써주신 거고요.', emotion: 'smile' },
            { speaker: '전우치', text: '그 모티브가, 저예요. 이름은 — 그대로, 가져갔지만요.' },
            { speaker: '전우치', text: '일제 강점기쯤 — 한 번, 죽었어야 — 했었는데. (어깨 으쓱) 못 죽었네요.' },
            { speaker: '하은', text: '...?', condition: { flag: 'ch5_haeun_in' }, emotion: 'surprised' },
            { speaker: '전우치', text: '도술의 1할쯤을, 미리 — 빼서, 이층에 — 두었거든요.' },
            { speaker: '전우치', text: '그 1할이, 오늘 — 깨어났어요.' },
            { speaker: '전우치', text: '왜 — 깨어났는지는, 천천히 — 풀어드릴게요.' },
            { speaker: '전우치', text: '...일단은, 안전한 — 자리로 — 갈까요.' },
        ],
        setFlags: { met_jeonwoochi: true },
        next: 'ch5_jeonwoochi_glance'
    },

    // 전우치가 주인공을 묘한 시선으로 본다 — 트위스트 떡밥
    ch5_jeonwoochi_glance: {
        image: 'assets/images/ch5_jeonwoochi_face.png',
        characters: {
            center: { char: 'jeonwoochi', emotion: 'serious' },
        },
        dialogue: [
            { speaker: '', text: '도사가 — 나를 본다.' },
            { speaker: '', text: '잠깐, 한 박자 — 길게.' },
            { speaker: '', text: '눈에서 — 무언가가, 흔들린다.' },
            { speaker: '', text: '슬픔. 그리움. 또는 — 미안함.' },
            { speaker: '', text: '하지만, 곧 — 미소로 덮인다.' },
            { speaker: '전우치', text: '...따라오세요.', emotion: 'smile' },
            { speaker: '전우치', text: '제 — 은신처가 — 있어요. 거기서, 천천히 — 이야기하지요.' },
        ],
        setFlags: { jeonwoochi_glance_seed: true },
        next: 'ch5_journey'
    },

    // ==========================================
    //  2막: 은신처로
    // ==========================================

    ch5_journey: {
        image: 'assets/images/ch5_alley_journey.png',
        imageEffect: 'ken-burns',
        characters: {
            center: { char: 'jeonwoochi' },
        },
        dialogue: [
            { speaker: '', text: '카페를 떠난다.' },
            { speaker: '', text: '도사가, 앞장선다.' },
            { speaker: '', text: '걸음에 — 망설임이 없다. 이 도시의 골목길을, 천 번쯤 — 걸어본 사람의 걸음.' },
            { speaker: '', text: '몇 번이나 — 모퉁이를 돌고, 또 돈다.' },
            { speaker: '', text: '갔던 길로 다시 가는 것 같기도 하다.' },
            { speaker: '하은', text: '저... 우리 — 어디로 가는 거예요?', condition: { flag: 'ch5_haeun_in' }, emotion: 'worried' },
            { speaker: '전우치', text: '거의 — 다 왔어요. 길이, 좀 — 비밀스러워서.', emotion: 'smile' },
            { speaker: '전우치', text: '이층의 — 결을, 따라 — 접힌 — 길이거든요.' },
            { speaker: '서연', text: '"이층의 결"이라뇨...?', condition: { flag: 'ch5_seoyeon_in' }, emotion: 'worried' },
            { speaker: '전우치', text: '그것도 — 천천히, 설명드릴게요.', emotion: 'smile' },
        ],
        next: 'ch5_choice_question'
    },

    // 길에서 — 도사에게 무엇을 묻는가
    ch5_choice_question: {
        image: 'assets/images/ch5_alley_journey.png',
        characters: {
            center: { char: 'jeonwoochi' },
        },
        dialogue: [
            { speaker: '', text: '걸으면서 — 한 가지만, 물어볼 수 있을 것 같다.' },
            { speaker: '', text: '뭘 묻지?' },
        ],
        choices: [
            { text: '"왜 — 나만, 사라지지 않았죠?"',
              setFlags: { ch5_asked_why_remain: true },
              stats: { wisdom: 2 },
              next: 'ch5_q_remain' },
            { text: '"손에서 푸른 빛이 났어요. 그게, 뭐죠?"',
              setFlags: { ch5_asked_blue_light: true },
              stats: { wisdom: 1, courage: 1 },
              next: 'ch5_q_light' },
            { text: '"이무기를 — 막을 수 있는 건가요?"',
              setFlags: { ch5_asked_imugi: true },
              stats: { courage: 2 },
              next: 'ch5_q_imugi' },
        ]
    },

    ch5_q_remain: {
        image: 'assets/images/ch5_alley_journey.png',
        characters: { center: { char: 'jeonwoochi', emotion: 'sad' } },
        dialogue: [
            { speaker: '전우치', text: '...핵심을, 바로 — 짚으시네요.', emotion: 'serious' },
            { speaker: '전우치', text: '왜 — 당신만, 안 사라졌느냐.' },
            { speaker: '전우치', text: '그건 — 은신처에서, 천천히 — 풀어드릴게요.' },
            { speaker: '전우치', text: '한 — 마디로, 답할 수 있는 게 — 아니거든요.' },
            { speaker: '전우치', text: '근데, 한 가지는 — 미리 말씀드리자면.', emotion: 'smile' },
            { speaker: '전우치', text: '...당신, 그냥 — 운이 좋으신 게, 아니에요.' },
            { speaker: '', text: '"그냥"이 아니다.' },
            { speaker: '', text: '그러면, 무엇이지.' },
        ],
        next: 'ch5_arrive_hideout'
    },

    ch5_q_light: {
        image: 'assets/images/ch5_alley_journey.png',
        characters: { center: { char: 'jeonwoochi', emotion: 'serious' } },
        dialogue: [
            { speaker: '전우치', text: '...오. (씩 웃으며)', emotion: 'surprised' },
            { speaker: '전우치', text: '벌써, 그게 — 나오셨네요. 빠르세요.' },
            { speaker: '전우치', text: '그건 — 도술의, 시작이에요.' },
            { speaker: '전우치', text: '평범한 — 사람이, 시도해서 — 나오는 — 빛이 아니거든요.' },
            { speaker: '전우치', text: '몸 안에 — 도술의 뿌리가, 잠들어 — 있어야, 가능한 일이에요.', emotion: 'smile' },
            { speaker: '', text: '...뿌리.' },
            { speaker: '', text: '내 안에, 누가, 그런 것을 — 심어둔 적이 있나.' },
        ],
        setFlags: { learned_dosul_root: true },
        next: 'ch5_arrive_hideout'
    },

    ch5_q_imugi: {
        image: 'assets/images/ch5_alley_journey.png',
        characters: { center: { char: 'jeonwoochi', emotion: 'serious' } },
        dialogue: [
            { speaker: '전우치', text: '...막을 수 — 있느냐, 라. (씩 웃으며)', emotion: 'smile' },
            { speaker: '전우치', text: '천 년 전엔 — 저 — 혼자, 막았어요. 이번엔 — 좀, 다르네요.' },
            { speaker: '전우치', text: '이무기 — 그 친구, 천 년 — 사이에, 꽤 — 강해졌거든요.' },
            { speaker: '전우치', text: '서울의 — 부정적 기를, 한참 — 흡수해 둬서요.' },
            { speaker: '전우치', text: '근데 — 이번엔, 그때 — 없던 — 한 가지가, 있어요.' },
            { speaker: '전우치', text: '...당신이요.', emotion: 'serious' },
        ],
        next: 'ch5_arrive_hideout'
    },

    // ==========================================
    //  3막: 은신처
    // ==========================================

    ch5_arrive_hideout: {
        image: 'assets/images/ch5_hideout.png',
        imageEffect: 'ken-burns',
        bgm: 'ch5_calm',
        characters: {
            center: { char: 'jeonwoochi', emotion: 'smile' },
        },
        dialogue: [
            { speaker: '', text: '한 골목 끝.' },
            { speaker: '', text: '오래된, 한옥이 한 채 — 좁은 골목 사이에, 끼어 있다.' },
            { speaker: '', text: '주변의 빌딩과는, 너무, 어울리지 않는다.' },
            { speaker: '', text: '하지만 — 여기 있다.' },
            { speaker: '', text: '도사가 — 문을 연다.' },
            { speaker: '전우치', text: '들어오세요. 안전해요.', emotion: 'smile' },
            { speaker: '전우치', text: '여기는 — 이층과 이쪽, 둘 — 사이에서 — 살짝, 어긋나 있는 자리거든요.' },
            { speaker: '전우치', text: '이무기 — 그 친구도, 여긴 — 쉽게 못 와요.' },
        ],
        next: 'ch5_inside_hideout'
    },

    ch5_inside_hideout: {
        image: 'assets/images/ch5_hideout_inside.png',
        characters: {
            left:  { char: 'haeun',     condition: { flag: 'ch5_haeun_in' } },
            center: { char: 'jeonwoochi' },
            right: { char: 'seoyeon',   condition: { flag: 'ch5_seoyeon_in' } },
        },
        dialogue: [
            { speaker: '', text: '안.' },
            { speaker: '', text: '낮은 천장. 종이 등불.' },
            { speaker: '', text: '벽에는 — 부적이, 빽빽이 붙어 있다.' },
            { speaker: '', text: '바닥엔 — 두 개의 화로, 그리고 약초의 향기.' },
            { speaker: '', text: '그리고, 가장 안쪽 벽에는 — 한 폭의, 오래된 그림.' },
            { speaker: '', text: '그림 속, 한 사람.' },
            { speaker: '', text: '도복을 입고, 칼을 든. 푸른 빛 속의 — 도사.' },
            { speaker: '', text: '얼굴은, 보이지 않게, 살짝, 옆으로 돌려져 있다.' },
            { speaker: '하은', text: '...이 그림 속 사람, 누구예요?', condition: { flag: 'ch5_haeun_in' }, emotion: 'worried' },
            { speaker: '전우치', text: '...글쎄요.', emotion: 'sad' },
            { speaker: '전우치', text: '제 — 옛, 친구예요.' },
            { speaker: '전우치', text: '오래 전 — 약속을, 함께 — 한.' },
        ],
        setFlags: { saw_painting: true },
        next: 'ch5_jeonwoochi_pause'
    },

    ch5_jeonwoochi_pause: {
        image: 'assets/images/ch5_hideout_inside.png',
        characters: {
            center: { char: 'jeonwoochi', emotion: 'serious' },
        },
        dialogue: [
            { speaker: '전우치', text: '오늘은 — 다들, 많이 — 굴러다니셨잖아요.', emotion: 'smile' },
            { speaker: '전우치', text: '여기서 — 푹, 쉬세요.' },
            { speaker: '전우치', text: '제 이야기는 — 내일 아침에, 천천히 — 들으시는 게 — 좋아요.' },
            { speaker: '전우치', text: '한꺼번에 — 듣기엔, 좀 — 무거운 — 이야기거든요.', emotion: 'serious' },
            { speaker: '하은', text: '...정말, 푹 자도 돼요?', condition: { flag: 'ch5_haeun_in' }, emotion: 'worried' },
            { speaker: '전우치', text: '여긴 — 이무기 그 친구도, 못 — 닿아요.', emotion: 'smile' },
            { speaker: '전우치', text: '제가 — 있잖아요.' },
        ],
        next: 'ch5_choice_night'
    },

    // 밤에 무엇을 할 것인가
    ch5_choice_night: {
        image: 'assets/images/ch5_hideout_inside.png',
        dialogue: [
            { speaker: '', text: '밤이 깊다.' },
            { speaker: '', text: '동료들은 — 한 명씩, 잠들었다.' },
            { speaker: '', text: '나만, 잠이 — 오지 않는다.' },
            { speaker: '', text: '뭘 하지?' },
        ],
        choices: [
            { text: '도사의 그림을 — 가까이서, 살펴본다',
              setFlags: { ch5_studied_painting: true },
              stats: { wisdom: 2 },
              next: 'ch5_painting_close' },
            { text: '잠든 동료들의 얼굴을 — 한 명씩 본다',
              setFlags: { ch5_watched_companions: true },
              stats: { love: 2 },
              affinity: { haeun: 2, student: 2, eoduksini: 2 },
              next: 'ch5_watching' },
            { text: '내 손을 — 가만히 — 본다. 푸른 빛을 — 다시, 시도해본다',
              setFlags: { ch5_tried_dosul: true },
              stats: { courage: 2, wisdom: 1 },
              next: 'ch5_try_dosul' },
        ]
    },

    ch5_painting_close: {
        image: 'assets/images/ch5_painting_closeup.png',
        dialogue: [
            { speaker: '', text: '그림 앞에 선다.' },
            { speaker: '', text: '가까이서 보니 — 더 — 이상하다.' },
            { speaker: '', text: '도사의 얼굴이, 살짝 — 옆으로 돌려져 있다는 건 알았다.' },
            { speaker: '', text: '하지만 — 살짝 보이는 옆모습이.' },
            { speaker: '', text: '...' },
            { speaker: '', text: '거울을 — 보는 것 같다.' },
            { speaker: '', text: '심장이, 한 박자, 빠르게.' },
            { speaker: '', text: '아니, 우연이다. 도사의 얼굴이라는 것 — 클리셰적인 형상일 뿐.' },
            { speaker: '', text: '머리를 — 흔든다.' },
            { speaker: '', text: '그래도, 자꾸 — 기억의 어딘가가, 가렵다.' },
        ],
        setFlags: { mirror_resonance_seed: true },
        next: 'ch5_aftermath'
    },

    ch5_watching: {
        image: 'assets/images/ch5_hideout_inside.png',
        dialogue: [
            { speaker: '', text: '동료들의 — 자는 얼굴을 본다.' },
            { speaker: '하은', text: '...(잠꼬대) 응응... 그래... 같이...', condition: { flag: 'ch5_haeun_in' } },
            { speaker: '서연', text: '...(고요히, 평화롭게)', condition: { flag: 'ch5_seoyeon_in' } },
            { speaker: '', text: '닷냥이가 — 동그랗게 말려, 곱게 잔다.', condition: { flag: 'ch5_pet_cat' } },
            { speaker: '', text: '황덕구가 — 코를 골며, 깊이 잔다.', condition: { flag: 'ch5_pet_dog' } },
            { speaker: '', text: '...' },
            { speaker: '', text: '내가 — 지켜야 한다.' },
            { speaker: '', text: '이무기가, 무어라 하든. 도사가, 무어라 하든.' },
            { speaker: '', text: '이 사람들은 — 내 사람들이다.' },
            { speaker: '', text: '그것이, 가장 단순한 — 진실이다.' },
        ],
        setFlags: { resolved_to_protect: true },
        next: 'ch5_aftermath'
    },

    ch5_try_dosul: {
        image: 'assets/images/ch5_hideout_inside.png',
        dialogue: [
            { speaker: '', text: '손을, 펼친다.' },
            { speaker: '', text: '낮에, 카페에서, 한 줄기 — 푸른 빛이 났던 — 그 손.' },
            { speaker: '', text: '머리에서 명령하는 게 아니라 — 깊은 곳에서, 기억하려는 — 그런 시도.' },
            { speaker: '', text: '...' },
            { speaker: '', text: '아무 일도 — 일어나지 않는다.' },
            { speaker: '', text: '...당연한가.' },
            { speaker: '', text: '하지만, 한 가지 — 이상한 일이 일어난다.' },
            { speaker: '', text: '손가락 끝이 — 잠깐, 따뜻해진다.' },
            { speaker: '', text: '눈에 보이는 빛은, 없는데.' },
            { speaker: '', text: '안에서 — 무언가가, 돌고 있다.' },
            { speaker: '', text: '천천히. 아주 천천히. 깨어나는 것처럼.' },
        ],
        setFlags: { dosul_first_warmth: true },
        stats: { courage: 1 },
        next: 'ch5_aftermath'
    },

    // ==========================================
    //  4막: 새벽이 — 다가온다
    // ==========================================

    ch5_aftermath: {
        image: 'assets/images/ch5_hideout_dawn.png',
        bgm: 'ch5_calm',
        dialogue: [
            { speaker: '', text: '얼마나 잤을까.' },
            { speaker: '', text: '눈을 뜨면, 창문 너머로 — 회색의 새벽이 — 들어와 있다.' },
            { speaker: '', text: '도사는 — 아직 일어나 있다.' },
            { speaker: '', text: '한 손에 차를. 다른 손엔 — 오래된 책 한 권.' },
            { speaker: '', text: '나를 보고는, 작게 미소.' },
            { speaker: '', text: '...' },
            { speaker: '', text: '제5장 — 끝.' },
        ],
        next: 'ch5_final'
    },

    ch5_final: {
        image: 'assets/images/ch5_hideout_dawn.png',
        showFlowchart: 'ch5',
        dialogue: [],
        next: 'ch6_intro',
    },
};

// ==========================================
//  제5장 플로우차트
// ==========================================

const FLOWCHARTS_CH5 = {
    ch5: {
        episode: '제5장',
        title: '푸른 옷의 도사',
        tree: [
            { type: 'story', text: '전우치 vs 이무기 — 정면 대치' },
            { type: 'story', text: '이무기 일시 후퇴' },
            { type: 'story', text: '전우치의 정체 — 천 년의 도사' },
            { type: 'choice', label: '도사에게 묻기', sceneId: 'ch5_choice_question',
              branches: [
                  { text: '왜 나만 안 사라졌나' },
                  { text: '푸른 빛의 정체' },
                  { text: '이무기를 막을 수 있는가' },
              ]
            },
            { type: 'story', text: '은신처 — 한옥의 비밀' },
            { type: 'story', text: '벽의 그림 — 누군가의 옛 모습' },
            { type: 'choice', label: '잠 못 드는 밤', sceneId: 'ch5_choice_night',
              branches: [
                  { text: '그림을 살핀다' },
                  { text: '동료를 본다' },
                  { text: '도술을 시도한다' },
              ]
            },
            { type: 'story', text: '제5장 — 끝' },
        ],
    },
};
