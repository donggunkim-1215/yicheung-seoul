/**
 * 이층 : 서울, 0시 — 제8장: 키다리의 길목
 * 그슨대 조우 — 종묘 옆 약방, 자료벽 주인 이향과의 만남
 */

const SCENES_CH8 = {

    // ==========================================
    //  0막: 종묘로 가는 길
    // ==========================================

    ch8_intro: {
        chapter: { number: '제8장', title: '키다리의 길목' },
        image: 'assets/images/ch8_seoul_old_road.png',
        imageEffect: 'ken-burns',
        bgm: 'ch8',
        dialogue: [
            { speaker: '', text: '종로의 옛 거리.' },
            { speaker: '', text: '한복을 파는 가게, 약초 파는 가게, 인사동 풍경의 골목.' },
            { speaker: '', text: '여기도, 사람만, 없다.' },
            { speaker: '', text: '거리 끝에, 종묘의 — 정문이, 보인다.' },
        ],
        next: 'ch8_status'
    },

    ch8_status: {
        image: 'assets/images/ch8_seoul_old_road.png',
        setFlagsIf: [
            { condition: { flag: 'ch7_haeun_in' },     flags: { ch8_haeun_in: true } },
            { condition: { flag: 'ch7_seoyeon_in' },   flags: { ch8_seoyeon_in: true } },
            { condition: { flag: 'ch7_eoduksini_in' }, flags: { ch8_eoduksini_in: true } },
            { condition: { flag: 'ch7_pet_cat' },      flags: { ch8_pet_cat: true } },
            { condition: { flag: 'ch7_pet_dog' },      flags: { ch8_pet_dog: true } },
        ],
        next: 'ch8_walking_old'
    },

    ch8_walking_old: {
        image: 'assets/images/ch8_seoul_old_road.png',
        characters: {
            left:  { char: 'jeonwoochi' },
            right: { char: 'haeun',   condition: { flag: 'ch8_haeun_in' } },
        },
        dialogue: [
            { speaker: '전우치', text: '...곧, 나타날 — 거예요.', emotion: 'serious' },
            { speaker: '하은', text: '그슨대요?', condition: { flag: 'ch8_haeun_in' }, emotion: 'worried' },
            { speaker: '전우치', text: '키가 — 거의, 5미터 — 가까이 — 돼요.', emotion: 'serious' },
            { speaker: '전우치', text: '그 친구가, 길을 — 막아서면 — 그 골목은, 통과하기 — 불가능해져요.' },
            { speaker: '전우치', text: '굳이 — 정면에서, 싸우지 — 말고. 다른 — 방법, 찾는 게 — 좋아요.' },
            { speaker: '서연', text: '근데... 이무기 부하면, 무서운 거 아니에요?', condition: { flag: 'ch8_seoyeon_in' }, emotion: 'worried' },
            { speaker: '전우치', text: '무섭다기보다는 — 이상한, 친구예요. 이무기 — 그 친구가, 직접 — 부린 게 아니라 — 빌붙어, 사는 — 거거든요.' },
            { speaker: '전우치', text: '잘 — 이야기하면, 길을 — 비켜줄 수도, 있어요.' },
        ],
        next: 'ch8_appearance'
    },

    // ==========================================
    //  1막: 그슨대 — 등장
    // ==========================================

    ch8_appearance: {
        image: 'assets/images/ch8_geuseundae_appear.png',
        imageEffect: 'ken-burns',
        bgm: 'ch8_tense',
        characters: {
            center: { char: 'geuseundae', emotion: 'neutral' },
        },
        dialogue: [
            { speaker: '', text: '...' },
            { speaker: '', text: '거리의, 끝.' },
            { speaker: '', text: '건물의 — 지붕보다도, 더, 높은 곳에서.' },
            { speaker: '', text: '얼굴이, 내려온다.' },
            { speaker: '', text: '거대한, 사람의 얼굴.' },
            { speaker: '', text: '하지만 — 키만, 이상하게, 길다.' },
            { speaker: '', text: '몸이 — 아주 가늘고, 길다.' },
            { speaker: '', text: '5미터쯤. 어쩌면 — 그 이상.' },
            { speaker: '하은', text: '...!!', condition: { flag: 'ch8_haeun_in' }, emotion: 'surprised' },
            { speaker: '서연', text: '키, 키가 — 너무 커요...!', condition: { flag: 'ch8_seoyeon_in' }, emotion: 'surprised' },
            { speaker: '닷냥이', text: '하앗!', condition: { flag: 'ch8_pet_cat' }, emotion: 'surprised' },
            { speaker: '황덕구', text: '컹! 컹!', condition: { flag: 'ch8_pet_dog' }, emotion: 'serious' },
            { speaker: '그슨대', text: '...허억, 허억.', emotion: 'neutral' },
            { speaker: '그슨대', text: '...어디 가니, 작은 것들아.' },
            { speaker: '그슨대', text: '이 길은 — 내 길이야. 통과세를, 내야 해.' },
        ],
        next: 'ch8_dialogue'
    },

    ch8_dialogue: {
        image: 'assets/images/ch8_geuseundae_appear.png',
        characters: {
            center: { char: 'geuseundae' },
        },
        dialogue: [
            { speaker: '전우치', text: '...그슨대.', emotion: 'serious' },
            { speaker: '전우치', text: '이무기 — 그 친구한테, 빌붙어 — 사는, 길의 — 짐승.' },
            { speaker: '그슨대', text: '...허허, 도사 양반.', emotion: 'smile' },
            { speaker: '그슨대', text: '오랜만이지. 천 년 전에도, 한 번 — 말다툼한 적이 있었지요.' },
            { speaker: '전우치', text: '오늘은 — 길만, 비켜주시지요.', emotion: 'smile' },
            { speaker: '그슨대', text: '...안 돼요, 도사.', emotion: 'sad' },
            { speaker: '그슨대', text: '이무기 — 그분이, 약속하셨거든요. 승천하신 후엔, 저를 — 사람으로 만들어주신다고.' },
            { speaker: '그슨대', text: '저는, 천 년을 — 이렇게 — 외롭게, 길에 — 서 있었어요.' },
            { speaker: '그슨대', text: '한 번이라도, 사람의 모습으로 — 살아보고 싶어요.', emotion: 'sad' },
            { speaker: '하은', text: '...구미호도, 그렇게 — 약속받았다고 들었는데.', condition: { flag: 'ch8_haeun_in' }, emotion: 'worried' },
            { speaker: '하은', text: '...당신도, 같은 거예요?', condition: { flag: 'ch8_haeun_in' } },
            { speaker: '그슨대', text: '...!', emotion: 'surprised' },
            { speaker: '그슨대', text: '구미호 — 라뇨? 그분께서, 구미호에게도 — 같은 약속을?', emotion: 'serious' },
        ],
        next: 'ch8_choice'
    },

    // 통과 방법 분기
    ch8_choice: {
        image: 'assets/images/ch8_geuseundae_appear.png',
        characters: {
            center: { char: 'geuseundae' },
        },
        choiceTimer: 8,
        dialogue: [
            { speaker: '', text: '...어떻게 — 그를, 통과할 것인가.' },
        ],
        choices: [
            { text: '"이무기의 — 약속은, 거짓이야. 너에게, 진실을 알려줄게."',
              setFlags: { ch8_persuade: true },
              stats: { wisdom: 2, love: 2 },
              requires: { wisdom: 7 },
              next: 'ch8_persuade_path' },
            { text: '돌아간다 — 다른 길을 찾는다',
              setFlags: { ch8_detour: true },
              stats: { wisdom: 1, calm: 1 },
              next: 'ch8_detour_path' },
            { text: '도사와 함께 — 정면 돌파',
              setFlags: { ch8_combat: true },
              stats: { courage: 5 },
              next: 'ch8_combat_path' },
        ]
    },

    // 설득 분기 (지혜 게이트)
    ch8_persuade_path: {
        image: 'assets/images/ch8_geuseundae_appear.png',
        characters: {
            center: { char: 'geuseundae', emotion: 'serious' },
        },
        dialogue: [
            { speaker: '', text: '"...이무기의 약속은, 거짓이야."' },
            { speaker: '', text: '"구미호한테도 — 같은 약속을 했어. 백 년 전에. 지키지 않았지."' },
            { speaker: '그슨대', text: '...!', emotion: 'surprised' },
            { speaker: '그슨대', text: '...거짓이라뇨?' },
            { speaker: '그슨대', text: '...아, 그래서 — 구미호가, 슬퍼 보이는 건가요?' },
            { speaker: '', text: '"그가 너를 — 사람으로 만들 마음이 있다면, 천 년이나 — 길에 세워뒀을까."' },
            { speaker: '그슨대', text: '...!!', emotion: 'sad' },
            { speaker: '그슨대', text: '...그런 — 생각은, 못 해봤어요.' },
            { speaker: '그슨대', text: '저는 — 그저, 시간이 지나면 — 성취된다고만, 믿어왔거든요.' },
            { speaker: '', text: '그슨대가 — 천천히, 무릎을 — 꿇는다.' },
            { speaker: '', text: '그 거대한 키가, 줄어든다.' },
            { speaker: '', text: '한 — 사람의 — 키만큼.' },
            { speaker: '그슨대', text: '...길을, 비켜드릴게요. 도사 양반, 저는 — 따라가지 않을게요.', emotion: 'sad' },
            { speaker: '그슨대', text: '하지만, 약속해주세요. 이무기가, 정말로 — 거짓을 했다면.' },
            { speaker: '그슨대', text: '...그를, 막아주세요.', emotion: 'serious' },
        ],
        setFlags: { geuseundae_persuaded: true },
        next: 'ch8_arrive_yakbang'
    },

    // 우회 분기
    ch8_detour_path: {
        image: 'assets/images/ch8_seoul_alley.png',
        dialogue: [
            { speaker: '', text: '"...뒤로, 빠지자. 다른 길을 찾자."' },
            { speaker: '', text: '천천히, 거리를 — 두고. 옆 골목으로.' },
            { speaker: '', text: '그슨대는 — 따라오지 않는다.' },
            { speaker: '', text: '그것의 영역은 — 그 한 길뿐인 듯하다.' },
            { speaker: '', text: '하지만, 시간이 — 두 배쯤, 걸린다.' },
            { speaker: '', text: '미로 같은 옛 골목을, 한참 — 헤매고 — 또 헤맨다.' },
            { speaker: '하은', text: '...해가 떴어. 그새.', condition: { flag: 'ch8_haeun_in' }, emotion: 'worried' },
            { speaker: '서연', text: '시간을, 너무 — 많이 썼어요.', condition: { flag: 'ch8_seoyeon_in' }, emotion: 'worried' },
        ],
        setFlags: { ch8_lost_time: true },
        next: 'ch8_arrive_yakbang'
    },

    // 정면 전투
    ch8_combat_path: {
        image: 'assets/images/ch8_combat.png',
        imageEffect: 'ken-burns',
        bgm: 'ch8_combat',
        characters: {
            left:  { char: 'jeonwoochi', emotion: 'serious' },
            center: { char: 'geuseundae', emotion: 'serious' },
        },
        dialogue: [
            { speaker: '', text: '"전우치 도사. 함께, 막아."' },
            { speaker: '전우치', text: '오, 뜻이 — 단단하시네요. (씩 웃으며)', emotion: 'smile' },
            { speaker: '전우치', text: '저도 — 거기에, 맞춰드릴게요.' },
            { speaker: '', text: '도사가 — 손을 든다.' },
            { speaker: '', text: '푸른 빛이, 손바닥 가운데에 — 모인다.' },
            { speaker: '전우치', text: '"바람의 검 — 청풍검!"', emotion: 'serious' },
            { speaker: '', text: '바람의 검이, 그슨대의 — 발목을 — 친다.' },
            { speaker: '', text: '거대한 키가, 휘청.' },
            { speaker: '그슨대', text: '...허, 허, 도사. 이러시면, 안 되지요.', emotion: 'serious' },
            { speaker: '', text: '그슨대의 손이 — 위에서, 내려온다.' },
            { speaker: '', text: '집을 부수고도 남을, 거대한 손.' },
            { speaker: '', text: '본능적으로 — 손을, 든다.' },
            { speaker: '', text: '푸른 빛이, 작게 — 다시, 나온다.' },
            { speaker: '', text: '내 손에서, 한 줄기.' },
            { speaker: '', text: '도사가, — 깜짝, 옆을 본다.' },
            { speaker: '전우치', text: '...!!', emotion: 'surprised' },
            { speaker: '', text: '두 줄기의 푸른 빛이 — 그슨대의 손을, 막아낸다.' },
            { speaker: '그슨대', text: '...두 사람? 두 사람이, 도사야?', emotion: 'surprised' },
        ],
        setFlags: { dosul_combat_first: true },
        next: 'ch8_combat_resolve'
    },

    ch8_combat_resolve: {
        image: 'assets/images/ch8_combat.png',
        characters: {
            left:  { char: 'jeonwoochi' },
            center: { char: 'geuseundae' },
        },
        dialogue: [
            { speaker: '그슨대', text: '...아, 안 되겠어요.', emotion: 'sad' },
            { speaker: '그슨대', text: '천 년 만의, 두 도사. 이무기 — 그분도, 이건 — 예상하지 못하셨을 거예요.' },
            { speaker: '', text: '그슨대가 — 천천히, 한 발 — 뒤로 — 물러난다.' },
            { speaker: '그슨대', text: '오늘은 — 패배입니다. 길을, 비켜드릴게요.' },
            { speaker: '그슨대', text: '하지만, 도사 양반들 — 이건, 알아두세요.' },
            { speaker: '그슨대', text: '이무기 — 그분의, 진짜 힘은, 아직 — 보이지 않은 거예요.' },
            { speaker: '그슨대', text: '저 같은 종의 부하가, 더 있어요.' },
            { speaker: '그슨대', text: '특히 — 강철이.' },
            { speaker: '그슨대', text: '그 자가, 다음에 — 너희를 막을 거예요.', emotion: 'serious' },
        ],
        setFlags: { learned_gangcheoli_warning: true },
        next: 'ch8_arrive_yakbang'
    },

    // ==========================================
    //  2막: 종묘 옆, 약방
    // ==========================================

    ch8_arrive_yakbang: {
        image: 'assets/images/ch8_yakbang_outside.png',
        imageEffect: 'ken-burns',
        bgm: 'ch8',
        dialogue: [
            { speaker: '', text: '종묘.' },
            { speaker: '', text: '오백 년 묵은 — 침묵의 자리.' },
            { speaker: '', text: '그 옆 — 작은 골목 안.' },
            { speaker: '', text: '낡은 나무 간판. "향(香)약방."' },
            { speaker: '', text: '문이 — 살짝, 열려 있다.' },
            { speaker: '', text: '안에서, 차 향기가 — 흘러나온다.' },
            { speaker: '전우치', text: '...여기가, 그 — 분의 — 자리예요.', emotion: 'smile' },
            { speaker: '하은', text: '들어가도 돼요?', condition: { flag: 'ch8_haeun_in' }, emotion: 'worried' },
            { speaker: '전우치', text: '문을 — 살짝, 열어두신 — 걸 보면. 우리를, 기다리신 — 거예요.', emotion: 'smile' },
        ],
        next: 'ch8_meet_observer'
    },

    ch8_meet_observer: {
        image: 'assets/images/ch8_yakbang_inside.png',
        imageEffect: 'ken-burns',
        dialogue: [
            { speaker: '', text: '안.' },
            { speaker: '', text: '벽 가득한 — 약초 서랍. 한쪽 벽에는 — 작은 부적들. 반대쪽 벽에는 — 신문 스크랩과 사진.' },
            { speaker: '', text: '...어디서 본 — 풍경이다.' },
            { speaker: '', text: '카페에서 봤던, "자료벽."' },
            { speaker: '', text: '그것의 — 원본이, 여기 있다. 훨씬, 더 — 정교하게.' },
            { speaker: '', text: '낮은 의자에, 한 — 노부인이 앉아 있다.' },
            { speaker: '', text: '머리는 백발. 한복은, 정갈하다.' },
            { speaker: '', text: '눈은 — 흐린데도, 너무 — 깊다.' },
            { speaker: '', text: '나를 본다.' },
            { speaker: '', text: '그리고, 작게 — 미소.' },
            { speaker: '???', text: '...오셨네.', emotion: 'smile' },
            { speaker: '???', text: '50년 만이에요.' },
        ],
        next: 'ch8_observer_intro'
    },

    ch8_observer_intro: {
        image: 'assets/images/ch8_yakbang_inside.png',
        dialogue: [
            { speaker: '???', text: '...이향이라고 해요. 그냥, 그렇게 — 부르세요.', emotion: 'smile' },
            { speaker: '이향', text: '50년 — 기다렸어요.' },
            { speaker: '이향', text: '아니, 정확히는 — 90년쯤. 제 — 할머니가, 처음 — 이무기의 봉인이 풀릴 거라는 — 예언을 하셨거든요.' },
            { speaker: '이향', text: '그분이 돌아가신 후, 제 어머니가 — 그 일을, 이어 받으셨고.' },
            { speaker: '이향', text: '그리고 — 저예요. 3대째.' },
            { speaker: '이향', text: '오늘 — 마침내, 만나뵙는군요.' },
            { speaker: '하은', text: '...3대요? 무당의 — 3대?', condition: { flag: 'ch8_haeun_in' }, emotion: 'surprised' },
            { speaker: '이향', text: '맞아요.', emotion: 'smile' },
            { speaker: '이향', text: '천 년 전 봉인의 — 도술의 한 자락이, 제 외할머니께 — 깃들었거든요.' },
            { speaker: '이향', text: '그 도술이, 봉인이 풀릴 시기를 — 예언하셨어요.' },
        ],
        setFlags: { met_lee_hyang: true },
        next: 'ch8_observer_speaks'
    },

    ch8_observer_speaks: {
        image: 'assets/images/ch8_yakbang_inside.png',
        dialogue: [
            { speaker: '이향', text: '...당신을, 알아요.', emotion: 'serious' },
            { speaker: '', text: '이향의 시선이, 정확히 — 나에게로.' },
            { speaker: '이향', text: '제 외할머니께서, 50년 전에 — 한 번, 말씀하신 적이 있어요.' },
            { speaker: '이향', text: '"훗날, 한 사람이 — 이 자리에 와. 그 사람은 — 자기 이름조차, 잊고 있을 거다"라고.' },
            { speaker: '이향', text: '"그를 보면, 너무 — 캐묻지 마라. 시간이 — 가르쳐줄 거다"라고.' },
            { speaker: '', text: '...!' },
            { speaker: '', text: '심장이, 또 — 한 박자, 다르게.' },
            { speaker: '하은', text: '...무슨 말씀이세요? 누구를 — 잊었다는 거예요?', condition: { flag: 'ch8_haeun_in' }, emotion: 'worried' },
            { speaker: '이향', text: '...글쎄요. 그건, 시간이 — 답을 줄 일이지요.', emotion: 'smile' },
            { speaker: '전우치', text: '(작게) ...할머님은, 다 — 알고 — 계셨어요?', emotion: 'sad' },
            { speaker: '이향', text: '도사 양반.', emotion: 'smile' },
            { speaker: '이향', text: '제 — 외할머니가, 마지막 봉인의 도술을 — 받아드린 분이에요.' },
            { speaker: '이향', text: '그분께, 당신이 — 마지막 인사를 하셨던 자리, 기억하시지요?', emotion: 'sad' },
            { speaker: '전우치', text: '...기억하지요. 100년이 흘렀어도.', emotion: 'sad' },
        ],
        setFlags: { protagonist_secret_deeper: true },
        next: 'ch8_observer_offers'
    },

    ch8_observer_offers: {
        image: 'assets/images/ch8_yakbang_inside.png',
        dialogue: [
            { speaker: '이향', text: '...자, 시간이 — 별로 없어요.', emotion: 'serious' },
            { speaker: '이향', text: '제가 가진 것, 전부 — 드릴게요.' },
            { speaker: '이향', text: '50년 동안, 모은 — 자료. 사신의 위치. 이무기의 행적. 구미호의 사연.' },
            { speaker: '이향', text: '특히 — 사신의 위치는, 내일 — 새벽까지만, 정확합니다.' },
            { speaker: '이향', text: '그 후에는 — 그들도, 다른 곳으로, 움직일 거예요.' },
            { speaker: '이향', text: '내일 안으로, 사신을 — 모으세요.' },
        ],
        choices: [
            { text: '"...감사합니다. 우리는, 무엇을 — 갚을 수 있을까요?"',
              setFlags: { ch8_grateful: true },
              stats: { love: 3 },
              affinity: { jeonwoochi: 3 },
              next: 'ch8_grateful_path' },
            { text: '"...어떻게, 당신을 믿을 수 있죠? 의심부터, 해야 합니다."',
              setFlags: { ch8_doubted: true },
              stats: { wisdom: 3 },
              next: 'ch8_doubt_path' },
            { text: '"...당신도, 같이 가요. 함께 — 싸우자."',
              setFlags: { ch8_invited: true },
              stats: { courage: 2 },
              next: 'ch8_invite_path' },
        ]
    },

    ch8_grateful_path: {
        image: 'assets/images/ch8_yakbang_inside.png',
        dialogue: [
            { speaker: '이향', text: '...착하셔라.', emotion: 'smile' },
            { speaker: '이향', text: '갚을 일이 — 따로, 없어요.' },
            { speaker: '이향', text: '저는, 그냥 — 제 가문의, 100년의 의무를 — 다 한 거예요.' },
            { speaker: '이향', text: '...다만, 한 가지. 이긴 후에 — 그 의무에서, 우리 가문을 — 풀어주세요.', emotion: 'sad' },
            { speaker: '이향', text: '제 손녀까지, 이걸 — 짊어지게 하고 싶지는 않아요.' },
        ],
        setFlags: { ch8_lee_hyang_blessed: true },
        next: 'ch8_observer_gives'
    },

    ch8_doubt_path: {
        image: 'assets/images/ch8_yakbang_inside.png',
        dialogue: [
            { speaker: '이향', text: '...흠, 흠.', emotion: 'smile' },
            { speaker: '이향', text: '의심, 좋은 자세예요. 이런 시기엔.' },
            { speaker: '이향', text: '하지만 — 제 외할머니가, 도사 양반과 — 같이 — 봉인을 만든 사이라는 건, 도사가 — 보장하실 거예요.' },
            { speaker: '전우치', text: '...맞아요.', emotion: 'smile' },
            { speaker: '전우치', text: '이향 — 할머님은, 제 — 친구예요. 100년이 — 지나도, 변치 — 않은.' },
        ],
        next: 'ch8_observer_gives'
    },

    ch8_invite_path: {
        image: 'assets/images/ch8_yakbang_inside.png',
        dialogue: [
            { speaker: '이향', text: '...허허.', emotion: 'smile' },
            { speaker: '이향', text: '이 — 80 넘은 노인이, 어떻게 — 싸우러 나가요.' },
            { speaker: '이향', text: '하지만 — 마음만큼은, 함께해요. 정말로요.', emotion: 'sad' },
            { speaker: '이향', text: '제 자리에서 — 부적을, 만들어드릴게요. 그게, 제가 — 할 수 있는 일이에요.' },
        ],
        setFlags: { ch8_lee_hyang_blessed: true, ch8_received_charms: true },
        next: 'ch8_observer_gives'
    },

    ch8_observer_gives: {
        image: 'assets/images/ch8_yakbang_inside.png',
        dialogue: [
            { speaker: '', text: '이향이 — 낡은 종이 한 장을 — 꺼낸다.' },
            { speaker: '', text: '서울 지도. 옛 한양의 지도.' },
            { speaker: '', text: '동·서·남·북, 각각의 자리에 — 작은 표시.' },
            { speaker: '이향', text: '...동에는 — 청룡. 강남의 한 카페에, 학자로 — 살고 있어요.', emotion: 'serious' },
            { speaker: '이향', text: '서에는 — 백호. 한강 어귀의, 어느 검도장.' },
            { speaker: '이향', text: '남에는 — 주작. 명동의, 작은 무당집.' },
            { speaker: '이향', text: '북에는 — 현무. 그건 — 이미, 만나신 줄로 알아요.' },
            { speaker: '이향', text: '내일 — 새벽까지. 서두르세요.' },
            { speaker: '이향', text: '한 분도 모이지 못하시면 — 이무기를, 막을 수 없어요.' },
            { speaker: '이향', text: '두 분 이상은, 꼭 — 모으셔야 해요.' },
        ],
        setFlags: { received_sashin_locations: true },
        next: 'ch8_aftermath'
    },

    // ==========================================
    //  3막: 약방을 — 떠나며
    // ==========================================

    ch8_aftermath: {
        image: 'assets/images/ch8_seoul_dusk.png',
        bgm: 'ch8',
        characters: {
            left:  { char: 'jeonwoochi' },
            right: { char: 'haeun',     condition: { flag: 'ch8_haeun_in' } },
        },
        dialogue: [
            { speaker: '', text: '약방을 떠난다.' },
            { speaker: '', text: '바깥은, 어느새 — 노을이다.' },
            { speaker: '', text: '하루가 — 다, 갔다.' },
            { speaker: '', text: '내일 새벽까지 — 사신을, 모아야 한다.' },
            { speaker: '', text: '시간이 — 너무, 짧다.' },
            // 분기별 회상
            { speaker: '', text: '...그슨대를, 설득했다. 한 짐승의 마음을, 돌렸다.', condition: { flag: 'geuseundae_persuaded' } },
            { speaker: '', text: '...우회했다. 시간을 — 잃었지만, 안전했다.', condition: { flag: 'ch8_lost_time' } },
            { speaker: '', text: '...정면 돌파했다. 도술의 — 첫 — 진짜 발현.', condition: { flag: 'dosul_combat_first' } },
            // 떡밥
            { speaker: '', text: '이향 할머님의 말씀이 — 머릿속에서, 떠나지 않는다.' },
            { speaker: '', text: '"한 사람이 — 자기 이름조차, 잊고 있을 거다."' },
            { speaker: '', text: '...그게, 누구지?' },
            // 동료 대화
            { speaker: '하은', text: '...우리, 어디부터 — 가야 해?', condition: { flag: 'ch8_haeun_in' }, emotion: 'worried' },
            { speaker: '전우치', text: '...오늘 밤은 — 우선, 휴식. 내일 — 새벽부터, 사신을 — 모을게요.', emotion: 'serious' },
            { speaker: '전우치', text: '근데 — 그 전에, 한 가지 — 마음의, 준비를요.' },
            { speaker: '전우치', text: '...구미호가, 다시 — 나타날, 가능성이 — 높거든요.', emotion: 'serious' },
            { speaker: '', text: '...구미호.' },
            { speaker: '', text: '제8장 — 끝.' },
        ],
        next: 'ch8_final'
    },

    ch8_final: {
        image: 'assets/images/ch8_seoul_dusk.png',
        showFlowchart: 'ch8',
        dialogue: [],
        next: 'ch9_intro',
    },
};

// ==========================================
//  제8장 플로우차트
// ==========================================

const FLOWCHARTS_CH8 = {
    ch8: {
        episode: '제8장',
        title: '키다리의 길목',
        tree: [
            { type: 'story', text: '종묘 가는 길 — 그슨대 등장' },
            { type: 'choice', label: '키다리의 통과', sceneId: 'ch8_choice',
              branches: [
                  { text: '설득 (지혜 게이트)' },
                  { text: '우회' },
                  { text: '정면 돌파 — 도술 발현' },
              ]
            },
            { type: 'story', text: '향(香)약방 — 이향과의 만남' },
            { type: 'story', text: '이향, 외할머니 3대의 추적자' },
            { type: 'choice', label: '이향에 대한 응답', sceneId: 'ch8_observer_offers',
              branches: [
                  { text: '감사' },
                  { text: '의심' },
                  { text: '동행 권유' },
              ]
            },
            { type: 'story', text: '사신의 위치 — 내일 새벽까지' },
            { type: 'story', text: '제8장 — 끝' },
        ],
    },
};
