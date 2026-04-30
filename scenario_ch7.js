/**
 * 이층 : 서울, 0시 — 제7장: 인왕산의 목소리
 * 장산범 조우 — 동료 목소리 흉내, 정체성 혼란, 정보 거래
 */

const SCENES_CH7 = {

    // ==========================================
    //  0막: 인왕산으로
    // ==========================================

    ch7_intro: {
        chapter: { number: '제7장', title: '인왕산의 목소리' },
        image: 'assets/images/ch7_inwangsan_path.png',
        imageEffect: 'ken-burns',
        bgm: 'ch7',
        dialogue: [
            { speaker: '', text: '인왕산.' },
            { speaker: '', text: '서울 한복판에, 거짓말처럼 — 솟아 있는 산.' },
            { speaker: '', text: '바위가, 짐승의 등처럼 굽어 있다.' },
            { speaker: '', text: '그 등을 — 따라, 천천히 — 오른다.' },
        ],
        next: 'ch7_status'
    },

    ch7_status: {
        image: 'assets/images/ch7_inwangsan_path.png',
        setFlagsIf: [
            { condition: { flag: 'ch6_haeun_in' },     flags: { ch7_haeun_in: true } },
            { condition: { flag: 'ch6_seoyeon_in' },   flags: { ch7_seoyeon_in: true } },
            { condition: { flag: 'ch6_eoduksini_in' }, flags: { ch7_eoduksini_in: true } },
            { condition: { flag: 'ch6_pet_cat' },      flags: { ch7_pet_cat: true } },
            { condition: { flag: 'ch6_pet_dog' },      flags: { ch7_pet_dog: true } },
        ],
        next: 'ch7_climbing'
    },

    ch7_climbing: {
        image: 'assets/images/ch7_inwangsan_path.png',
        characters: {
            left:  { char: 'jeonwoochi' },
            right: { char: 'haeun',     condition: { flag: 'ch7_haeun_in' } },
        },
        dialogue: [
            { speaker: '전우치', text: '여기서부터는 — 말을, 줄이는 게 — 좋아요.', emotion: 'serious' },
            { speaker: '전우치', text: '장산범 — 그 친구, 들리는 — 소리는 — 다, 흉내내거든요.' },
            { speaker: '전우치', text: '많이 — 말할수록, 더 — 위험해져요.' },
            { speaker: '하은', text: '...진짜로, 사람 목소리를 흉내내요?', condition: { flag: 'ch7_haeun_in' }, emotion: 'worried' },
            { speaker: '전우치', text: '네. 동료의 — 목소리로, 다른 자리에서 — 부를 수 있어요.', emotion: 'serious' },
            { speaker: '전우치', text: '한 사람씩, 따로 — 떨어뜨리려고요.' },
            { speaker: '전우치', text: '그러니까 — 무조건, 서로의 — 시야 안에, 같이 — 있으세요.' },
        ],
        setFlags: { warned_about_voices: true },
        next: 'ch7_first_voice'
    },

    // ==========================================
    //  1막: 첫 번째 — 목소리
    // ==========================================

    ch7_first_voice: {
        image: 'assets/images/ch7_forest_dim.png',
        imageEffect: 'ken-burns',
        dialogue: [
            { speaker: '', text: '바위 사이의, 좁은 길.' },
            { speaker: '', text: '어둡다. 빛이 — 위에서 잘 닿지 않는 자리.' },
            { speaker: '', text: '그때, 어딘가에서 — 목소리가 들린다.' },
            { speaker: '하은', text: '(저 멀리, 오른쪽에서) ...야, 잠깐만.', condition: { flag: 'ch7_haeun_in' } },
            { speaker: '하은', text: '(나무 뒤쪽에서) ...여기, 와봐. 빨리.', condition: { flag: 'ch7_haeun_in' } },
            { speaker: '서연', text: '(왼쪽 바위 아래에서) ...저 좀, 도와주세요.', condition: { flag: 'ch7_seoyeon_in' } },
            { speaker: '서연', text: '(나뭇가지가 부러지는 소리와 함께) ...여기예요...', condition: { flag: 'ch7_seoyeon_in' } },
            // 동료 없는 경우 — 자기 자신 목소리 흉내
            { speaker: '???', text: '(내 자신의 목소리가, 등 뒤에서) ...야, 이쪽이야.', condition: { noneOfFlags: ['ch7_haeun_in', 'ch7_seoyeon_in'] } },
            { speaker: '', text: '...!' },
            { speaker: '', text: '동료의 목소리. 분명히, 옆에 — 있는데.' },
            { speaker: '', text: '같은 목소리가, 다른 자리에서 — 들린다.' },
            { speaker: '', text: '동료가 — 곁에 있는 동료를, 본다.' },
            { speaker: '', text: '서로의 시선이, 흔들린다.' },
            { speaker: '하은', text: '...저, 저거 — 나 아니야.', condition: { flag: 'ch7_haeun_in' }, emotion: 'worried' },
            { speaker: '서연', text: '저예요. 저, 여기 있어요...', condition: { flag: 'ch7_seoyeon_in' }, emotion: 'worried' },
            { speaker: '전우치', text: '...왔어요. 장산범.', emotion: 'serious' },
        ],
        next: 'ch7_voice_choice'
    },

    // 첫 번째 분기: 어떻게 대응할 것인가
    ch7_voice_choice: {
        image: 'assets/images/ch7_forest_dim.png',
        choiceTimer: 7,
        dialogue: [
            { speaker: '', text: '목소리가 — 점점 가까이 — 다가온다.' },
            { speaker: '', text: '여러 방향에서, 동시에.' },
            { speaker: '', text: '머리가 — 어지러워진다.' },
        ],
        choices: [
            { text: '귀를 막는다 — 듣지 않는다',
              setFlags: { ch7_blocked_ears: true },
              stats: { calm: 2, courage: 1 },
              next: 'ch7_block_path' },
            { text: '동료의 손을 — 꽉 잡는다. 곁에 있다는 것을 확인한다',
              setFlags: { ch7_held_hand: true },
              stats: { love: 3 },
              affinity: { haeun: 5, student: 5 },
              next: 'ch7_hold_path' },
            { text: '"...누구야. 모습 — 보여."',
              setFlags: { ch7_demanded_form: true },
              stats: { courage: 2, wisdom: 1 },
              next: 'ch7_demand_path' },
        ]
    },

    ch7_block_path: {
        image: 'assets/images/ch7_forest_dim.png',
        dialogue: [
            { speaker: '', text: '두 손으로, 귀를 — 막는다.' },
            { speaker: '', text: '바깥소리가 — 차단된다.' },
            { speaker: '', text: '하지만 — 머릿속에서, 목소리가 — 더 — 크게 — 울린다.' },
            { speaker: '???', text: '(머릿속에서) ...왜 막아? 들어봐. 정말, 그 사람일지도 모르잖아.', emotion: 'serious' },
            { speaker: '???', text: '(머릿속에서) ...너, 진짜로, 그 사람이 — 너랑, 함께 있다고 — 확신할 수 있어?', emotion: 'serious' },
            { speaker: '', text: '...!' },
            { speaker: '', text: '의심이 — 머릿속에서, 자란다.' },
            { speaker: '전우치', text: '버티세요. 곧 — 모습, 드러낼 거예요.', emotion: 'serious' },
        ],
        next: 'ch7_jangsan_appears'
    },

    ch7_hold_path: {
        image: 'assets/images/ch7_forest_dim.png',
        dialogue: [
            { speaker: '', text: '곁에 있는, 동료의 손을 — 잡는다.' },
            { speaker: '', text: '꽉.' },
            { speaker: '', text: '체온이 — 손을 통해, 들어온다.' },
            { speaker: '', text: '...진짜다.' },
            { speaker: '', text: '곁에 있는 사람이, 진짜다.' },
            { speaker: '', text: '저 멀리서 부르는 목소리는 — 가짜다.' },
            { speaker: '하은', text: '(작게) ...고마워. 나도, 안 흔들릴게.', condition: { flag: 'ch7_haeun_in' }, emotion: 'smile' },
            { speaker: '서연', text: '...같이, 있어요. 안 가요. 어디도.', condition: { flag: 'ch7_seoyeon_in' }, emotion: 'serious' },
            { speaker: '', text: '저 멀리의 목소리가 — 점차, 약해진다.' },
            { speaker: '', text: '연결이, 강해질수록 — 흉내가, 힘을 잃는다.' },
        ],
        next: 'ch7_jangsan_appears'
    },

    ch7_demand_path: {
        image: 'assets/images/ch7_forest_dim.png',
        dialogue: [
            { speaker: '', text: '"...누구야. 숨지 말고, 나와."' },
            { speaker: '', text: '목소리가 — 단단해진다.' },
            { speaker: '', text: '하지만, 내 자신의 목소리도 — 다른 자리에서, 들린다.' },
            { speaker: '???', text: '(내 목소리로) ...누구야. 숨지 말고, 나와.', emotion: 'smile' },
            { speaker: '', text: '...!' },
            { speaker: '', text: '내가 한 말과, 똑같은 말이 — 다른 자리에서, 한 박자 늦게, 들린다.' },
            { speaker: '', text: '...장산범.' },
            { speaker: '전우치', text: '오, 영리하시네요. (씩 웃으며)', emotion: 'smile' },
            { speaker: '전우치', text: '직접 — 흉내내라고, 부르는 건 — 그 친구한테, 부담이거든요.' },
            { speaker: '전우치', text: '곧 — 진짜 모습, 드러낼 거예요.' },
        ],
        next: 'ch7_jangsan_appears'
    },

    // ==========================================
    //  2막: 장산범 — 본 모습
    // ==========================================

    ch7_jangsan_appears: {
        image: 'assets/images/ch7_jangsan_appear.png',
        characters: {
            center: { char: 'jangsanbeom', emotion: 'neutral' },
        },
        dialogue: [
            { speaker: '', text: '바위 — 그늘 사이에서.' },
            { speaker: '', text: '한 사람이 — 천천히, 걸어 나온다.' },
            { speaker: '', text: '키가 크다. 너무 크다 — 거의 2미터 가까이.' },
            { speaker: '', text: '온몸이, 흰 털로 — 덮여 있다. 사람의 형상에, 짐승의 털.' },
            { speaker: '', text: '얼굴은, 사람의 얼굴.' },
            { speaker: '', text: '눈이, 노랗다. 그리고, 미소짓고 있다.' },
            { speaker: '장산범', text: '...드디어, 만나는군요.', emotion: 'smile' },
            { speaker: '장산범', text: '여기까지, 오시는 분이 — 천 년에 한 번.' },
            { speaker: '하은', text: '...!', condition: { flag: 'ch7_haeun_in' }, emotion: 'surprised' },
            { speaker: '서연', text: '저 — 저 사람도, 사람 형상이에요?', condition: { flag: 'ch7_seoyeon_in' }, emotion: 'surprised' },
            { speaker: '전우치', text: '오래 — 묵은 — 요괴는, 사람의 — 모습에 — 가까워져요.', emotion: 'serious' },
            { speaker: '전우치', text: '특히 — 사람을, 오래 — 본 — 친구들은요.' },
        ],
        next: 'ch7_jangsan_dialogue'
    },

    ch7_jangsan_dialogue: {
        image: 'assets/images/ch7_jangsan_appear.png',
        characters: {
            center: { char: 'jangsanbeom' },
        },
        dialogue: [
            { speaker: '장산범', text: '...당신, 인간이 아니죠?', emotion: 'serious' },
            { speaker: '장산범', text: '이 산은, 인간의 출입을 — 천 년쯤 — 거부해 왔어요.' },
            { speaker: '장산범', text: '그런데 — 당신은, 들어왔어요.' },
            { speaker: '장산범', text: '들어올 수 있는 자는 — 이 산이, 알아본 자뿐이에요.' },
            { speaker: '', text: '...!' },
            { speaker: '', text: '인간이, 아니다.' },
            { speaker: '', text: '그 단어가, 다른 자리에서, 또, 묻혀 — 머리에 박힌다.' },
            { speaker: '전우치', text: '...쓸데없는 — 말은, 그만하고요.', emotion: 'smile' },
            { speaker: '전우치', text: '거래하러 — 왔어요. 정보 — 두 가지.' },
            { speaker: '장산범', text: '...허허. 도사 양반이, 단도직입적이로군요.', emotion: 'smile' },
            { speaker: '장산범', text: '뭘, 알고 싶으세요?' },
        ],
        next: 'ch7_info_choice'
    },

    // 정보 거래 — 무엇을 물을 것인가
    ch7_info_choice: {
        image: 'assets/images/ch7_jangsan_appear.png',
        characters: {
            center: { char: 'jangsanbeom' },
        },
        dialogue: [
            { speaker: '장산범', text: '두 가지 — 알려드릴게요.', emotion: 'smile' },
            { speaker: '장산범', text: '대신, 대가를 — 받아야지요.' },
            { speaker: '장산범', text: '제 이름을 — 한 번, 정중히 — 불러주시면 되요.' },
            { speaker: '장산범', text: '"장산범 어르신"이라고. 천 년 만에, 그 호칭을 — 받고 싶어요.', emotion: 'sad' },
            { speaker: '전우치', text: '...값싼 대가네요. (씩 웃으며) 좋아요.', emotion: 'smile' },
            { speaker: '전우치', text: '...뭘, 묻고 싶으세요?' },
        ],
        choices: [
            { text: '"이무기의 — 약점이 뭐야, 장산범 어르신."',
              setFlags: { ch7_asked_weakness: true },
              stats: { courage: 2 },
              next: 'ch7_info_weakness' },
            { text: '"자료벽 주인 — 어디 있어, 장산범 어르신."',
              setFlags: { ch7_asked_observer: true },
              stats: { wisdom: 2 },
              next: 'ch7_info_observer' },
            { text: '"...구미호는 — 왜, 이무기 편이지?"',
              setFlags: { ch7_asked_gumiho: true },
              stats: { love: 2, wisdom: 1 },
              next: 'ch7_info_gumiho' },
        ]
    },

    ch7_info_weakness: {
        image: 'assets/images/ch7_jangsan_appear.png',
        characters: { center: { char: 'jangsanbeom' } },
        dialogue: [
            { speaker: '장산범', text: '약점, 약점이라.', emotion: 'serious' },
            { speaker: '장산범', text: '이무기는 — 사신을 두려워해요. 천 년 전에, 사신의 기운이 — 그를, 막을 뻔했거든요.' },
            { speaker: '장산범', text: '도사 혼자서, 막은 게 아니에요. 도사가 — 사신의 기운을, 빌렸지요.' },
            { speaker: '전우치', text: '...아.', emotion: 'sad' },
            { speaker: '장산범', text: '특히 — 두 마리 이상의 사신이, 한 자리에서 — 함께 노래하면.' },
            { speaker: '장산범', text: '이무기는, — 무력해집니다.' },
            { speaker: '장산범', text: '하지만, 그것도 — 한 가지 조건이 있어야 해요.' },
            { speaker: '장산범', text: '...구미호가, 이무기 곁에서 — 떠나야 해요.' },
            { speaker: '장산범', text: '구미호의 기운이, 이무기를 — 보호하고 있거든요.', emotion: 'sad' },
        ],
        setFlags: { learned_imugi_weakness: true },
        next: 'ch7_jangsan_offer_more'
    },

    ch7_info_observer: {
        image: 'assets/images/ch7_jangsan_appear.png',
        characters: { center: { char: 'jangsanbeom' } },
        dialogue: [
            { speaker: '장산범', text: '자료벽 주인.', emotion: 'serious' },
            { speaker: '장산범', text: '그분은 — 종묘 옆, 작은 약방에 살고 있어요.' },
            { speaker: '장산범', text: '여러 번 — 이름을 바꿨지만, 본 이름은 — "이향(李香)".' },
            { speaker: '장산범', text: '나이는 — 80이 넘으셨고, 무당의 후손이에요.' },
            { speaker: '장산범', text: '그분이, 지난 50년간 — 이층의 흔적을, 추적해왔어요.' },
            { speaker: '장산범', text: '오늘 일을, 50년 전부터, 알고 계셨던 거죠.' },
            { speaker: '서연', text: '50년이라뇨...', condition: { flag: 'ch7_seoyeon_in' }, emotion: 'surprised' },
            { speaker: '장산범', text: '그분이, 도와주실 거예요. 다만 — 만나기 전에, 마음의 준비를 하세요.' },
            { speaker: '장산범', text: '그분은 — 당신에 대해서도, 알고 있을 가능성이 높습니다.', emotion: 'sad' },
        ],
        setFlags: { learned_observer_location: true, observer_name_lee_hyang: true },
        next: 'ch7_jangsan_offer_more'
    },

    ch7_info_gumiho: {
        image: 'assets/images/ch7_jangsan_appear.png',
        characters: { center: { char: 'jangsanbeom', emotion: 'sad' } },
        dialogue: [
            { speaker: '장산범', text: '구미호.', emotion: 'sad' },
            { speaker: '장산범', text: '...불쌍한 — 짐승이에요.' },
            { speaker: '장산범', text: '그녀는 — 인간이 — 되고 싶었어요. 한 — 인간 — 도사를, 사랑했거든요.' },
            { speaker: '장산범', text: '천 년 — 전이에요. 그 — 도사가, 큰 봉인을 — 만들 — 때.' },
            { speaker: '장산범', text: '자기 — 자신도, 그 봉인 — 안에 — 함께, 묻으셨어요. 큰 짐승을 — 막기 — 위해서요.' },
            { speaker: '장산범', text: '그녀는 — 그분의, 사라짐을 — 직접, 봤어요.' },
            { speaker: '장산범', text: '그러나, 이무기가 — 거짓말을 했어요. "그 — 도사는, 죽지 — 않았다. 이층에서 — 살고 있다"고.' },
            { speaker: '장산범', text: '"내가 — 승천하면, 그를 — 이쪽으로, 데려와 — 주마"고.' },
            { speaker: '장산범', text: '그녀는 — 그 거짓을, 믿고 — 싶었지요.' },
            { speaker: '장산범', text: '진실보다 — 거짓이, 견디기 — 쉬우니까요.', emotion: 'sad' },
            { speaker: '장산범', text: '...그 도사 — 이름이, 궁금하세요? (실눈으로) 전우치예요. 천 년 전, 한강의 봉인을 — 직접 — 매신, 분.', emotion: 'smile' },
            { speaker: '하은', text: '...너무, 슬프네.', condition: { flag: 'ch7_haeun_in' }, emotion: 'sad' },
        ],
        setFlags: { learned_gumiho_truth: true, gumiho_lover_was_jeonwoochi: true },
        next: 'ch7_jangsan_offer_more'
    },

    // 한 가지 더 묻기? (insight 게이트)
    ch7_jangsan_offer_more: {
        image: 'assets/images/ch7_jangsan_appear.png',
        characters: { center: { char: 'jangsanbeom' } },
        dialogue: [
            { speaker: '장산범', text: '...한 가지, 더 — 들으시겠어요?', emotion: 'smile' },
            { speaker: '장산범', text: '대신, 대가가 — 좀, 비싸요.' },
        ],
        choices: [
            { text: '"...뭐야, 그 대가."',
              setFlags: { ch7_asked_extra: true },
              next: 'ch7_extra_offer' },
            { text: '"됐어. 충분해."',
              setFlags: { ch7_refused_extra: true },
              stats: { wisdom: 1 },
              next: 'ch7_jangsan_farewell' },
        ]
    },

    ch7_extra_offer: {
        image: 'assets/images/ch7_jangsan_appear.png',
        characters: { center: { char: 'jangsanbeom', emotion: 'serious' } },
        dialogue: [
            { speaker: '장산범', text: '대가는 — 당신의 과거 한 조각이에요.', emotion: 'serious' },
            { speaker: '장산범', text: '저는 — 그것을, 한 입 — 먹어버립니다.' },
            { speaker: '장산범', text: '잊혀지죠. 영영.' },
            { speaker: '장산범', text: '대신 — 진짜, 무거운 진실을 알려드려요.' },
            { speaker: '장산범', text: '어떠세요?' },
        ],
        choices: [
            { text: '"...받아들인다."',
              setFlags: { ch7_paid_memory: true, lost_memory_fragment: true },
              stats: { wisdom: 5 },
              next: 'ch7_extra_truth' },
            { text: '"...못 한다. 너무, 비싸."',
              setFlags: { ch7_kept_memory: true },
              stats: { courage: 2 },
              next: 'ch7_jangsan_farewell' },
        ]
    },

    ch7_extra_truth: {
        image: 'assets/images/ch7_jangsan_appear.png',
        characters: { center: { char: 'jangsanbeom', emotion: 'sad' } },
        dialogue: [
            { speaker: '', text: '장산범이 — 손을 든다.' },
            { speaker: '', text: '머릿속에서 — 무언가, 한 조각이 — 빠져나간다.' },
            { speaker: '', text: '뭐였는지, 모른다. 왜냐하면 — 잊었으니까.' },
            { speaker: '', text: '하지만, 그 자리가 — 비어있는 게, 느껴진다.' },
            { speaker: '장산범', text: '잘 받았어요.', emotion: 'sad' },
            { speaker: '장산범', text: '그럼, 약속한 — 진실을.' },
            { speaker: '장산범', text: '...당신은, 사실 — 도사 그 자체예요.' },
            { speaker: '장산범', text: '곁에 있는 도사 양반과, 사실은 — 같은 사람이에요.' },
            { speaker: '', text: '...!' },
            { speaker: '', text: '심장이 — 쿵, 한 박자, 빠르게.' },
            { speaker: '전우치', text: '...!!', emotion: 'surprised' },
            { speaker: '전우치', text: '...장산범, 너 — !', emotion: 'serious' },
            { speaker: '장산범', text: '약속이에요, 도사. 거짓을 말한 게 아니에요.', emotion: 'smile' },
            { speaker: '장산범', text: '아직, 그분이 — 받아들일 시간이 — 안 된 것 뿐이지.' },
            { speaker: '하은', text: '...?? 무슨 소리예요? 같은 사람이라뇨?', condition: { flag: 'ch7_haeun_in' }, emotion: 'surprised' },
            { speaker: '전우치', text: '...설명은, 천천히 — 할게요.', emotion: 'serious' },
            { speaker: '전우치', text: '지금은 — 너무, 이르거든요.' },
        ],
        setFlags: { jangsan_revealed_protagonist: true },
        next: 'ch7_jangsan_farewell'
    },

    ch7_jangsan_farewell: {
        image: 'assets/images/ch7_jangsan_appear.png',
        characters: { center: { char: 'jangsanbeom' } },
        dialogue: [
            { speaker: '장산범', text: '...자, 거래는 — 끝났어요.', emotion: 'smile' },
            { speaker: '장산범', text: '제 이름을, 한 번 — 불러주시면, 됩니다.' },
        ],
        choices: [
            { text: '"...장산범 어르신, 감사합니다."',
              setFlags: { ch7_paid_respect: true },
              stats: { love: 2 },
              affinity: { jangsanbeom: 5 },
              next: 'ch7_jangsan_smiles' },
            { text: '"...장산범."',
              setFlags: { ch7_paid_minimal: true },
              next: 'ch7_jangsan_smirks' },
        ]
    },

    ch7_jangsan_smiles: {
        image: 'assets/images/ch7_jangsan_appear.png',
        characters: { center: { char: 'jangsanbeom', emotion: 'smile' } },
        dialogue: [
            { speaker: '장산범', text: '...아.', emotion: 'smile' },
            { speaker: '장산범', text: '천 년 만이에요. 어르신, 이라는 호칭.' },
            { speaker: '장산범', text: '눈 앞이 — 흐려지네요.', emotion: 'sad' },
            { speaker: '장산범', text: '...언젠가, 다시 만나면 — 한 가지 더, 무료로 알려드릴게요.', emotion: 'smile' },
        ],
        setFlags: { jangsanbeom_grateful: true },
        next: 'ch7_aftermath'
    },

    ch7_jangsan_smirks: {
        image: 'assets/images/ch7_jangsan_appear.png',
        characters: { center: { char: 'jangsanbeom' } },
        dialogue: [
            { speaker: '장산범', text: '...뭐, 형식적으로라도 — 받았으니, 됐어요.', emotion: 'sad' },
            { speaker: '장산범', text: '거래는 거래죠.', emotion: 'smile' },
        ],
        next: 'ch7_aftermath'
    },

    // ==========================================
    //  3막: 산을 — 내려가며
    // ==========================================

    ch7_aftermath: {
        image: 'assets/images/ch7_inwangsan_descent.png',
        bgm: 'ch7',
        characters: {
            left:  { char: 'jeonwoochi', emotion: 'serious' },
            right: { char: 'haeun',     condition: { flag: 'ch7_haeun_in' } },
        },
        dialogue: [
            { speaker: '', text: '산을 — 내려간다.' },
            { speaker: '', text: '구름이 — 옅어진다. 햇빛이, 처음으로 — 비춰든다.' },
            { speaker: '', text: '마음에는, 더 무거운 무게가 — 더해졌다.' },
            // 분기별 회상
            { speaker: '', text: '...구미호의 사연.', condition: { flag: 'learned_gumiho_truth' } },
            { speaker: '', text: '한 인간을, 사랑한 짐승. 거짓말을, 믿어버린 마음.', condition: { flag: 'learned_gumiho_truth' } },
            { speaker: '', text: '...이무기의 약점.', condition: { flag: 'learned_imugi_weakness' } },
            { speaker: '', text: '두 마리 이상의 사신이, 함께 노래하면. 그리고 — 구미호가, 곁을 떠나야 한다.', condition: { flag: 'learned_imugi_weakness' } },
            { speaker: '', text: '...자료벽 주인. 이향. 종묘 옆 약방.', condition: { flag: 'learned_observer_location' } },
            { speaker: '', text: '50년을 — 이날을 위해, 살아온 사람.', condition: { flag: 'learned_observer_location' } },
            // 큰 떡밥 (잊었다면 이상한 빈자리만)
            { speaker: '', text: '...무언가, 큰 진실을 들었던 것 같다.', condition: { flag: 'jangsan_revealed_protagonist' } },
            { speaker: '', text: '잊었지만, 빈자리가 — 무겁다.', condition: { flag: 'jangsan_revealed_protagonist' } },
            // 동료 대화
            { speaker: '하은', text: '...우리, 이제 어디로 가?', condition: { flag: 'ch7_haeun_in' } },
            { speaker: '전우치', text: '...산을, 내려가서 — 종묘 쪽으로. 자료벽 — 주인을, 만나러요.', emotion: 'serious' },
            { speaker: '전우치', text: '근데 — 가는 길이, 평탄하지는 — 않을 — 거예요.' },
            { speaker: '전우치', text: '이무기 — 그 친구의, 부하가 — 길을, 지키고 있거든요.' },
            { speaker: '서연', text: '...부하라뇨?', condition: { flag: 'ch7_seoyeon_in' }, emotion: 'worried' },
            { speaker: '전우치', text: '거대한 — 키다리, 그슨대 — 그 친구예요.', emotion: 'serious' },
            { speaker: '', text: '...그슨대.' },
            { speaker: '', text: '제7장 — 끝.' },
        ],
        next: 'ch7_final'
    },

    ch7_final: {
        image: 'assets/images/ch7_inwangsan_descent.png',
        showFlowchart: 'ch7',
        dialogue: [],
        next: 'ch8_intro',
    },
};

// ==========================================
//  제7장 플로우차트
// ==========================================

const FLOWCHARTS_CH7 = {
    ch7: {
        episode: '제7장',
        title: '인왕산의 목소리',
        tree: [
            { type: 'story', text: '인왕산 — 동료의 목소리가, 동시에' },
            { type: 'choice', label: '목소리에 대응', sceneId: 'ch7_voice_choice',
              branches: [
                  { text: '귀를 막는다' },
                  { text: '동료의 손을 잡는다' },
                  { text: '모습을 요구한다' },
              ]
            },
            { type: 'story', text: '장산범 — 본 모습의 등장' },
            { type: 'choice', label: '정보 거래', sceneId: 'ch7_info_choice',
              branches: [
                  { text: '이무기의 약점' },
                  { text: '자료벽 주인' },
                  { text: '구미호의 진실' },
              ]
            },
            { type: 'choice', label: '추가 거래?', sceneId: 'ch7_jangsan_offer_more',
              branches: [
                  { text: '받아들인다 → 기억 한 조각' },
                  { text: '거절' },
              ]
            },
            { type: 'choice', label: '대가 지불', sceneId: 'ch7_jangsan_farewell',
              branches: [
                  { text: '"어르신" 호칭' },
                  { text: '최소한의 호칭' },
              ]
            },
            { type: 'story', text: '제7장 — 끝' },
        ],
    },
};
