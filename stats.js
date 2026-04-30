/**
 * 이층 : 서울, 0시 — 전 세계 선택 통계 (Firebase Firestore)
 *
 * 데이터 모델:
 *   collection: choices
 *   doc id:     {sceneId}            (예: ch1_notice_student)
 *   fields:     b0, b1, b2 ...       (각 선택지 카운트)
 *
 * 같은 유저 중복 투표 방지 — localStorage에 투표 기록.
 *
 * 보안: Firestore 보안 규칙으로 b0/b1/... 필드의 +1 증분만 허용
 *       (콘솔에 별도로 규칙 입력 필요. README 참고)
 */

import { initializeApp }
    from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, increment }
    from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBu_nvBGYlkhRbqZ4SvC9zB1P_HSYxE81g",
    authDomain: "projecti-12.firebaseapp.com",
    projectId: "projecti-12",
    storageBucket: "projecti-12.firebasestorage.app",
    messagingSenderId: "418762309167",
    appId: "1:418762309167:web:7ca8e503606cbbd56b10da",
    // measurementId 분석은 사용 안 함
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const VOTED_KEY = 'ihyung_voted_choices_v1';

function getVoted() {
    try { return JSON.parse(localStorage.getItem(VOTED_KEY) || '{}'); }
    catch { return {}; }
}
function markVoted(sceneId, branchIdx) {
    const v = getVoted();
    v[`${sceneId}_${branchIdx}`] = true;
    try { localStorage.setItem(VOTED_KEY, JSON.stringify(v)); } catch {}
}
function hasVoted(sceneId, branchIdx) {
    return !!getVoted()[`${sceneId}_${branchIdx}`];
}

// 선택 클릭 시 — 익명 카운터 +1 (한 유저당 1회만)
async function recordChoice(sceneId, branchIdx) {
    if (!sceneId || branchIdx == null) return;
    if (hasVoted(sceneId, branchIdx)) return; // 중복 차단
    try {
        const ref = doc(db, 'choices', sceneId);
        await setDoc(ref, { [`b${branchIdx}`]: increment(1) }, { merge: true });
        markVoted(sceneId, branchIdx);
    } catch (e) {
        console.warn('[stats] recordChoice 실패:', e.message);
    }
}

// 플로우차트 열 때 — 여러 sceneId 카운터 일괄 조회
//   반환: { sceneId: { b0: N, b1: M, ... }, ... }
async function fetchStats(sceneIds) {
    const result = {};
    if (!Array.isArray(sceneIds) || sceneIds.length === 0) return result;
    await Promise.all(sceneIds.map(async (id) => {
        try {
            const snap = await getDoc(doc(db, 'choices', id));
            if (snap.exists()) result[id] = snap.data();
        } catch (e) {
            // 단일 실패는 조용히 — 다른 카운터에는 영향 X
        }
    }));
    return result;
}

// 글로벌 노출 — engine.js (모듈 아님)에서 호출
window.GameStats = { recordChoice, fetchStats };
