/**
 * 이층 : 서울, 0시 — 제3장: 자정의 종로
 * 단서를 따라 종로에 도착, 구미호 첫 조우
 */

const SCENES_CH3 = {

    // ==========================================
    //  0막: 종로로 향하는 길
    // ==========================================

    ch3_intro: {
        chapter: { number: '제3장', title: '자정의 종로' },
        image: 'assets/images/ch3_jongno_night.png',
        imageEffect: 'ken-burns',
        bgm: 'ch3',
        dialogue: [
            { speaker: '', text: '걷는다.' },
            { speaker: '', text: '북쪽 — 아직 어두운 쪽으로.' },
            { speaker: '', text: '주머니 속, 따뜻한 펜 한 자루. 아직 식지 않았다.' },
            { speaker: '', text: '"오늘 자정, 종로."' },
            { speaker: '', text: '시간이 — 다가오고 있다.' },
        ],
        next: 'ch3_status_check'
    },

    ch3_status_check: {
        image: 'assets/images/ch3_jongno_night.png',
        // 동료 상태 정리 (1·2장에서 넘어온 플래그 통합)
        setFlagsIf: [
            { condition: { flag: 'has_companion' },       flags: { ch3_haeun_in: true } },
            { condition: { flag: 'with_seoyeon' },        flags: { ch3_seoyeon_in: true } },
            { condition: { flag: 'eoduksini_companion' }, flags: { ch3_eoduksini_in: true } },
            { condition: { flag: 'eoduksini_left' },      flags: { ch3_eoduksini_in: false } },
            { condition: { flag: 'has_datnyangi' },       flags: { ch3_pet_in: true, ch3_pet_cat: true } },
            { condition: { flag: 'has_hwangdokgu' },      flags: { ch3_pet_in: true, ch3_pet_dog: true } },
        ],
        next: 'ch3_walking'
    },

    ch3_walking: {
        image: 'assets/images/ch3_jongno_night.png',
        characters: {
            left:  { char: 'haeun',   condition: { flag: 'ch3_haeun_in' } },
            right: { char: 'seoyeon', condition: { flag: 'ch3_seoyeon_in' } },
        },
        dialogue: [
            { speaker: '', text: '거리는 점점 넓어진다.' },
            { speaker: '', text: '낡은 주택가에서 — 큰길로.' },
            { speaker: '', text: '사거리. 신호등은 여전히 깜빡인다. 빨강에서 파랑으로, 파랑에서 빨강으로.' },
            { speaker: '', text: '저 멀리 — 종각 사거리의 윤곽이 보인다.' },
            { speaker: '하은', text: '...자정. 이제 한 시간도 안 남았어.', condition: { flag: 'ch3_haeun_in' }, emotion: 'serious' },
            { speaker: '서연', text: '근데... 누가 이 메모를 남긴 걸까요?', condition: { flag: 'ch3_seoyeon_in' }, emotion: 'worried' },
            { speaker: '서연', text: '우리보다 먼저 — 이 모든 걸 알고 있던 사람.', condition: { flag: 'ch3_seoyeon_in' } },
            { speaker: '닷냥이', text: '냐...', condition: { flag: 'ch3_pet_cat' } },
            { speaker: '황덕구', text: '컹.', condition: { flag: 'ch3_pet_dog' } },
        ],
        next: 'ch3_eoduksini_warns'
    },

    // 어둑시니 동행 시 경고
    ch3_eoduksini_warns: {
        image: 'assets/images/ch3_jongno_night.png',
        nextIf: [
            { condition: { flag: 'ch3_eoduksini_in' }, next: 'ch3_eoduksini_speak' },
        ],
        next: 'ch3_jongno_arrive'
    },

    ch3_eoduksini_speak: {
        image: 'assets/images/ch3_jongno_night.png',
        dialogue: [
            { speaker: '', text: '내 그림자가 — 짙어진다.' },
            { speaker: '', text: '어둑시니가 깨어났다.' },
            { speaker: '어둑시니', text: '...앞에, 무언가가 있어.', emotion: 'serious' },
            { speaker: '어둑시니', text: '나 같은 것이 아니야. 더 — 오래된 것.' },
            { speaker: '어둑시니', text: '천 년쯤 묵은. 그런 무게야.' },
            { speaker: '하은', text: '천 년...?', condition: { flag: 'ch3_haeun_in' }, emotion: 'surprised' },
            { speaker: '어둑시니', text: '조심해. 보이는 게 — 보이는 게 아닐 수 있어.' },
        ],
        next: 'ch3_jongno_arrive'
    },

    // ==========================================
    //  1막: 종각 도착
    // ==========================================

    ch3_jongno_arrive: {
        image: 'assets/images/ch3_bosingak.png',
        imageEffect: 'ken-burns',
        dialogue: [
            { speaker: '', text: '도착했다.' },
            { speaker: '', text: '종각 사거리.' },
            { speaker: '', text: '거대한 종이 — 침묵 속에 매달려 있다.' },
            { speaker: '', text: '서울의 시작을 알리던 종.' },
            { speaker: '', text: '이제 — 울려줄 사람이 없다.' },
            { speaker: '', text: '광장은 비어 있다. 하지만 — 비어있다고만 할 수는 없다.' },
            { speaker: '', text: '뭔가가 — 있다. 보이지는 않지만.' },
            { speaker: '', text: '시계탑을 본다.' },
            { speaker: '', text: '11시 47분.' },
            { speaker: '', text: '13분 남았다.' },
        ],
        next: 'ch3_waiting'
    },

    ch3_waiting: {
        image: 'assets/images/ch3_bosingak.png',
        dialogue: [
            { speaker: '하은', text: '...뭐가 일어나는 거야, 자정에?', condition: { flag: 'ch3_haeun_in' }, emotion: 'worried' },
            { speaker: '', text: '모른다. 다만 — 메모는 그렇게 적혀 있었다.', condition: { flag: 'ch3_haeun_in' } },
            { speaker: '서연', text: '저... 종이 울릴까요? 자정에.', condition: { flag: 'ch3_seoyeon_in' } },
            { speaker: '', text: '울릴 사람이 없는데도?', condition: { flag: 'ch3_seoyeon_in' } },
            { speaker: '닷냥이', text: '냐...옹...', condition: { flag: 'ch3_pet_cat' }, emotion: 'serious' },
            { speaker: '', text: '닷냥이의 등이 곤두선다. 무언가를 — 본다.', condition: { flag: 'ch3_pet_cat' } },
            { speaker: '황덕구', text: '...크르릉.', condition: { flag: 'ch3_pet_dog' }, emotion: 'serious' },
            { speaker: '', text: '황덕구가 으르렁대기 시작한다. 한 방향을 향해.', condition: { flag: 'ch3_pet_dog' } },
            { speaker: '', text: '광장 한가운데 — 누군가가 서 있다.' },
            { speaker: '', text: '...아무도 없었던 자리에.' },
        ],
        next: 'ch3_woman_appears'
    },

    // ==========================================
    //  2막: 구미호 등장
    // ==========================================

    ch3_woman_appears: {
        image: 'assets/images/ch3_bosingak.png',
        characters: {
            center: { char: 'gumiho', emotion: 'neutral' },
        },
        dialogue: [
            { speaker: '', text: '여자다.' },
            { speaker: '', text: '한복도, 양장도 아닌 — 그 사이의 무언가를 입었다.' },
            { speaker: '', text: '검은 머리가, 바람도 없이, 가볍게 흔들린다.' },
            { speaker: '', text: '그리고 — 얼굴.' },
            { speaker: '', text: '...너무 — 아름답다.' },
            { speaker: '', text: '아름답다는 말이 부족하다. 그건 시각적 묘사가 아니라 — 사실의 진술이다.' },
            { speaker: '', text: '이 세상의 것이 아닌, 그런 종류의.' },
            { speaker: '하은', text: '...(말을 잃었다.)', condition: { flag: 'ch3_haeun_in' }, emotion: 'surprised' },
            { speaker: '서연', text: '...누구...세요?', condition: { flag: 'ch3_seoyeon_in' }, emotion: 'surprised' },
            { speaker: '구미호', text: '...아.', emotion: 'smile' },
            { speaker: '', text: '여자의 눈이 — 한 박자, 멈춘다.' },
            { speaker: '', text: '나를 본다. 정확히, 나를.' },
            { speaker: '', text: '그리고 — 입꼬리가, 살짝 — 떨린다. 아주 — 잠깐.' },
            { speaker: '구미호', text: '...오셨네요.', emotion: 'smile' },
            { speaker: '구미호', text: '정말로, 와주실 — 줄은 — 몰랐는데.' },
            { speaker: '구미호', text: '...어디서, 뵌 — 분 — 같으세요. (혼잣말처럼)', emotion: 'sad' },
        ],
        next: 'ch3_first_words'
    },

    ch3_first_words: {
        image: 'assets/images/ch3_bosingak.png',
        characters: {
            center: { char: 'gumiho' },
        },
        dialogue: [
            { speaker: '', text: '여자가 — 천천히 다가온다.' },
            { speaker: '', text: '걸음에 무게가 없다. 발자국 소리가 — 들리지 않는다.' },
            { speaker: '구미호', text: '메모를 — 찾으셨군요.' },
            { speaker: '구미호', text: '...저 — 분이, 그토록 — 기다리시던, 분이라니.', emotion: 'sad' },
            { speaker: '', text: '"저 분"이라니, 그게 누구지?' },
            { speaker: '구미호', text: '아, 미안해요. 혼잣말이었어요.', emotion: 'smile' },
            { speaker: '구미호', text: '저는 — 그냥, 안내자예요.' },
            { speaker: '구미호', text: '여기까지 — 오셨으니, 다음 — 길도, 알려드려야죠.' },
            { speaker: '', text: '하지만 — 그녀가 나를 보는, 그 눈빛.' },
            { speaker: '', text: '오래 본 — 사람을, 다시 — 본 — 눈빛이다.' },
            { speaker: '', text: '...착각인가.' },
            { speaker: '', text: '다음 길.' },
            { speaker: '', text: '여자의 눈을 본다.' },
            { speaker: '', text: '검다. 그냥 검은 게 아니라 — 깊다.' },
            { speaker: '', text: '오래된 우물 속을 들여다보는 것 같은 — 그런 깊이.' },
            { speaker: '어둑시니', text: '(내 그림자에서, 작게) ...조심해. 천 년이라고 했잖아.', condition: { flag: 'ch3_eoduksini_in' }, emotion: 'serious' },
        ],
        next: 'ch3_first_choice'
    },

    // --- 첫 번째 선택지: 그녀를 어떻게 대할 것인가 ---
    ch3_first_choice: {
        image: 'assets/images/ch3_bosingak.png',
        characters: {
            center: { char: 'gumiho' },
        },
        dialogue: [
            { speaker: '구미호', text: '제 이름은 — 부르고 — 싶지, 않은데요.', emotion: 'sad' },
            { speaker: '구미호', text: '그냥 — 길 안내하는 — 사람이라고만, 생각해 — 주세요.' },
        ],
        choices: [
            { text: '"그래도 — 이름은 알아야겠어."',
              setFlags: { gumiho_asked_name: true },
              stats: { courage: 1, wisdom: 1 },
              next: 'ch3_name_pressed' },
            { text: '"...괜찮아. 안내해주세요."',
              setFlags: { gumiho_trusted: true },
              stats: { love: 2 },
              next: 'ch3_trust_path' },
            { text: '"왜 우리를 기다렸어요?"',
              setFlags: { gumiho_questioned: true },
              stats: { wisdom: 2 },
              next: 'ch3_question_path' },
        ]
    },

    // 분기: 이름 추궁
    ch3_name_pressed: {
        image: 'assets/images/ch3_bosingak.png',
        characters: { center: { char: 'gumiho' } },
        dialogue: [
            { speaker: '구미호', text: '...강요, 하시는군요.', emotion: 'sad' },
            { speaker: '구미호', text: '하긴 — 그래야지요. 모르는 — 누군가를, 따라가시는 — 건데.' },
            { speaker: '', text: '여자가 잠시 침묵한다. 그리고는 — 작게 미소.' },
            { speaker: '구미호', text: '...호(狐).', emotion: 'sad' },
            { speaker: '구미호', text: '제 이름은 — 호예요. 외자.' },
            { speaker: '', text: '호.' },
            { speaker: '', text: '...여우 호.' },
            { speaker: '', text: '심장이 — 한 박자 빠르게 뛴다.' },
            { speaker: '서연', text: '(작게) ...그게, 진짜 이름인가요?', condition: { flag: 'ch3_seoyeon_in' }, emotion: 'worried' },
            { speaker: '구미호', text: '진짜라기보다는 — 가장 가까운 이름이에요.', emotion: 'sad' },
        ],
        next: 'ch3_lead_offer'
    },

    // 분기: 신뢰
    ch3_trust_path: {
        image: 'assets/images/ch3_bosingak.png',
        characters: { center: { char: 'gumiho' } },
        dialogue: [
            { speaker: '구미호', text: '...고마워요.', emotion: 'smile' },
            { speaker: '구미호', text: '저를 — 의심하지 — 않으시는군요.' },
            { speaker: '', text: '여자의 표정이 — 한순간 흔들린다.' },
            { speaker: '', text: '미소 뒤에 — 무언가 다른 것이 스쳤다.' },
            { speaker: '', text: '슬픔. 그것도 — 아주 — 오래된, 슬픔.' },
            { speaker: '구미호', text: '(혼잣말처럼) ...그래서 — 더, 미안해지네요.', emotion: 'sad' },
            { speaker: '구미호', text: '...당신, 처음 — 뵙는 — 분이신데. 왜 — 이렇게, 익숙할까요.', emotion: 'sad' },
            { speaker: '하은', text: '...뭐라고 하셨어요?', condition: { flag: 'ch3_haeun_in' }, emotion: 'worried' },
            { speaker: '구미호', text: '아무것도요. 그냥 — 혼잣말이에요.', emotion: 'smile' },
        ],
        affinity: { eoduksini: -1 },
        next: 'ch3_lead_offer'
    },

    // 분기: 추궁
    ch3_question_path: {
        image: 'assets/images/ch3_bosingak.png',
        characters: { center: { char: 'gumiho' } },
        dialogue: [
            { speaker: '구미호', text: '...왜, 라.', emotion: 'serious' },
            { speaker: '구미호', text: '좋은 — 질문이에요. 사실 — 저도, 답을 — 알고 — 싶거든요.' },
            { speaker: '', text: '여자가 잠시 — 종을 본다. 거대한, 침묵하는 종을.' },
            { speaker: '구미호', text: '저는 — 부탁받았어요. "그가 — 오면, 안내해라"고요.' },
            { speaker: '', text: '그.' },
            { speaker: '', text: '"그"라는 단어가 — 이상하게, 무겁다.' },
            { speaker: '구미호', text: '...그분은, 아주 — 오래, 기다리셨어요.', emotion: 'sad' },
            { speaker: '구미호', text: '천 년쯤... 정확히는, 더 — 오래.' },
            { speaker: '어둑시니', text: '(그림자에서) ...천 년.', condition: { flag: 'ch3_eoduksini_in' }, emotion: 'surprised' },
            { speaker: '서연', text: '천 년이라뇨? 무슨 말씀이세요?', condition: { flag: 'ch3_seoyeon_in' }, emotion: 'surprised' },
            { speaker: '구미호', text: '...자정이 — 되면, 직접 — 들어 — 보세요.', emotion: 'sad' },
        ],
        setFlags: { learned_thousand_years: true },
        next: 'ch3_lead_offer'
    },

    // ==========================================
    //  3막: 길 안내 제안
    // ==========================================

    ch3_lead_offer: {
        image: 'assets/images/ch3_bosingak.png',
        characters: { center: { char: 'gumiho' } },
        dialogue: [
            { speaker: '', text: '시계를 본다. 11시 53분.' },
            { speaker: '', text: '7분 남았다.' },
            { speaker: '구미호', text: '시간이 — 다, 됐어요.', emotion: 'serious' },
            { speaker: '구미호', text: '저를 — 따라오세요. 이 — 길의 끝에서, 그분이 — 기다리고 — 계세요.' },
            { speaker: '', text: '동물이 — 으르렁댄다. 따라가지 말라고.' },
            { speaker: '닷냥이', text: '핫!', condition: { flag: 'ch3_pet_cat' }, emotion: 'serious' },
            { speaker: '황덕구', text: '컹! 컹!', condition: { flag: 'ch3_pet_dog' }, emotion: 'serious' },
            { speaker: '어둑시니', text: '(작게) ...가지 마. 저 안엔 — 우리가 못 이기는 게 있어.', condition: { flag: 'ch3_eoduksini_in' }, emotion: 'serious' },
        ],
        choices: [
            { text: '"안내해주세요."',
              setFlags: { followed_gumiho: true },
              stats: { courage: 2 },
              next: 'ch3_follow' },
            { text: '"...자정까지, 여기서 기다릴게요."',
              setFlags: { waited_in_place: true },
              stats: { wisdom: 1, calm: 1 },
              next: 'ch3_wait' },
            { text: '"이름부터 — 진짜 이름을 말해줘요."',
              setFlags: { demanded_real_name: true },
              stats: { wisdom: 2 },
              requires: { wisdom: 4 },
              next: 'ch3_real_name' },
        ]
    },

    // 분기 A: 따라간다
    ch3_follow: {
        image: 'assets/images/ch3_alley_to_bell.png',
        imageEffect: 'ken-burns',
        characters: { center: { char: 'gumiho' } },
        dialogue: [
            { speaker: '', text: '여자를 따라간다.' },
            { speaker: '', text: '광장을 가로질러, 종 가까이로.' },
            { speaker: '', text: '걸음마다 — 공기가 무거워진다.' },
            { speaker: '', text: '여자의 그림자가 — 이상하다.' },
            { speaker: '', text: '한 사람의 그림자가 아니다. 여러 개가 — 겹쳐져 있다.' },
            { speaker: '', text: '아홉 개. 정확히 — 아홉 개의 꼬리 모양.' },
            { speaker: '', text: '...!' },
            { speaker: '', text: '깨달음이 — 한 박자 늦게 온다.' },
            { speaker: '하은', text: '잠깐 — 저 그림자, 봤어?', condition: { flag: 'ch3_haeun_in' }, emotion: 'surprised' },
            { speaker: '서연', text: '꼬리...? 꼬리가 아홉 개...', condition: { flag: 'ch3_seoyeon_in' }, emotion: 'surprised' },
            { speaker: '구미호', text: '아, 보셨어요?', emotion: 'smile' },
            { speaker: '구미호', text: '숨길 수 — 없을, 줄 — 알았어요. 미안해요.' },
            { speaker: '구미호', text: '제 진짜 — 이름은, 이미 — 보셨으니까요.' },
            { speaker: '', text: '...구미호.' },
        ],
        next: 'ch3_revealed'
    },

    ch3_revealed: {
        image: 'assets/images/ch3_alley_to_bell.png',
        characters: { center: { char: 'gumiho', emotion: 'serious' } },
        dialogue: [
            { speaker: '구미호', text: '저는 — 구미호예요.', emotion: 'sad' },
            { speaker: '구미호', text: '그리고 — 저 종 안에, 제 — 주인이 — 계세요.' },
            { speaker: '', text: '주인.' },
            { speaker: '', text: '그 단어가 — 그녀의 입에서 나올 때, 무언가 — 비통하다.' },
            { speaker: '구미호', text: '걱정 마세요. 해치지 — 않으실 거예요.', emotion: 'sad' },
            { speaker: '구미호', text: '오히려 — 도와, 주실 — 거예요.' },
            { speaker: '구미호', text: '그분은 — 이 — 모든 것을, 끝내실 — 분이거든요.' },
            { speaker: '', text: '"끝낸다"는 말이 — 다양한 의미를 가질 수 있다는 걸, 처음으로 의식한다.' },
            { speaker: '', text: '시계가 — 12시를 향해 간다.' },
            { speaker: '', text: '11시 58분. 11시 59분.' },
            { speaker: '', text: '그리고 — 자정.' },
        ],
        setFlags: { met_gumiho: true, gumiho_revealed: true },
        next: 'ch3_bell_rings'
    },

    // 분기 B: 기다린다
    ch3_wait: {
        image: 'assets/images/ch3_bosingak.png',
        characters: { center: { char: 'gumiho' } },
        dialogue: [
            { speaker: '', text: '"...아니요. 여기서 기다리겠어요."' },
            { speaker: '구미호', text: '...그러시군요.', emotion: 'sad' },
            { speaker: '구미호', text: '그것도 — 한 가지, 길이에요.' },
            { speaker: '', text: '여자가 한 걸음 물러난다.' },
            { speaker: '', text: '걸음마다 — 그림자가 길어진다.' },
            { speaker: '', text: '한 개, 두 개, 세 개... 아홉 개.' },
            { speaker: '', text: '아홉 개의 꼬리 모양 그림자.' },
            { speaker: '하은', text: '...!', condition: { flag: 'ch3_haeun_in' }, emotion: 'surprised' },
            { speaker: '서연', text: '구미호...!', condition: { flag: 'ch3_seoyeon_in' }, emotion: 'surprised' },
            { speaker: '구미호', text: '아, 이제 — 보셨군요.', emotion: 'sad' },
            { speaker: '구미호', text: '맞아요. 저는 — 구미호예요.' },
            { speaker: '구미호', text: '그분이 — 직접, 오실 — 거예요. 자정에요.' },
            { speaker: '구미호', text: '저는 — 그분의, 안내를 — 따랐을 — 뿐이에요.' },
        ],
        setFlags: { met_gumiho: true, gumiho_revealed: true, kept_distance: true },
        next: 'ch3_bell_rings'
    },

    // 분기 C: 진짜 이름 요구 (insight 2 필요)
    ch3_real_name: {
        image: 'assets/images/ch3_bosingak.png',
        characters: { center: { char: 'gumiho', emotion: 'sad' } },
        dialogue: [
            { speaker: '구미호', text: '...허, 허.', emotion: 'sad' },
            { speaker: '구미호', text: '눈치, 채셨군요. "호"라는 — 게, 이미 — 진짜에 — 가까웠다는 — 걸.' },
            { speaker: '', text: '여자가 — 처음으로, 진심에 가까운 표정을 보인다.' },
            { speaker: '구미호', text: '구미호예요. 아홉 — 꼬리의.', emotion: 'sad' },
            { speaker: '구미호', text: '그리고 — 저는, 부탁이 — 아니라. 명령, 받은 — 거예요.' },
            { speaker: '구미호', text: '"그가 — 오면, 끌고 — 와라"고요.', emotion: 'sad' },
            { speaker: '', text: '...!' },
            { speaker: '구미호', text: '하지만 — 저도, 망설이고 — 있어요.', emotion: 'sad' },
            { speaker: '구미호', text: '당신을 — 이대로, 데려가는 — 게. 옳은 — 일인지.' },
            { speaker: '구미호', text: '...당신, 정말 — 처음 — 뵈는 — 분이세요? 정말로요?', emotion: 'sad' },
            { speaker: '', text: '여자의 눈이 — 슬프다.' },
            { speaker: '', text: '오래된, 슬픔.' },
            { speaker: '하은', text: '...왜 망설이세요? 무엇 때문에?', condition: { flag: 'ch3_haeun_in' }, emotion: 'worried' },
            { speaker: '구미호', text: '...글쎄요. 저도, 모르겠어요.', emotion: 'sad' },
            { speaker: '구미호', text: '다만 — 자정이 오면, 그분이 직접 오실 거예요.' },
            { speaker: '구미호', text: '그건, 저도 막을 수 없어요.' },
        ],
        setFlags: { met_gumiho: true, gumiho_revealed: true, gumiho_doubt_seeded: true },
        affinity: {},
        stats: { wisdom: 1 },
        next: 'ch3_bell_rings'
    },

    // ==========================================
    //  4막: 자정의 종
    // ==========================================

    ch3_bell_rings: {
        image: 'assets/images/ch3_bell_resonance.png',
        imageEffect: 'ken-burns',
        bgm: 'ch3_tense',
        dialogue: [
            { speaker: '', text: '11시 59분 59초.' },
            { speaker: '', text: '...' },
            { speaker: '', text: '그리고 — 종이 울린다.' },
            { speaker: '', text: '울릴 사람이 — 없는데.' },
            { speaker: '', text: '뎅—' },
            { speaker: '', text: '한 번. 깊게.' },
            { speaker: '', text: '뎅—' },
            { speaker: '', text: '두 번. 더 깊게.' },
            { speaker: '', text: '소리가 — 공기를 타고 퍼진다. 도시 전체로.' },
            { speaker: '', text: '뎅—' },
            { speaker: '', text: '뎅—' },
            { speaker: '', text: '뎅—' },
            { speaker: '', text: '...열두 번.' },
            { speaker: '', text: '자정.' },
            { speaker: '', text: '그리고 — 침묵.' },
        ],
        next: 'ch3_atmosphere_shift'
    },

    ch3_atmosphere_shift: {
        image: 'assets/images/ch3_bell_resonance.png',
        characters: { center: { char: 'gumiho', emotion: 'serious' } },
        dialogue: [
            { speaker: '', text: '공기가 — 변한다.' },
            { speaker: '', text: '온도가 떨어진다. 그게 아니라 — 무게가 다르다.' },
            { speaker: '', text: '내 어깨에 — 무거운 손이 얹힌 것처럼.' },
            { speaker: '', text: '어디서 본 적도 없는 — 거대한 존재의 시선.' },
            { speaker: '구미호', text: '...오셨어.', emotion: 'sad' },
            { speaker: '', text: '여자가 — 종을 본다. 종 안의, 어둠을.' },
            { speaker: '', text: '종 속에서 — 무언가가, 천천히, 일어난다.' },
            { speaker: '', text: '거대한 형체의 윤곽.' },
            { speaker: '', text: '그리고, 이내 — 한 명의 남자로 좁혀진다.' },
            { speaker: '', text: '검은 머리. 검은 옷.' },
            { speaker: '', text: '얼굴은 — 보이지 않는다. 종의 그림자가, 그를 가리고 있다.' },
            { speaker: '하은', text: '...누구야, 저 사람.', condition: { flag: 'ch3_haeun_in' }, emotion: 'surprised' },
            { speaker: '서연', text: '...이름조차, 부르지 못하는 누군가.', condition: { flag: 'ch3_seoyeon_in' }, emotion: 'worried' },
            { speaker: '어둑시니', text: '(작게) ...피해. 지금 당장.', condition: { flag: 'ch3_eoduksini_in' }, emotion: 'serious' },
            { speaker: '닷냥이', text: '...!', condition: { flag: 'ch3_pet_cat' }, emotion: 'serious' },
            { speaker: '황덕구', text: '...크르릉, 컹!', condition: { flag: 'ch3_pet_dog' }, emotion: 'serious' },
        ],
        next: 'ch3_man_speaks'
    },

    ch3_man_speaks: {
        image: 'assets/images/ch3_bell_shadow.png',
        dialogue: [
            { speaker: '???', text: '...드디어.' },
            { speaker: '', text: '목소리.' },
            { speaker: '', text: '낮고, 깊고 — 오래된 우물의 바닥에서 올라오는 것 같은.' },
            { speaker: '???', text: '오래 기다렸다.' },
            { speaker: '???', text: '천 년 — 정확히는, 천 년하고도 사흘.' },
            { speaker: '', text: '천 년.' },
            { speaker: '', text: '구미호의 말이 — 거짓이 아니었다.' },
            { speaker: '???', text: '내 이름은 — 아직 부르지 않겠다.' },
            { speaker: '???', text: '너는, 오늘 밤 — 내 손님이다.' },
            { speaker: '???', text: '그리고 내일 — 내가 너의 주인이 될 것이다.' },
            { speaker: '', text: '주인.' },
            { speaker: '', text: '그 단어가 — 이번엔 무게로 다가온다.' },
        ],
        next: 'ch3_first_test'
    },

    // 첫 시험: 도망 / 맞섬 / 대화
    ch3_first_test: {
        image: 'assets/images/ch3_bell_shadow.png',
        dialogue: [
            { speaker: '???', text: '...달아나려느냐, 아니면 — 마주하려느냐?', emotion: 'serious' },
        ],
        choices: [
            { text: '도망친다 — 지금 당장 이곳을 떠난다',
              setFlags: { ch3_fled: true },
              stats: { wisdom: 2, calm: 1 },
              next: 'ch3_flee_path' },
            { text: '"...당신이 누구야. 이름을 — 말해."',
              setFlags: { ch3_demanded_name: true },
              stats: { courage: 4 },
              next: 'ch3_demand_path' },
            { text: '동료를 보호하며 천천히 물러난다',
              setFlags: { ch3_protected_retreat: true },
              stats: { love: 2, calm: 2 },
              next: 'ch3_protect_path' },
        ]
    },

    // 도망 분기
    ch3_flee_path: {
        image: 'assets/images/ch3_alley_to_bell.png',
        dialogue: [
            { speaker: '', text: '"뛰어!"' },
            { speaker: '', text: '몸이 먼저 움직인다. 머리보다 빠르게.' },
            { speaker: '', text: '뒤를 돌아보지 않는다. 돌아보면 — 안 될 것 같다.' },
            { speaker: '???', text: '...허허.', emotion: 'smile' },
            { speaker: '???', text: '재밌구나. 다음에 만날 땐 — 그렇게 못 할 것이다.' },
            { speaker: '', text: '광장 끝. 골목.' },
            { speaker: '', text: '뒤에서, 종소리가 — 한 번 더 울린다. 열세 번째.' },
            { speaker: '', text: '존재해서는 안 될 — 한 번의 울림.' },
            { speaker: '하은', text: '(숨을 헐떡이며) ...뭐였어, 저게.', condition: { flag: 'ch3_haeun_in' }, emotion: 'worried' },
            { speaker: '', text: '모른다. 다만 — 도망친 게, 옳았다는 것만 안다.', condition: { flag: 'ch3_haeun_in' } },
        ],
        setFlags: { ch3_outcome_fled: true },
        next: 'ch3_aftermath'
    },

    // 맞섬 분기
    ch3_demand_path: {
        image: 'assets/images/ch3_bell_shadow.png',
        dialogue: [
            { speaker: '', text: '"이름을 말해."' },
            { speaker: '', text: '목소리가 — 떨린다. 그래도, 한다.' },
            { speaker: '???', text: '...담대하구나.', emotion: 'serious' },
            { speaker: '???', text: '천 년 동안, 내게 그렇게 말한 자는 — 단 하나였다.' },
            { speaker: '???', text: '그자도, 너처럼, 도사였지.' },
            { speaker: '', text: '...도사.' },
            { speaker: '', text: '왜, 그 단어가 — 이상하게 — 나에게 닿는 것 같지.' },
            { speaker: '???', text: '내 이름은 — 아직, 알 자격이 없다.', emotion: 'serious' },
            { speaker: '???', text: '하지만 약속하지. 다시 만날 것이다.' },
            { speaker: '???', text: '그땐, 나는 — 너에게, 직접 인사할 것이다.' },
            { speaker: '구미호', text: '...!', emotion: 'surprised' },
            { speaker: '구미호', text: '돌아가세요. 지금. 당장.', emotion: 'worried' },
            { speaker: '', text: '구미호가 — 내 손을 잡는다.' },
            { speaker: '', text: '차갑다. 하지만 — 떨고 있다.' },
            { speaker: '구미호', text: '제발. 이번엔 — 보내드리는 거예요.', emotion: 'sad' },
        ],
        affinity: {},
        setFlags: { ch3_outcome_confronted: true, gumiho_helped: true },
        next: 'ch3_aftermath'
    },

    // 보호 분기
    ch3_protect_path: {
        image: 'assets/images/ch3_bell_shadow.png',
        dialogue: [
            { speaker: '', text: '한 손을 내 뒤로 돌린다. 동료들을 — 가린다.' },
            { speaker: '', text: '한 걸음, 천천히, 뒤로.' },
            { speaker: '', text: '눈은 — 그자에게서 떼지 않는다.' },
            { speaker: '???', text: '...영민하구나.', emotion: 'serious' },
            { speaker: '???', text: '도망도, 정면도 아닌 — 후퇴.' },
            { speaker: '???', text: '아끼는 것이 있는 자의 선택이다.' },
            { speaker: '???', text: '오늘은 — 보내주지.' },
            { speaker: '???', text: '대신, 다음엔 — 너 혼자 와야 한다.' },
            { speaker: '하은', text: '(작게) ...왜 보내주는 거야?', condition: { flag: 'ch3_haeun_in' }, emotion: 'worried' },
            { speaker: '', text: '모른다. 다만 — 살았다는 것만, 안다.', condition: { flag: 'ch3_haeun_in' } },
            { speaker: '', text: '광장을 천천히, 등 보이지 않게, 떠난다.' },
        ],
        setFlags: { ch3_outcome_protected: true },
        affinity: { haeun: 3, student: 3 },
        next: 'ch3_aftermath'
    },

    // ==========================================
    //  5막: 떠나는 길
    // ==========================================

    ch3_aftermath: {
        image: 'assets/images/ch3_jongno_dawn.png',
        bgm: 'ch3',
        characters: {
            left:  { char: 'haeun',   condition: { flag: 'ch3_haeun_in' } },
            right: { char: 'seoyeon', condition: { flag: 'ch3_seoyeon_in' } },
        },
        dialogue: [
            { speaker: '', text: '종로를 떠난다.' },
            { speaker: '', text: '하늘이 — 옅은 회색이 되어 있다. 새벽이 가까이 왔다.' },
            // 결과별
            { speaker: '', text: '발걸음이 — 무겁다. 도망친 발걸음이다.', condition: { flag: 'ch3_outcome_fled' } },
            { speaker: '', text: '가슴이 — 뛰고 있다. 맞섰다는 — 의지의 뜀.', condition: { flag: 'ch3_outcome_confronted' } },
            { speaker: '', text: '동료들의 눈빛이 — 평소와 다르다. 더 — 굳어졌다.', condition: { flag: 'ch3_outcome_protected' } },
            // 공통
            { speaker: '', text: '...구미호.' },
            { speaker: '', text: '"그분"이라고 부른 — 종 속의 누군가.' },
            { speaker: '', text: '천 년의 무게.' },
            { speaker: '', text: '그것이 — 어떤 존재인가, 아직 모른다.' },
            // 동료 대화
            { speaker: '하은', text: '...어디로 가야 해, 이제?', condition: { flag: 'ch3_haeun_in' } },
            { speaker: '서연', text: '저... 자료벽에서 본 메모, 그건 분명 — 누군가가 우리에게 남긴 거였어요.', condition: { flag: 'ch3_seoyeon_in' }, emotion: 'serious' },
            { speaker: '서연', text: '그 사람을 — 찾아야 해요.', condition: { flag: 'ch3_seoyeon_in' } },
            { speaker: '어둑시니', text: '...그 자, 천 년의 한이 있어. 이무기 — 아니면, 그 가까운 무엇이야.', condition: { flag: 'ch3_eoduksini_in' }, emotion: 'serious' },
            { speaker: '', text: '이무기.' },
            { speaker: '', text: '...어디서 본 듯한 단어다.' },
            { speaker: '', text: '먼 — 아주 먼 — 어딘가에서.' },
            // 솔로
            { speaker: '', text: '혼자다. 종소리만이, 머릿속에서, 아직 — 울리고 있다.', condition: { noneOfFlags: ['ch3_haeun_in', 'ch3_seoyeon_in', 'ch3_eoduksini_in'] } },
            // 끝
            { speaker: '', text: '한 가지는 분명하다.' },
            { speaker: '', text: '오늘 밤은 — 시작에 불과하다는 것.' },
            { speaker: '', text: '제3장 — 끝.' },
        ],
        next: 'ch3_final'
    },

    ch3_final: {
        image: 'assets/images/ch3_jongno_dawn.png',
        showFlowchart: 'ch3',
        dialogue: [],
        next: 'ch4_intro',
    },
};

// ==========================================
//  제3장 플로우차트
// ==========================================

const FLOWCHARTS_CH3 = {
    ch3: {
        episode: '제3장',
        title: '자정의 종로',
        tree: [
            { type: 'story', text: '종로 도착, 자정 13분 전' },
            { type: 'story', text: '종각 광장 — 여인의 등장' },
            { type: 'choice', label: '첫 만남', sceneId: 'ch3_first_choice',
              branches: [
                  { text: '이름을 묻는다' },
                  { text: '신뢰한다' },
                  { text: '의도를 추궁한다' },
              ]
            },
            { type: 'choice', label: '안내 제안', sceneId: 'ch3_lead_offer',
              branches: [
                  { text: '따라간다 → 정체 폭로' },
                  { text: '거리를 둔다 → 정체 폭로' },
                  { text: '진짜 이름 (지혜)' },
              ]
            },
            { type: 'story', text: '자정의 열두 번 종소리' },
            { type: 'story', text: '종 안의 그림자 — 천 년의 존재' },
            { type: 'choice', label: '첫 시험', sceneId: 'ch3_first_test',
              branches: [
                  { text: '도망친다' },
                  { text: '이름을 요구한다' },
                  { text: '동료를 지키며 후퇴' },
              ]
            },
            { type: 'story', text: '구미호 — 첫 만남' },
            { type: 'story', text: '제3장 — 끝' },
        ],
    },
};
