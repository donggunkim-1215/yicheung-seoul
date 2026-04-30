/**
 * 이층 : 서울, 0시 — 제9장: 거짓 위에 자란 마음
 * 구미호 재회 — 가스라이팅의 진실, 동료화 가능 분기
 */

const SCENES_CH9 = {

    // ==========================================
    //  0막: 노을의 — 짧은 — 휴식
    // ==========================================

    ch9_intro: {
        chapter: { number: '제9장', title: '거짓 위에 자란 마음' },
        image: 'assets/images/ch9_dusk_park.png',
        imageEffect: 'ken-burns',
        bgm: 'ch9',
        dialogue: [
            { speaker: '', text: '약방을 — 떠난 후.' },
            { speaker: '', text: '낮은 — 다, 끝나가고 있다.' },
            { speaker: '', text: '도사가 — 안내한, 작은 공원.' },
            { speaker: '', text: '오래된 정자 하나. 거기서, 잠시 — 쉬기로 한다.' },
        ],
        next: 'ch9_status'
    },

    ch9_status: {
        image: 'assets/images/ch9_dusk_park.png',
        setFlagsIf: [
            { condition: { flag: 'ch8_haeun_in' },     flags: { ch9_haeun_in: true } },
            { condition: { flag: 'ch8_seoyeon_in' },   flags: { ch9_seoyeon_in: true } },
            { condition: { flag: 'ch8_eoduksini_in' }, flags: { ch9_eoduksini_in: true } },
            { condition: { flag: 'ch8_pet_cat' },      flags: { ch9_pet_cat: true } },
            { condition: { flag: 'ch8_pet_dog' },      flags: { ch9_pet_dog: true } },
        ],
        next: 'ch9_pause'
    },

    ch9_pause: {
        image: 'assets/images/ch9_pavilion.png',
        characters: {
            left:  { char: 'jeonwoochi' },
            right: { char: 'haeun',     condition: { flag: 'ch9_haeun_in' } },
        },
        dialogue: [
            { speaker: '', text: '동료들의 얼굴이 — 보인다.' },
            { speaker: '', text: '지치고, 두려운 — 그러나, 함께 — 있는 사람들.' },
            { speaker: '', text: '도사는 — 다시, 차를 끓이고 있다.' },
            { speaker: '하은', text: '...오늘 밤은, 진짜로 — 푹 자야겠어.', condition: { flag: 'ch9_haeun_in' }, emotion: 'sad' },
            { speaker: '서연', text: '저, 사신 — 진짜로, 모을 수 있을까요?', condition: { flag: 'ch9_seoyeon_in' }, emotion: 'worried' },
            { speaker: '전우치', text: '두 분 — 만 모셔도, 충분해요.', emotion: 'smile' },
            { speaker: '전우치', text: '근데 — 두 분도, 쉽게는 — 안 — 따라와주세요.' },
            { speaker: '전우치', text: '특히 — 자기가, 영물인 — 줄도, 모르시는 — 분들이라.' },
        ],
        next: 'ch9_visitor_appears'
    },

    // ==========================================
    //  1막: 노을의 — 그림자가, 길어진다
    // ==========================================

    ch9_visitor_appears: {
        image: 'assets/images/ch9_pavilion.png',
        dialogue: [
            { speaker: '', text: '그때.' },
            { speaker: '', text: '바람이 — 한 자락, 다르게 — 분다.' },
            { speaker: '', text: '도사가, 컵을 — 내려놓는다.' },
            { speaker: '전우치', text: '...오셨네요.', emotion: 'serious' },
            { speaker: '닷냥이', text: '...!', condition: { flag: 'ch9_pet_cat' }, emotion: 'serious' },
            { speaker: '황덕구', text: '컹!', condition: { flag: 'ch9_pet_dog' }, emotion: 'serious' },
            { speaker: '', text: '정자의 — 입구에.' },
            { speaker: '', text: '한 — 아름다운 — 그림자가, 천천히 — 들어선다.' },
            { speaker: '', text: '검은 머리. 검은 옷.' },
            { speaker: '', text: '...구미호.' },
        ],
        next: 'ch9_gumiho_appears'
    },

    ch9_gumiho_appears: {
        image: 'assets/images/ch9_gumiho_visit.png',
        characters: {
            center: { char: 'gumiho', emotion: 'sad' },
        },
        dialogue: [
            { speaker: '구미호', text: '...오랜만이에요.', emotion: 'sad' },
            { speaker: '', text: '여자는 — 종로에서, 봤을 때보다 — 더, 지쳐 있다.' },
            { speaker: '', text: '얼굴은 — 여전히 아름답지만, 그 — 아래의 무언가가, 흩어지고 — 있다.' },
            { speaker: '구미호', text: '그분께서, 보내셨어요.', emotion: 'sad' },
            { speaker: '구미호', text: '내일 — 자정에, 한강 — 어귀에서 — 의식을, 마치신답니다.' },
            { speaker: '구미호', text: '그 자리에 — 당신을, 모셔 — 오라고요.' },
            { speaker: '', text: '...하지만, 그녀는 나를 — 본다.' },
            { speaker: '', text: '오래 본 — 사람을, 다시 — 보는 — 그 눈빛으로.' },
            { speaker: '하은', text: '...너, 우리한테 — 또, 거짓 — 하러 온 거야?', condition: { flag: 'ch9_haeun_in' }, emotion: 'worried' },
            { speaker: '구미호', text: '...아니에요.', emotion: 'sad' },
            { speaker: '구미호', text: '아니, 어쩌면 — 그렇기도, 하고요.' },
            { speaker: '구미호', text: '저는 — 명령받았으니까요.' },
            { speaker: '구미호', text: '하지만 — 가는 길에, 잠시 — 한 마디, 하고 — 싶었어요.' },
            { speaker: '구미호', text: '...당신을, 자꾸 — 보면.', emotion: 'sad' },
            { speaker: '구미호', text: '천 년 — 전의 — 한 분이, 자꾸 — 떠올라서요.' },
        ],
        next: 'ch9_first_choice'
    },

    // 첫 번째 분기 — 구미호를 어떻게 대할 것인가
    ch9_first_choice: {
        image: 'assets/images/ch9_gumiho_visit.png',
        characters: {
            center: { char: 'gumiho' },
        },
        dialogue: [
            { speaker: '구미호', text: '...들어 — 주실래요?', emotion: 'sad' },
        ],
        choices: [
            { text: '"...들을게요. 무슨 — 말을, 하고 싶어요?"',
              setFlags: { ch9_listened: true },
              stats: { love: 2 },
              next: 'ch9_listen_path' },
            { text: '"...당신, 우리한테 — 거짓을 했잖아. 왜 다시 — 와?"',
              setFlags: { ch9_confronted: true },
              stats: { courage: 3 },
              next: 'ch9_confront_path' },
            // 7장에서 진실 알면 가능한 분기
            { text: '"...당신이 사랑한 — 그 사람, 죽지 않았어. 봉인된 거야."',
              setFlags: { ch9_revealed_first: true },
              stats: { wisdom: 3 },
              requires: { wisdom: 9 },
              next: 'ch9_truth_first' },
        ]
    },

    ch9_listen_path: {
        image: 'assets/images/ch9_gumiho_visit.png',
        characters: {
            center: { char: 'gumiho', emotion: 'sad' },
        },
        dialogue: [
            { speaker: '구미호', text: '...착하셔라.', emotion: 'sad' },
            { speaker: '구미호', text: '제가 — 사랑한, 분이 — 계셨어요.' },
            { speaker: '구미호', text: '천 년 — 전, 어느 — 가을이었어요.' },
            { speaker: '구미호', text: '그 — 분은, 인간 — 도사였어요. 종이에 — 도술의 매듭을, 그리시고. 사람을 — 지키는, 일을 — 하시던 분.' },
            { speaker: '구미호', text: '제가 — 처음, 그 — 분을 — 뵀을 때, 알았어요.' },
            { speaker: '구미호', text: '아, 이 — 분은. 인간이라는, 한정된 — 존재가, 가질 수 있는 — 가장 — 깊은 — 사랑을, 아시는 — 분이다.' },
            { speaker: '구미호', text: '그래서, 저는 — 그 분 — 옆에서, 살고 — 싶었어요.' },
            { speaker: '구미호', text: '구미호로는 — 안 — 되니까. 인간이, 되어야 — 했죠.' },
            { speaker: '구미호', text: '그러면 — 그 — 분 — 옆에서, 평범하게 — 늙어가고, 같이 — 죽을 수 — 있을, 테니까요.', emotion: 'sad' },
            { speaker: '하은', text: '...그래서, 어떻게 됐어요?', condition: { flag: 'ch9_haeun_in' }, emotion: 'sad' },
        ],
        next: 'ch9_gumiho_continues'
    },

    ch9_confront_path: {
        image: 'assets/images/ch9_gumiho_visit.png',
        characters: {
            center: { char: 'gumiho', emotion: 'sad' },
        },
        dialogue: [
            { speaker: '구미호', text: '...맞아요. 거짓을 했어요.', emotion: 'sad' },
            { speaker: '구미호', text: '하지만 — 거짓을 한 — 가장, 큰 사람은, 그분이에요.' },
            { speaker: '구미호', text: '저도 — 거짓에, 속아온 — 사람이거든요.' },
            { speaker: '구미호', text: '...그래서, 저도, 한 마디 — 들려드리고 싶어요.' },
            { speaker: '구미호', text: '왜 — 제가, 그분을 따르는지.' },
            { speaker: '구미호', text: '그러면, 미워해 주세요. 저를. 마음껏.', emotion: 'sad' },
        ],
        next: 'ch9_gumiho_continues'
    },

    ch9_gumiho_continues: {
        image: 'assets/images/ch9_gumiho_visit.png',
        characters: {
            center: { char: 'gumiho' },
        },
        dialogue: [
            { speaker: '구미호', text: '...그 — 분이, 어느 날.', emotion: 'sad' },
            { speaker: '구미호', text: '큰, 봉인을 — 만드시면서. 자기 자신도 — 그 봉인 안에, 함께 — 묻으셨어요.' },
            { speaker: '구미호', text: '아주 — 큰, 짐승을 — 막기 — 위해서요.' },
            { speaker: '구미호', text: '...그 분이, 사라지셨어요. 제 — 품 — 앞에서.' },
            { speaker: '구미호', text: '그날, 저는 — 아홉 — 꼬리를, 다 — 잃을 뻔 — 했어요.' },
            { speaker: '구미호', text: '슬픔이, 그렇게 — 큰 — 거더라고요.' },
            { speaker: '구미호', text: '그 — 후로, 백 년쯤 — 지났을 — 무렵.' },
            { speaker: '구미호', text: '그분께서 — 깨어나, 저에게 — 오셨어요.' },
            { speaker: '구미호', text: '"그자는, 죽은 — 게 아니다. 다만 — 옮겨졌을, 뿐"이라고.', emotion: 'sad' },
            { speaker: '구미호', text: '"내가 — 승천하면, 그자를 — 이층에서, 데려와 — 주마"라고.' },
            { speaker: '구미호', text: '"네가 — 인간이 — 되어, 그자 — 곁에 — 살 수, 있도록 해주마"라고.' },
            { speaker: '구미호', text: '저는 — 그 — 말을, 믿고 — 싶었어요.', emotion: 'sad' },
            { speaker: '구미호', text: '진실보다 — 거짓이, 견디기 — 더, 쉬우니까요.' },
        ],
        next: 'ch9_truth_choice'
    },

    // 두 번째 분기 — 진실을 어떻게 전할 것인가
    ch9_truth_choice: {
        image: 'assets/images/ch9_gumiho_visit.png',
        characters: {
            center: { char: 'gumiho' },
        },
        dialogue: [
            { speaker: '', text: '구미호의 시선이 — 흔들린다.' },
            { speaker: '', text: '그녀는, 아직 — 자기가 무엇을 — 들으러 왔는지, 모르고 있다.' },
            { speaker: '', text: '말 — 한 마디로, 그녀의 — 백 년의, 거짓을 — 무너뜨릴 수, 있다.' },
            { speaker: '', text: '하지만, 그게 — 옳은가.' },
        ],
        choices: [
            { text: '"...당신, 알고 있죠? 그분의 — 약속이, 거짓이라는 걸."',
              setFlags: { ch9_truth_gentle: true },
              stats: { love: 3, wisdom: 2 },
              next: 'ch9_truth_path' },
            { text: '"...그 도사, 죽지 않았어요. 자기 봉인을 한 거예요. 이무기는 — 거짓을 했고요."',
              setFlags: { ch9_truth_blunt: true },
              stats: { courage: 4 },
              next: 'ch9_truth_path' },
            { text: '...아무 말도, 하지 않는다',
              setFlags: { ch9_silence: true },
              stats: { wisdom: 1, calm: 2 },
              next: 'ch9_silence_path' },
        ]
    },

    // 7장에서 진실 알았으면 — 처음에 진실 던지기 (분기 C)
    ch9_truth_first: {
        image: 'assets/images/ch9_gumiho_visit.png',
        characters: {
            center: { char: 'gumiho', emotion: 'surprised' },
        },
        dialogue: [
            { speaker: '구미호', text: '...!', emotion: 'surprised' },
            { speaker: '', text: '구미호의 — 표정이, 한순간 — 무너진다.' },
            { speaker: '', text: '그것은 — 사람의, 표정이다.' },
            { speaker: '', text: '천 년의 — 영험을, 가진 — 짐승의 — 표정이, 아니라.' },
            { speaker: '구미호', text: '...어떻게, 그걸 — 아세요?', emotion: 'sad' },
            { speaker: '구미호', text: '...아, 장산범이군요. 그 — 노친네가, 또 — 약속도 — 없이, 입을 — 열었네요.' },
            { speaker: '구미호', text: '...맞아요. 알아요. 사실은 — 저도, 알아요.', emotion: 'sad' },
            { speaker: '구미호', text: '하지만 — 모른 — 척, 살아왔어요. 백 년을요.' },
            { speaker: '구미호', text: '왜냐하면 — 진실을, 인정하면. 더는 — 살아갈, 이유가 — 없거든요.' },
            { speaker: '구미호', text: '...그분이, 어디 계신지조차 — 모르는데. 어떻게, 사랑한다고 — 말할 수, 있겠어요.', emotion: 'sad' },
        ],
        setFlags: { gumiho_admitted_truth: true },
        next: 'ch9_truth_path'
    },

    // ==========================================
    //  2막: 진실 — 그 무게
    // ==========================================

    ch9_truth_path: {
        image: 'assets/images/ch9_gumiho_breaking.png',
        characters: {
            center: { char: 'gumiho', emotion: 'sad' },
        },
        dialogue: [
            { speaker: '', text: '구미호가 — 무릎을, 천천히, 굽힌다.' },
            { speaker: '', text: '아니, 굽히는 게 아니다 — 무너진다.' },
            { speaker: '', text: '땅에, 한 손을 짚는다. 다른 손은 — 가슴 위에.' },
            { speaker: '구미호', text: '...허, 허, 허, 허, 허.', emotion: 'sad' },
            { speaker: '구미호', text: '...그래요. 알고 — 있었어요. 아주 — 처음부터.' },
            { speaker: '구미호', text: '하지만 — 알고 — 있다고, 인정하는 — 일은. 또, 다른 — 일이거든요.' },
            { speaker: '구미호', text: '저는, 사실 — 그 분이, 사라지신 — 그 가을. 함께 — 죽었어야, 했어요.' },
            { speaker: '구미호', text: '하지만 — 그러지, 못했어요. 짐승은 — 사람보다, 죽기가 — 어렵거든요.', emotion: 'sad' },
            { speaker: '하은', text: '...아, 슬프다.', condition: { flag: 'ch9_haeun_in' }, emotion: 'sad' },
            { speaker: '서연', text: '...그래서, 그분의 거짓을 — 받아들이신 거군요.', condition: { flag: 'ch9_seoyeon_in' }, emotion: 'sad' },
        ],
        next: 'ch9_save_choice'
    },

    // 침묵 분기 — 별도 결말
    ch9_silence_path: {
        image: 'assets/images/ch9_gumiho_visit.png',
        characters: {
            center: { char: 'gumiho', emotion: 'sad' },
        },
        dialogue: [
            { speaker: '', text: '...아무 말도, 하지 않는다.' },
            { speaker: '', text: '구미호가 — 잠시, 나를 — 본다.' },
            { speaker: '구미호', text: '...현명하시네요.', emotion: 'sad' },
            { speaker: '구미호', text: '진실은 — 가끔, 침묵이에요.' },
            { speaker: '구미호', text: '제가 — 듣고 싶지 않은 것을, 강요하지 않으셨어요.' },
            { speaker: '구미호', text: '...고마워요.' },
            { speaker: '구미호', text: '하지만, 제 마음이 — 흔들리는 것을, 막을 수는 없네요.' },
            { speaker: '구미호', text: '저는, 내일 자정에 — 한강 어귀에 가 있을게요.' },
            { speaker: '구미호', text: '거기서 — 결정하세요. 저를, 어떻게 — 할지.', emotion: 'sad' },
            { speaker: '', text: '구미호가 — 천천히, 사라진다.' },
            { speaker: '', text: '바람 한 자락. 그뿐.' },
        ],
        setFlags: { gumiho_left_undecided: true },
        next: 'ch9_aftermath'
    },

    // 구원의 선택
    ch9_save_choice: {
        image: 'assets/images/ch9_gumiho_breaking.png',
        characters: {
            center: { char: 'gumiho' },
        },
        dialogue: [
            { speaker: '', text: '...구미호가, 다시 — 일어선다.' },
            { speaker: '', text: '얼굴은 — 젖었지만, 눈은 — 아직, 흔들린다.' },
            { speaker: '구미호', text: '...자, 저는 — 어떻게 해야 해요? 도사 양반?', emotion: 'sad' },
            { speaker: '구미호', text: '...아니, 당신께 — 묻고 싶어요.', emotion: 'sad' },
        ],
        choices: [
            { text: '"...우리 — 같이 가자. 함께, 그를 막자."',
              setFlags: { ch9_recruited_gumiho: true, gumiho_companion: true },
              stats: { love: 5 },
              affinity: { gumiho: 10 },
              next: 'ch9_recruit_path' },
            { text: '"...당신은, 그분 옆에서 — 떠나줘. 그뿐이야."',
              setFlags: { ch9_asked_to_leave: true, gumiho_neutral: true },
              stats: { wisdom: 2, courage: 2 },
              next: 'ch9_neutral_path' },
            { text: '"...당신이 — 결정해. 우리는 — 강요하지 않을게."',
              setFlags: { ch9_let_decide: true, gumiho_undecided: true },
              stats: { love: 2, wisdom: 2 },
              next: 'ch9_let_decide_path' },
        ]
    },

    ch9_recruit_path: {
        image: 'assets/images/ch9_gumiho_breaking.png',
        characters: {
            center: { char: 'gumiho', emotion: 'surprised' },
        },
        dialogue: [
            { speaker: '구미호', text: '...!', emotion: 'surprised' },
            { speaker: '구미호', text: '...정말로, 그렇게 — 말씀, 하시는 — 거예요?' },
            { speaker: '구미호', text: '저는 — 백 년을, 그분 — 곁에, 있었어요. 그분께 — 큰 빚도, 받았고요.' },
            { speaker: '구미호', text: '그런 — 저를, 받아주신다고요? 적이었던 — 저를?' },
            { speaker: '', text: '"...적은, 우리가 — 만든 게 아니야. 그 사람이, 만든 거잖아."' },
            { speaker: '구미호', text: '...!', emotion: 'sad' },
            { speaker: '구미호', text: '...허, 허, 허. 백 년 — 만에, 처음으로 — 누군가가. 저에게, 그렇게 — 말해주시네요.', emotion: 'sad' },
            { speaker: '', text: '...그녀가, 나를 — 본다.' },
            { speaker: '', text: '천 년 — 묵은 — 짐승의, 눈으로.' },
            { speaker: '', text: '하지만 — 그 안에, 한 — 자락의 — 떨림.' },
            { speaker: '구미호', text: '...당신, 정말 — 신기한 — 분이세요.', emotion: 'sad' },
            { speaker: '구미호', text: '천 년 — 전의 — 그 — 분과, 똑같은 — 결을 — 가지고 — 계세요.' },
            { speaker: '구미호', text: '...같이, 갈게요.' },
            { speaker: '구미호', text: '하지만 — 약속해, 주세요.' },
            { speaker: '구미호', text: '내일 — 자정에, 그분이 — 무너지는 — 자리에서. 제가 — 함께 — 무너져도, 슬퍼하지 — 마세요.' },
            { speaker: '구미호', text: '저는 — 짐승이거든요. 빚은 — 짐승의 — 방식으로, 갚는 — 거예요.', emotion: 'sad' },
            { speaker: '하은', text: '...!', condition: { flag: 'ch9_haeun_in' }, emotion: 'worried' },
            { speaker: '서연', text: '구미호 — 같이, 갈 수 있는 — 다른 길이, 있을 거예요.', condition: { flag: 'ch9_seoyeon_in' }, emotion: 'serious' },
            { speaker: '구미호', text: '...그래요. 그건 — 같이, 찾아봅시다.', emotion: 'smile' },
        ],
        addCompanion: {
            id: 'gumiho',
            name: '구미호',
            portrait: 'assets/images/portraits/gumiho_neutral.png',
            affinity: 10,
        },
        next: 'ch9_aftermath'
    },

    ch9_neutral_path: {
        image: 'assets/images/ch9_gumiho_breaking.png',
        characters: {
            center: { char: 'gumiho', emotion: 'sad' },
        },
        dialogue: [
            { speaker: '구미호', text: '...떠난다.', emotion: 'sad' },
            { speaker: '구미호', text: '그것이, 가장 — 차가운 — 답이군요.' },
            { speaker: '구미호', text: '...알겠어요. 떠날게요.' },
            { speaker: '구미호', text: '저는, 한강 어귀에 — 가지 않을 거예요.' },
            { speaker: '구미호', text: '북쪽 — 깊은 산으로, 갈게요.' },
            { speaker: '구미호', text: '저를 — 잊으세요.', emotion: 'sad' },
            { speaker: '', text: '구미호가, 천천히 — 등을 돌린다.' },
            { speaker: '', text: '아홉 개의 꼬리 그림자가, 한 — 사람의 그림자로, 합쳐진다.' },
            { speaker: '', text: '그리고 — 사라진다.' },
            { speaker: '', text: '...이무기의, 보호막은 — 사라졌다.' },
        ],
        setFlags: { gumiho_left_north: true },
        next: 'ch9_aftermath'
    },

    ch9_let_decide_path: {
        image: 'assets/images/ch9_gumiho_breaking.png',
        characters: {
            center: { char: 'gumiho', emotion: 'sad' },
        },
        dialogue: [
            { speaker: '구미호', text: '...자, 저에게 — 결정을, 맡기시는군요.', emotion: 'sad' },
            { speaker: '구미호', text: '...오랜만이에요. 누군가가 — 저에게, 무엇을 — 강요하지, 않으신 — 게.' },
            { speaker: '구미호', text: '백 년 — 동안, 저는 — 그분의 — 명령으로, 살아왔어요.' },
            { speaker: '구미호', text: '제가 — 결정한 — 일이, 거의 — 없어요.', emotion: 'sad' },
            { speaker: '구미호', text: '...글쎄요. 결정을 — 해야, 하는 — 일이네요.' },
            { speaker: '구미호', text: '내일 — 자정에, 한강 — 어귀에서. 거기서 — 결정할게요.' },
            { speaker: '구미호', text: '약속해 — 드릴 수 — 있는 건, 한 가지예요.' },
            { speaker: '구미호', text: '제가 — 어떤 결정을, 하든. 그건 — 거짓 — 위에서가 — 아니라, 진실 — 위에서 — 할 거예요.' },
            { speaker: '구미호', text: '그게, 제가 — 당신께 — 받은 — 가장, 큰 — 선물이에요.', emotion: 'sad' },
            { speaker: '', text: '구미호가, 천천히 — 사라진다.' },
        ],
        next: 'ch9_aftermath'
    },

    // ==========================================
    //  3막: 정자에 — 다시, 침묵이
    // ==========================================

    ch9_aftermath: {
        image: 'assets/images/ch9_pavilion_night.png',
        bgm: 'ch9',
        characters: {
            left:  { char: 'jeonwoochi' },
            right: { char: 'haeun',     condition: { flag: 'ch9_haeun_in' } },
        },
        dialogue: [
            { speaker: '', text: '구미호가 — 떠난 자리.' },
            { speaker: '', text: '바람만, 한 자락 — 남는다.' },
            // 결과별 회상
            { speaker: '', text: '...구미호가, 함께 — 와줬다. 적이, 동료가 됐다.', condition: { flag: 'gumiho_companion' } },
            { speaker: '', text: '하지만, 그녀의 마지막 말이 — 가슴에, 남아 있다.', condition: { flag: 'gumiho_companion' } },
            { speaker: '', text: '"빚은, 짐승의 방식으로 갚는 것".', condition: { flag: 'gumiho_companion' } },
            { speaker: '', text: '...구미호가, 떠났다. 북쪽 산으로.', condition: { flag: 'gumiho_left_north' } },
            { speaker: '', text: '이무기의 — 보호막이, 사라졌다. 하지만, 그녀의 — 슬픔은 — 보지 못한 채로.', condition: { flag: 'gumiho_left_north' } },
            { speaker: '', text: '...구미호의 결정은, 내일 자정에. 한강 어귀에서.', condition: { flag: 'gumiho_undecided' } },
            { speaker: '', text: '...구미호가, 처음으로 — 자기 결정을 할 — 자리.', condition: { flag: 'gumiho_undecided' } },
            { speaker: '', text: '...구미호가, 떠났다. 결정 — 없이.', condition: { flag: 'gumiho_left_undecided' } },
            // 도사
            { speaker: '전우치', text: '...잘하셨어요.', emotion: 'smile' },
            { speaker: '전우치', text: '구미호의 일은 — 누구도, 답을 — 못 — 내릴 — 일이었거든요.' },
            { speaker: '전우치', text: '내일 — 새벽부터, 사신을 — 모을게요.' },
            { speaker: '전우치', text: '하은 — 그쪽 분의, 잠재 — 영물이 — 깨어나는, 자리에서 — 시작이에요.' },
            // 동료
            { speaker: '하은', text: '...오늘 밤, 잠은 — 자도 될까?', condition: { flag: 'ch9_haeun_in' }, emotion: 'worried' },
            { speaker: '전우치', text: '주무세요. 안 — 그러면, 못 — 버텨요.', emotion: 'smile' },
            { speaker: '', text: '...' },
            { speaker: '', text: '구미호의 — 마지막 표정이, 머릿속에서, 떠나지 — 않는다.' },
            { speaker: '', text: '제9장 — 끝.' },
        ],
        next: 'ch9_final'
    },

    ch9_final: {
        image: 'assets/images/ch9_pavilion_night.png',
        showFlowchart: 'ch9',
        dialogue: [],
        next: 'ch10_intro',
    },
};

// ==========================================
//  제9장 플로우차트
// ==========================================

const FLOWCHARTS_CH9 = {
    ch9: {
        episode: '제9장',
        title: '거짓 위에 자란 마음',
        tree: [
            { type: 'story', text: '구미호 — 정자에 찾아오다' },
            { type: 'choice', label: '첫 응답', sceneId: 'ch9_first_choice',
              branches: [
                  { text: '듣는다' },
                  { text: '맞선다' },
                  { text: '진실을 먼저 던진다 (통찰)' },
              ]
            },
            { type: 'story', text: '구미호의 사연 — 백 년 전, 죽은 사람' },
            { type: 'choice', label: '진실의 무게', sceneId: 'ch9_truth_choice',
              branches: [
                  { text: '부드럽게 — 알고 있죠?' },
                  { text: '직접 — 죽었어요' },
                  { text: '침묵' },
              ]
            },
            { type: 'choice', label: '구미호의 자리', sceneId: 'ch9_save_choice',
              branches: [
                  { text: '동료로 받아들인다' },
                  { text: '떠나라 부탁한다' },
                  { text: '결정을 — 맡긴다' },
              ]
            },
            { type: 'story', text: '제9장 — 끝' },
        ],
    },
};
