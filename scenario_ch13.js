/**
 * 이층 : 서울, 0시 — 제13장: 일곱 개의 새벽
 * 멀티엔딩 — ending_path 플래그에 따라 분기
 *
 * 엔딩 종류:
 *   true_end_purified  眞 (정화 진엔딩 — 가장 좋은 엔딩)
 *   true_end           真 (격파 진엔딩 — 영물 4 + 도술 각성)
 *   ascend_end         昇 (자기 봉인 — 희생)
 *   save_end           救 (구미호 동행 + 격파)
 *   together_end       共 (이층 정착)
 *   quiet_end          靜 (부분 정화)
 *   lost_end           失 (실패 — 이무기 승천)
 *   forget_end         忘 (도술 거부 + 격파 실패)
 */

const SCENES_CH13 = {

    // ==========================================
    //  진입 — 엔딩 라우터
    // ==========================================

    ch13_intro: {
        chapter: { number: '제13장', title: '일곱 개의 새벽' },
        image: 'assets/images/ch13_dawn.png',
        imageEffect: 'ken-burns',
        bgm: 'ch13',
        dialogue: [],
        next: 'ch13_route'
    },

    ch13_route: {
        image: 'assets/images/ch13_dawn.png',
        nextIf: [
            { condition: { flag: 'ending_path' /* placeholder, will use specific flags below */ }, next: 'ch13_check_path' },
        ],
        next: 'ch13_check_path'
    },

    ch13_check_path: {
        image: 'assets/images/ch13_dawn.png',
        nextIf: [
            // 정화 진엔딩 (최고)
            { condition: { flag: 'ch12_path_purify' }, next: 'ch13_true_purified' },
            // 격파 진엔딩
            { condition: { allFlags: ['ch12_path_destroy', 'sashin_count_4', 'protagonist_accepted_truth'] }, next: 'ch13_true_end' },
            // 구엔딩 (구미호 동행 + 격파)
            { condition: { allFlags: ['ch12_path_destroy', 'gumiho_companion'] }, next: 'ch13_save_end' },
            { condition: { allFlags: ['ch12_path_destroy', 'gumiho_with_protagonist_battle'] }, next: 'ch13_save_end' },
            // 자기 봉인 승엔딩
            { condition: { flag: 'ch12_path_sacrifice' }, next: 'ch13_ascend_end' },
            // 함께 이층으로 공엔딩
            { condition: { flag: 'ch12_path_together' }, next: 'ch13_together_end' },
            // 격파 — 부분 성공 정엔딩
            { condition: { flag: 'ch12_path_destroy' }, next: 'ch13_quiet_end' },
            // 봉인 — 부분 성공 정엔딩
            { condition: { flag: 'ch12_path_seal' }, next: 'ch13_quiet_end' },
            // 격파 실패 + 도술 거부 = 망엔딩
            { condition: { allFlags: ['ending_path', 'protagonist_rejected_truth'] }, next: 'ch13_forget_end' },
        ],
        // 위 조건 모두 못 맞으면 — 실엔딩
        next: 'ch13_lost_end'
    },

    // ==========================================
    //  眞 — 정화 진엔딩 (최고)
    // ==========================================

    ch13_true_purified: {
        image: 'assets/images/ch13_purified_sky.png',
        imageEffect: 'ken-burns',
        bgm: 'ch13_true',
        dialogue: [
            { speaker: '', text: '하늘이 — 갈라진다.' },
            { speaker: '', text: '검은 — 자정의 — 하늘이.' },
            { speaker: '', text: '오백 년 — 만에, 진짜 — 푸른 빛이, 새벽보다 — 먼저, 비춘다.' },
            { speaker: '', text: '이무기가, 마침내 — 용이 된다.' },
            { speaker: '', text: '그가, 진정으로 — 정한 — 마음으로 — 승천한다.' },
            { speaker: '', text: '천 년의 한이, 풀렸다.' },
            { speaker: '', text: '용이, 한 번 — 내 위에서 — 머물고, 한 번 — 인사한다.' },
            { speaker: '', text: '"...고맙다. 도사."' },
            { speaker: '', text: '그리고, 하늘로.' },
        ],
        next: 'ch13_true_purified_2'
    },

    ch13_true_purified_2: {
        image: 'assets/images/ch13_seoul_revival.png',
        dialogue: [
            { speaker: '', text: '서울이 — 깨어난다.' },
            { speaker: '', text: '한 명, 두 명, 백 명, 천 명.' },
            { speaker: '', text: '이층에 — 옮겨졌던 사람들이, 길에서, 집에서, 가게에서 — 동시에, 깨어난다.' },
            { speaker: '', text: '그들의 — 부정적 감정이, 정화된 — 채로.' },
            { speaker: '', text: '시기, 질투, 자기혐오, 두려움 — 그 무게가, 한 자락씩 — 가벼워진 채로.' },
            { speaker: '', text: '서울이, 처음으로 — 진짜, 따뜻한 — 도시가 된다.' },
        ],
        next: 'ch13_true_purified_3'
    },

    ch13_true_purified_3: {
        image: 'assets/images/ch13_companions_smile.png',
        dialogue: [
            { speaker: '하은', text: '...해냈어.', condition: { flag: 'ch12_haeun_in' }, emotion: 'smile' },
            { speaker: '서연', text: '진짜로 — 모든 사람이, 돌아왔어요.', condition: { flag: 'ch12_seoyeon_in' }, emotion: 'smile' },
            { speaker: '어둑시니', text: '...빛이, 처음으로 — 따뜻하다.', condition: { flag: 'ch12_eoduksini_in' }, emotion: 'smile' },
            { speaker: '구미호', text: '...드디어, 인간으로서 — 곁에 — 있을 수, 있겠네요.', condition: { flag: 'ch12_gumiho_in' }, emotion: 'smile' },
            { speaker: '구미호', text: '천 년 — 만에 — 만난 — 그 분이, 살아 — 계셨어요.', condition: { flag: 'ch12_gumiho_in' }, emotion: 'smile' },
            { speaker: '구미호', text: '...드디어, 인간으로서 — 곁에 — 있을 수, 있겠네요.', condition: { flag: 'gumiho_with_protagonist_battle' }, emotion: 'smile' },
            { speaker: '구미호', text: '천 년 — 만에 — 만난 — 그 분이, 살아 — 계셨어요.', condition: { flag: 'gumiho_with_protagonist_battle' }, emotion: 'smile' },
            { speaker: '닷냥이', text: '냐옹.', condition: { flag: 'ch12_pet_cat' }, emotion: 'smile' },
            { speaker: '황덕구', text: '컹!', condition: { flag: 'ch12_pet_dog' }, emotion: 'smile' },
            { speaker: '청룡', text: '...새 시대가, 열렸군.', condition: { flag: 'ch12_cheongryong_in' }, emotion: 'smile' },
            { speaker: '백호', text: '...검을 — 거두자.', condition: { flag: 'ch12_baekho_in' }, emotion: 'smile' },
            { speaker: '주작', text: '...불꽃이, 마침내 — 따뜻해졌어요.', condition: { flag: 'ch12_jujak_in' }, emotion: 'smile' },
            { speaker: '전우치', text: '...이제, 1할의 저는 — 9할의 당신과, 합쳐질게요. (씩 웃으며)', emotion: 'smile' },
            { speaker: '전우치', text: '오랜만이에요. 천 년 — 만에, 한 사람으로.' },
            { speaker: '', text: '도사가 — 미소지으며, 내 안으로, 흩어져 — 들어온다.' },
            { speaker: '', text: '나는, 마침내 — 한 사람이, 된다.' },
        ],
        next: 'ch13_true_purified_credits'
    },

    ch13_true_purified_credits: {
        image: 'assets/images/ch13_seoul_dawn.png',
        bgm: 'ch13_credits',
        dialogue: [
            { speaker: '', text: '...' },
            { speaker: '', text: '서울의 — 새벽이 온다.' },
            { speaker: '', text: '천 년 — 만에, 진정한 — 새벽이.' },
            { speaker: '', text: '진엔딩 (眞)' },
            { speaker: '', text: '— 정화의 길 —' },
            { speaker: '', text: '이층 : 서울, 0시 — 끝.' },
        ],
        setFlags: { ending_reached_true_purified: true },
        next: 'ch13_final'
    },

    // ==========================================
    //  真 — 격파 진엔딩
    // ==========================================

    ch13_true_end: {
        image: 'assets/images/ch13_after_battle.png',
        imageEffect: 'ken-burns',
        bgm: 'ch13_true',
        dialogue: [
            { speaker: '', text: '이무기는 — 사라졌다.' },
            { speaker: '', text: '천 년의 — 한이, 강물에 — 풀려, 흩어진다.' },
            { speaker: '', text: '서울의 — 부정적 — 기가, 강을 — 따라, 정화된다.' },
            { speaker: '', text: '한 명, 두 명. 사람들이, 깨어난다.' },
            { speaker: '', text: '강 위에, 새벽 빛이 — 진다.' },
        ],
        next: 'ch13_true_end_2'
    },

    ch13_true_end_2: {
        image: 'assets/images/ch13_companions_smile.png',
        dialogue: [
            { speaker: '하은', text: '...해냈어.', condition: { flag: 'ch12_haeun_in' }, emotion: 'smile' },
            { speaker: '서연', text: '...!', condition: { flag: 'ch12_seoyeon_in' }, emotion: 'smile' },
            { speaker: '전우치', text: '...당신, 천 년 — 만에 — 자신을, 다시 만나셨네요. (씩 웃으며)', emotion: 'smile' },
            { speaker: '전우치', text: '저는 — 이제, 1할의 — 분신으로 — 흩어질게요. 9할인 — 당신께로요.' },
            { speaker: '', text: '도사가 — 흩어져, 내 안으로 — 들어온다.' },
            { speaker: '', text: '나는, 다시 — 한 사람이 된다.' },
            { speaker: '', text: '...전우치, 라는 — 한 사람.' },
        ],
        next: 'ch13_true_end_credits'
    },

    ch13_true_end_credits: {
        image: 'assets/images/ch13_seoul_dawn.png',
        bgm: 'ch13_credits',
        dialogue: [
            { speaker: '', text: '진엔딩 (真)' },
            { speaker: '', text: '— 격파의 길 —' },
            { speaker: '', text: '서울이, 깨어났다. 다만, 그 사람들의 — 마음은, 아직 — 정화되지, 않은 채로.' },
            { speaker: '', text: '시기와 질투, 비교의 — 일상이, 다시 — 시작된다.' },
            { speaker: '', text: '하지만, 적어도 — 그들은, 살아 — 있다.' },
            { speaker: '', text: '...그것이, 시작이다.' },
            { speaker: '', text: '이층 : 서울, 0시 — 끝.' },
        ],
        setFlags: { ending_reached_true: true },
        next: 'ch13_final'
    },

    // ==========================================
    //  救 — 구원 엔딩 (구미호와 함께)
    // ==========================================

    ch13_save_end: {
        image: 'assets/images/ch13_after_battle.png',
        imageEffect: 'ken-burns',
        bgm: 'ch13_save',
        characters: {
            center: { char: 'gumiho', emotion: 'smile' },
        },
        dialogue: [
            { speaker: '', text: '이무기가, 사라진 — 자리.' },
            { speaker: '', text: '구미호가, 강 — 가에, 서 있다.' },
            { speaker: '구미호', text: '...진짜로, 끝났네요.', emotion: 'sad' },
            { speaker: '구미호', text: '백 년 — 만에 — 처음으로, 그분의 — 그림자에서, 자유로워졌어요.' },
            { speaker: '구미호', text: '...그리고, 천 년 — 만에 — 처음으로. 진짜 — 그분을, 다시 만났어요.', emotion: 'sad' },
            { speaker: '구미호', text: '하지만 — 저는, 짐승이에요. 이쪽 — 세상에, 살 — 자리가 — 없어요.' },
            { speaker: '구미호', text: '...이층으로, 갈게요. 거기에 — 저처럼, 옛 — 짐승들이 — 모인 — 자리가, 있다고 해요.' },
            { speaker: '구미호', text: '저, 같이 — 가실래요?', emotion: 'sad' },
            { speaker: '구미호', text: '...천 년 — 약속을, 마저 — 지키고 싶어서요.' },
        ],
        next: 'ch13_save_end_2'
    },

    ch13_save_end_2: {
        image: 'assets/images/ch13_save_path.png',
        dialogue: [
            { speaker: '', text: '...' },
            { speaker: '', text: '망설인다. 한 박자.' },
            { speaker: '', text: '하지만, 천 년의 — 도술이, 답을 — 안다.' },
            { speaker: '', text: '"같이 가."' },
            { speaker: '구미호', text: '...! 정말로요?', emotion: 'surprised' },
            { speaker: '구미호', text: '...허, 허, 허, 허.', emotion: 'sad' },
            { speaker: '구미호', text: '천 년 — 만에 — 처음으로, 그분과 — 함께, 가는 거예요.', emotion: 'smile' },
            { speaker: '', text: '서울이, 깨어난다. 사람들이, 깨어난다.' },
            { speaker: '', text: '그러나, 우리는 — 그 자리에 — 머물지, 않는다.' },
            { speaker: '', text: '구미호와 — 손을 잡고, 강 — 한가운데에서, 천천히 — 이층으로.' },
        ],
        next: 'ch13_save_end_credits'
    },

    ch13_save_end_credits: {
        image: 'assets/images/ch13_ihyung_calm.png',
        bgm: 'ch13_credits',
        dialogue: [
            { speaker: '', text: '구원 엔딩 (救)' },
            { speaker: '', text: '— 같이 — 가는 — 길 —' },
            { speaker: '', text: '주인공은, 사람들이 — 깨어난 후의, 서울을 — 보지 — 않았다.' },
            { speaker: '', text: '대신, 한 — 백 년 — 외로웠던, 한 마리의 짐승의 — 곁에, 남기로 했다.' },
            { speaker: '', text: '이층의 — 어딘가에, 그들의 — 새로운 — 일상이, 시작된다.' },
            { speaker: '', text: '이층 : 서울, 0시 — 끝.' },
        ],
        setFlags: { ending_reached_save: true },
        next: 'ch13_final'
    },

    // ==========================================
    //  昇 — 자기 봉인 엔딩
    // ==========================================

    ch13_ascend_end: {
        image: 'assets/images/ch13_self_seal.png',
        imageEffect: 'ken-burns',
        bgm: 'ch13_ascend',
        dialogue: [
            { speaker: '', text: '강 — 깊은 곳.' },
            { speaker: '', text: '의식이, 흐려진다.' },
            { speaker: '', text: '하지만, 안다. 사람들이 — 깨어났다는 것을.' },
            { speaker: '', text: '서울이, 살아 있다는 것을.' },
            { speaker: '', text: '내 — 안에서, 이무기가 — 함께 잠든다.' },
            { speaker: '이무기', text: '...후후, 같이 — 잠드시지요. 도사 — 그분.', emotion: 'sad' },
            { speaker: '이무기', text: '천 년 — 만에, 당신처럼 — 제 한을 — 이해해주시는, 분.' },
            { speaker: '이무기', text: '...편히, 잠들지요.', emotion: 'sad' },
            { speaker: '', text: '눈을, 감는다.' },
        ],
        next: 'ch13_ascend_end_2'
    },

    ch13_ascend_end_2: {
        image: 'assets/images/ch13_companions_searching.png',
        dialogue: [
            { speaker: '하은', text: '...어디 갔어. 어디 — 갔어!', condition: { flag: 'ch12_haeun_in' }, emotion: 'sad' },
            { speaker: '서연', text: '강 안으로... 같이 — 들어가셨어요.', condition: { flag: 'ch12_seoyeon_in' }, emotion: 'sad' },
            { speaker: '전우치', text: '...아, 그렇구나.', emotion: 'sad' },
            { speaker: '전우치', text: '9할인 — 당신은, 1할인 — 저보다 — 더 깊은, 봉인을 — 만드실 수, 있었네요.' },
            { speaker: '전우치', text: '...편히, 잠드세요.' },
            { speaker: '', text: '도사가 — 강을 향해, 한 번, 절을 한다.' },
            { speaker: '', text: '동료들이, 따라 한다.' },
        ],
        next: 'ch13_ascend_end_credits'
    },

    ch13_ascend_end_credits: {
        image: 'assets/images/ch13_seoul_dawn.png',
        bgm: 'ch13_credits',
        dialogue: [
            { speaker: '', text: '승엔딩 (昇)' },
            { speaker: '', text: '— 자기 봉인의 — 길 —' },
            { speaker: '', text: '주인공은, 천 년 — 만에, 자신의 — 도술의 — 마지막 — 매듭을 — 직접 — 매었다.' },
            { speaker: '', text: '서울 사람들은, 그를 — 모른다.' },
            { speaker: '', text: '하지만, 한강 — 깊은 — 곳에서, 한 — 사람의 도사가, 천 년의 한과 — 함께 — 잠들어 있다.' },
            { speaker: '', text: '그것이, 그의 — 마지막 — 선택이었다.' },
            { speaker: '', text: '이층 : 서울, 0시 — 끝.' },
        ],
        setFlags: { ending_reached_ascend: true },
        next: 'ch13_final'
    },

    // ==========================================
    //  共 — 함께 이층으로 엔딩
    // ==========================================

    ch13_together_end: {
        image: 'assets/images/ch13_ihyung_seoul.png',
        imageEffect: 'ken-burns',
        bgm: 'ch13_together',
        dialogue: [
            { speaker: '', text: '이층.' },
            { speaker: '', text: '뒤집어진 서울. 같은 길, 같은 건물. 그러나, 다른 — 시간.' },
            { speaker: '', text: '이무기가 — 우리 곁에, 사람의 — 모습으로, 서 있다.' },
            { speaker: '이무기', text: '...새 — 시대를, 지을까요.', emotion: 'smile' },
            { speaker: '이무기', text: '천 년 — 동안, 여러분 — 그 도시에서 — 살아주세요. 저는, 여러분을 — 지킬게요.' },
        ],
        next: 'ch13_together_end_credits'
    },

    ch13_together_end_credits: {
        image: 'assets/images/ch13_ihyung_dawn.png',
        bgm: 'ch13_credits',
        dialogue: [
            { speaker: '', text: '공엔딩 (共)' },
            { speaker: '', text: '— 함께 — 짓는 — 시간 —' },
            { speaker: '', text: '이쪽 세상의 서울 — 사람들은, 깨어나지 않았다.' },
            { speaker: '', text: '하지만, 우리 — 모두는, 이층에서 — 새로운 시간을, 짓고 있다.' },
            { speaker: '', text: '이무기와, 한 — 평범한 — 이웃처럼.' },
            { speaker: '', text: '...어쩌면, 이것이 — 가장 — 인간다운 — 결말일지도, 모른다.' },
            { speaker: '', text: '이층 : 서울, 0시 — 끝.' },
        ],
        setFlags: { ending_reached_together: true },
        next: 'ch13_final'
    },

    // ==========================================
    //  靜 — 부분 정화 엔딩
    // ==========================================

    ch13_quiet_end: {
        image: 'assets/images/ch13_partial_dawn.png',
        imageEffect: 'ken-burns',
        bgm: 'ch13_quiet',
        dialogue: [
            { speaker: '', text: '이무기는 — 사라지거나, 다시 — 잠들었다.' },
            { speaker: '', text: '서울 — 일부의 — 사람들이, 깨어난다.' },
            { speaker: '', text: '나머지는 — 아직, 이층에 — 남은 채.' },
            { speaker: '', text: '하지만, 그들도 — 시간이 지나면 — 돌아올 것이다. 천천히.' },
            { speaker: '', text: '한강 위에, 옅은 — 새벽이 — 진다.' },
        ],
        next: 'ch13_quiet_end_2'
    },

    ch13_quiet_end_2: {
        image: 'assets/images/ch13_companions_quiet.png',
        dialogue: [
            { speaker: '하은', text: '...완벽하지는 — 않았네.', condition: { flag: 'ch12_haeun_in' }, emotion: 'sad' },
            { speaker: '하은', text: '근데, 오늘 — 살아남은 게, 더, 큰 일이야.', condition: { flag: 'ch12_haeun_in' }, emotion: 'smile' },
            { speaker: '서연', text: '...앞으로, 천천히 — 더 — 나아질 거예요.', condition: { flag: 'ch12_seoyeon_in' }, emotion: 'smile' },
            { speaker: '전우치', text: '...일부의 — 정화. 그것만으로도, 천 년 만의 — 일이에요.', emotion: 'smile' },
        ],
        next: 'ch13_quiet_end_credits'
    },

    ch13_quiet_end_credits: {
        image: 'assets/images/ch13_seoul_dawn.png',
        bgm: 'ch13_credits',
        dialogue: [
            { speaker: '', text: '정엔딩 (靜)' },
            { speaker: '', text: '— 부분 정화의 — 길 —' },
            { speaker: '', text: '서울은, 절반쯤 — 깨어났다.' },
            { speaker: '', text: '나머지 절반은, 시간이 — 답을 — 줄 — 일이다.' },
            { speaker: '', text: '이층 : 서울, 0시 — 끝.' },
        ],
        setFlags: { ending_reached_quiet: true },
        next: 'ch13_final'
    },

    // ==========================================
    //  失 — 실패 엔딩
    // ==========================================

    ch13_lost_end: {
        image: 'assets/images/ch13_imugi_ascends.png',
        imageEffect: 'ken-burns',
        bgm: 'ch13_lost',
        dialogue: [
            { speaker: '', text: '의식이, 끝까지 — 진행됐다.' },
            { speaker: '', text: '하늘이, 까맣게 갈라진다.' },
            { speaker: '', text: '이무기가, 마침내 — 승천한다.' },
            { speaker: '', text: '하지만 — 정한 — 마음으로, 가 아니라 — 한으로.' },
            { speaker: '', text: '하늘은, 그를 — 거부한다.' },
            { speaker: '', text: '대신, 그는 — 이층의 — 주인이 된다.' },
            { speaker: '', text: '이층이, 이쪽 세상을 — 잠식한다.' },
        ],
        next: 'ch13_lost_end_credits'
    },

    ch13_lost_end_credits: {
        image: 'assets/images/ch13_dark_seoul.png',
        bgm: 'ch13_credits',
        dialogue: [
            { speaker: '', text: '실엔딩 (失)' },
            { speaker: '', text: '— 천 년의 한이, 풀리지 않은 — 길 —' },
            { speaker: '', text: '서울 사람들은, 영영 — 깨어나지 — 않았다.' },
            { speaker: '', text: '주인공의 — 끝은, 기록되지 않았다.' },
            { speaker: '', text: '...이층이, 이제, 이쪽이다.' },
            { speaker: '', text: '이층 : 서울, 0시 — 끝.' },
        ],
        setFlags: { ending_reached_lost: true },
        next: 'ch13_final'
    },

    // ==========================================
    //  忘 — 망각 엔딩
    // ==========================================

    ch13_forget_end: {
        image: 'assets/images/ch13_forgotten.png',
        imageEffect: 'ken-burns',
        bgm: 'ch13_forget',
        dialogue: [
            { speaker: '', text: '...' },
            { speaker: '', text: '눈을 떴을 때, 자리는 — 평범한 — 카페였다.' },
            { speaker: '', text: '커피의 향. 사람들의 — 잡담.' },
            { speaker: '', text: '도사도, 동료도, 사신도, 이무기도, 모두 — 꿈처럼, 흐릿하다.' },
            { speaker: '', text: '서울이, 평범하게 — 돌아간다.' },
            { speaker: '', text: '나만, 한 가지를 — 잊었다.' },
            { speaker: '', text: '나만, 한 가지를 — 알았다는 — 사실조차, 잊었다.' },
        ],
        next: 'ch13_forget_end_credits'
    },

    ch13_forget_end_credits: {
        image: 'assets/images/ch13_seoul_normal.png',
        bgm: 'ch13_credits',
        dialogue: [
            { speaker: '', text: '망엔딩 (忘)' },
            { speaker: '', text: '— 사람으로 — 살기로 — 한 — 길 —' },
            { speaker: '', text: '주인공은, 도사로서의 — 자신을 — 거부했다.' },
            { speaker: '', text: '대신, 평범한 — 사람으로 — 살기로 했다.' },
            { speaker: '', text: '서울은, 그 — 도시의 — 방식대로, 다시, 흐른다.' },
            { speaker: '', text: '시기와 질투, 비교, 출산율 저하. 그 모든 게, 다시 — 자리한다.' },
            { speaker: '', text: '...언젠가, 또, 봉인이 풀릴 — 자리에서.' },
            { speaker: '', text: '한 사람이, 모든 것을 — 다시 — 시작할 것이다.' },
            { speaker: '', text: '이층 : 서울, 0시 — 끝.' },
        ],
        setFlags: { ending_reached_forget: true },
        next: 'ch13_final'
    },

    // ==========================================
    //  최종 화면
    // ==========================================

    ch13_final: {
        image: 'assets/images/ch13_final_screen.png',
        showFlowchart: 'ch13',
        dialogue: [],
    },
};

// ==========================================
//  제13장 플로우차트 (모든 엔딩 표시)
// ==========================================

const FLOWCHARTS_CH13 = {
    ch13: {
        episode: '제13장',
        title: '일곱 개의 새벽',
        tree: [
            { type: 'story', text: '결판의 — 결과' },
            { type: 'choice', label: '도달한 엔딩',
              branches: [
                  { text: '眞 — 정화 진엔딩' },
                  { text: '真 — 격파 진엔딩' },
                  { text: '救 — 구원 (구미호와)' },
                  { text: '昇 — 자기 봉인' },
                  { text: '共 — 함께 이층으로' },
                  { text: '靜 — 부분 정화' },
                  { text: '失 — 실패' },
                  { text: '忘 — 망각' },
              ]
            },
            { type: 'story', text: '이층 : 서울, 0시 — 끝' },
        ],
    },
};
