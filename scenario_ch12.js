/**
 * 이층 : 서울, 0시 — 제12장: 한강의 자정
 * 이무기와의 결판 — 13장 엔딩으로 분기 라우팅
 */

const SCENES_CH12 = {

    // ==========================================
    //  0막: 한강 어귀 — 의식 자리
    // ==========================================

    ch12_intro: {
        chapter: { number: '제12장', title: '한강의 자정' },
        image: 'assets/images/ch12_hangang_eve.png',
        imageEffect: 'ken-burns',
        bgm: 'ch12',
        dialogue: [
            { speaker: '', text: '한강 어귀.' },
            { speaker: '', text: '천 년 전, 이무기가 — 처음, 승천을 — 시도했던 — 그 자리.' },
            { speaker: '', text: '하늘이, 검다. 별이, 보이지 않는다.' },
            { speaker: '', text: '바람이 — 멈췄다.' },
            { speaker: '', text: '자정 — 직전.' },
        ],
        next: 'ch12_status'
    },

    ch12_status: {
        image: 'assets/images/ch12_hangang_eve.png',
        setFlagsIf: [
            { condition: { flag: 'ch11_haeun_in' },     flags: { ch12_haeun_in: true } },
            { condition: { flag: 'ch11_seoyeon_in' },   flags: { ch12_seoyeon_in: true } },
            { condition: { flag: 'ch11_eoduksini_in' }, flags: { ch12_eoduksini_in: true } },
            { condition: { flag: 'ch11_pet_cat' },      flags: { ch12_pet_cat: true } },
            { condition: { flag: 'ch11_pet_dog' },      flags: { ch12_pet_dog: true } },
            { condition: { flag: 'ch11_gumiho_in' },    flags: { ch12_gumiho_in: true } },
            { condition: { flag: 'ch11_cheongryong_in' },flags: { ch12_cheongryong_in: true } },
            { condition: { flag: 'ch11_baekho_in' },    flags: { ch12_baekho_in: true } },
            { condition: { flag: 'ch11_jujak_in' },     flags: { ch12_jujak_in: true } },
        ],
        next: 'ch12_imugi_appears'
    },

    // ==========================================
    //  1막: 이무기 — 의식
    // ==========================================

    ch12_imugi_appears: {
        image: 'assets/images/ch12_imugi_ritual.png',
        imageEffect: 'ken-burns',
        bgm: 'ch12_ritual',
        characters: {
            center: { char: 'imugi', emotion: 'serious' },
        },
        dialogue: [
            { speaker: '', text: '강물 — 한가운데.' },
            { speaker: '', text: '거대한, 둥근 — 무언가가, 떠올라 있다.' },
            { speaker: '', text: '이무기.' },
            { speaker: '', text: '인간의 모습은, 절반쯤만 — 남았다.' },
            { speaker: '', text: '나머지는 — 거대한 — 푸른 — 뱀의 형상.' },
            { speaker: '', text: '몸에는 — 서울의 — 모든 — 부정적 기가, 황금색의 — 줄기로, 흘러들고 있다.' },
            { speaker: '이무기', text: '...아, 오셨네요.', emotion: 'smile' },
            { speaker: '이무기', text: '잘 — 오셨어요. 사신을 — 데리고, 영물의 — 노래로 — 막아보시려고요?' },
            { speaker: '이무기', text: '...후후, 천 년 — 전과, 똑같으시네요.' },
        ],
        next: 'ch12_gumiho_decision'
    },

    // ==========================================
    //  2막: 구미호의 — 결정
    // ==========================================

    ch12_gumiho_decision: {
        image: 'assets/images/ch12_imugi_ritual.png',
        // 9장 분기에 따라
        nextIf: [
            { condition: { flag: 'gumiho_companion' },     next: 'ch12_gumiho_with_us' },
            { condition: { flag: 'gumiho_left_north' },    next: 'ch12_gumiho_absent' },
            { condition: { flag: 'gumiho_undecided' },     next: 'ch12_gumiho_decides' },
            { condition: { flag: 'gumiho_left_undecided' }, next: 'ch12_gumiho_decides' },
        ],
        next: 'ch12_gumiho_with_imugi'
    },

    ch12_gumiho_with_us: {
        image: 'assets/images/ch12_gumiho_ours.png',
        characters: {
            center: { char: 'imugi' },
            right:  { char: 'gumiho', emotion: 'serious' },
        },
        dialogue: [
            { speaker: '', text: '구미호가 — 우리 곁에, 서 있다.' },
            { speaker: '이무기', text: '...!', emotion: 'surprised' },
            { speaker: '이무기', text: '...호. 당신.', emotion: 'serious' },
            { speaker: '이무기', text: '왜 — 거기, 서 — 계세요?' },
            { speaker: '구미호', text: '...주인.', emotion: 'sad' },
            { speaker: '구미호', text: '아니, — 그분이라고, 부르지 — 않을게요.' },
            { speaker: '구미호', text: '저는 — 거짓 — 위에서, 백 년을 — 살았어요.' },
            { speaker: '구미호', text: '오늘 — 처음으로, 진실 — 위에서 — 한, 결정을 — 했어요.' },
            { speaker: '구미호', text: '저는, 그분 — 편이 — 아니에요.' },
            { speaker: '구미호', text: '...천 년 — 만에, 진짜 — 분을, 다시 — 만났으니까요.', emotion: 'sad' },
            { speaker: '이무기', text: '...후후, 후후.', emotion: 'smile' },
            { speaker: '이무기', text: '한 마리 — 짐승의, 슬픔조차 — 못 막게 — 되었네요.' },
            { speaker: '이무기', text: '...상관없습니다. 호 — 한 분이 — 빠져도, 의식은 — 시작돼요.' },
        ],
        setFlags: { gumiho_with_protagonist_battle: true, imugi_unprotected: true },
        next: 'ch12_battle_prep'
    },

    ch12_gumiho_absent: {
        image: 'assets/images/ch12_imugi_ritual.png',
        characters: { center: { char: 'imugi', emotion: 'serious' } },
        dialogue: [
            { speaker: '', text: '구미호는 — 보이지 않는다.' },
            { speaker: '', text: '북쪽 깊은 산으로, 떠난, 그녀.' },
            { speaker: '이무기', text: '...호가, 오지 않으셨네요.', emotion: 'serious' },
            { speaker: '이무기', text: '아, 너희가 — 호한테, 진실을 — 알려드렸나 봐요.' },
            { speaker: '이무기', text: '...후후. 그래요, 그것도 — 한 가지, 길이지요.' },
            { speaker: '이무기', text: '하지만 — 호 없이도, 의식은 — 끝낼 수 — 있어요.' },
            { speaker: '이무기', text: '시간이, 좀 — 부족할 — 뿐이고요.' },
        ],
        setFlags: { imugi_unprotected: true },
        next: 'ch12_battle_prep'
    },

    ch12_gumiho_decides: {
        image: 'assets/images/ch12_gumiho_choice.png',
        characters: {
            center: { char: 'imugi' },
            right:  { char: 'gumiho', emotion: 'sad' },
        },
        dialogue: [
            { speaker: '', text: '구미호가 — 강 — 한가운데에, 서 있다.' },
            { speaker: '', text: '이무기와, 우리 — 사이.' },
            { speaker: '', text: '결정을, 아직 — 못 한, 모습으로.' },
            { speaker: '구미호', text: '...주인.', emotion: 'sad' },
            { speaker: '구미호', text: '저는 — 결정을, 못 — 했어요.' },
            { speaker: '구미호', text: '백 년 — 만에, 처음으로 — 제 — 자신의, 결정을 — 해야 — 하는데요.' },
            { speaker: '구미호', text: '너무, 무거워요.' },
            { speaker: '구미호', text: '...당신을 — 보면, 자꾸 — 천 년 전이 — 떠올라서요.', emotion: 'sad' },
            { speaker: '이무기', text: '...호.', emotion: 'smile' },
            { speaker: '이무기', text: '제 곁으로 — 오세요. 약속은, 그대로예요.' },
        ],
        next: 'ch12_gumiho_speak_choice'
    },

    ch12_gumiho_speak_choice: {
        image: 'assets/images/ch12_gumiho_choice.png',
        characters: {
            right: { char: 'gumiho' },
        },
        choiceTimer: 8,
        dialogue: [
            { speaker: '', text: '구미호의 시선이 — 두 — 사이를, 오간다.' },
            { speaker: '', text: '한 마디. 내가 — 한 마디를 — 보내면, 결정의 — 무게를, 함께 — 들 수 있다.' },
        ],
        choices: [
            { text: '"...우리, 같이 가자. 진실 위에서, 함께 살자."',
              setFlags: { ch12_invited_gumiho: true, gumiho_with_protagonist_battle: true, imugi_unprotected: true },
              stats: { love: 5 },
              next: 'ch12_gumiho_joins_now' },
            { text: '"...당신이, 결정해. 우리는 기다릴게."',
              setFlags: { ch12_let_gumiho_decide: true },
              stats: { wisdom: 3 },
              next: 'ch12_gumiho_chooses_alone' },
        ]
    },

    ch12_gumiho_joins_now: {
        image: 'assets/images/ch12_gumiho_ours.png',
        characters: {
            right: { char: 'gumiho', emotion: 'smile' },
        },
        dialogue: [
            { speaker: '구미호', text: '...허, 허, 허.', emotion: 'sad' },
            { speaker: '구미호', text: '천 년 — 만에 — 처음으로, 그분이 — 저에게, "함께 — 살자" 라고요.', emotion: 'sad' },
            { speaker: '구미호', text: '...같이, 갈게요.' },
            { speaker: '', text: '구미호가 — 우리 쪽으로, 한 발 — 디딘다.' },
            { speaker: '', text: '강물이, 그녀의 — 발을 — 받아낸다.' },
            { speaker: '이무기', text: '...! 호 — .', emotion: 'serious' },
        ],
        addCompanion: {
            id: 'gumiho',
            name: '구미호',
            portrait: 'assets/images/portraits/gumiho_neutral.png',
            affinity: 10,
        },
        next: 'ch12_battle_prep'
    },

    ch12_gumiho_chooses_alone: {
        image: 'assets/images/ch12_gumiho_choice.png',
        characters: {
            right: { char: 'gumiho', emotion: 'sad' },
        },
        dialogue: [
            { speaker: '구미호', text: '...당신, 정말 — 이상한 — 분이세요.', emotion: 'sad' },
            { speaker: '구미호', text: '저에게 — 결정을, 강요하지 — 않으시네요.' },
            { speaker: '구미호', text: '...그래서, 결정할게요.' },
            { speaker: '구미호', text: '저는 — 그분 편이, 아니에요. 더 — 이상.' },
            { speaker: '구미호', text: '하지만 — 당신 편도, 아니에요. 아직은.' },
            { speaker: '구미호', text: '저는 — 중간에, 서 — 있을게요. 의식의 — 핵심에서, 한 자락의 — 보호막을 — 풀어, 드릴게요.' },
            { speaker: '구미호', text: '그게, 제 — 답이에요.', emotion: 'sad' },
            { speaker: '구미호', text: '...당신이, 천 년 — 전 — 그 — 분이라는 — 걸. 진짜로 — 알기까지는, 제 — 시간이, 필요해서요.', emotion: 'sad' },
        ],
        setFlags: { gumiho_neutral_aid: true, imugi_unprotected: true },
        next: 'ch12_battle_prep'
    },

    ch12_gumiho_with_imugi: {
        image: 'assets/images/ch12_imugi_ritual.png',
        characters: {
            center: { char: 'imugi' },
        },
        dialogue: [
            { speaker: '', text: '구미호가 — 보이지 않는다. 어딘가, 이무기의 — 그림자 안에서.' },
            { speaker: '', text: '그녀의 — 보호막이, 이무기를 — 감싸고 있다.' },
            { speaker: '이무기', text: '...후후, 호도 — 너희와, 거리를 — 두고 있다지요.', emotion: 'smile' },
            { speaker: '이무기', text: '약속은 — 약속이에요. 그녀는, 제 자리를 — 지키고 — 계세요.' },
            { speaker: '이무기', text: '...자, 시작할까요. 의식을.' },
        ],
        setFlags: { imugi_protected: true },
        next: 'ch12_battle_prep'
    },

    // ==========================================
    //  3막: 전투 — 준비
    // ==========================================

    ch12_battle_prep: {
        image: 'assets/images/ch12_battle_prep.png',
        characters: {
            left:  { char: 'jeonwoochi' },
            right: { char: 'haeun', condition: { flag: 'ch12_haeun_in' } },
        },
        dialogue: [
            { speaker: '전우치', text: '...자, 시간이 — 됐어요.', emotion: 'serious' },
            { speaker: '전우치', text: '사신의 — 노래로, 의식을 — 방해할게요.' },
            { speaker: '전우치', text: '주인공께서는 — 도술의, 청풍천검으로 — 핵을, 노리세요.' },
            { speaker: '', text: '...' },
            { speaker: '', text: '동료들이, 모두 — 자리에 선다.' },
            { speaker: '', text: '한 명씩의 — 영혼이, 같은 — 강을 — 향한다.' },
        ],
        next: 'ch12_battle_start'
    },

    ch12_battle_start: {
        image: 'assets/images/ch12_battle_chaos.png',
        bgm: 'ch12_battle',
        characters: {
            center: { char: 'imugi', emotion: 'serious' },
        },
        dialogue: [
            { speaker: '이무기', text: '...너희가, 막을 수 — 있을 — 것 같으세요?', emotion: 'smile' },
            { speaker: '이무기', text: '천 년의 — 한이, 여기 — 다 — 모여 — 있는데요.' },
            { speaker: '', text: '이무기의 몸이 — 거대해진다.' },
            { speaker: '', text: '뱀의 형상이, 강 — 전체를 — 가리듯 — 자라난다.' },
            { speaker: '', text: '그것이 — 한 번 — 휘둘리면, 강 — 절반의 물이, 한꺼번에 — 흔들린다.' },
        ],
        next: 'ch12_sashin_song'
    },

    ch12_sashin_song: {
        image: 'assets/images/ch12_sashin_circle.png',
        bgm: 'ch12_song',
        dialogue: [
            { speaker: '', text: '하은이, 강물에 — 발을 — 담근다.' },
            { speaker: '하은', text: '"...북쪽의 깊은 — 물이여, 일어나라."', condition: { flag: 'ch12_haeun_in' }, emotion: 'serious' },
            { speaker: '청룡', text: '"...동쪽의 푸른 — 바람이여, 함께 부니라."', condition: { flag: 'ch12_cheongryong_in' }, emotion: 'serious' },
            { speaker: '백호', text: '"...서쪽의 흰 — 검이여, 한 합으로 가르라."', condition: { flag: 'ch12_baekho_in' }, emotion: 'serious' },
            { speaker: '주작', text: '"...남쪽의 붉은 — 불이여, 정화하라."', condition: { flag: 'ch12_jujak_in' }, emotion: 'serious' },
            { speaker: '', text: '사신의 노래가 — 강을 — 둘러싼다.' },
            { speaker: '', text: '이무기의 — 황금 줄기가, 한 번 — 흔들린다.' },
            { speaker: '이무기', text: '...!', emotion: 'serious' },
        ],
        next: 'ch12_protagonist_strike'
    },

    ch12_protagonist_strike: {
        image: 'assets/images/ch12_blue_torrent.png',
        dialogue: [
            { speaker: '', text: '두 손에, 도술의 — 푸른 빛을, 모은다.' },
            // 도술 각성 정도 분기
            { speaker: '', text: '천 년의 도술이, 한꺼번에 — 흘러나온다. 청풍, 청룡, 봉인의 매듭, 그 모두가, 동시에.', condition: { flag: 'protagonist_accepted_truth' } },
            { speaker: '', text: '도술의 절반이, 흐릿하게 — 모여든다. 청풍천검의 — 형체만이, 겨우 — 갖춰진다.', condition: { flag: 'protagonist_unsure' } },
            { speaker: '', text: '도술이, 약하다. 1할의 — 청풍의 — 한 자락만이, 손에 — 모인다.', condition: { flag: 'protagonist_rejected_truth' } },
            { speaker: '???', text: '"청풍천검!"', emotion: 'serious' },
            { speaker: '', text: '푸른 검이, 이무기의 — 핵을, 향한다.' },
            { speaker: '이무기', text: '...! 도사 — 그분 — !', emotion: 'surprised' },
        ],
        next: 'ch12_climax_setup'
    },

    // ==========================================
    //  4막: 결정적 — 선택
    // ==========================================

    ch12_climax_setup: {
        image: 'assets/images/ch12_imugi_weakened.png',
        characters: {
            center: { char: 'imugi', emotion: 'sad' },
        },
        dialogue: [
            { speaker: '', text: '이무기의 — 몸이, 갈라진다.' },
            { speaker: '', text: '뱀의 — 비늘이, 한 장씩 — 떨어진다.' },
            { speaker: '', text: '하지만, 아직 — 살아 있다.' },
            { speaker: '이무기', text: '...후후.', emotion: 'smile' },
            { speaker: '이무기', text: '천 년의 — 한이, 이 자리에서 — 끝나는군요.' },
            { speaker: '이무기', text: '...자, 도사 — 그분. 어떻게, 끝내실래요?' },
            { speaker: '이무기', text: '죽이실래요? 봉인하실래요? 아니면 — 다른, 길?' },
        ],
        next: 'ch12_final_choice'
    },

    // 결정적 선택지 — 13장 엔딩으로 라우팅
    ch12_final_choice: {
        image: 'assets/images/ch12_imugi_weakened.png',
        choiceTimer: 12,
        choices: [
            // 격파 — 사신 다수 + 도술 각성 필요
            { text: '"...죽인다. 이번에야말로 — 끝낸다."',
              setFlags: { ch12_path_destroy: true },
              stats: { courage: 6 },
              next: 'ch12_path_destroy_check' },
            // 봉인 — 도술 일부라도
            { text: '"...봉인한다. 다시, 천 년 — 잠재워둔다."',
              setFlags: { ch12_path_seal: true },
              stats: { wisdom: 3, courage: 2 },
              next: 'ch12_path_seal_check' },
            // 자기 봉인 — 희생
            { text: '"...내가, 함께 — 잠든다. 그를, 내 — 안에, 가둔다."',
              setFlags: { ch12_path_sacrifice: true },
              stats: { courage: 5, love: 3 },
              next: 'ch12_path_sacrifice' },
            // 함께 이층으로
            { text: '"...함께, 이층으로 — 가자. 거기서, 너의 — 한을, 풀자."',
              setFlags: { ch12_path_together: true },
              stats: { love: 7 },
              requires: { love: 16 },
              next: 'ch12_path_together' },
            // 거래 — 정화 시도
            { text: '"...너의 — 한을, 정화하자. 진짜로 — 승천하게 — 도와줄게."',
              setFlags: { ch12_path_purify: true },
              stats: { love: 7, wisdom: 3 },
              requires: { love: 20, wisdom: 14 },
              next: 'ch12_path_purify' },
        ]
    },

    // ==========================================
    //  격파 라인
    // ==========================================
    ch12_path_destroy_check: {
        image: 'assets/images/ch12_imugi_weakened.png',
        // 사신 수 + 도술 상태에 따라 분기
        nextIf: [
            { condition: { allFlags: ['sashin_count_4', 'protagonist_accepted_truth'] }, next: 'ch12_destroy_perfect' },
            { condition: { allFlags: ['sashin_count_3', 'protagonist_accepted_truth'] }, next: 'ch12_destroy_great' },
            { condition: { flag: 'can_defeat_imugi' },                                   next: 'ch12_destroy_partial' },
        ],
        next: 'ch12_destroy_failed'
    },

    ch12_destroy_perfect: {
        image: 'assets/images/ch12_perfect_strike.png',
        dialogue: [
            { speaker: '', text: '네 영물의 노래가, 동시에 — 정점에 — 닿는다.' },
            { speaker: '', text: '나의 도술이, 천 년의 — 모든 도술이, 한 점으로 — 모인다.' },
            { speaker: '', text: '청풍천검이, 이무기의 — 한의 — 핵을, 정확히 — 가른다.' },
            { speaker: '이무기', text: '...아... 천 년 — 만에... 끝나는군요...', emotion: 'sad' },
            { speaker: '이무기', text: '...미안해요. 그 한이, 그렇게 — 깊었던 — 것이.', emotion: 'sad' },
            { speaker: '', text: '이무기의 — 몸이, 천천히 — 흩어진다.' },
            { speaker: '', text: '서울의 — 부정적 기가, 다 — 강에 — 풀린다.' },
            { speaker: '', text: '이층의 사람들이, 깨어난다. 한 사람씩.' },
        ],
        setFlags: { ending_path: 'true_end' },
        next: 'ch13_router'
    },

    ch12_destroy_great: {
        image: 'assets/images/ch12_great_strike.png',
        dialogue: [
            { speaker: '', text: '세 영물의 노래가, 큰 화음을 — 만든다.' },
            { speaker: '', text: '청풍천검이, 이무기의 — 핵의 — 90%를, 가른다.' },
            { speaker: '', text: '나머지 10%는 — 봉인된 채.' },
            { speaker: '이무기', text: '...후후. 졌네요.', emotion: 'smile' },
            { speaker: '', text: '이무기가 — 흩어진다.' },
            { speaker: '', text: '대부분의 — 부정적 기가, 정화된다.' },
            { speaker: '', text: '하지만 — 일부는, 도시 어딘가에, 잠재된 채로 — 남는다.' },
        ],
        setFlags: { ending_path: 'quiet_end' },
        next: 'ch13_router'
    },

    ch12_destroy_partial: {
        image: 'assets/images/ch12_partial_strike.png',
        dialogue: [
            { speaker: '', text: '두 영물의 노래.' },
            { speaker: '', text: '도술이, 절반의 힘으로 — 이무기를 친다.' },
            { speaker: '이무기', text: '...!', emotion: 'serious' },
            { speaker: '', text: '이무기가, 절반쯤 — 흩어진다. 하지만, 핵의 — 일부가, 강 — 깊은 — 곳으로, 도망친다.' },
            { speaker: '', text: '서울 — 일부만, 정화된다.' },
        ],
        setFlags: { ending_path: 'quiet_end' },
        next: 'ch13_router'
    },

    ch12_destroy_failed: {
        image: 'assets/images/ch12_failed_strike.png',
        dialogue: [
            { speaker: '', text: '...힘이, 부족하다.' },
            { speaker: '', text: '도술이, 약하다. 사신이, 부족하다.' },
            { speaker: '이무기', text: '...후후, 후, 후.', emotion: 'smile' },
            { speaker: '이무기', text: '안타깝네요. 너희가 — 천 년의 — 한을, 막을 만큼 — 강하시지, 못했어요.' },
            { speaker: '', text: '이무기의 — 의식이, 그대로 — 끝까지 진행된다.' },
            { speaker: '', text: '서울의 — 모든 부정적 기가, 그에게 — 흡수된다.' },
            { speaker: '', text: '이층의 사람들은 — 영영, 깨어나지 않는다.' },
        ],
        setFlags: { ending_path: 'lost_end' },
        next: 'ch13_router'
    },

    // ==========================================
    //  봉인 라인
    // ==========================================
    ch12_path_seal_check: {
        image: 'assets/images/ch12_imugi_weakened.png',
        nextIf: [
            { condition: { allFlags: ['can_defeat_imugi', 'protagonist_accepted_truth'] }, next: 'ch12_seal_success' },
            { condition: { flag: 'protagonist_unsure' },                                  next: 'ch12_seal_partial' },
        ],
        next: 'ch12_seal_failed'
    },

    ch12_seal_success: {
        image: 'assets/images/ch12_seal_circle.png',
        dialogue: [
            { speaker: '', text: '"...봉인의 매듭."' },
            { speaker: '', text: '천 년 전에 했던 — 그 도술을, 다시.' },
            { speaker: '', text: '이번엔, 사신의 노래가 — 함께한다. 더 깊은 봉인.' },
            { speaker: '이무기', text: '...아.', emotion: 'smile' },
            { speaker: '이무기', text: '또, 천 년의 — 잠이군요.' },
            { speaker: '이무기', text: '...언젠가, 다시 — 깨어날게요.', emotion: 'serious' },
            { speaker: '', text: '이무기가, 강 — 깊은 — 곳으로, 잠긴다.' },
            { speaker: '', text: '봉인이 완성된다.' },
            { speaker: '', text: '서울의 부정적 기는 — 정화되지 않는다. 다만, 이무기로부터, 끊어진다.' },
            { speaker: '', text: '시간이 — 다시, 흐를 것이다.' },
        ],
        setFlags: { ending_path: 'quiet_end' },
        next: 'ch13_router'
    },

    ch12_seal_partial: {
        image: 'assets/images/ch12_seal_circle.png',
        dialogue: [
            { speaker: '', text: '봉인의 매듭이, 절반쯤 — 만들어진다.' },
            { speaker: '', text: '도술이 부족하다. 봉인이, 약하다.' },
            { speaker: '이무기', text: '...100년이면 — 깨어날, 봉인이네요. 하지만 — 100년이라도, 길어요.', emotion: 'smile' },
            { speaker: '', text: '이무기가, 강 — 안으로, 잠긴다.' },
            { speaker: '', text: '서울은 — 정화되지 않는다.' },
            { speaker: '', text: '하지만 — 100년, 평화가 — 온다.' },
        ],
        setFlags: { ending_path: 'quiet_end' },
        next: 'ch13_router'
    },

    ch12_seal_failed: {
        image: 'assets/images/ch12_failed_strike.png',
        dialogue: [
            { speaker: '', text: '봉인의 매듭이 — 만들어지지 않는다.' },
            { speaker: '', text: '도술이, 너무 약하다.' },
            { speaker: '이무기', text: '...후후. 반갑네요, 도사 — 그분. 1할의, 1할이세요.', emotion: 'smile' },
            { speaker: '', text: '이무기의 의식이 — 끝까지 진행된다.' },
        ],
        setFlags: { ending_path: 'lost_end' },
        next: 'ch13_router'
    },

    // ==========================================
    //  자기 봉인 라인 (희생)
    // ==========================================
    ch12_path_sacrifice: {
        image: 'assets/images/ch12_self_seal.png',
        dialogue: [
            { speaker: '', text: '"...내가, 함께 — 잠든다."' },
            { speaker: '', text: '도사가 — 놀란다.' },
            { speaker: '전우치', text: '...!! 안 — 돼요 — !', emotion: 'surprised' },
            { speaker: '', text: '하지만 — 결심은, 단단하다.' },
            { speaker: '', text: '내 안에, 이무기를 — 가둔다.' },
            { speaker: '', text: '천 년의 한을, 내 도술의 매듭으로 — 묶는다.' },
            { speaker: '이무기', text: '...당신은 — !', emotion: 'surprised' },
            { speaker: '이무기', text: '...후후, 후, 후, 후, 후.', emotion: 'smile' },
            { speaker: '이무기', text: '천 년 — 만에, 제 한을 — 받아주시는, 분.' },
            { speaker: '이무기', text: '...같이, 잠들지요.', emotion: 'sad' },
            { speaker: '', text: '이무기와, 나의 — 도술이 — 하나로 — 엉킨다.' },
            { speaker: '', text: '강 — 깊은 — 곳으로, 함께 — 가라앉는다.' },
            { speaker: '', text: '의식이, 멀어진다.' },
            { speaker: '', text: '...사람들이, 깨어나는 — 모습을, 보지 — 못 — 한다.' },
            { speaker: '', text: '하지만, 안다. 그들은, 깨어날 — 거다.' },
        ],
        setFlags: { ending_path: 'ascend_end' },
        next: 'ch13_router'
    },

    // ==========================================
    //  함께 이층으로 라인
    // ==========================================
    ch12_path_together: {
        image: 'assets/images/ch12_together_path.png',
        dialogue: [
            { speaker: '', text: '"...함께, 이층으로 — 가자."' },
            { speaker: '이무기', text: '...네?', emotion: 'surprised' },
            { speaker: '', text: '"이쪽 — 세상에서, 너의 한이 — 안 풀린다면, 이층에서, 풀자."' },
            { speaker: '', text: '"우리 — 모두가, 함께. 거기서, 너의 — 천 년을, 새로 — 살자."' },
            { speaker: '이무기', text: '...! 그건 — 무슨, 미친 — 말씀이세요.', emotion: 'surprised' },
            { speaker: '이무기', text: '...아니, 정신 — 나가신 분만이 — 그런 — 말씀을, 하시지요.' },
            { speaker: '이무기', text: '...후후. 천 년 — 만에, 처음 — 뵙는 — 미치광이세요. (실눈 미소)', emotion: 'smile' },
            { speaker: '이무기', text: '...좋아요. 따라오시지요.' },
            { speaker: '', text: '이무기가, 의식을 — 멈춘다.' },
            { speaker: '', text: '사람들은 — 깨어나지 않는다. 하지만, 부정적 기는 — 더 — 흡수되지 않는다.' },
            { speaker: '', text: '우리 모두가 — 이층으로, 들어간다. 새로운 서울, 새로운 — 시간을, 짓기 위해.' },
        ],
        setFlags: { ending_path: 'together_end' },
        next: 'ch13_router'
    },

    // ==========================================
    //  정화 라인 (가장 어려운 길)
    // ==========================================
    ch12_path_purify: {
        image: 'assets/images/ch12_purify_path.png',
        dialogue: [
            { speaker: '', text: '"...너의 — 한을, 정화하자. 진짜로 — 승천하게 — 도와줄게."' },
            { speaker: '이무기', text: '...!', emotion: 'surprised' },
            { speaker: '이무기', text: '...당신, 그게 — 진심이세요?', emotion: 'serious' },
            { speaker: '', text: '"진심이야. 너는 — 한이 — 깊을 뿐, 악한 자는 — 아니야."' },
            { speaker: '주작', text: '"...정화의 노래로, 함께 — 부를게요."', condition: { flag: 'ch12_jujak_in' }, emotion: 'serious' },
            { speaker: '구미호', text: '"...저도, 곁에서 — 노래할게요."', condition: { flag: 'ch12_gumiho_in' }, emotion: 'serious' },
            { speaker: '구미호', text: '"...저도, 곁에서 — 노래할게요."', condition: { flag: 'gumiho_with_protagonist_battle' }, emotion: 'serious' },
            { speaker: '', text: '도술과, 정화의 노래가 — 이무기의 — 한을, 한 자락씩 — 풀어낸다.' },
            { speaker: '', text: '이무기의 — 눈에서, 천 년의 — 한이, 흘러내린다.' },
            { speaker: '이무기', text: '...어, 어, 후, 후, 후, 후, 후.', emotion: 'sad' },
            { speaker: '이무기', text: '...백 년 — 만에, 천 년 — 만에. 처음으로, 누군가가 — 제 한을, 들어주시는군요.', emotion: 'sad' },
            { speaker: '', text: '이무기의 한이, 정화된다.' },
            { speaker: '', text: '서울의 부정적 기가 — 모두 — 풀려난다.' },
            { speaker: '', text: '이무기가, 진짜로 — 정한 마음이 되어, 하늘로 — 오른다.' },
            { speaker: '', text: '...진정한, 승천.' },
        ],
        setFlags: { ending_path: 'true_end_purified' },
        next: 'ch13_router'
    },

    // ==========================================
    //  엔딩 라우터 — 13장으로
    // ==========================================
    ch13_router: {
        image: 'assets/images/ch13_dawn.png',
        next: 'ch13_intro'
    },
};

// ==========================================
//  제12장 플로우차트
// ==========================================

const FLOWCHARTS_CH12 = {
    ch12: {
        episode: '제12장',
        title: '한강의 자정',
        tree: [
            { type: 'story', text: '한강 어귀 — 이무기의 의식' },
            { type: 'story', text: '구미호의 결정 (9장 분기)' },
            { type: 'story', text: '사신의 노래 + 청풍천검' },
            { type: 'choice', label: '결정적 선택', sceneId: 'ch12_final_choice',
              branches: [
                  { text: '죽인다 (격파)' },
                  { text: '봉인한다' },
                  { text: '함께 잠든다 (희생)' },
                  { text: '함께 이층으로' },
                  { text: '정화한다 (진엔딩)' },
              ]
            },
            { type: 'story', text: '13장으로 — 엔딩 분기' },
        ],
    },
};
