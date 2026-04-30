/**
 * 이층 : 서울, 0시 — 제1장: 첫 번째 요괴와의 조우
 * 텅 빈 서울 거리 → 편의점 → 어둑시니 전투
 */

const SCENES_CH1 = {

    // ==========================================
    //  1막: 텅 빈 거리
    // ==========================================

    ch1_intro: {
        chapter: { number: '제1장', title: '어둑시니' },
        image: 'assets/images/ch1_empty_street.png',
        imageEffect: 'ken-burns',
        bgm: 'ch1',
        dialogue: [
            { speaker: '', text: '계단을 다 올라왔다.' },
            { speaker: '', text: '을지로. 서울의 한복판.' },
            { speaker: '', text: '네온사인이 켜져 있다. 간판도, 신호등도.' },
            { speaker: '', text: '전부 작동하고 있다. 사람만 빼고.' },
            { speaker: '', text: '신호가 바뀐다. 빨간불에서 파란불로.' },
            { speaker: '', text: '건너는 사람은 없다.' },
        ],
        next: 'ch1_companion_check'
    },

    // --- 동행 여부 라우팅 (자동 분기) ---
    ch1_companion_check: {
        image: 'assets/images/ch1_empty_street.png',
        setFlagsIf: [
            { condition: { flag: 'with_girl' }, flags: { has_companion: true } },
            { condition: { flag: 'cautious_together' }, flags: { has_companion: true } },
            { condition: { flag: 'rejected_girl' }, flags: { is_alone: true } },
            { condition: { flag: 'alone_ran' }, flags: { is_alone: true } },
        ],
        next: 'ch1_street'
    },

    ch1_street: {
        image: 'assets/images/ch1_empty_street.png',
        characterIf: [
            { flag: 'has_companion', character: 'assets/images/character_neutral.png', name: '하은' },
        ],
        dialogue: [
            { speaker: '', text: '바람이 분다. 여름인데 차갑다.' },
            { speaker: '', text: '가로등이 깜빡인다. 규칙 없이, 제멋대로.' },
            { speaker: '', text: '아스팔트가 젖어 있다. 비가 온 것 같은데, 하늘은 맑다.' },
            // 동행
            { speaker: '???', text: '...진짜 아무도 없어.', condition: { flag: 'with_girl' } },
            { speaker: '???', text: '지하에서도 그랬지만... 밖도 똑같네.', condition: { flag: 'with_girl' } },
            { speaker: '???', text: '...위도 마찬가지구나.', condition: { flag: 'cautious_together' } },
            { speaker: '???', text: '(주위를 경계하며) 일단 움직이자. 여기 서 있으면 안 돼.', condition: { flag: 'cautious_together' } },
            // 혼자
            { speaker: '', text: '혼자다.', condition: { flag: 'is_alone' } },
            { speaker: '', text: '이 넓은 서울에 나 혼자라는 사실이 — 천천히 실감된다.', condition: { flag: 'is_alone' } },
            // 공통
            { speaker: '', text: '50미터쯤 걸었을까.' },
            { speaker: '', text: '그때 — 가로등 아래에 누군가가 보인다.' },
        ],
        next: 'ch1_notice_student'
    },

    // --- 서연 조우 ---
    ch1_notice_student: {
        image: 'assets/images/ch1_empty_street.png',
        characters: {
            left: { src: 'assets/images/character_neutral.png', name: '하은',
                    condition: { flag: 'has_companion' } },
            right: { src: 'assets/images/character_student.png', name: '서연', scale: 0.95 },
        },
        dialogue: [
            { speaker: '', text: '버스 정류장 벤치.' },
            { speaker: '', text: '교복을 입은 여자아이가 앉아 있다.' },
            { speaker: '', text: '무릎 위에 노트를 펼치고, 뭔가를 적고 있다.' },
            { speaker: '', text: '가로등 불빛 아래 — 안경 너머의 눈이 진지하다.' },
            { speaker: '', text: '이 텅 빈 서울에서, 사람이다.' },
            // 동행
            { speaker: '???', text: '(속삭이며) ...저기, 사람 있어.', condition: { flag: 'has_companion' } },
            { speaker: '???', text: '살아있는 거 맞지...?', condition: { flag: 'has_companion' } },
            // 혼자
            { speaker: '', text: '나 말고 다른 사람이 — 있다.', condition: { flag: 'is_alone' } },
        ],
        choices: [
            {
                text: '다가가서 말을 건다',
                statHint: '혼자가 아닐 수도 있다',
                stats: { love: 5, courage: 3 },
                next: 'ch1_student_approach'
            },
            {
                text: '거리를 두고 관찰한다',
                statHint: '함부로 다가가면 안 된다',
                stats: { wisdom: 4, calm: 3 },
                next: 'ch1_student_observe'
            }
        ]
    },

    ch1_student_approach: {
        image: 'assets/images/ch1_empty_street.png',
        characters: {
            left: { src: 'assets/images/character_neutral.png', name: '하은',
                    condition: { flag: 'has_companion' } },
            right: { src: 'assets/images/character_student.png', name: '서연', scale: 0.95 },
        },
        dialogue: [
            { speaker: '', text: '다가간다. 발소리를 내며, 천천히.' },
            { speaker: '', text: '그 아이가 고개를 든다.' },
            { speaker: '', text: '놀라지 않는다. 마치 — 올 줄 알았다는 듯이.' },
            { speaker: '서연', text: '(안경을 고쳐쓰며) ...당신도 깨어있는 사람이군요.' },
            { speaker: '', text: '목소리가 차분하다. 이 상황에 비해 지나치게.' },
            { speaker: '서연', text: '0시 13분에 모든 사람이 사라졌어요. 정확히.' },
            { speaker: '서연', text: '(노트를 보여주며) 지하철은 정차 상태, 전기는 살아있고, 통신은 불통.' },
            { speaker: '서연', text: '기록하고 있었어요. 혼자서라도 파악은 해야 하니까.' },
            // 동행
            { speaker: '???', text: '...너 혼자 여기 있었어?', condition: { flag: 'has_companion' } },
            { speaker: '서연', text: '학원에 있었어요. 야자 중이었는데, 정신 차려보니 혼자였죠.', condition: { flag: 'has_companion' } },
            // 혼자
            { speaker: '서연', text: '당신은 어디에서 왔어요?', condition: { flag: 'is_alone' } },
            { speaker: '주인공', text: '...지하철. 을지로역.', condition: { flag: 'is_alone' } },
            { speaker: '서연', text: '(노트에 적으며) 을지로역... 지하에서도 같은 현상이.', condition: { flag: 'is_alone' } },
        ],
        next: 'ch1_student_choice'
    },

    ch1_student_observe: {
        image: 'assets/images/ch1_empty_street.png',
        characters: {
            left: { src: 'assets/images/character_neutral.png', name: '하은',
                    condition: { flag: 'has_companion' } },
            right: { src: 'assets/images/character_student.png', name: '서연', scale: 0.95 },
        },
        dialogue: [
            { speaker: '', text: '멈춘다. 거리를 둔다.' },
            { speaker: '', text: '그 아이를 관찰한다. 교복, 가방, 노트.' },
            { speaker: '', text: '위험해 보이지는 않는다. 하지만 이 세상에서 뭘 믿을 수 있을까.' },
            { speaker: '', text: '...' },
            { speaker: '', text: '그때 — 그 아이가 먼저 이쪽을 본다.' },
            { speaker: '서연', text: '...거기 서서 보고만 있을 건가요?' },
            { speaker: '', text: '들켰다.' },
            { speaker: '서연', text: '(안경을 고쳐쓰며) 괜찮아요. 해칠 생각 없어요.' },
            { speaker: '서연', text: '솔직히 — 사람을 만난 게 기록 시작하고 처음이라.' },
            { speaker: '서연', text: '0시 13분 이후로 전부 사라졌어요. 기록하고 있었어요, 혼자서.' },
        ],
        next: 'ch1_student_choice'
    },

    ch1_student_choice: {
        image: 'assets/images/ch1_empty_street.png',
        characters: {
            left: { src: 'assets/images/character_neutral.png', name: '하은',
                    condition: { flag: 'has_companion' } },
            right: { src: 'assets/images/character_student.png', name: '서연', scale: 0.95 },
        },
        dialogue: [
            { speaker: '서연', text: '저는 이서연. 근처 학원에 다니는... 다녔던 고등학생이에요.' },
            { speaker: '서연', text: '(노트를 닫으며) 혼자 돌아다니는 건 비효율적이에요.' },
            { speaker: '서연', text: '같이 움직이는 게 합리적이라고 생각해요.' },
            // 동행
            { speaker: '???', text: '...어떡해? 같이 가자고 할까?', condition: { flag: 'has_companion' } },
            // 혼자
            { speaker: '', text: '차분한 눈이 나를 본다. 기다리고 있다.', condition: { flag: 'is_alone' } },
        ],
        choices: [
            {
                text: '같이 가자',
                statHint: '인원이 많을수록 안전하다',
                stats: { love: 11 },
                affinity: { haeun: 3 },
                setFlags: { student_companion: true },
                next: 'ch1_student_join'
            },
            {
                text: '미안하지만, 각자 가는 게 나을 것 같아',
                statHint: '부담을 지고 싶지 않다',
                stats: { calm: 4, courage: 3, love: -2 },
                affinity: { haeun: -2 },
                setFlags: { student_refused: true },
                next: 'ch1_student_refuse'
            }
        ]
    },

    ch1_student_join: {
        image: 'assets/images/ch1_empty_street.png',
        characters: {
            left: { src: 'assets/images/character_neutral.png', name: '하은',
                    condition: { flag: 'has_companion' } },
            right: { src: 'assets/images/character_student.png', name: '서연', scale: 0.95 },
        },
        setFlags: { with_seoyeon: true },
        addCompanion: {
            id: 'student',
            name: '서연',
            portrait: 'assets/images/character_student.png',
        },
        dialogue: [
            { speaker: '서연', text: '(작게 고개를 숙이며) ...고마워요.', affinity: { student: 3 } },
            { speaker: '서연', text: '이서연이에요. 서연이라고 불러주세요.' },
            { speaker: '', text: '가방을 메고 일어선다. 노트를 소중하게 넣는 모습이 보인다.' },
            // 동행
            { speaker: '???', text: '나는 하은이야. 반가워, 서연.', condition: { flag: 'has_companion' }, setFlags: { know_name: true } },
            { speaker: '서연', text: '(고개를 끄덕이며) 하은 씨. 반갑습니다.', condition: { flag: 'has_companion' } },
            { speaker: '???', text: '씨는 좀... 말 편하게 해도 돼.', condition: { flag: 'has_companion' } },
            { speaker: '서연', text: '...노력해볼게요.', condition: { flag: 'has_companion' } },
            // 혼자
            { speaker: '', text: '혼자가 아니게 됐다.', condition: { flag: 'is_alone' } },
            // 공통
            { speaker: '서연', text: '(주위를 둘러보며) 저기 편의점이 보여요. 물자를 확보하는 게 먼저일 것 같아요.' },
            { speaker: '', text: '그녀의 시선이 정확하게 편의점 간판을 가리킨다.' },
            { speaker: '', text: '어디로 갈까.' },
        ],
        next: 'ch1_where_to_go'
    },

    ch1_student_refuse: {
        image: 'assets/images/ch1_empty_street.png',
        characters: {
            left: { src: 'assets/images/character_neutral.png', name: '하은',
                    condition: { flag: 'has_companion' } },
            right: { src: 'assets/images/character_student.png', name: '서연', scale: 0.95 },
        },
        dialogue: [
            { speaker: '서연', text: '...' },
            { speaker: '서연', text: '(안경 너머로 한 번 더 보고) ...그래요. 이해해요.' },
            { speaker: '', text: '그 아이가 다시 벤치에 앉는다.' },
            { speaker: '', text: '노트를 펼친다. 펜을 든다.' },
            { speaker: '', text: '손끝이 — 떨리고 있다.' },
            { speaker: '서연', text: '...조심하세요.', speakerPosition: 'right' },
            { speaker: '', text: '돌아선다. 뒤에서 펜 소리가 들린다.' },
            // 동행
            { speaker: '???', text: '(속삭이며) ...괜찮을까, 저 아이.', condition: { flag: 'has_companion' } },
            { speaker: '', text: '대답하지 않는다.' },
            // 공통
            { speaker: '', text: '주위를 둘러본다. 어디로 가야 할까.' },
        ],
        next: 'ch1_where_to_go'
    },

    // --- 방향 선택 ---
    ch1_where_to_go: {
        image: 'assets/images/ch1_empty_street.png',
        characterIf: [
            { flag: 'has_companion', character: 'assets/images/character_neutral.png', name: '하은' },
        ],
        dialogue: [
            { speaker: '', text: '주머니를 뒤져본다. 지갑, 열쇠. 핸드폰은 여전히 꺼져 있다.' },
            { speaker: '', text: '주위를 둘러본다. 세 방향이 보인다.' },
        ],
        choices: [
            {
                text: '불이 켜진 편의점으로 간다',
                statHint: '빛이 있는 곳이 안전하다',
                stats: { wisdom: 5, calm: 3 },
                next: 'ch1_convstore_approach'
            },
            {
                text: '가까운 건물 안으로 들어간다',
                statHint: '벽이라도 있어야 한다',
                stats: { courage: 7 },
                next: 'ch1_building_locked'
            },
            {
                text: '큰길을 따라 걸어본다',
                statHint: '사람이 있을지도 모른다',
                stats: { courage: 5, love: 3 },
                next: 'ch1_walk_further'
            }
        ]
    },

    // --- 건물: 막다른 길 ---
    ch1_building_locked: {
        image: 'assets/images/ch1_empty_street.png',
        dialogue: [
            { speaker: '', text: '가장 가까운 건물로 다가간다. 오피스 빌딩이다.' },
            { speaker: '', text: '유리문을 당긴다. 잠겨 있다.' },
            { speaker: '', text: '옆 건물도. 그 옆도. 전부 잠겨 있다.' },
            { speaker: '', text: '마치 이 도시 전체가 나를 밖에 세워둔 것 같다.' },
            { speaker: '???', text: '...안 열려. 전부 잠겨있어.', condition: { flag: 'has_companion' } },
            { speaker: '', text: '그때 — 길 건너편에 편의점 불빛이 눈에 들어온다.' },
            { speaker: '', text: '저기라도 가보자.' },
        ],
        next: 'ch1_convstore_approach'
    },

    // --- 큰길: 이상한 소리 ---
    ch1_walk_further: {
        image: 'assets/images/ch1_empty_street.png',
        dialogue: [
            { speaker: '', text: '큰길을 따라 걷는다. 을지로 방향.' },
            { speaker: '', text: '가로등 아래를 지날 때마다 그림자가 늘어났다 줄어든다.' },
            { speaker: '', text: '50미터쯤 걸었을까.' },
            { speaker: '', text: '....' },
            { speaker: '', text: '발소리가 들린다. 내 발소리가 아니다.' },
            { speaker: '', text: '뒤를 돌아본다. 아무것도 없다.' },
            { speaker: '', text: '...아무것도 없는데, 공기가 무겁다.' },
            { speaker: '???', text: '...되돌아가자. 뭔가 이상해.', condition: { flag: 'has_companion' } },
            { speaker: '', text: '본능적으로 — 밝은 쪽으로 발길을 돌린다.', condition: { flag: 'is_alone' } },
            { speaker: '', text: '길 건너편, 편의점 간판이 보인다.' },
        ],
        next: 'ch1_convstore_approach'
    },

    // ==========================================
    //  2막: 편의점
    // ==========================================

    ch1_convstore_approach: {
        image: 'assets/images/ch1_convstore_exterior.png',
        characters: {
            left: { src: 'assets/images/character_neutral.png', name: '하은', condition: { flag: 'has_companion' } },
            right: { src: 'assets/images/character_student.png', name: '서연', scale: 0.95, condition: { flag: 'student_companion' } },
        },
        dialogue: [
            { speaker: '', text: '편의점. 간판이 환하게 빛나고 있다.' },
            { speaker: '', text: '자동문이 열려 있다. 안에서 형광등 불빛이 새어나온다.' },
            { speaker: '', text: '이 도시에서 유일하게 문이 열린 곳.' },
            { speaker: '???', text: '...들어가볼까?', condition: { flag: 'with_girl' } },
            { speaker: '???', text: '...일단 안을 확인하고 들어가자.', condition: { flag: 'cautious_together' } },
            { speaker: '서연', text: '편의점이라면 물자 확보가 가능해요. 들어가죠.', condition: { flag: 'student_companion' } },
        ],
        next: 'ch1_convstore_enter'
    },

    ch1_convstore_enter: {
        image: 'assets/images/ch1_convstore_interior.png',
        characters: {
            left: { src: 'assets/images/character_neutral.png', name: '하은', condition: { flag: 'has_companion' } },
            right: { src: 'assets/images/character_student.png', name: '서연', scale: 0.95, condition: { flag: 'student_companion' } },
        },
        dialogue: [
            { speaker: '', text: '안으로 들어선다.' },
            { speaker: '', text: '딩동. 입구 센서가 울린다. 아무도 없는데.' },
            { speaker: '', text: '형광등이 미세하게 떨린다. 윙 — 하는 기계음.' },
            { speaker: '', text: '진열대에는 물건이 빼곡하다. 삼각김밥, 음료, 과자.' },
            { speaker: '', text: '계산대 위의 시계. 멈춰 있다. 0시 0분.' },
            { speaker: '', text: '카운터 뒤에 사람이 없다. 여기도 마찬가지다.' },
            { speaker: '???', text: '...물건은 있는데 사람만 없어. 지하철이랑 똑같아.', condition: { flag: 'has_companion' } },
            { speaker: '', text: '냉장고에서 붕 하는 소리가 난다. 전기는 들어오는 모양이다.', condition: { flag: 'is_alone' } },
            { speaker: '서연', text: '(노트에 적으며) 0시 0분... 모든 시계가 같은 시간에 멈춰있어요.', condition: { flag: 'student_companion' } },
        ],
        next: 'ch1_store_look'
    },

    ch1_store_look: {
        image: 'assets/images/ch1_convstore_interior.png',
        characters: {
            left: { src: 'assets/images/character_neutral.png', name: '하은', condition: { flag: 'has_companion' } },
            right: { src: 'assets/images/character_student.png', name: '서연', scale: 0.95, condition: { flag: 'student_companion' } },
        },
        dialogue: [
            { speaker: '', text: '안을 둘러본다.' },
            { speaker: '', text: '카운터 아래 — 손전등, 라이터, 건전지. 비상용 물품들.' },
            { speaker: '', text: '진열대 — 물, 삼각김밥, 에너지바. 당장 먹을 것들.' },
            { speaker: '', text: '계산대 — 열린 금고. 현금 다발. 그리고 뒤쪽 선반에 양주병들.' },
            { speaker: '', text: '가방에 다 넣을 순 없다. 골라야 한다.' },
            // 동행 반응
            { speaker: '???', text: '뭘 챙길지 잘 생각해. 언제 또 이런 곳을 찾을지 모르니까.', condition: { flag: 'with_girl' } },
            { speaker: '???', text: '...실용적인 걸로 챙기자.', condition: { flag: 'cautious_together' } },
            { speaker: '서연', text: '빛과 열원이 우선이에요. 어둠 속에선 그게 전부니까.', condition: { flag: 'student_companion' } },
        ],
        choices: [
            {
                text: '손전등과 라이터를 챙긴다',
                statHint: '어둠에 대비한다',
                stats: { wisdom: 8, calm: 5 },
                setFlags: { took_survival: true },
                next: 'ch1_store_survival'
            },
            {
                text: '물과 음식을 챙긴다',
                statHint: '살아남으려면 먹어야 한다',
                stats: { love: 6, courage: 5 },
                setFlags: { took_food: true },
                next: 'ch1_store_food'
            },
            {
                text: '현금과 양주를 챙긴다',
                statHint: '어차피 주인도 없는데',
                stats: { courage: 5, love: 0 },
                setFlags: { took_greed: true },
                next: 'ch1_store_greed'
            }
        ]
    },

    ch1_store_survival: {
        image: 'assets/images/ch1_convstore_interior.png',
        dialogue: [
            { speaker: '', text: '손전등을 집어든다. 건전지를 넣고 켜본다. 작동한다.' },
            { speaker: '', text: '라이터 두 개. 주머니에 넣는다.' },
            { speaker: '', text: '건전지 여분도 가방에 넣는다.' },
            { speaker: '', text: '이 도시에서 빛은 — 무기가 될 수도 있다는 직감이 든다.' },
        ],
        next: 'ch1_store_reaction'
    },

    ch1_store_food: {
        image: 'assets/images/ch1_convstore_interior.png',
        dialogue: [
            { speaker: '', text: '물 두 병. 삼각김밥 세 개. 에너지바.' },
            { speaker: '', text: '가방에 차곡차곡 넣는다.' },
            { speaker: '', text: '언제까지 이곳에 있게 될지 모른다.' },
            { speaker: '', text: '먹을 것이 있다는 건 — 그래도 살아있다는 뜻이다.' },
        ],
        next: 'ch1_store_reaction'
    },

    ch1_store_greed: {
        image: 'assets/images/ch1_convstore_interior.png',
        dialogue: [
            { speaker: '', text: '금고에서 현금 다발을 꺼낸다. 손이 떨린다.' },
            { speaker: '', text: '양주병을 집어든다. 묵직하다.' },
            { speaker: '', text: '이 세상에서 이게 무슨 의미가 있을까.' },
            { speaker: '', text: '...모르겠다. 그냥 — 평소에 못 하던 걸 하고 싶었다.' },
        ],
        next: 'ch1_store_reaction'
    },

    ch1_store_reaction: {
        image: 'assets/images/ch1_convstore_interior.png',
        characters: {
            left: { src: 'assets/images/character_neutral.png', name: '하은', condition: { flag: 'has_companion' } },
            right: { src: 'assets/images/character_student.png', name: '서연', scale: 0.95, condition: { flag: 'student_companion' } },
        },
        dialogue: [
            // 동행: 생존물품
            { speaker: '???', text: '잘 골랐어. 어둠 속에선 빛이 전부야.', condition: { flag: 'took_survival' }, affinity: { haeun: 2 } },
            // 동행: 음식 (신뢰)
            { speaker: '???', text: '...나도 하나 줘. 배고파.', condition: { flag: 'took_food' }, affinity: { haeun: 3 } },
            // 동행: 탐욕 (신뢰)
            { speaker: '???', text: '...진짜로? 지금 그걸 챙겨?', condition: { flag: 'took_greed' }, affinity: { haeun: -5 } },
            { speaker: '', text: '그녀의 시선이 차갑다.', condition: { flag: 'took_greed' } },
            // 서연 반응 (동료일 때만)
            { speaker: '서연', text: '합리적인 선택이에���.', condition: { flag: 'student_companion' }, affinity: { student: 2 } },
            // 혼자: 간결하게
            { speaker: '', text: '가방을 메고 한숨을 돌린다.', condition: { flag: 'is_alone' } },
        ],
        next: 'ch1_store_settle'
    },

    ch1_store_settle: {
        image: 'assets/images/ch1_convstore_interior.png',
        characters: {
            left: { src: 'assets/images/character_neutral.png', name: '하은', condition: { flag: 'has_companion' } },
            right: { src: 'assets/images/character_student.png', name: '서연', scale: 0.95, condition: { flag: 'student_companion' } },
        },
        dialogue: [
            { speaker: '', text: '카운터에 기대앉는다. 잠깐이라도 숨을 고르자.' },
            { speaker: '', text: '형광등이 윙 — 거린다. 냉장고 모터가 돌아간다.' },
            { speaker: '', text: '이상하게도 — 이 인공적인 소리들이 위안이 된다.' },
            // 동행
            { speaker: '???', text: '...이게 뭔 상황인지 아직도 모르겠어.', condition: { flag: 'with_girl' } },
            { speaker: '주인공', text: '나도...', condition: { flag: 'with_girl' } },
            { speaker: '???', text: '(창밖을 보며) ...오래 쉬면 안 될 것 같아.', condition: { flag: 'cautious_together' } },
            // 혼자
            { speaker: '', text: '조용하다. 너무 조용하다.', condition: { flag: 'is_alone' } },
            // 공통
            { speaker: '', text: '그때 —' },
        ],
        next: 'ch1_lights_out'
    },

    // ==========================================
    //  불 꺼짐 → 어둑시니 등장
    // ==========================================

    ch1_lights_out: {
        image: 'assets/images/ch1_convstore_interior.png',
        dialogue: [
            { speaker: '', text: '형광등이 깜빡인다.' },
            { speaker: '', text: '한 번. 두 번.' },
            { speaker: '', text: '세 번째 — 꺼진다.' },
            { speaker: '', text: '냉장고 소리도 멈춘다.' },
            { speaker: '', text: '...' },
            { speaker: '', text: '완전한 어둠.' },
        ],
        next: 'ch1_darkness'
    },

    ch1_darkness: {
        image: 'assets/images/ch1_convstore_dark.png',
        dialogue: [
            { speaker: '', text: '아무것도 보이지 않는다.' },
            { speaker: '', text: '내 숨소리만 들린다.' },
            // 동행
            { speaker: '???', text: '...뭐야. 왜 갑자기...', condition: { flag: 'has_companion' } },
            { speaker: '', text: '옆에서 그녀의 숨소리가 들린다. 빨라지고 있다.', condition: { flag: 'has_companion' } },
            // 혼자
            { speaker: '', text: '심장이 빠르게 뛴다.', condition: { flag: 'is_alone' } },
            // 공통
            { speaker: '', text: '그때 — 온도가 내려간다.' },
            { speaker: '', text: '여름 밤이었다. 그런데 입에서 하얀 김이 나올 것 같다.' },
            { speaker: '', text: '...뭔가 있다.' },
            { speaker: '', text: '보이지 않는다. 소리도 없다.' },
            { speaker: '', text: '하지만 — 확실하게 느껴진다.' },
            { speaker: '', text: '어둠 속에 뭔가가 서 있다.' },
        ],
        next: 'ch1_shadow_appear'
    },

    ch1_shadow_appear: {
        image: 'assets/images/ch1_convstore_dark.png',
        characters: { center: 'assets/images/ch1_eoduksini.png' },
        bgm: 'ch1-battle',
        dialogue: [
            { speaker: '', text: '눈이 어둠에 적응하기 시작한다.' },
            { speaker: '', text: '편의점 입구. 유리문 너머로 가로등 빛이 희미하게 들어온다.' },
            { speaker: '', text: '그 빛 앞에 — 무언가가 서 있다.' },
            { speaker: '', text: '사람이 아니다.' },
            { speaker: '', text: '그림자다. 어둠보다 더 짙은 그림자.' },
            { speaker: '', text: '윤곽이 사람 같지만, 얼굴이 없다.' },
            { speaker: '', text: '그것은 — 움직이지 않는다.' },
            { speaker: '', text: '그냥 서 있다. 나를 보고 있다.' },
            // 동행
            { speaker: '???', text: '(속삭이며) ...저거 뭐야...', condition: { flag: 'has_companion' } },
        ],
        next: 'ch1_shadow_describe'
    },

    ch1_shadow_describe: {
        image: 'assets/images/ch1_convstore_dark.png',
        characters: { center: 'assets/images/ch1_eoduksini.png' },
        choiceTimer: 10,
        dialogue: [
            { speaker: '', text: '숨을 참는다.' },
            { speaker: '', text: '그 그림자에서 — 냉기가 흘러나온다.' },
            { speaker: '', text: '온몸의 털이 곤두선다. 본능이 외친다. 도망쳐.' },
            { speaker: '', text: '하지만 다리가 움직이지 않는다.' },
            { speaker: '', text: '...그림자가 한 발 다가온다.' },
            { speaker: '', text: '소리 없이. 발자국 없이.' },
            { speaker: '', text: '바닥의 그림자가 넓어진다. 주변이 더 어두워진다.' },
            { speaker: '', text: '이것은 — 어둠 그 자체다.' },
            { speaker: '', text: '뭔가 해야 한다.' },
        ],
        choices: [
            {
                text: '손전등을 꺼내 켠다',
                statHint: '빛으로 맞선다',
                condition: { flag: 'took_survival' },
                stats: { wisdom: 8, courage: 6 },
                setFlags: { used_light: true },
                next: 'ch1_r1_light'
            },
            {
                text: '가방에서 뭔가를 꺼내 던진다',
                statHint: '주의를 끈다',
                condition: { flag: 'took_food' },
                stats: { wisdom: 6, calm: 5 },
                setFlags: { distracted_shadow: true },
                next: 'ch1_r1_distract'
            },
            {
                text: '뒤로 물러난다',
                statHint: '본능적 반응',
                stats: { courage: 3 },
                setFlags: { panicked: true },
                next: 'ch1_r1_panic'
            }
        ]
    },

    // ==========================================
    //  3막: 전투 — 1라운드 결과
    // ==========================================

    ch1_r1_light: {
        image: 'assets/images/ch1_convstore_dark.png',
        characters: { center: 'assets/images/ch1_eoduksini.png' },
        dialogue: [
            { speaker: '', text: '손전등을 켠다.' },
            { speaker: '', text: '찰칵 —' },
            { speaker: '', text: '하얀 빛이 편의점을 가른다.' },
            { speaker: '', text: '그림자가 — 움찔한다.' },
            { speaker: '', text: '처음으로 반응을 보인다. 빛을 싫어하는 것이다.' },
            { speaker: '', text: '빛이 닿은 곳의 그림자가 흐려진다. 옅어진다.' },
            { speaker: '', text: '하지만 — 빛이 닿지 않는 곳에서 다시 짙어진다.' },
            { speaker: '', text: '도망치는 게 아니다. 빛을 피해 우회하고 있다.' },
            { speaker: '', text: '그래도 — 이것은 무기가 된다.' },
        ],
        next: 'ch1_combat_r2_adv'
    },

    ch1_r1_distract: {
        image: 'assets/images/ch1_convstore_dark.png',
        characters: { center: 'assets/images/ch1_eoduksini.png' },
        dialogue: [
            { speaker: '', text: '가방에서 물병을 꺼내 반대쪽으로 던진다.' },
            { speaker: '', text: '쿵 — 물병이 바닥에 굴러간다.' },
            { speaker: '', text: '그림자가 — 물병 쪽을 본다.' },
            { speaker: '', text: '아니, \'본다\'는 표현이 맞는지 모르겠다.' },
            { speaker: '', text: '하지만 분명히 — 주의가 분산됐다.' },
            { speaker: '', text: '그림자의 형체가 잠시 흔들린다. 불안정해진다.' },
            { speaker: '', text: '틈이 생겼다.' },
        ],
        next: 'ch1_combat_r2_adv'
    },

    ch1_r1_panic: {
        image: 'assets/images/ch1_convstore_dark.png',
        characters: { center: 'assets/images/ch1_eoduksini.png' },
        dialogue: [
            { speaker: '', text: '뒤로 물러난다. 등이 진열대에 부딪힌다.' },
            { speaker: '', text: '과자 봉지들이 우수수 떨어진다.' },
            { speaker: '', text: '그림자가 — 한 발 더 다가온다.' },
            { speaker: '', text: '냉기가 살갗을 파고든다. 숨을 쉴 때마다 폐가 얼어붙는 것 같다.' },
            { speaker: '', text: '쓸 수 있는 게 없다. 아무것도.' },
            // 탐욕 선택
            { speaker: '', text: '양주병을 쥐어본다. 무기라고 하기엔 초라하다.', condition: { flag: 'took_greed' } },
            { speaker: '', text: '몰렸다.' },
        ],
        next: 'ch1_combat_r2_desp'
    },

    // ==========================================
    //  3막: 전투 — 2라운드 (유리한 상황)
    // ==========================================

    ch1_combat_r2_adv: {
        image: 'assets/images/ch1_convstore_dark.png',
        characters: { center: 'assets/images/ch1_eoduksini.png' },
        choiceTimer: 10,
        dialogue: [
            { speaker: '', text: '그림자가 불안정해진 틈 — 지금이다.' },
            // 동행
            { speaker: '???', text: '(그녀가 옆에서) ...지금! 뭔가 해!', condition: { flag: 'has_companion' } },
            // 혼자
            { speaker: '', text: '스스로에게 말한다. 움직여.', condition: { flag: 'is_alone' } },
        ],
        choices: [
            {
                text: '빛으로 소통을 시도한다',
                statHint: '이것은 적이 아닐 수도 있다',
                condition: { flag: 'used_light' },
                requires: { wisdom: 15, love: 10 },
                stats: { wisdom: 20, love: 10 },
                setFlags: { negotiated_eoduksini: true },
                next: 'ch1_negotiate_eoduksini'
            },
            {
                text: '같이 맞선다',
                statHint: '둘이라면 할 수 있다',
                condition: { flag: 'has_companion' },
                stats: { love: 15, courage: 5 },
                affinity: { haeun: 5 },
                setFlags: { teamwork_success: true },
                next: 'ch1_r2_team_adv'
            },
            {
                text: '정면으로 맞선다',
                statHint: '물러서지 않는다',
                stats: { courage: 18 },
                affinity: { haeun: 2 },
                setFlags: { stood_ground: true },
                next: 'ch1_r2_stand_adv'
            },
            {
                text: '입구를 향해 뛴다',
                statHint: '이길 수 있는 상대가 아니다',
                stats: { calm: 5, courage: -3 },
                affinity: { haeun: -3 },
                setFlags: { tried_to_run: true },
                next: 'ch1_r2_run_adv'
            }
        ]
    },

    ch1_r2_team_adv: {
        image: 'assets/images/ch1_convstore_dark.png',
        characters: { center: 'assets/images/ch1_eoduksini.png' },
        dialogue: [
            { speaker: '', text: '그녀를 본다. 그녀도 나를 본다.' },
            { speaker: '', text: '말이 필요 없다.' },
            { speaker: '???', text: '(고개를 끄덕인다)' },
            { speaker: '', text: '손전등을 그림자 정면에 비춘다.', condition: { flag: 'used_light' } },
            { speaker: '', text: '그녀가 반대쪽에서 소리를 내 주의를 분산시킨다.', condition: { flag: 'used_light' } },
            { speaker: '', text: '내가 소리를 내 주의를 끈다. 그녀가 반대쪽으로 이동한다.', condition: { flag: 'distracted_shadow' } },
            { speaker: '', text: '그림자가 — 흔들린다. 양쪽에서 오는 자극을 처리하지 못한다.' },
            { speaker: '', text: '그림자의 형체가 옅어진다. 풀어진다.' },
            { speaker: '', text: '어둠이 걷힌다.' },
        ],
        next: 'ch1_victory_clean'
    },

    ch1_r2_stand_adv: {
        image: 'assets/images/ch1_convstore_dark.png',
        characters: { center: 'assets/images/ch1_eoduksini.png' },
        dialogue: [
            { speaker: '', text: '도망치지 않는다.' },
            { speaker: '', text: '손전등을 들어올린다.', condition: { flag: 'used_light' } },
            { speaker: '', text: '있는 힘껏 앞으로 나간다.', condition: { flag: 'distracted_shadow' } },
            { speaker: '', text: '그림자를 향해 한 발. 또 한 발.' },
            { speaker: '', text: '냉기가 살을 에지만 — 멈추지 않는다.' },
            { speaker: '', text: '그림자가 뒤로 밀린다. 조금씩. 조금씩.' },
            // 동행 → 클린
            { speaker: '???', text: '...같이!', condition: { flag: 'has_companion' } },
            { speaker: '', text: '그녀가 옆에 선다. 나란히.', condition: { flag: 'has_companion' } },
            { speaker: '', text: '그림자가 — 풀어진다.', condition: { flag: 'has_companion' } },
        ],
        nextIf: [
            { condition: { flag: 'has_companion' }, next: 'ch1_victory_clean' },
            { condition: { flag: 'is_alone' }, next: 'ch1_victory_hard' },
        ]
    },

    ch1_r2_run_adv: {
        image: 'assets/images/ch1_convstore_dark.png',
        characters: { center: 'assets/images/ch1_eoduksini.png' },
        dialogue: [
            { speaker: '', text: '지금이다. 그림자가 흔들리는 사이에 —' },
            { speaker: '', text: '입구를 향해 뛴다.' },
            { speaker: '???', text: '야! 어디 가!', condition: { flag: 'has_companion' } },
            { speaker: '', text: '뒤에서 그녀의 발소리가 따라온다.', condition: { flag: 'has_companion' } },
            { speaker: '', text: '자동문을 밀치고 밖으로 나간다.' },
            { speaker: '', text: '등 뒤에서 냉기가 스친다. 잡히진 않았다.' },
            { speaker: '', text: '하지만 — 팔에 감각이 없다. 스쳤을 뿐인데.' },
        ],
        next: 'ch1_victory_hard'
    },

    // ==========================================
    //  3막: 전투 — 2라운드 (불리한 상황)
    // ==========================================

    ch1_combat_r2_desp: {
        image: 'assets/images/ch1_convstore_dark.png',
        characters: { center: 'assets/images/ch1_eoduksini.png' },
        choiceTimer: 10,
        dialogue: [
            { speaker: '', text: '그림자가 다가온다. 한 발. 또 한 발.' },
            { speaker: '', text: '뒤로 물러설 공간이 없다.' },
            { speaker: '', text: '냉기가 온몸을 감싼다. 손끝이 저리다.' },
            // 동행
            { speaker: '???', text: '(떨리는 목소리로) ...어떡해...', condition: { flag: 'has_companion' } },
            // 혼자
            { speaker: '', text: '이대로 끝인가.', condition: { flag: 'is_alone' } },
        ],
        choices: [
            {
                text: '같이 소리를 지른다',
                statHint: '겁에 맞서는 유일한 방법',
                condition: { flag: 'has_companion' },
                stats: { love: 13, courage: 5 },
                affinity: { haeun: 5 },
                setFlags: { teamwork_success: true },
                next: 'ch1_r2_team_desp'
            },
            {
                text: '이를 악물고 버틴다',
                statHint: '여기서 쓰러지지 않는다',
                stats: { courage: 15 },
                affinity: { haeun: 1 },
                setFlags: { stood_ground: true },
                next: 'ch1_r2_stand_desp'
            },
            {
                text: '있는 힘껏 도망친다',
                statHint: '살아야 한다',
                stats: { calm: 3 },
                affinity: { haeun: -4 },
                setFlags: { tried_to_run: true },
                next: 'ch1_r2_run_desp'
            }
        ]
    },

    ch1_r2_team_desp: {
        image: 'assets/images/ch1_convstore_dark.png',
        characters: { center: 'assets/images/ch1_eoduksini.png' },
        dialogue: [
            { speaker: '', text: '그녀의 손을 잡는다.' },
            { speaker: '', text: '차갑다. 하지만 — 살아있는 온기가 있다.' },
            { speaker: '???', text: '...같이.' },
            { speaker: '', text: '둘이 동시에 소리를 지른다.' },
            { speaker: '', text: '편의점 안이 울린다. 유리가 떨린다.' },
            { speaker: '', text: '그림자가 — 움찔한다.' },
            { speaker: '', text: '소리. 살아있는 것들의 소리.' },
            { speaker: '', text: '그림자의 형체가 흐려진다. 천천히, 하지만 분명하게.' },
            { speaker: '', text: '몰아붙인다. 목이 찢어질 것 같지만 — 멈추지 않는다.' },
        ],
        next: 'ch1_victory_hard'
    },

    ch1_r2_stand_desp: {
        image: 'assets/images/ch1_convstore_dark.png',
        characters: { center: 'assets/images/ch1_eoduksini.png' },
        dialogue: [
            { speaker: '', text: '이를 악문다.' },
            { speaker: '', text: '주먹을 쥔다. 떨린다. 하지만 펴지 않는다.' },
            { speaker: '', text: '그림자를 정면으로 본다.' },
            { speaker: '', text: '냉기가 얼굴을 덮는다. 시야가 흐려진다.' },
            { speaker: '', text: '...하지만 쓰러지지 않는다.' },
            { speaker: '', text: '그것이 놀란 건지 — 한 순간 멈춘다.' },
            // 동행 → 하드 승리
            { speaker: '???', text: '(옆에서 라이터를 켠다)', condition: { flag: 'has_companion' } },
            { speaker: '', text: '작은 불꽃. 하지만 그 빛에 그림자가 주춤한다.', condition: { flag: 'has_companion' } },
        ],
        nextIf: [
            { condition: { flag: 'has_companion' }, next: 'ch1_victory_hard' },
            { condition: { flag: 'is_alone' }, next: 'ch1_escape_injured' },
        ]
    },

    ch1_r2_run_desp: {
        image: 'assets/images/ch1_convstore_dark.png',
        characters: { center: 'assets/images/ch1_eoduksini.png' },
        dialogue: [
            { speaker: '', text: '달린다. 어디로든.' },
            { speaker: '', text: '진열대를 넘고, 쓰러지고, 다시 일어난다.' },
            { speaker: '', text: '등 뒤에서 냉기가 잡아당긴다.' },
            { speaker: '', text: '어깨를 스친다 — 아니, 관통한다.' },
            { speaker: '', text: '...' },
            { speaker: '', text: '통증은 없다. 대신 — 감각이 사라진다.' },
            { speaker: '', text: '왼팔이 움직이지 않는다.' },
            { speaker: '???', text: '빨리!', condition: { flag: 'has_companion' } },
            { speaker: '', text: '자동문을 밀치고 밖으로 굴러나간다.' },
        ],
        next: 'ch1_escape_injured'
    },

    // ==========================================
    //  어둑시니 대화 분기 (동료화 루트)
    // ==========================================

    ch1_negotiate_eoduksini: {
        image: 'assets/images/ch1_convstore_dark.png',
        characters: { center: 'assets/images/ch1_eoduksini.png' },
        dialogue: [
            { speaker: '', text: '손전등을 낮춘다.' },
            { speaker: '', text: '직접 비추지 않는다. 바닥을 향해 — 간접적으로.' },
            { speaker: '', text: '그림자가 멈춘다.' },
            { speaker: '', text: '...공격하지 않는다. 경계하고 있다.' },
            { speaker: '', text: '빛을 조절한다. 약하게. 위협이 아니라는 걸 보여주듯.' },
            { speaker: '', text: '...' },
            { speaker: '', text: '그림자의 윤곽이 — 변한다.' },
            { speaker: '', text: '짙은 어둠이 옅어지면서, 그 안에 형체가 드러난다.' },
            { speaker: '', text: '사람이다. 사람의 형상. 하지만 — 얼굴이 없다.' },
            { speaker: '', text: '매끈한 검은 표면. 눈도, 코도, 입도 없다.' },
            { speaker: '', text: '옷에 새겨진 문양들이 — 눈처럼 보인다. 수십 개의 눈이 나를 본다.' },
        ],
        next: 'ch1_negotiate_2'
    },

    ch1_negotiate_2: {
        image: 'assets/images/ch1_convstore_dark.png',
        characters: { center: 'assets/images/ch1_eoduksini.png' },
        choiceTimer: 10,
        dialogue: [
            { speaker: '', text: '그것은 꼼짝도 하지 않는다. 입도 없다.' },
            { speaker: '', text: '하지만 — 머릿속에 무언가가 울린다. 소리가 아니라, 감각이.' },
            { speaker: '', text: '...추위. 뼈를 파고드는 추위가 밀려온다.' },
            { speaker: '', text: '말이 아니다. 냉기가 전하는 감정이다.' },
            { speaker: '', text: '...고립. 오래된 어둠. 끝없이 혼자였던 시간.' },
            { speaker: '', text: '외로움이 피부를 타고 스며든다.' },
            { speaker: '', text: '이것은 — 괴물이 아니다.' },
            { speaker: '', text: '이것도 이 도시에 갇힌 존재다.' },
            // 동행
            { speaker: '???', text: '(속삭이며) ...뭐 하는 거야? 위험해!', condition: { flag: 'has_companion' } },
            { speaker: '주인공', text: '...기다려. 이건 적이 아니야.', condition: { flag: 'has_companion' } },
        ],
        choices: [
            {
                text: '손을 내민다',
                statHint: '두려움을 넘어서',
                stats: { love: 25, courage: 8 },
                affinity: { haeun: -2, eoduksini: 10 },
                setFlags: { reached_out_eoduksini: true },
                next: 'ch1_eoduksini_accept'
            },
            {
                text: '...아직은 못 믿겠다. 물러난다.',
                statHint: '조심하는 것이 낫다',
                stats: { calm: 8, wisdom: 5 },
                affinity: { haeun: 3 },
                next: 'ch1_eoduksini_refuse'
            }
        ]
    },

    ch1_eoduksini_accept: {
        image: 'assets/images/ch1_convstore_dark.png',
        characters: { center: 'assets/images/ch1_eoduksini.png' },
        setFlags: { clean_victory: true, eoduksini_companion: true },
        addCompanion: {
            id: 'eoduksini',
            name: '어둑시니',
            portrait: 'assets/images/ch1_eoduksini.png',
        },
        dialogue: [
            { speaker: '', text: '손을 뻗는다.' },
            { speaker: '', text: '냉기가 손끝을 감싼다. 차갑다. 하지만 — 참을 수 있다.' },
            { speaker: '', text: '그림자의 손이 — 내 손에 닿는다.' },
            { speaker: '', text: '...닿는다는 표현이 맞는지 모르겠다.' },
            { speaker: '', text: '차가운 바람 같은 것이 손바닥을 스친다.' },
            { speaker: '', text: '얼굴 없는 머리가 — 아주 천천히 기울어진다.' },
            { speaker: '', text: '...온기. 손끝에서 희미한 온기가 전해져 온다.', affinity: { eoduksini: 5 } },
            { speaker: '', text: '그림자의 형체가 옅어진다. 공격적이었던 냉기가 수그러든다.' },
            { speaker: '', text: '사라지는 게 아니다. 변하는 것이다.' },
            { speaker: '', text: '편의점의 형광등이 깜빡이며 돌아온다.' },
            { speaker: '', text: '그 빛 아래 — 그림자가 서 있다.' },
            { speaker: '', text: '여전히 검고, 여전히 차갑지만.' },
            { speaker: '', text: '적의는 없다.' },
            // 동행 반응
            { speaker: '???', text: '...진짜로 대화가 된 거야? 저거랑?', condition: { flag: 'has_companion' }, affinity: { haeun: -1 } },
            { speaker: '', text: '어둑시니가 고개를 돌린다. 옷의 문양들이 — 그녀 쪽을 향한다.', condition: { flag: 'has_companion' } },
            { speaker: '???', text: '(한 발 물러서며) ...보지 마...', condition: { flag: 'has_companion' } },
            // 혼자
            { speaker: '', text: '이 도시에서 처음으로 — 누군가를 만났다.', condition: { flag: 'is_alone' } },
            { speaker: '', text: '사람은 아니지만.' },
            { speaker: '', text: '어둑시니가 동행한다.' },
        ],
        next: 'ch1_aftermath'
    },

    ch1_eoduksini_refuse: {
        image: 'assets/images/ch1_convstore_dark.png',
        characters: { center: 'assets/images/ch1_eoduksini.png' },
        setFlags: { clean_victory: true },
        dialogue: [
            { speaker: '', text: '손을 거둔다.' },
            { speaker: '', text: '...아직 모르겠다. 이것이 무엇인지.' },
            { speaker: '', text: '그림자가 — 한 발 물러난다.' },
            { speaker: '', text: '공격하지 않는다. 다만 — 옷의 문양들이 천천히 감긴다.' },
            { speaker: '', text: '닫히는 눈들. 기대? 아니면 희망?' },
            { speaker: '', text: '그림자가 천천히 옅어진다. 벽 속으로, 바닥 속으로.' },
            { speaker: '', text: '편의점의 형광등이 돌아온다.' },
            { speaker: '', text: '...사라졌다.' },
            { speaker: '', text: '하지만 이번엔 — 다르게 느껴진다.' },
            { speaker: '', text: '쫓아낸 것이 아니라, 스스로 떠난 것이다.' },
        ],
        next: 'ch1_aftermath'
    },

    // ==========================================
    //  전투 결과
    // ==========================================

    ch1_victory_clean: {
        image: 'assets/images/ch1_convstore_dark.png',
        setFlags: { clean_victory: true },
        dialogue: [
            { speaker: '', text: '그림자가 풀어진다.' },
            { speaker: '', text: '물에 먹물이 퍼지듯 — 천천히 옅어져간다.' },
            { speaker: '', text: '편의점의 형광등이 다시 켜진다. 하나, 둘.' },
            { speaker: '', text: '냉기가 걷힌다. 공기가 돌아온다.' },
            { speaker: '', text: '...사라졌다.' },
            { speaker: '', text: '바닥에 아무것도 남지 않았다. 흔적조차.' },
            { speaker: '', text: '마치 처음부터 없었던 것처럼.' },
            // 동행
            { speaker: '???', text: '...이긴 거야?', condition: { flag: 'has_companion' }, affinity: { haeun: 3 } },
            { speaker: '', text: '아무도 대답하지 않는다. 하지만 — 끝났다는 건 안다.' },
            // 혼자
            { speaker: '', text: '무릎이 풀린다. 주저앉는다.', condition: { flag: 'is_alone' } },
            { speaker: '', text: '...살았다.' },
            { speaker: '', text: '손이 떨린다. 하지만 — 이겼다.' },
        ],
        next: 'ch1_aftermath'
    },

    ch1_victory_hard: {
        image: 'assets/images/ch1_convstore_dark.png',
        setFlags: { hard_victory: true },
        dialogue: [
            { speaker: '', text: '그림자가 물러난다.' },
            { speaker: '', text: '사라진 건 아니다. 후퇴한 것이다.' },
            { speaker: '', text: '편의점 구석으로, 벽 뒤로, 어둠 속으로.' },
            { speaker: '', text: '형광등이 깜빡이며 돌아온다. 불안정하게.' },
            { speaker: '', text: '...갔나?' },
            { speaker: '', text: '팔이 저리다. 냉기에 스친 곳의 감각이 돌아오지 않는다.' },
            // 동행
            { speaker: '???', text: '괜찮아?', condition: { flag: 'has_companion' }, affinity: { haeun: 2 } },
            { speaker: '', text: '...모르겠어. 근데 살아있어.', condition: { flag: 'has_companion' } },
            // 혼자
            { speaker: '', text: '팔을 주무른다. 천천히 감각이 돌아온다.', condition: { flag: 'is_alone' } },
            { speaker: '', text: '죽진 않았다. 그걸로 됐다.' },
        ],
        next: 'ch1_aftermath'
    },

    ch1_escape_injured: {
        image: 'assets/images/ch1_empty_street.png',
        setFlags: { escaped_injured: true },
        dialogue: [
            { speaker: '', text: '편의점 밖. 가로등 아래.' },
            { speaker: '', text: '왼팔이 움직이지 않는다. 감각이 없다.' },
            { speaker: '', text: '편의점 안을 돌아본다. 어둠이 유리 너머에 웅크리고 있다.' },
            { speaker: '', text: '...쫓아오지는 않는다. 밖으로는 나오지 못하는 걸까.' },
            { speaker: '', text: '하지만 — 진 것이다. 도망친 것이다.' },
            // 동행
            { speaker: '???', text: '팔... 괜찮아?', condition: { flag: 'has_companion' }, affinity: { haeun: 1 } },
            { speaker: '', text: '...아직 모르겠어.', condition: { flag: 'has_companion' } },
            // 혼자
            { speaker: '', text: '팔을 끌어안는다. 차갑다. 남의 팔 같다.', condition: { flag: 'is_alone' } },
            { speaker: '', text: '...다음엔 도망치지 않는다.' },
        ],
        next: 'ch1_aftermath'
    },

    // ==========================================
    //  에필로그
    // ==========================================

    ch1_aftermath: {
        image: 'assets/images/ch1_aftermath_dawn.png',
        bgm: 'ch1',
        dialogue: [
            { speaker: '', text: '편의점을 떠난다.' },
            { speaker: '', text: '거리를 걷는다. 아직 밤이다.' },
            { speaker: '', text: '하지만 — 수평선 끝에 뭔가가 보인다.' },
            { speaker: '', text: '빛은 아니다. 다만, 어둠이 조금 덜 짙어진 곳.' },
            { speaker: '', text: '...' },
            // 전투 결과별 내면 독백
            { speaker: '', text: '그것은 — 어둠 그 자체였다.', condition: { flag: 'clean_victory' } },
            { speaker: '', text: '빛을 싫어했다. 소리에 반응했다. 죽일 수 있는 것인지는 모른다.', condition: { flag: 'clean_victory' } },
            { speaker: '', text: '그것은 물러났을 뿐이다. 사라진 게 아니다.', condition: { flag: 'hard_victory' } },
            { speaker: '', text: '다음에 또 만나면 — 이번처럼 될 거란 보장은 없다.', condition: { flag: 'hard_victory' } },
            { speaker: '', text: '도망쳤다. 이기지 못했다.', condition: { flag: 'escaped_injured' } },
            { speaker: '', text: '팔의 감각이 천천히 돌아오고 있다. 하지만 완전히는 아니다.', condition: { flag: 'escaped_injured' } },
            // 공통
            { speaker: '', text: '이 서울에는 사람만 없는 게 아니다.' },
            { speaker: '', text: '무언가가 — 있다.' },
            // 동행
            { speaker: '???', text: '...이제 어디로 가?', condition: { flag: 'has_companion' } },
            { speaker: '', text: '대답하지 못한다.', condition: { flag: 'has_companion' } },
            // 혼자
            { speaker: '', text: '대답해줄 사람이 없다.', condition: { flag: 'is_alone' } },
            // 끝
            { speaker: '', text: '걷는다. 어둠이 조금 덜한 쪽을 향해.' },
            { speaker: '', text: '제1장 — 끝.' },
        ],
        next: 'ch1_final'
    },

    ch1_final: {
        image: 'assets/images/ch1_aftermath_dawn.png',
        showFlowchart: 'ch1',
        dialogue: [],
        next: 'ch2_intro',
    },
};

// ==========================================
//  제1장 플로우차트 정의
// ==========================================

const FLOWCHARTS_CH1 = {
    ch1: {
        episode: '제1장',
        title: '어둑시니',
        tree: [
            { type: 'story', text: '텅 빈 서울 거리' },
            { type: 'choice', label: '고등학생과의 만남', sceneId: 'ch1_notice_student',
              branches: [
                  { text: '다가간다' },
                  { text: '관찰한다' },
              ]
            },
            { type: 'choice', label: '서연과 동행', sceneId: 'ch1_student_choice',
              branches: [
                  { text: '같이 가자' },
                  { text: '각자 가자' },
              ]
            },
            { type: 'choice', label: '어디로 갈 것인가', sceneId: 'ch1_where_to_go',
              branches: [
                  { text: '편의점으로' },
                  { text: '건물 안으로' },
                  { text: '큰길을 따라' },
              ]
            },
            { type: 'story', text: '편의점에 도착' },
            { type: 'choice', label: '무엇을 챙길 것인가', sceneId: 'ch1_store_look',
              branches: [
                  { text: '생존 물품' },
                  { text: '먹을거리' },
                  { text: '현금과 양주' },
              ]
            },
            { type: 'story', text: '불이 꺼진다' },
            { type: 'story', text: '어둑시니 출현' },
            { type: 'choice', label: '첫 번째 대응', sceneId: 'ch1_shadow_describe',
              branches: [
                  { text: '빛을 사용한다' },
                  { text: '뭔가를 던진다' },
                  { text: '뒤로 물러난다' },
              ]
            },
            { type: 'choice', label: '최후의 선택', sceneId: 'ch1_combat_r2_adv',
              branches: [
                  { text: '소통을 시도한다', children: [
                      { type: 'choice', label: '손을 내밀 것인가', sceneId: 'ch1_negotiate_2',
                        branches: [
                            { text: '손을 내민다', children: [
                                { type: 'story', text: '어둑시니 동료 획득' },
                                { type: 'story', text: '제1장 — 끝' },
                            ]},
                            { text: '물러난다' },
                        ]
                      },
                  ]},
                  { text: '함께 맞선다', children: [
                      { type: 'story', text: '어둑시니를 물리치다' },
                      { type: 'story', text: '제1장 — 끝' },
                  ]},
                  { text: '정면으로 버틴다', children: [
                      { type: 'story', text: '어둑시니를 물리치다' },
                      { type: 'story', text: '제1장 — 끝' },
                  ]},
                  { text: '도망친다', children: [
                      { type: 'story', text: '겨우 탈출' },
                      { type: 'story', text: '제1장 — 끝' },
                  ]},
              ]
            },
        ],
    },
};
