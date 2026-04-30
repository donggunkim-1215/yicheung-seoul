/**
 * 이층 : 서울, 0시 — 제4장: 천 년의 그림자
 * 종로 다음 — 베일의 정체 = 이무기 등장
 */

const SCENES_CH4 = {

    // ==========================================
    //  0막: 새벽의 은신처
    // ==========================================

    ch4_intro: {
        chapter: { number: '제4장', title: '천 년의 그림자' },
        image: 'assets/images/ch4_dawn_shelter.png',
        imageEffect: 'ken-burns',
        bgm: 'ch4',
        dialogue: [
            { speaker: '', text: '종로를 벗어났다.' },
            { speaker: '', text: '얼마나 걸었는지 모른다. 다리가 — 자기 의지로 멈춘다.' },
            { speaker: '', text: '낡은 카페. 셔터가 반쯤 내려와 있다.' },
            { speaker: '', text: '그 안으로 — 들어간다.' },
            { speaker: '', text: '먼지 냄새. 식어버린 커피 향. 정적.' },
        ],
        next: 'ch4_status'
    },

    ch4_status: {
        image: 'assets/images/ch4_cafe_inside.png',
        setFlagsIf: [
            { condition: { flag: 'ch3_haeun_in' },     flags: { ch4_haeun_in: true } },
            { condition: { flag: 'ch3_seoyeon_in' },   flags: { ch4_seoyeon_in: true } },
            { condition: { flag: 'ch3_eoduksini_in' }, flags: { ch4_eoduksini_in: true } },
            { condition: { flag: 'ch3_pet_cat' },      flags: { ch4_pet_cat: true } },
            { condition: { flag: 'ch3_pet_dog' },      flags: { ch4_pet_dog: true } },
        ],
        next: 'ch4_breath'
    },

    ch4_breath: {
        image: 'assets/images/ch4_cafe_inside.png',
        characters: {
            left:  { char: 'haeun',   condition: { flag: 'ch4_haeun_in' } },
            right: { char: 'seoyeon', condition: { flag: 'ch4_seoyeon_in' } },
        },
        dialogue: [
            { speaker: '', text: '소파에 — 모두가, 동시에 앉는다.' },
            { speaker: '', text: '아무도 — 입을 열지 않는다.' },
            { speaker: '', text: '5분쯤. 어쩌면 더.' },
            { speaker: '하은', text: '...뭐였지, 그게.', condition: { flag: 'ch4_haeun_in' }, emotion: 'worried' },
            { speaker: '서연', text: '천 년... 그리고 이무기, 라고 하셨잖아요.', condition: { flag: 'ch4_seoyeon_in' }, emotion: 'serious' },
            { speaker: '어둑시니', text: '맞아. 이무기야.', condition: { flag: 'ch4_eoduksini_in' }, emotion: 'serious' },
            { speaker: '어둑시니', text: '천 년 전 — 승천에 실패한 용.', condition: { flag: 'ch4_eoduksini_in' } },
            { speaker: '어둑시니', text: '용이 되지 못한 뱀이, 한이 깊어 — 다시 시도하려는 거야.', condition: { flag: 'ch4_eoduksini_in' } },
        ],
        next: 'ch4_theory'
    },

    ch4_theory: {
        image: 'assets/images/ch4_cafe_inside.png',
        characters: {
            left:  { char: 'haeun',   condition: { flag: 'ch4_haeun_in' } },
            right: { char: 'seoyeon', condition: { flag: 'ch4_seoyeon_in' } },
        },
        dialogue: [
            { speaker: '서연', text: '...그래서 사람들이 사라진 거예요?', condition: { flag: 'ch4_seoyeon_in' }, emotion: 'worried' },
            { speaker: '서연', text: '이무기가, 사람들을 — 어디론가 옮긴 거예요?', condition: { flag: 'ch4_seoyeon_in' } },
            { speaker: '하은', text: '근데 — 왜 우리는 안 옮겨졌어?', condition: { flag: 'ch4_haeun_in' }, emotion: 'worried' },
            { speaker: '하은', text: '왜 — 너만 안 옮겨졌어?', condition: { flag: 'ch4_haeun_in' } },
            { speaker: '', text: '그 질문이 — 머릿속에서, 가시처럼 박힌다.' },
            { speaker: '', text: '왜 나만, 남았는가.' },
            { speaker: '', text: '그것이 — 핵심이라는 직감이 든다.' },
        ],
        setFlags: { question_why_remain: true },
        next: 'ch4_planning'
    },

    // ==========================================
    //  1막: 다음 행동 결정
    // ==========================================

    ch4_planning: {
        image: 'assets/images/ch4_cafe_inside.png',
        dialogue: [
            { speaker: '', text: '벽에 — 지도가 붙어 있다. 카페 손님들이 적은 메모로 가득한, 동네 지도.' },
            { speaker: '', text: '그 위에, 누군가가 — 빨간 표시를 해두었다.' },
            { speaker: '', text: '한 곳, 두 곳, 세 곳. 모두 — 이상한 사건이 났던 자리.' },
            { speaker: '', text: '이 카페가 — 우연히 들어온 곳이 아닐지도 모른다.' },
        ],
        choices: [
            { text: '지도를 자세히 살핀다 — 다음 단서를 찾는다',
              setFlags: { ch4_examined_map: true },
              stats: { wisdom: 3 },
              next: 'ch4_map_clue' },
            { text: '카페를 뒤져본다 — 누군가 왔다 간 흔적',
              setFlags: { ch4_searched_cafe: true },
              stats: { wisdom: 1, courage: 1 },
              next: 'ch4_cafe_clue' },
            { text: '동료들과 휴식 — 호감도 회복',
              setFlags: { ch4_rested: true },
              stats: { calm: 2, love: 1 },
              affinity: { haeun: 3, student: 2, eoduksini: 2 },
              next: 'ch4_rest' },
        ]
    },

    ch4_map_clue: {
        image: 'assets/images/ch4_cafe_map.png',
        dialogue: [
            { speaker: '', text: '지도에 가까이 다가간다.' },
            { speaker: '', text: '빨간 표시들 — 모두 한 가지 패턴을 그린다.' },
            { speaker: '', text: '동·서·남·북. 각각의 방향에 — 한 곳씩.' },
            { speaker: '', text: '지도 가운데에, 작은 글씨로 — "사신(四神)"이라고 적혀 있다.' },
            { speaker: '서연', text: '사신... 청룡, 백호, 주작, 현무?', condition: { flag: 'ch4_seoyeon_in' }, emotion: 'surprised' },
            { speaker: '하은', text: '왜, 그 단어가 — 익숙하지?', condition: { flag: 'ch4_haeun_in' }, emotion: 'worried' },
            { speaker: '', text: '하은이, 자기도 모르게 — 손을 가슴에 댄다.' },
            { speaker: '', text: '심장이 — 한 박자 다르게 뛴다.' },
            { speaker: '', text: '이건, 우연이 아니다.' },
        ],
        setFlags: { learned_sashin_word: true, haeun_first_resonance: true },
        next: 'ch4_imugi_arrives_setup'
    },

    ch4_cafe_clue: {
        image: 'assets/images/ch4_cafe_inside.png',
        dialogue: [
            { speaker: '', text: '카운터를 살핀다.' },
            { speaker: '', text: '계산기. 펜. 영수증.' },
            { speaker: '', text: '그리고 — 카운터 아래의, 작은 노트 한 권.' },
            { speaker: '', text: '펼쳐본다.' },
            { speaker: '', text: '익숙한 — 글씨체.' },
            { speaker: '', text: '"자료벽"의 메모와, 똑같은 글씨.' },
            { speaker: '', text: '"4월 28일. 종 — 다시 울린다. 그가 깨어났다."' },
            { speaker: '', text: '"4월 29일. 그(주인공)가 종로에 가는 걸 막을 수 없다. 다만, 살아 돌아오기를."' },
            { speaker: '서연', text: '...우리를 알고 있어요. 우리가 뭘 할지.', condition: { flag: 'ch4_seoyeon_in' }, emotion: 'surprised' },
            { speaker: '하은', text: '대체 누구야, 이 사람.', condition: { flag: 'ch4_haeun_in' }, emotion: 'worried' },
        ],
        setFlags: { found_observer_notes: true },
        next: 'ch4_imugi_arrives_setup'
    },

    ch4_rest: {
        image: 'assets/images/ch4_cafe_inside.png',
        characters: {
            left:  { char: 'haeun',   condition: { flag: 'ch4_haeun_in' } },
            right: { char: 'seoyeon', condition: { flag: 'ch4_seoyeon_in' } },
        },
        dialogue: [
            { speaker: '', text: '잠시 — 모두가 말없이 앉아 있다.' },
            { speaker: '하은', text: '나, 사실 — 무서워.', condition: { flag: 'ch4_haeun_in' }, emotion: 'sad' },
            { speaker: '하은', text: '근데, 너 옆에 있으면 — 덜 무서워.', condition: { flag: 'ch4_haeun_in' }, emotion: 'smile' },
            { speaker: '서연', text: '...저도, 솔직히 — 같이 있어서 다행이에요.', condition: { flag: 'ch4_seoyeon_in' }, emotion: 'smile' },
            { speaker: '어둑시니', text: '(작게) ...나도. 처음으로 — 이 모습이, 부끄럽지 않은 것 같아.', condition: { flag: 'ch4_eoduksini_in' }, emotion: 'sad' },
            { speaker: '닷냥이', text: '냐옹.', condition: { flag: 'ch4_pet_cat' }, emotion: 'smile' },
            { speaker: '황덕구', text: '컹.', condition: { flag: 'ch4_pet_dog' }, emotion: 'smile' },
            { speaker: '', text: '...따뜻하다.' },
            { speaker: '', text: '이 — 아주, 잠깐의 따뜻함이.' },
        ],
        next: 'ch4_imugi_arrives_setup'
    },

    // ==========================================
    //  2막: 그가 — 찾아왔다
    // ==========================================

    ch4_imugi_arrives_setup: {
        image: 'assets/images/ch4_cafe_inside.png',
        dialogue: [
            { speaker: '', text: '...' },
            { speaker: '', text: '카페의 종이 — 흔들린다.' },
            { speaker: '', text: '문이, 열리지 않은 채 — 흔들린다.' },
            { speaker: '닷냥이', text: '...핫!', condition: { flag: 'ch4_pet_cat' }, emotion: 'serious' },
            { speaker: '황덕구', text: '...크르릉!', condition: { flag: 'ch4_pet_dog' }, emotion: 'serious' },
            { speaker: '', text: '동물이 — 동시에 카운터 뒤로 숨는다.' },
            { speaker: '어둑시니', text: '...왔어. 그가 — 왔어.', condition: { flag: 'ch4_eoduksini_in' }, emotion: 'serious' },
            { speaker: '', text: '공기가 — 또 변한다.' },
            { speaker: '', text: '종로에서 느꼈던 그 무게.' },
            { speaker: '', text: '카페의 모든 컵이 — 동시에, 떨린다.' },
            { speaker: '', text: '그리고 — 한 사람이, 앉아 있다.' },
            { speaker: '', text: '카페 한가운데. 빈 테이블 자리에.' },
            { speaker: '', text: '...있을 리 없는 자리에.' },
        ],
        next: 'ch4_imugi_face'
    },

    ch4_imugi_face: {
        image: 'assets/images/ch4_imugi_seated.png',
        characters: {
            center: { char: 'imugi', emotion: 'neutral' },
        },
        dialogue: [
            { speaker: '', text: '남자.' },
            { speaker: '', text: '검은 정장. 검은 머리. 다리를 꼬고 — 마치, 자기 카페인 듯 앉아 있다.' },
            { speaker: '', text: '그리고 — 얼굴.' },
            { speaker: '', text: '...잘생겼다.' },
            { speaker: '', text: '구미호의 아름다움이 "이 세상의 것이 아닌" 것이었다면,' },
            { speaker: '', text: '이 남자의 잘생김은 — "너무 이 세상에 어울리는" 그런 종류다.' },
            { speaker: '', text: '뉴스 앵커, 정치인, 카리스마 있는 CEO — 그런 인상.' },
            { speaker: '', text: '하지만, 눈을 보면 — 안다.' },
            { speaker: '', text: '천 년의 한이 — 그 안에 고여 있다.' },
            { speaker: '이무기', text: '...아, 어서 오세요. (실눈으로 미소)', emotion: 'smile' },
            { speaker: '이무기', text: '앉으시지요. 좀, 긴 이야기가 — 될 — 테니까요.' },
            { speaker: '하은', text: '...!', condition: { flag: 'ch4_haeun_in' }, emotion: 'surprised' },
            { speaker: '서연', text: '도, 도망가야 — !', condition: { flag: 'ch4_seoyeon_in' }, emotion: 'surprised' },
        ],
        next: 'ch4_imugi_demonstrates'
    },

    ch4_imugi_demonstrates: {
        image: 'assets/images/ch4_imugi_seated.png',
        characters: {
            center: { char: 'imugi', emotion: 'serious' },
        },
        dialogue: [
            { speaker: '이무기', text: '...도망이라.', emotion: 'smile' },
            { speaker: '이무기', text: '흥미로운 단어예요. 도망이라는 것.' },
            { speaker: '', text: '남자가 — 손가락을 한 번, 까딱한다.' },
            { speaker: '', text: '그리고 — 카페의 문이, 사라진다.' },
            { speaker: '', text: '그냥 잠긴 게 아니다. 문 자체가 — 없어졌다.' },
            { speaker: '', text: '벽이 그 자리를 — 채우고 있다.' },
            { speaker: '하은', text: '...!', condition: { flag: 'ch4_haeun_in' }, emotion: 'surprised' },
            { speaker: '이무기', text: '아, 놀라셨네요. 잠시 — 닫아둔 — 것뿐이에요.', emotion: 'smile' },
            { speaker: '이무기', text: '대화가 끝나면, 다시 — 열어드릴게요. 약속하지요.' },
            { speaker: '', text: '"임시"라고 — 그가 말한다. 카페의 벽을 — "임시"라고.' },
            { speaker: '', text: '그것이, 가장 — 무서운 부분이다.' },
        ],
        setFlags: { saw_imugi_power: true },
        next: 'ch4_imugi_speaks'
    },

    ch4_imugi_speaks: {
        image: 'assets/images/ch4_imugi_seated.png',
        characters: { center: { char: 'imugi' } },
        dialogue: [
            { speaker: '이무기', text: '아, 소개가 — 늦었네요. 무례했어요.', emotion: 'smile' },
            { speaker: '이무기', text: '저는 — 천 년쯤 전에, 한강 어귀에서 — 승천을 시도했던 무엇입니다.' },
            { speaker: '이무기', text: '실패했지요. 한 사람이 — 길을 막았거든요.' },
            { speaker: '이무기', text: '도사 한 분. 이름은 — 기억하시려나요?', emotion: 'serious' },
            { speaker: '', text: '도사. 그 단어가 — 또.' },
            { speaker: '이무기', text: '전우치(田禹治).' },
            { speaker: '', text: '...!' },
            { speaker: '', text: '그 이름.' },
            { speaker: '', text: '...왜, 그 이름이 — 익숙한가.' },
            { speaker: '', text: '본 적도 없는데. 들은 적도 없을 텐데.' },
            { speaker: '', text: '머리가 — 살짝 어지럽다.' },
            { speaker: '이무기', text: '...오.', emotion: 'surprised' },
            { speaker: '이무기', text: '반응하시는군요. 역시 — 그렇군요.', emotion: 'smile' },
            { speaker: '이무기', text: '흥미로운 — 일이에요.' },
        ],
        setFlags: { heard_jeonwoochi_name: true, jeonwoochi_resonance: true },
        next: 'ch4_imugi_proposal'
    },

    ch4_imugi_proposal: {
        image: 'assets/images/ch4_imugi_seated.png',
        characters: { center: { char: 'imugi' } },
        dialogue: [
            { speaker: '이무기', text: '그럼 — 본론으로, 들어갈까요.' },
            { speaker: '이무기', text: '저는 — 이번엔, 승천을 할 겁니다.' },
            { speaker: '이무기', text: '천 년을 — 기다렸어요. 이번엔, 막으실 — 분이 없거든요.' },
            { speaker: '이무기', text: '서울이, 충분히 — 익었습니다.' },
            { speaker: '', text: '"익었다"는 — 단어를 — 사람에 대해 쓰는 게 아니다.' },
            { speaker: '이무기', text: '시기, 질투, 불만, 두려움. 비교, 자기혐오, 분노.' },
            { speaker: '이무기', text: '서울 사람들의 — 그 모든, 부정적 감정이 — 도시를 — 요괴화시켰지요.' },
            { speaker: '이무기', text: '그 기(氣)를, 제가 — 다 흡수합니다. 그러면 — 승천이에요.' },
            { speaker: '이무기', text: '아, 사라진 분들이요? 걱정 마세요. "이층"에서, 잘 — 지내고 계세요.' },
            { speaker: '이무기', text: '제가 — 승천한 — 후에는, 돌려보내드릴 수도 — 있어요.', emotion: 'smile' },
            { speaker: '이무기', text: '제 — 마음이, 닿는다면요.' },
            { speaker: '하은', text: '...미친 거야, 이 사람.', condition: { flag: 'ch4_haeun_in' }, emotion: 'worried' },
            { speaker: '서연', text: '왜 — 우리에게 이런 얘기를 하세요?', condition: { flag: 'ch4_seoyeon_in' }, emotion: 'serious' },
        ],
        next: 'ch4_imugi_demand'
    },

    ch4_imugi_demand: {
        image: 'assets/images/ch4_imugi_seated.png',
        characters: { center: { char: 'imugi', emotion: 'serious' } },
        dialogue: [
            { speaker: '이무기', text: '왜냐하면 — 당신, 때문이에요.', emotion: 'smile' },
            { speaker: '', text: '이무기의 시선이 — 정확히, 나를 본다.' },
            { speaker: '이무기', text: '당신만 — 사라지지 않으셨어요.' },
            { speaker: '이무기', text: '왜일까요? 답은 — 당신 안에, 있습니다.' },
            { speaker: '이무기', text: '당신은 — 사실, 그냥 — 사람이 아니거든요.' },
            { speaker: '이무기', text: '누구이신지 — 이 자리에서, 다 알려드릴 수도 — 있지요.' },
            { speaker: '이무기', text: '하지만, 그건 — 제가 정할 일이지, 당신이 — 알 일이 아니에요.', emotion: 'smile' },
            { speaker: '이무기', text: '...제 곁으로, 오시지 않겠어요.' },
            { speaker: '이무기', text: '저의 승천을 — 도와주시면, 당신은 — 인간 — 그 이상이 됩니다.' },
            { speaker: '이무기', text: '거절하시면 — 음. 안타깝지만, 사라지셔야 — 하겠지요.', emotion: 'smile' },
            { speaker: '이무기', text: '...다만, 다른 분들보다 — 조금, 더 — 깔끔하게요.' },
        ],
        next: 'ch4_choice'
    },

    // ==========================================
    //  3막: 응답 — 분기
    // ==========================================

    ch4_choice: {
        image: 'assets/images/ch4_imugi_seated.png',
        characters: { center: { char: 'imugi' } },
        choiceTimer: 7,
        dialogue: [
            { speaker: '이무기', text: '...자, 답을 — 듣고 싶네요. 짧게요.', emotion: 'smile' },
        ],
        choices: [
            { text: '"거절한다."',
              setFlags: { ch4_refused: true },
              stats: { courage: 5 },
              next: 'ch4_refuse' },
            { text: '"...시간을 줘. 답하기 전에."',
              setFlags: { ch4_stalled: true },
              stats: { wisdom: 3 },
              next: 'ch4_stall' },
            { text: '동료를 보호하며 — 그를 노려본다',
              setFlags: { ch4_defied_silently: true },
              stats: { love: 2, courage: 1 },
              affinity: { haeun: 3, student: 3, eoduksini: 2 },
              next: 'ch4_defy_silent' },
        ]
    },

    ch4_refuse: {
        image: 'assets/images/ch4_imugi_standing.png',
        characters: { center: { char: 'imugi', emotion: 'serious' } },
        dialogue: [
            { speaker: '', text: '"거절한다."' },
            { speaker: '', text: '목소리가 — 떨리지 않는다. 처음으로.' },
            { speaker: '이무기', text: '...후후.', emotion: 'smile' },
            { speaker: '이무기', text: '천 년 — 만에, 두 번째이세요. 이렇게 — 단번에, 거절하시는 분이.' },
            { speaker: '이무기', text: '첫 번째는, 전우치 — 그분이었죠.' },
            { speaker: '', text: '이무기가 — 일어선다.' },
            { speaker: '', text: '느릿하게. 의자가 — 자동으로 뒤로 밀린다.' },
        ],
        next: 'ch4_combat'
    },

    ch4_stall: {
        image: 'assets/images/ch4_imugi_seated.png',
        characters: { center: { char: 'imugi' } },
        dialogue: [
            { speaker: '이무기', text: '...시간을, 청하시는군요.', emotion: 'smile' },
            { speaker: '이무기', text: '천 년을 — 기다린 자에게, 시간을 — 부탁하시다니.' },
            { speaker: '이무기', text: '흥미로운 — 분이세요.' },
            { speaker: '이무기', text: '하지만, 답은 — 시간이 가져다주는 — 게 아니에요.' },
            { speaker: '이무기', text: '답은 — 끌어내야지요.' },
            { speaker: '', text: '이무기가 — 일어선다.' },
            { speaker: '이무기', text: '조금, 자극을 — 드리면. 답이 — 빨리, 나올지도 모르겠네요.', emotion: 'smile' },
        ],
        next: 'ch4_combat'
    },

    ch4_defy_silent: {
        image: 'assets/images/ch4_imugi_standing.png',
        characters: { center: { char: 'imugi' } },
        dialogue: [
            { speaker: '', text: '한 마디도 하지 않는다.' },
            { speaker: '', text: '대신, 한 발 — 동료들 앞으로 나선다.' },
            { speaker: '', text: '이무기를 — 정면으로 본다.' },
            { speaker: '이무기', text: '...침묵으로, 답하시는군요.', emotion: 'smile' },
            { speaker: '이무기', text: '몸으로 — 말씀하시는 거예요. 동료를 — 지키신다는, 그 자세.' },
            { speaker: '이무기', text: '오랜만이에요. 그런 — 자세.' },
            { speaker: '이무기', text: '천 년 전 — 그 도사도, 같았거든요.', emotion: 'smile' },
            { speaker: '', text: '이무기가 — 일어선다.' },
            { speaker: '이무기', text: '...실력을, 한 번 — 보여주시지요.' },
        ],
        next: 'ch4_combat'
    },

    // ==========================================
    //  4막: 압도적 — 절망
    // ==========================================

    ch4_combat: {
        image: 'assets/images/ch4_imugi_combat.png',
        imageEffect: 'ken-burns',
        bgm: 'ch4_combat',
        characters: { center: { char: 'imugi', emotion: 'serious' } },
        dialogue: [
            { speaker: '', text: '이무기가 — 손을 들어 올린다.' },
            { speaker: '', text: '간단한 동작.' },
            { speaker: '', text: '하지만, 그 순간 — 카페의 모든 것이, 동시에 흔들린다.' },
            { speaker: '', text: '컵이 깨진다. 의자가 떨어진다. 천장의 조명이 — 떨어져 내린다.' },
            { speaker: '하은', text: '...!', condition: { flag: 'ch4_haeun_in' }, emotion: 'surprised' },
            { speaker: '서연', text: '아아!', condition: { flag: 'ch4_seoyeon_in' }, emotion: 'surprised' },
            { speaker: '', text: '본능적으로 — 동료들 앞을 막는다.' },
            { speaker: '', text: '뭔가, 손에서 — 빛이 나온다.' },
            { speaker: '', text: '...?' },
            { speaker: '', text: '한 줄기, 푸른 빛이.' },
            { speaker: '', text: '머리에서 — 지시한 적도 없는데.' },
            { speaker: '', text: '몸이, 자기 의지로 — 무언가, 도술 같은 것을 — 시도한다.' },
            { speaker: '이무기', text: '...오.', emotion: 'surprised' },
            { speaker: '이무기', text: '벌써 — 깨어나시는 건가요. 흥미롭네요.', emotion: 'smile' },
            { speaker: '', text: '하지만 — 빛이, 너무 약하다.' },
            { speaker: '', text: '그것은, 한순간 — 꺼진다.' },
            { speaker: '어둑시니', text: '...!', condition: { flag: 'ch4_eoduksini_in' }, emotion: 'surprised' },
        ],
        setFlags: { protagonist_first_spark: true },
        next: 'ch4_overwhelmed'
    },

    ch4_overwhelmed: {
        image: 'assets/images/ch4_imugi_combat.png',
        characters: { center: { char: 'imugi' } },
        dialogue: [
            { speaker: '이무기', text: '아직 — 깨지 않은 분에게는, 너무 — 빠른 일이지요.', emotion: 'smile' },
            { speaker: '', text: '이무기가, 다시 손을 든다.' },
            { speaker: '', text: '이번엔 — 더 강하게.' },
            { speaker: '', text: '카페의 바닥이 — 갈라진다.' },
            { speaker: '', text: '벽이 — 무너진다.' },
            { speaker: '', text: '동료들이 — 흩어진다. 닿을 수 없게.' },
            { speaker: '하은', text: '...!', condition: { flag: 'ch4_haeun_in' }, emotion: 'sad' },
            { speaker: '서연', text: '...아!', condition: { flag: 'ch4_seoyeon_in' }, emotion: 'sad' },
            { speaker: '', text: '몸이 — 들린다. 보이지 않는 손이, 나를, 천천히, 들어 올린다.' },
            { speaker: '', text: '이무기가 — 천천히, 다가온다.' },
            { speaker: '이무기', text: '...아쉽네요. 이렇게 — 끝내려니.', emotion: 'smile' },
            { speaker: '이무기', text: '어쩔 수 — 없지요. 당신이, 거절을 — 하셨으니까요.' },
            { speaker: '', text: '...죽는다.' },
            { speaker: '', text: '그 단어가, 처음으로 — 사실의 무게로 다가온다.' },
        ],
        next: 'ch4_savior_appears'
    },

    // ==========================================
    //  5막: 누군가가 — 등장한다
    // ==========================================

    ch4_savior_appears: {
        image: 'assets/images/ch4_jeonwoochi_arrival.png',
        imageEffect: 'ken-burns',
        bgm: 'ch4_hero',
        dialogue: [
            { speaker: '', text: '...' },
            { speaker: '', text: '그때.' },
            { speaker: '', text: '카페의 — 천장이.' },
            { speaker: '', text: '깨진다.' },
            { speaker: '', text: '한 사람이 — 그 사이로, 떨어져 내린다.' },
            { speaker: '', text: '바람을 두르고. 푸른 빛을 두르고.' },
            { speaker: '', text: '이무기와 — 나 사이에, 정확히 착지한다.' },
            { speaker: '???', text: '...오랜만이군, 뱀.' },
            { speaker: '???', text: '천 년쯤 — 됐나.' },
            { speaker: '이무기', text: '...!', emotion: 'surprised' },
            { speaker: '이무기', text: '...당신이군요.', emotion: 'serious' },
            { speaker: '이무기', text: '...전우치 — 그분.', emotion: 'serious' },
            { speaker: '', text: '...!' },
            { speaker: '', text: '전우치.' },
            { speaker: '', text: '머릿속에서, 한 번 더 — 그 이름이, 종처럼, 울린다.' },
            { speaker: '', text: '그리고, 무언가 — 깊은 데서, 뜨거워진다.' },
        ],
        next: 'ch4_cliffhanger'
    },

    ch4_cliffhanger: {
        image: 'assets/images/ch4_jeonwoochi_arrival.png',
        dialogue: [
            { speaker: '', text: '남자.' },
            { speaker: '', text: '얼굴은 — 보이지 않는다. 그의 등 뒤로 — 푸른 빛이, 너무 강하다.' },
            { speaker: '', text: '하지만, 한 가지는 안다.' },
            { speaker: '', text: '그가, 나를 — 구하러 왔다는 것.' },
            { speaker: '', text: '...' },
            { speaker: '', text: '제4장 — 끝.' },
        ],
        setFlags: { ch4_jeonwoochi_arrived: true },
        next: 'ch4_final'
    },

    ch4_final: {
        image: 'assets/images/ch4_jeonwoochi_arrival.png',
        showFlowchart: 'ch4',
        dialogue: [],
        next: 'ch5_intro',
    },
};

// ==========================================
//  제4장 플로우차트
// ==========================================

const FLOWCHARTS_CH4 = {
    ch4: {
        episode: '제4장',
        title: '천 년의 그림자',
        tree: [
            { type: 'story', text: '카페에 숨다 — 동료들과의 대화' },
            { type: 'choice', label: '다음 행동', sceneId: 'ch4_planning',
              branches: [
                  { text: '지도를 살핀다 → 사신' },
                  { text: '카페를 뒤진다 → 관찰자의 노트' },
                  { text: '함께 휴식 → 호감도' },
              ]
            },
            { type: 'story', text: '이무기 — 카페에 등장' },
            { type: 'story', text: '천 년의 한 / 서울 정화 / 승천 계획' },
            { type: 'choice', label: '응답', sceneId: 'ch4_choice',
              branches: [
                  { text: '거절' },
                  { text: '시간을 끌다' },
                  { text: '침묵하며 동료를 지킨다' },
              ]
            },
            { type: 'story', text: '압도적 절망 — 첫 도술의 불꽃' },
            { type: 'story', text: '...전우치 등장' },
            { type: 'story', text: '제4장 — 끝' },
        ],
    },
};
