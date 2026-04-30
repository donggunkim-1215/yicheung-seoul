/**
 * 이층 : 서울, 0시 — 제6장: 천 년의 이야기
 * 전우치가 풀어놓는 — 자신, 이무기, 이층의 진실
 */

const SCENES_CH6 = {

    // ==========================================
    //  0막: 새벽의 차 한 잔
    // ==========================================

    ch6_intro: {
        chapter: { number: '제6장', title: '천 년의 이야기' },
        image: 'assets/images/ch6_hideout_morning.png',
        imageEffect: 'ken-burns',
        bgm: 'ch6',
        dialogue: [
            { speaker: '', text: '아침이 — 왔다.' },
            { speaker: '', text: '바깥은, 옅은 회색의 새벽. 해는 — 아직 보이지 않는다.' },
            { speaker: '', text: '동료들이, 한 명씩 — 깨어난다.' },
            { speaker: '', text: '도사가, 차를 — 우리고 있다.' },
        ],
        next: 'ch6_status'
    },

    ch6_status: {
        image: 'assets/images/ch6_hideout_morning.png',
        setFlagsIf: [
            { condition: { flag: 'ch5_haeun_in' },     flags: { ch6_haeun_in: true } },
            { condition: { flag: 'ch5_seoyeon_in' },   flags: { ch6_seoyeon_in: true } },
            { condition: { flag: 'ch5_eoduksini_in' }, flags: { ch6_eoduksini_in: true } },
            { condition: { flag: 'ch5_pet_cat' },      flags: { ch6_pet_cat: true } },
            { condition: { flag: 'ch5_pet_dog' },      flags: { ch6_pet_dog: true } },
        ],
        next: 'ch6_circle'
    },

    ch6_circle: {
        image: 'assets/images/ch6_circle.png',
        characters: {
            left:  { char: 'haeun',     condition: { flag: 'ch6_haeun_in' } },
            center: { char: 'jeonwoochi', emotion: 'serious' },
            right: { char: 'seoyeon',   condition: { flag: 'ch6_seoyeon_in' } },
        },
        dialogue: [
            { speaker: '', text: '낮은 — 둥근 — 상.' },
            { speaker: '', text: '그 위에, 차 다섯 잔.' },
            { speaker: '', text: '도사가 — 그 가운데, 앉아 있다.' },
            { speaker: '전우치', text: '드세요. 산속에서 — 직접, 캐온 — 좋은 — 약초예요.', emotion: 'smile' },
            { speaker: '전우치', text: '어제 — 다들, 좀 — 굴러다니셨잖아요.' },
            { speaker: '', text: '차의 향이, 머리를 — 가볍게 한다.' },
            { speaker: '', text: '한 모금. 또 한 모금.' },
            { speaker: '하은', text: '...따뜻하다.', condition: { flag: 'ch6_haeun_in' }, emotion: 'smile' },
            { speaker: '서연', text: '맛이 — 신기해요. 처음 마셔보는 차 같은데, 그리워요.', condition: { flag: 'ch6_seoyeon_in' }, emotion: 'smile' },
            { speaker: '전우치', text: '...자, 그럼. 이야기를 — 시작할까요.', emotion: 'serious' },
            { speaker: '전우치', text: '천 년 전부터 — 이번 — 주까지의, 이야기를요.' },
        ],
        next: 'ch6_thousand_years'
    },

    // ==========================================
    //  1막: 천 년 전, 한강 어귀
    // ==========================================

    ch6_thousand_years: {
        image: 'assets/images/ch6_old_hangang.png',
        imageEffect: 'ken-burns',
        dialogue: [
            { speaker: '전우치', text: '천 년 — 전, 한강 어귀에 — 한 마리의, 큰 뱀이 살았어요.', emotion: 'serious' },
            { speaker: '전우치', text: '오래 묵은 — 이무기였죠. 그 친구가요.' },
            { speaker: '전우치', text: '천 년 — 더, 묵으면 — 용이 되어 — 승천한다. 그게 — 그 친구 — 꿈이었어요.' },
            { speaker: '전우치', text: '실제로 그날, 거의 — 성공할 — 뻔했고요.' },
            { speaker: '전우치', text: '구름이 — 모이고, 비가 내리고. 강 위에 — 황금 — 다리가, 떠올랐어요.' },
            { speaker: '전우치', text: '근데 — 한 가지가, 잘못됐어요.' },
        ],
        next: 'ch6_imugi_failure'
    },

    ch6_imugi_failure: {
        image: 'assets/images/ch6_old_hangang.png',
        dialogue: [
            { speaker: '전우치', text: '용이 되려면 — 정(正)한 마음이, 필요해요.', emotion: 'serious' },
            { speaker: '전우치', text: '근데 — 그 친구는, 한이 — 너무 — 깊었거든요.' },
            { speaker: '전우치', text: '천 년 — 사람의 무관심을, 천 년 — 사람의 두려움을 — 받았으니까요.' },
            { speaker: '전우치', text: '그래서 — 용이, 못 됐죠.' },
            { speaker: '전우치', text: '용은 — 사람을 사랑하는 짐승이거든요.' },
            { speaker: '전우치', text: '하늘이 — 거부한 거예요.' },
            { speaker: '전우치', text: '그리고 그날, 제가 — 그 마지막 시도를, 끊어드렸죠.', emotion: 'smile' },
            { speaker: '전우치', text: '하늘이 — 거부하지 않으셨어도, 그 친구는 — 승천하면 — 안 될 — 짐승이었거든요.' },
            { speaker: '전우치', text: '용이 — 됐다면, 사람으로 둔갑해서 — 더 — 큰 한을, 풀려고 했을 — 테니까요.' },
            { speaker: '하은', text: '...막으셨다고요? 어떻게요?', condition: { flag: 'ch6_haeun_in' }, emotion: 'worried' },
            { speaker: '전우치', text: '봉인했어요. 한강의 — 깊은 — 자리에요.', emotion: 'serious' },
            { speaker: '전우치', text: '그게 — 마지막 도술이었어요. 그 — 한 번에, 제 — 9할이 — 다 — 빠져나갔거든요.' },
        ],
        setFlags: { learned_thousand_year_history: true },
        next: 'ch6_seal_break'
    },

    ch6_seal_break: {
        image: 'assets/images/ch6_seal_break.png',
        dialogue: [
            { speaker: '전우치', text: '봉인은 — 영원할 — 수, 없어요.', emotion: 'serious' },
            { speaker: '전우치', text: '이번 주, 그게 — 깨졌고요.' },
            { speaker: '전우치', text: '이무기 — 그 친구가, 깨어난 거예요. 천 년 — 동안, 한이 — 더 깊어진 채로요.' },
            { speaker: '전우치', text: '그리고 — 깨어난 — 그 친구가, 좀, 영리해졌더라고요.' },
            { speaker: '전우치', text: '바로 승천하는 대신 — 서울 사람들의 부정적 기를, 천천히 — 모으는, 방법을 — 택했어요.' },
            { speaker: '전우치', text: '시기, 질투, 출산율 저하, 자기혐오, 비교, 분노 — 그 — 모든 것을요.' },
            { speaker: '전우치', text: '그게 — 도시의 기를, 이층으로 — 흡수하는, 의식이었던 — 거예요.' },
            { speaker: '서연', text: '그래서, 사람들이 — 사라진 거죠?', condition: { flag: 'ch6_seoyeon_in' }, emotion: 'serious' },
            { speaker: '전우치', text: '맞아요. 사람들이 — 감정의 — 그릇이, 되어서 — 이층으로, 옮겨진 거죠.', emotion: 'serious' },
            { speaker: '전우치', text: '거기서 — 자신도, 모르는 — 사이에, 이무기에게 — 기를, 공급하고 있는 거예요.' },
        ],
        next: 'ch6_explain_ihyung'
    },

    // ==========================================
    //  2막: 이층(裏層) — 본질
    // ==========================================

    ch6_explain_ihyung: {
        image: 'assets/images/ch6_ihyung_diagram.png',
        characters: {
            center: { char: 'jeonwoochi', emotion: 'serious' },
        },
        dialogue: [
            { speaker: '전우치', text: '이층(裏層).', emotion: 'serious' },
            { speaker: '전우치', text: '뒷면, 이면 — 뒤집어진 — 층이에요.' },
            { speaker: '전우치', text: '이 — 세상과, 정확히 — 같은 — 모양의, 또 다른 — 서울이, 거기 — 있죠.' },
            { speaker: '전우치', text: '벽 한 장 — 사이에 두고요.' },
            { speaker: '전우치', text: '평범한 — 분이라면, 평생 — 그 벽을, 못 — 넘어요.' },
            { speaker: '전우치', text: '근데 — 이번 주, 그 벽이 — 좀 얇아졌어요.' },
            { speaker: '전우치', text: '이무기 — 그 친구의, 의식 — 때문에요.' },
            { speaker: '하은', text: '그럼, 사람들은 — 그 이층 서울에 있는 거예요?', condition: { flag: 'ch6_haeun_in' }, emotion: 'worried' },
            { speaker: '전우치', text: '맞아요. 다만 — 정상적인 의식은, 없을 — 거예요.', emotion: 'serious' },
            { speaker: '전우치', text: '꿈을 — 꾸듯, 평범한 — 일상을 — 살고 — 계실 거예요.' },
            { speaker: '전우치', text: '그 일상의 — 하루하루가, 이무기 — 그 친구의 — 양식이 — 되는 거죠.' },
            { speaker: '서연', text: '...꿈처럼.', condition: { flag: 'ch6_seoyeon_in' }, emotion: 'sad' },
            { speaker: '서연', text: '꿈에서 깨우려면 — 어떻게 해야 해요?', condition: { flag: 'ch6_seoyeon_in' } },
            { speaker: '전우치', text: '...이무기 — 그 친구를, 먼저 — 막아야 — 해요.', emotion: 'serious' },
        ],
        setFlags: { understood_ihyung: true },
        next: 'ch6_explain_sashin'
    },

    // ==========================================
    //  3막: 사신(四神)
    // ==========================================

    ch6_explain_sashin: {
        image: 'assets/images/ch6_sashin_diagram.png',
        dialogue: [
            { speaker: '전우치', text: '이무기를 — 막을 수 — 있는 건, 사신 — 네 — 짐승이에요.', emotion: 'serious' },
            { speaker: '전우치', text: '청룡, 백호, 주작, 현무.' },
            { speaker: '전우치', text: '서울의 — 동·서·남·북에, 각각 — 봉인돼 있고요.' },
            { speaker: '전우치', text: '아니, 정확히는 — 사람의 — 모습으로, 이 도시 — 어딘가에서, 살아가고 — 계세요.' },
            { speaker: '하은', text: '...사람의 모습이요?', condition: { flag: 'ch6_haeun_in' }, emotion: 'surprised' },
            { speaker: '전우치', text: '네. 영물은 — 자기가, 영물인 — 줄도 — 모르고, 한참을 — 사람으로 — 살아가요.', emotion: 'serious' },
            { speaker: '전우치', text: '제 — 도술의 9할이, 그분들께 — 흩어져 — 들어갔거든요.' },
            { speaker: '전우치', text: '천 년 — 전, 봉인을 — 그렇게, 분산시켜 둔 거예요.' },
            { speaker: '전우치', text: '한 사람이 — 한꺼번에, 다 깨우지 — 못하게요.' },
            { speaker: '전우치', text: '특히 — 이무기, 같은 — 자가 — 다, 모으지 — 못하게요.' },
        ],
        setFlags: { learned_sashin_purpose: true },
        next: 'ch6_haeun_strange'
    },

    // 하은이 묘하게 반응 — 현무 떡밥
    ch6_haeun_strange: {
        image: 'assets/images/ch6_circle.png',
        characters: {
            left:  { char: 'haeun',     condition: { flag: 'ch6_haeun_in' }, emotion: 'worried' },
            center: { char: 'jeonwoochi' },
            right: { char: 'seoyeon',   condition: { flag: 'ch6_seoyeon_in' } },
        },
        dialogue: [
            { speaker: '전우치', text: '...어. (씩 웃으며)', emotion: 'surprised' },
            { speaker: '전우치', text: '이 자리에 — 이미, 한 — 분이 — 계시는 — 것 같은데요.' },
            { speaker: '', text: '도사의 시선이, 한 사람에게 — 머문다.' },
            { speaker: '', text: '하은이.' },
            { speaker: '하은', text: '...저요?', condition: { flag: 'ch6_haeun_in' }, emotion: 'surprised' },
            { speaker: '하은', text: '저는, 그냥 — 평범한 사람인데요.', condition: { flag: 'ch6_haeun_in' } },
            { speaker: '전우치', text: '...아닌데요. 그냥, 평범한 — 사람의 — 기, 아니에요.', emotion: 'serious' },
            { speaker: '전우치', text: '아주 — 깊고, 차가운 — 물의 — 기운을, 가지고 — 계세요.' },
            { speaker: '전우치', text: '그게 — 하은 씨 — 잠재 능력이에요. 본인은, 아직 — 모르시지만요.' },
            { speaker: '하은', text: '...저, 저, 그런 거 — 못 해요.', condition: { flag: 'ch6_haeun_in' }, emotion: 'worried' },
            { speaker: '전우치', text: '지금은 — 그렇죠. 깨어나시면 — 아실 — 거예요.', emotion: 'smile' },
            { speaker: '전우치', text: '근데 — 깨우는 건, 시간이랑 — 시련이, 필요해서요.' },
            { speaker: '', text: '하은이가 — 자기 손을 본다.' },
            { speaker: '', text: '두 손바닥을 마주 댄다. 떼어놓는다.' },
            { speaker: '', text: '아무 일도 일어나지 않는다.' },
            { speaker: '', text: '하지만 — 가슴 한가운데가, 이상하게, 무겁다.' },
            { speaker: '하은', text: '...진짜로 그래요? 저, 그런 거 — 깃들어 있어요?', condition: { flag: 'ch6_haeun_in' }, emotion: 'worried' },
            { speaker: '전우치', text: '깃들어 — 있어요.', emotion: 'smile' },
            { speaker: '전우치', text: '시간이 — 답을, 줄 — 거예요.' },
        ],
        setFlags: { haeun_hyeonmu_seed: true },
        next: 'ch6_protagonist_glance'
    },

    // 전우치가 주인공을 묘하게 본다 (B안 트위스트 떡밥)
    ch6_protagonist_glance: {
        image: 'assets/images/ch6_circle.png',
        characters: {
            center: { char: 'jeonwoochi', emotion: 'sad' },
        },
        dialogue: [
            { speaker: '', text: '도사의 시선이, 다시 — 나에게로.' },
            { speaker: '', text: '하지만, 이번엔 — 길다. 아주, 길다.' },
            { speaker: '', text: '말이 — 없다.' },
            { speaker: '', text: '눈에서, 어제 봤던 그것이 — 또, 흔들린다.' },
            { speaker: '', text: '슬픔. 그리움. 미안함.' },
            { speaker: '', text: '하지만, 이번엔 — 미소로 — 덮지 않는다.' },
            { speaker: '전우치', text: '...당신은, 또 — 다른 이야기예요.', emotion: 'sad' },
            { speaker: '전우치', text: '그건 — 좀 더, 시간이 — 지난 — 후에, 풀어드릴게요.' },
            { speaker: '전우치', text: '지금은 — 모르시는 게, 좋아요.' },
            { speaker: '하은', text: '...저 사람한테, 무슨 비밀 있어요?', condition: { flag: 'ch6_haeun_in' }, emotion: 'worried' },
            { speaker: '전우치', text: '비밀이라기보다는 — 무게예요.', emotion: 'sad' },
            { speaker: '전우치', text: '한꺼번에 — 알면, 무너질 — 무게요.' },
        ],
        setFlags: { protagonist_secret_seed: true },
        next: 'ch6_choice_focus'
    },

    // ==========================================
    //  4막: 무엇을 — 먼저 할 것인가
    // ==========================================

    ch6_choice_focus: {
        image: 'assets/images/ch6_circle.png',
        characters: {
            center: { char: 'jeonwoochi' },
        },
        dialogue: [
            { speaker: '전우치', text: '...자, 정리할까요.', emotion: 'serious' },
            { speaker: '전우치', text: '이무기를 — 막으려면, 사신을 — 모아야 해요.' },
            { speaker: '전우치', text: '근데 — 그 전에, 단서를 — 더 — 모아야 — 하고요.' },
            { speaker: '전우치', text: '제가 — 들고 있는 — 정보로는, 두 — 군데 — 가볼 — 자리가, 있어요.' },
            { speaker: '전우치', text: '첫째, 장산범 — 그 친구. 이무기의 — 정탐꾼인데, 정보를 — 가지고 있어요.' },
            { speaker: '전우치', text: '둘째, 자료벽 — 주인. 누군지는 — 모르지만, 이미 — 이 일을, 추적하고 — 있던 — 분이에요.' },
            { speaker: '전우치', text: '...자, 어디부터 — 가실래요?' },
        ],
        choices: [
            { text: '"장산범부터 — 적의 정보부터 알아야 해."',
              setFlags: { ch6_chose_jangsanbeom: true },
              stats: { courage: 3 },
              next: 'ch6_chose_jangsan' },
            { text: '"자료벽 주인부터 — 우리 편을 찾자."',
              setFlags: { ch6_chose_observer: true },
              stats: { wisdom: 2, love: 1 },
              next: 'ch6_chose_observer' },
            { text: '"...둘 다, 한 번에. 둘로 나뉘어서."',
              setFlags: { ch6_split_party: true },
              stats: { wisdom: 2, courage: 1 },
              requires: { wisdom: 5 },
              next: 'ch6_split' },
        ]
    },

    ch6_chose_jangsan: {
        image: 'assets/images/ch6_circle.png',
        characters: { center: { char: 'jeonwoochi' } },
        dialogue: [
            { speaker: '전우치', text: '...오, 과감하세요.', emotion: 'smile' },
            { speaker: '전우치', text: '장산범 — 그 친구는, 인왕산 — 자락에 — 있을 거예요.' },
            { speaker: '전우치', text: '근데 — 조심하세요. 그 친구, 사람 — 목소리를 — 흉내 — 내거든요.' },
            { speaker: '전우치', text: '동료 — 목소리로, 부르더라도 — 함부로, 답하지 — 마세요.' },
        ],
        next: 'ch6_aftermath'
    },

    ch6_chose_observer: {
        image: 'assets/images/ch6_circle.png',
        characters: { center: { char: 'jeonwoochi' } },
        dialogue: [
            { speaker: '전우치', text: '...현명한 — 선택일 수도, 있겠네요.', emotion: 'smile' },
            { speaker: '전우치', text: '자료벽 — 주인은, 어쩌면 — 큰 도움이, 될 — 분이에요.' },
            { speaker: '전우치', text: '제가 — 그분의, 흔적을 — 한 가지, 알고 있어요.' },
            { speaker: '전우치', text: '...다만, 만나면 — 알고 — 싶지 않은 — 사실도, 함께 — 알게 — 되실지 몰라요.', emotion: 'sad' },
            { speaker: '하은', text: '...무슨 말씀이세요?', condition: { flag: 'ch6_haeun_in' }, emotion: 'worried' },
            { speaker: '전우치', text: '...글쎄요. 만나보시면, 아실 — 거예요.', emotion: 'sad' },
        ],
        setFlags: { observer_hint_seed: true },
        next: 'ch6_aftermath'
    },

    ch6_split: {
        image: 'assets/images/ch6_circle.png',
        characters: { center: { char: 'jeonwoochi', emotion: 'surprised' } },
        dialogue: [
            { speaker: '전우치', text: '...오. 야심차시네요. (씩 웃으며)', emotion: 'surprised' },
            { speaker: '전우치', text: '둘로 — 나누면, 시간을 — 절반으로, 줄일 수 — 있죠.' },
            { speaker: '전우치', text: '근데 — 위험해요. 둘 — 다, 안전한 — 자리가 — 아니거든요.' },
            { speaker: '전우치', text: '...그래도, 해볼 만한 — 가치는, 있어요.' },
            { speaker: '전우치', text: '제가 — 한 팀에, 붙어드릴게요.' },
            { speaker: '전우치', text: '7장에서, 두 — 갈래로 — 나뉘는 거예요.' },
        ],
        next: 'ch6_aftermath'
    },

    // ==========================================
    //  5막: 출발 직전
    // ==========================================

    ch6_aftermath: {
        image: 'assets/images/ch6_hideout_morning.png',
        bgm: 'ch6',
        characters: {
            left:  { char: 'haeun',     condition: { flag: 'ch6_haeun_in' } },
            center: { char: 'jeonwoochi' },
            right: { char: 'seoyeon',   condition: { flag: 'ch6_seoyeon_in' } },
        },
        dialogue: [
            { speaker: '', text: '차를, 마저, 다 마신다.' },
            { speaker: '', text: '동료들의 얼굴이 — 어제와 다르다.' },
            { speaker: '', text: '두려움은 — 여전히 있다. 하지만, 그 옆에 — 하나가 더, 자라났다.' },
            { speaker: '', text: '...할 일이, 분명해진 사람의 얼굴.' },
            { speaker: '하은', text: '...나, 진짜로 — 영물이라는 거야?', condition: { flag: 'ch6_haeun_in' }, emotion: 'worried' },
            { speaker: '하은', text: '근데, 막상, 그 말이 — 무서운 게 아니라, 어딘가 — 익숙해.', condition: { flag: 'ch6_haeun_in' } },
            { speaker: '서연', text: '저, 갑자기 — 사신 모으는 일이, 정말로 일어나는 게 — 신기해요.', condition: { flag: 'ch6_seoyeon_in' }, emotion: 'smile' },
            { speaker: '서연', text: '책 속에 있을 줄 알았던 일이, 진짜였어요.', condition: { flag: 'ch6_seoyeon_in' } },
            { speaker: '어둑시니', text: '...나도, 함께 갈게.', condition: { flag: 'ch6_eoduksini_in' }, emotion: 'serious' },
            { speaker: '어둑시니', text: '내가 — 어둠이라면, 어둠 속에서 — 봐야 할 게 있을 거야.', condition: { flag: 'ch6_eoduksini_in' } },
            { speaker: '닷냥이', text: '냐옹.', condition: { flag: 'ch6_pet_cat' } },
            { speaker: '황덕구', text: '컹.', condition: { flag: 'ch6_pet_dog' } },
            { speaker: '', text: '동물이 — 내 발치에, 다가온다.' },
            { speaker: '', text: '도사가, 마지막으로 — 가볍게 미소.' },
            { speaker: '전우치', text: '자, 갈까요.', emotion: 'smile' },
            { speaker: '전우치', text: '천 년의 — 매듭, 한 번 — 풀어보지요.' },
            { speaker: '', text: '제6장 — 끝.' },
        ],
        next: 'ch6_final'
    },

    ch6_final: {
        image: 'assets/images/ch6_hideout_morning.png',
        showFlowchart: 'ch6',
        dialogue: [],
        next: 'ch7_intro',
    },
};

// ==========================================
//  제6장 플로우차트
// ==========================================

const FLOWCHARTS_CH6 = {
    ch6: {
        episode: '제6장',
        title: '천 년의 이야기',
        tree: [
            { type: 'story', text: '도사의 차 한 잔' },
            { type: 'story', text: '천 년 전 — 한강 어귀, 첫 봉인' },
            { type: 'story', text: '봉인이 깨진 — 이번 주' },
            { type: 'story', text: '이층(裏層)의 본질' },
            { type: 'story', text: '사신 — 사람의 모습으로, 이 도시 어딘가에' },
            { type: 'story', text: '하은의 잠재 — 깊은 물의 기운' },
            { type: 'story', text: '주인공의 비밀 — 아직, 알 시간이 아니다' },
            { type: 'choice', label: '다음 행선지', sceneId: 'ch6_choice_focus',
              branches: [
                  { text: '장산범 (적의 정보)' },
                  { text: '자료벽 주인 (우리 편)' },
                  { text: '둘로 나뉘어 동시에 (지혜)' },
              ]
            },
            { type: 'story', text: '제6장 — 끝' },
        ],
    },
};
