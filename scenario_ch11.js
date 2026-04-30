/**
 * 이층 : 서울, 0시 — 제11장: 가뭄의 짐승
 * 강철이와의 결전, 그리고 — 주인공이 누구인가, 그 진실의 첫 번째 조각
 */

const SCENES_CH11 = {

    // ==========================================
    //  0막: 한강으로 — 마지막 길
    // ==========================================

    ch11_intro: {
        chapter: { number: '제11장', title: '가뭄의 짐승' },
        image: 'assets/images/ch11_road_to_river.png',
        imageEffect: 'ken-burns',
        bgm: 'ch11',
        dialogue: [
            { speaker: '', text: '해가 — 진다.' },
            { speaker: '', text: '한강 어귀 — 마지막 — 다리 앞.' },
            { speaker: '', text: '시간이 — 한 시간쯤, 남았다.' },
            { speaker: '', text: '의식까지.' },
        ],
        next: 'ch11_status'
    },

    ch11_status: {
        image: 'assets/images/ch11_road_to_river.png',
        setFlagsIf: [
            { condition: { flag: 'ch10_haeun_in' },     flags: { ch11_haeun_in: true } },
            { condition: { flag: 'ch10_seoyeon_in' },   flags: { ch11_seoyeon_in: true } },
            { condition: { flag: 'ch10_eoduksini_in' }, flags: { ch11_eoduksini_in: true } },
            { condition: { flag: 'ch10_pet_cat' },      flags: { ch11_pet_cat: true } },
            { condition: { flag: 'ch10_pet_dog' },      flags: { ch11_pet_dog: true } },
            { condition: { flag: 'ch10_gumiho_in' },    flags: { ch11_gumiho_in: true } },
            { condition: { flag: 'cheongryong_joined' },flags: { ch11_cheongryong_in: true } },
            { condition: { flag: 'baekho_joined' },     flags: { ch11_baekho_in: true } },
            { condition: { flag: 'jujak_joined' },      flags: { ch11_jujak_in: true } },
        ],
        next: 'ch11_dryness'
    },

    ch11_dryness: {
        image: 'assets/images/ch11_dry_road.png',
        characters: {
            left:  { char: 'jeonwoochi' },
            right: { char: 'haeun', condition: { flag: 'ch11_haeun_in' } },
        },
        dialogue: [
            { speaker: '', text: '걸음을 — 옮기는데, 이상하다.' },
            { speaker: '', text: '땅이 — 갈라진다.' },
            { speaker: '', text: '아스팔트의 한 — 자락이, 마치 — 가뭄 — 든 — 진흙처럼, 갈라져 — 있다.' },
            { speaker: '', text: '나무가, 시들어 — 있다. 어제까지 — 푸르렀던 것들이.' },
            { speaker: '하은', text: '...!', condition: { flag: 'ch11_haeun_in' }, emotion: 'surprised' },
            { speaker: '하은', text: '여기, 갑자기 — 가뭄이 든 거야?', condition: { flag: 'ch11_haeun_in' } },
            { speaker: '전우치', text: '...강철이가, 와있네요.', emotion: 'serious' },
            { speaker: '전우치', text: '그 친구가 — 지나간 자리엔, 물이 — 다 — 사라져요.' },
            { speaker: '전우치', text: '강철이 — 그 친구가, 가뭄을 — 부르는 — 짐승이거든요.' },
        ],
        next: 'ch11_appearance'
    },

    // ==========================================
    //  1막: 강철이 등장
    // ==========================================

    ch11_appearance: {
        image: 'assets/images/ch11_gangcheoli.png',
        imageEffect: 'ken-burns',
        bgm: 'ch11_combat',
        characters: {
            center: { char: 'gangcheoli', emotion: 'serious' },
        },
        dialogue: [
            { speaker: '', text: '다리의 — 입구.' },
            { speaker: '', text: '한 — 형체가, 천천히, 다가온다.' },
            { speaker: '', text: '뱀의 — 머리. 몸은, 사람과 — 뱀 — 사이.' },
            { speaker: '', text: '이무기와 — 비슷하지만, 더 — 거칠고 — 무겁다.' },
            { speaker: '', text: '몸 주변의 — 공기가, 다 — 마른다. 닿는 자리마다, 바위가 — 갈라진다.' },
            { speaker: '강철이', text: '...허허, 도사 양반.', emotion: 'serious' },
            { speaker: '강철이', text: '그분이 — 너희, 먼저 — 마시라 — 보내셨다.' },
            { speaker: '강철이', text: '내가 너희를 — 마시는 — 날.' },
            { speaker: '하은', text: '...!', condition: { flag: 'ch11_haeun_in' }, emotion: 'surprised' },
            { speaker: '서연', text: '도, 도사님 — !', condition: { flag: 'ch11_seoyeon_in' }, emotion: 'surprised' },
            { speaker: '전우치', text: '...강철이.', emotion: 'serious' },
            { speaker: '전우치', text: '모두 — 뒤로, 물러서세요.' },
            { speaker: '전우치', text: '이건 — 제가, 처리할게요. (씩 웃으며)', emotion: 'smile' },
        ],
        next: 'ch11_combat_start'
    },

    ch11_combat_start: {
        image: 'assets/images/ch11_combat_start.png',
        characters: {
            left:  { char: 'jeonwoochi', emotion: 'serious' },
            center: { char: 'gangcheoli' },
        },
        dialogue: [
            { speaker: '', text: '도사가, 한 발 — 앞으로.' },
            { speaker: '', text: '푸른 빛이, 양 손바닥에 — 모인다.' },
            { speaker: '전우치', text: '"바람의 검 — 청풍검!"', emotion: 'serious' },
            { speaker: '', text: '바람의 검이, 강철이의 — 한쪽 어깨를, 친다.' },
            { speaker: '', text: '하지만, 어깨에 — 닿은 — 순간, 검이 — 마른다.' },
            { speaker: '', text: '강철이의 — 가뭄의 기운이, 도술의 — 푸른 — 물기를, 다 — 빨아들였다.' },
            { speaker: '강철이', text: '...허허.', emotion: 'smile' },
            { speaker: '강철이', text: '도사 양반, 천 년 동안, 약해지셨네.' },
            { speaker: '전우치', text: '...!', emotion: 'surprised' },
            { speaker: '', text: '강철이의 — 손이, 도사를 — 잡는다.' },
            { speaker: '', text: '도사의 — 도술이, 한 박자 만에 — 마른다.' },
            { speaker: '전우치', text: '...!! 큭...!', emotion: 'sad' },
        ],
        next: 'ch11_jeonwoochi_falls'
    },

    ch11_jeonwoochi_falls: {
        image: 'assets/images/ch11_combat_struggle.png',
        characters: {
            left:  { char: 'jeonwoochi', emotion: 'sad' },
            center: { char: 'gangcheoli' },
        },
        dialogue: [
            { speaker: '', text: '도사가 — 무릎을 꿇는다.' },
            { speaker: '', text: '그의 — 푸른 도복이, 회색이 — 되어간다.' },
            { speaker: '', text: '도술의 — 1할이, 강철이에게 — 흡수당하고 있다.' },
            { speaker: '하은', text: '도사님!', condition: { flag: 'ch11_haeun_in' }, emotion: 'surprised' },
            { speaker: '서연', text: '도와줘요! 누가, 좀 — !', condition: { flag: 'ch11_seoyeon_in' }, emotion: 'surprised' },
            { speaker: '강철이', text: '...허허, 끝이로구나, 도사.', emotion: 'smile' },
            { speaker: '강철이', text: '천 년의 — 한을, 이 자리에서 — 갚아주마.' },
            { speaker: '', text: '...!' },
            { speaker: '', text: '도사가 — 죽는다.' },
            { speaker: '', text: '눈 앞에서.' },
        ],
        next: 'ch11_protagonist_breaks'
    },

    // ==========================================
    //  2막: 무언가가 — 깨어난다
    // ==========================================

    ch11_protagonist_breaks: {
        image: 'assets/images/ch11_protagonist_awaken.png',
        imageEffect: 'ken-burns',
        bgm: 'ch11_awakening',
        dialogue: [
            { speaker: '', text: '...무언가가, 끊어진다.' },
            { speaker: '', text: '내 안에서.' },
            { speaker: '', text: '봉인되어 있던 — 한 자락이.' },
            { speaker: '', text: '터진다.' },
            { speaker: '', text: '...' },
            { speaker: '', text: '몸이, 자기 의지로 — 움직인다.' },
            { speaker: '', text: '두 손이, 자기 의지로 — 펴진다.' },
            { speaker: '', text: '그리고, 그 손에서 — 푸른 — 진짜 푸른 — 빛이.' },
            { speaker: '', text: '도사의 도술보다, 더 — 깊은 — 빛이.' },
            { speaker: '', text: '...터져나온다.' },
        ],
        setFlags: { protagonist_full_first_dosul: true },
        next: 'ch11_first_strike'
    },

    ch11_first_strike: {
        image: 'assets/images/ch11_blue_burst.png',
        characters: {
            center: { char: 'gangcheoli', emotion: 'surprised' },
        },
        dialogue: [
            { speaker: '', text: '입에서 — 모르는 단어가, 자기 자리를 — 찾아 — 쏟아진다.' },
            { speaker: '???', text: '"청풍천검(淸風千劍)!"', emotion: 'serious' },
            { speaker: '', text: '...!' },
            { speaker: '', text: '천 자루의 푸른 검이, 동시에 — 강철이를, 둘러싼다.' },
            { speaker: '', text: '강철이의 — 가뭄의 기운이, 1초 만에 — 무너진다.' },
            { speaker: '강철이', text: '...!! 너, 너는 — !', emotion: 'surprised' },
            { speaker: '강철이', text: '...너, 도사 — 아니, 너는, 진짜 — !', emotion: 'sad' },
            { speaker: '', text: '천 자루의 검이, 동시에 — 떨어진다.' },
            { speaker: '', text: '강철이가, 비틀린다.' },
            { speaker: '', text: '몸이, 갈라진다.' },
        ],
        next: 'ch11_gangcheoli_dying'
    },

    ch11_gangcheoli_dying: {
        image: 'assets/images/ch11_gangcheoli_dying.png',
        characters: {
            center: { char: 'gangcheoli', emotion: 'sad' },
        },
        dialogue: [
            { speaker: '강철이', text: '...허, 허, 허.', emotion: 'sad' },
            { speaker: '강철이', text: '...진짜로, 그분이, 돌아오신 거구나.' },
            { speaker: '강철이', text: '천 년 — 만에.' },
            { speaker: '강철이', text: '...뱀의 — 한이, 끝나는, 자리.' },
            { speaker: '강철이', text: '이무기 — 그분께, 전해드려라.' },
            { speaker: '강철이', text: '...강철이는, 마지막에 — 이상한 자에게, 갈렸다고.', emotion: 'sad' },
            { speaker: '', text: '강철이의 — 몸이, 천천히 — 흩어진다.' },
            { speaker: '', text: '뱀의 — 비늘이, 한 장씩 — 떨어진다.' },
            { speaker: '', text: '그리고 — 마침내, 사라진다.' },
        ],
        setFlags: { gangcheoli_defeated: true },
        next: 'ch11_jeonwoochi_revelation'
    },

    // ==========================================
    //  3막: 진실 — 첫 번째, 큰 — 진실
    // ==========================================

    ch11_jeonwoochi_revelation: {
        image: 'assets/images/ch11_jeonwoochi_smile.png',
        characters: {
            center: { char: 'jeonwoochi', emotion: 'sad' },
        },
        dialogue: [
            { speaker: '', text: '도사가 — 일어선다.' },
            { speaker: '', text: '천천히. 한 발씩.' },
            { speaker: '', text: '내가, 그를 — 본다.' },
            { speaker: '', text: '도사가, 나를 — 본다.' },
            { speaker: '', text: '오래 본다. 몇 분쯤. 어쩌면, 더.' },
            { speaker: '전우치', text: '...드디어, 깨어나셨네요.', emotion: 'smile' },
            { speaker: '전우치', text: '천 년 — 묵은, 푸른 — 빛.' },
            { speaker: '전우치', text: '청풍천검은 — 도사가, 가진 — 가장, 어려운 — 도술이에요.' },
            { speaker: '전우치', text: '제가 — 한 번도, 못 해낸 — 그걸. 당신이, 한 번에. (씩 웃으며)' },
            { speaker: '하은', text: '...왜요? 왜 — 못 했는데, 이 사람이 — 한 거예요?', condition: { flag: 'ch11_haeun_in' }, emotion: 'worried' },
            { speaker: '전우치', text: '...왜냐하면요.', emotion: 'sad' },
            { speaker: '전우치', text: '저는 — 이 — 분의, 1할이 — 떨어져 나와 — 형상화된, 분신이거든요.' },
            { speaker: '', text: '...' },
            { speaker: '', text: '...!' },
        ],
        next: 'ch11_truth_reveal'
    },

    ch11_truth_reveal: {
        image: 'assets/images/ch11_two_jeonwoochi.png',
        dialogue: [
            { speaker: '전우치', text: '천 년 — 전, 봉인을 — 만들 — 때. 저는 — 저 — 자신을, 두 — 조각으로 — 나눴어요.', emotion: 'sad' },
            { speaker: '전우치', text: '9할은 — 이층에. 거기서, 사신을 — 깨우는 — 잠재 — 도술로, 흩뿌려뒀어요.' },
            { speaker: '전우치', text: '1할은 — 이쪽 — 세계에. 그게, 지금의 — 저예요.' },
            { speaker: '전우치', text: '제가 — 9할의 자취를 — 따라, 사신을 — 깨우러, 다녔던 거고요.' },
            { speaker: '전우치', text: '근데 — 그 진짜 — 9할은, 사람의 모습으로 — 1살부터, 살아오신 — 거예요.' },
            { speaker: '전우치', text: '...당신이, 그 — 9할이세요.', emotion: 'serious' },
            { speaker: '전우치', text: '당신이 — 진짜, 전우치예요.' },
            { speaker: '', text: '...' },
            { speaker: '', text: '머릿속이 — 텅, 비고.' },
            { speaker: '', text: '동시에, 아주 — 깊은 데서, 무언가가 — 가득 — 차오른다.' },
            { speaker: '', text: '도술의 — 잔향. 천 년의 — 무게.' },
            { speaker: '', text: '...아.' },
            { speaker: '', text: '...진짜네.' },
            { speaker: '하은', text: '...!! 무슨 — 소리예요?', condition: { flag: 'ch11_haeun_in' }, emotion: 'surprised' },
            { speaker: '서연', text: '이 사람이 — 도사라뇨...', condition: { flag: 'ch11_seoyeon_in' }, emotion: 'surprised' },
        ],
        setFlags: { protagonist_jeonwoochi_revealed: true },
        next: 'ch11_choice_accept'
    },

    // ==========================================
    //  4막: 받아들임 — 또는, 거부
    // ==========================================

    ch11_choice_accept: {
        image: 'assets/images/ch11_two_jeonwoochi.png',
        characters: {
            center: { char: 'jeonwoochi' },
        },
        dialogue: [
            { speaker: '전우치', text: '...어떻게, 하실래요?', emotion: 'serious' },
            { speaker: '전우치', text: '받아들이실래요? 도사로서의 — 자신을, 다시요.' },
            { speaker: '전우치', text: '아니면 — 거부하실래요? 평범한 — 사람으로, 있고 — 싶으세요?' },
            { speaker: '전우치', text: '둘 다 — 가능해요. 다만, 결과는 — 달라요.' },
        ],
        choices: [
            { text: '"...받아들인다. 나는, 전우치다."',
              setFlags: { protagonist_accepted_truth: true, full_dosul_unlocked: true },
              stats: { courage: 8, wisdom: 3 },
              next: 'ch11_accept_path' },
            { text: '"...아직, 모르겠어. 시간을 — 줘."',
              setFlags: { protagonist_unsure: true, partial_dosul_unlocked: true },
              stats: { wisdom: 2, calm: 2 },
              next: 'ch11_unsure_path' },
            { text: '"...나는, 그냥 — 사람이고 싶어. 거부한다."',
              setFlags: { protagonist_rejected_truth: true },
              stats: { love: 2, courage: 1 },
              next: 'ch11_reject_path' },
        ]
    },

    ch11_accept_path: {
        image: 'assets/images/ch11_protagonist_full.png',
        dialogue: [
            { speaker: '', text: '"...나는, 전우치다."' },
            { speaker: '', text: '입 밖으로, 그 말이 — 나오는 — 순간.' },
            { speaker: '', text: '몸 안의 — 9할이, 단숨에 — 깨어난다.' },
            { speaker: '', text: '천 년의 도술이, 한순간에 — 흘러들어온다.' },
            { speaker: '', text: '청풍. 청룡의 도. 사신을 부리는 노래. 봉인의 매듭.' },
            { speaker: '', text: '모두 — 머릿속에서, 자기 자리를 — 찾는다.' },
            { speaker: '', text: '...아.' },
            { speaker: '', text: '아, 그렇구나.' },
            { speaker: '', text: '나는, 그래, 그런 사람이었구나.' },
            { speaker: '전우치', text: '...어서 오세요. 진짜 — 자신께로. (씩 웃으며)', emotion: 'smile' },
            { speaker: '전우치', text: '저는 — 이제, 1할이라는 — 분리된, 자신이 — 아니에요.' },
            { speaker: '전우치', text: '머지않아 — 당신과, 하나로 — 합쳐질 — 거예요.' },
        ],
        next: 'ch11_aftermath'
    },

    ch11_unsure_path: {
        image: 'assets/images/ch11_protagonist_partial.png',
        dialogue: [
            { speaker: '', text: '"...아직, 모르겠어."' },
            { speaker: '', text: '몸이 — 흔들린다.' },
            { speaker: '', text: '도술의 절반쯤이 — 깨어난다. 하지만, 나머지는 — 봉인된 채.' },
            { speaker: '전우치', text: '...괜찮아요. 시간은, 의식 — 직전까지 — 남아있어요.', emotion: 'smile' },
            { speaker: '전우치', text: '천 년의 — 무게를, 1초에 — 받기엔. 좀, 너무 — 크니까요.' },
        ],
        next: 'ch11_aftermath'
    },

    ch11_reject_path: {
        image: 'assets/images/ch11_protagonist_human.png',
        dialogue: [
            { speaker: '', text: '"...나는, 그냥 — 사람이고 싶어."' },
            { speaker: '', text: '몸이 — 따뜻해진다.' },
            { speaker: '', text: '대신 — 도술이, 다시 — 봉인된다.' },
            { speaker: '', text: '청풍천검의 흔적이 — 사라진다.' },
            { speaker: '전우치', text: '...그것도, 답이에요.', emotion: 'sad' },
            { speaker: '전우치', text: '강요하지 — 않을게요. 사람으로서의 — 권리는, 누구에게나 — 있으니까요.' },
            { speaker: '전우치', text: '근데 — 의식 자리에서, 그 친구와의 — 결판은. 좀, 더 — 어려울 거예요.' },
            { speaker: '전우치', text: '제 1할의 — 도술이, 그 친구 — 앞에서, 얼마나 갈지는 — 모르겠고요.' },
        ],
        next: 'ch11_aftermath'
    },

    // ==========================================
    //  5막: 한강 어귀 — 직전
    // ==========================================

    ch11_aftermath: {
        image: 'assets/images/ch11_river_distant.png',
        bgm: 'ch11',
        dialogue: [
            { speaker: '', text: '강철이가, 사라진 — 자리.' },
            { speaker: '', text: '바닥에, 작은 — 검은 비늘 한 — 조각이, 남아 있다.' },
            { speaker: '', text: '그것을, 줍는다. 따뜻하다. 약간.' },
            { speaker: '', text: '한강이 — 보인다. 저 멀리, 강물이 — 다리 아래로, 흐른다.' },
            { speaker: '', text: '의식은, 그곳에서 — 시작될 것이다.' },
            // 분기별 회상
            { speaker: '', text: '...나는, 받아들였다. 천 년의 — 무게를.', condition: { flag: 'protagonist_accepted_truth' } },
            { speaker: '', text: '도술이, 내 — 안에서, 잠들어 있던 — 모든 것이, 깨어났다.', condition: { flag: 'protagonist_accepted_truth' } },
            { speaker: '', text: '...나는, 망설였다. 진실을, 한 자락만 — 받아들였다.', condition: { flag: 'protagonist_unsure' } },
            { speaker: '', text: '...나는, 거부했다. 사람으로 — 살고 싶었다.', condition: { flag: 'protagonist_rejected_truth' } },
            // 도사
            { speaker: '전우치', text: '...자, 마지막 — 길이에요.', emotion: 'serious' },
            { speaker: '전우치', text: '한강 — 어귀로. 이무기 — 그 친구와의, 결판으로 — 가지요.' },
            // 동료들
            { speaker: '하은', text: '...정말, 도사였던 거야? 진짜로?', condition: { flag: 'ch11_haeun_in' }, emotion: 'worried' },
            { speaker: '서연', text: '저는, 책 속의 인물 — 옆에, 있었던 거네요.', condition: { flag: 'ch11_seoyeon_in' }, emotion: 'smile' },
            { speaker: '어둑시니', text: '...너의 — 어둠을, 천 년 — 함께 — 지킨 — 친구라는 — 자격으로.', condition: { flag: 'ch11_eoduksini_in' }, emotion: 'serious' },
            { speaker: '구미호', text: '...아.', condition: { flag: 'ch11_gumiho_in' }, emotion: 'surprised' },
            { speaker: '구미호', text: '아, 그랬구나. 백 년이, 거짓이었구나.', condition: { flag: 'ch11_gumiho_in' }, emotion: 'sad' },
            { speaker: '구미호', text: '...당신이, 그분이라니. (떨리는 미소) 운명이라는 게 — 정말, 짙네요.', condition: { flag: 'ch11_gumiho_in' }, emotion: 'sad' },
            { speaker: '구미호', text: '저는 — 천 년을, 당신을 — 기다린 — 거였어요.', condition: { flag: 'ch11_gumiho_in' }, emotion: 'sad' },
            { speaker: '', text: '...' },
            { speaker: '', text: '제11장 — 끝.' },
        ],
        next: 'ch11_final'
    },

    ch11_final: {
        image: 'assets/images/ch11_river_distant.png',
        showFlowchart: 'ch11',
        dialogue: [],
        next: 'ch12_intro',
    },
};

// ==========================================
//  제11장 플로우차트
// ==========================================

const FLOWCHARTS_CH11 = {
    ch11: {
        episode: '제11장',
        title: '가뭄의 짐승',
        tree: [
            { type: 'story', text: '가뭄의 길 — 강철이 등장' },
            { type: 'story', text: '도사의 도술이 — 마른다' },
            { type: 'story', text: '주인공 — 청풍천검의 깨어남' },
            { type: 'story', text: '진실 — 주인공이 진짜 전우치' },
            { type: 'choice', label: '받아들임 또는 거부', sceneId: 'ch11_choice_accept',
              branches: [
                  { text: '받아들인다 — 천 년의 도술 각성' },
                  { text: '아직 — 모르겠다' },
                  { text: '거부한다 — 사람으로' },
              ]
            },
            { type: 'story', text: '제11장 — 끝' },
        ],
    },
};
