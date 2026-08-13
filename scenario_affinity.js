/**
 * 호감도 이벤트 — 임계 도달 시 본 흐름에 끼어드는 짧은 서브 시퀀스
 *
 * 명명 규칙: affinity_event_{charId}_{threshold}
 * 종료 시 next: '_resume_main' 으로 원래 가던 scene에 자연 복귀
 *
 * 추가 시:
 *  - 이미지: assets/images/affinity/{charId}_{threshold}.png
 *  - (선택) BGM: bgm-affinity-{charId} 같은 식으로 index.html에 audio 추가
 *  - 대사 5~8라인 정도, 달달하고 짧게
 *  - characters 블록은 넣지 말 것 — 호감도 씬은 BG가 메인. 포트레이트 안 등장.
 */

const SCENES_AFFINITY = {

    // ==========================================
    //  하은 — 호감도 10: 첫 흔들림
    // ==========================================
    affinity_event_haeun_10: {
        image: 'assets/images/affinity/haeun_10.png',
        imageEffect: 'ken-burns',
        dialogue: [
            { speaker: '', text: '...잠깐, 발걸음이 — 멈춘다.' },
            { speaker: '', text: '하은이가, 나를 — 본다.' },
            { speaker: '', text: '평소와는, 다른 — 눈빛.' },
            { speaker: '하은', text: '...있잖아.', emotion: 'sad' },
            { speaker: '하은', text: '나, 이렇게 — 누군가 옆에 있는 거. 정말 — 오랜만이야.' },
            { speaker: '하은', text: '0시 13분에 — 모든 게 사라졌을 때, 진짜로 — 무서웠거든.' },
            { speaker: '하은', text: '근데 — 너랑 같이 있으니까, 좀 — 괜찮아.', emotion: 'smile' },
            { speaker: '', text: '그녀가 — 내 옷자락을, 한 자락만 — 살짝 잡는다.' },
            { speaker: '', text: '말 — 없이.' },
            { speaker: '하은', text: '...고마워. 곁에 — 있어줘서.', emotion: 'smile' },
            { speaker: '', text: '심장이, 한 박자 — 다르게 뛰었다.' },
            { speaker: '', text: '...이런 걸, 무어라 부르더라.' },
        ],
        next: '_resume_main',
    },

    // ==========================================
    //  서연 — 호감도 10: 노트의 한 페이지 (companion id = 'student')
    // ==========================================
    affinity_event_student_10: {
        image: 'assets/images/affinity/student_10.png',
        imageEffect: 'ken-burns',
        dialogue: [
            { speaker: '', text: '서연이, 자기 — 노트를 — 펼친다.' },
            { speaker: '', text: '한 페이지가 — 다른 페이지들과, 다르다.' },
            { speaker: '', text: '관찰 기록이 아니라 — 작은 그림이, 그려져 있다.' },
            { speaker: '서연', text: '...보지 — 마세요.', emotion: 'sad' },
            { speaker: '서연', text: '...아, 봐도 돼요. 이미, 보셨으니까.' },
            { speaker: '', text: '그림 — 속에, 두 — 사람이 — 나란히 — 서 있다.' },
            { speaker: '서연', text: '(안경을 고쳐쓰며) 합리적인 — 기록이 아니에요. 그냥 — 그리고 싶었어요.', emotion: 'smile' },
            { speaker: '서연', text: '...관찰만 — 하던 사람이, 처음으로 — 무언가를 — 그렸어요.' },
            { speaker: '서연', text: '그게, 당신이라서 — 좋네요.' },
            { speaker: '', text: '노트가, 조용히 — 닫힌다.' },
        ],
        next: '_resume_main',
    },

    // ==========================================
    //  어둑시니 — 호감도 10: 그림자의 온도
    // ==========================================
    affinity_event_eoduksini_10: {
        image: 'assets/images/affinity/eoduksini_10.png',
        imageEffect: 'ken-burns',
        dialogue: [
            { speaker: '', text: '내 — 그림자 안에서, 작은 — 목소리.' },
            { speaker: '어둑시니', text: '...너, 잠깐.', emotion: 'sad' },
            { speaker: '어둑시니', text: '나는 — 어둠이고, 너는 — 빛 가까이에, 살아.' },
            { speaker: '어둑시니', text: '근데 — 이상해.' },
            { speaker: '어둑시니', text: '네 그림자 안은, 다른 어떤 곳보다 — 따뜻해.', emotion: 'smile' },
            { speaker: '', text: '...어둑시니가, 한 자락 — 더 — 가까이, 다가온다.' },
            { speaker: '어둑시니', text: '...이런 걸, 사람들은 — 뭐라고 — 부르지?' },
            { speaker: '', text: '대답하지, 못한다.' },
            { speaker: '', text: '그림자가 — 작게, 웃는 — 소리가 — 들린다.' },
        ],
        next: '_resume_main',
    },

    // ==========================================
    //  구미호 — 호감도 10: 천 년의 결
    // ==========================================
    affinity_event_gumiho_10: {
        image: 'assets/images/affinity/gumiho_10.png',
        imageEffect: 'ken-burns',
        dialogue: [
            { speaker: '', text: '구미호가, 나를 — 본다.' },
            { speaker: '', text: '오래 본 — 사람을, 다시 — 보는 — 그 — 눈빛으로.' },
            { speaker: '구미호', text: '...당신, 정말 — 신기한 — 분이세요.', emotion: 'sad' },
            { speaker: '구미호', text: '백 년 — 만에 — 처음으로, 누군가의 — 곁이, 차갑지 — 않아요.' },
            { speaker: '구미호', text: '...그분이, 살아 — 계셨다면. 이런 — 결이었을까요.' },
            { speaker: '', text: '그녀가, 한 — 자락의 — 머리를 — 귀 뒤로, 살짝 — 넘긴다.' },
            { speaker: '구미호', text: '...아, 미안해요. 또 — 혼잣말이었어요.', emotion: 'smile' },
            { speaker: '구미호', text: '(작게) ...아니, 이번엔 — 당신께, 한 — 마디였어요.' },
            { speaker: '', text: '바람 — 한 자락이, 두 — 사람 사이로 — 지난다.' },
        ],
        next: '_resume_main',
    },

    // ==========================================
    //  닷냥이 — 호감도 10: 무릎 위의 온기
    // ==========================================
    affinity_event_datnyangi_10: {
        image: 'assets/images/affinity/datnyangi_10.png',
        imageEffect: 'ken-burns',
        dialogue: [
            { speaker: '', text: '닷냥이가, 내 — 무릎 위로 — 올라온다.' },
            { speaker: '', text: '쓰다듬는다. 한 번. 두 번.' },
            { speaker: '닷냥이', text: '...구르릉, 구르릉.', emotion: 'smile' },
            { speaker: '', text: '온기가 — 손바닥에서, 가슴까지 — 전해진다.' },
            { speaker: '', text: '...이 — 작은 짐승이, 제일 — 큰 위안이 되는 — 날도, 있구나.' },
            { speaker: '닷냥이', text: '냐옹.', emotion: 'smile' },
            { speaker: '', text: '한 번 더, 머리를 — 부빈다.' },
            { speaker: '', text: '...오늘은, 이걸로 — 충분하다.' },
        ],
        next: '_resume_main',
    },

    // ==========================================
    //  황덕구 — 호감도 10: 발치의 따뜻함
    // ==========================================
    affinity_event_hwangdokgu_10: {
        image: 'assets/images/affinity/hwangdokgu_10.png',
        imageEffect: 'ken-burns',
        dialogue: [
            { speaker: '', text: '황덕구가, 내 — 발치에 — 머리를 — 기댄다.' },
            { speaker: '', text: '쓰다듬는다. 등을, 머리를. 한 자락의 — 따뜻함.' },
            { speaker: '황덕구', text: '...크르릉.', emotion: 'smile' },
            { speaker: '', text: '꼬리가, 한 박자씩 — 흔들린다.' },
            { speaker: '', text: '...이 — 작은 짐승이, 사실은 — 가장 — 든든한 — 동행일지도 — 모르겠다.' },
            { speaker: '황덕구', text: '컹.', emotion: 'smile' },
            { speaker: '', text: '한 번 — 짧게 — 짖는다.' },
            { speaker: '', text: '"나, 여기 있어." — 그렇게, 들렸다.' },
        ],
        next: '_resume_main',
    },

};
