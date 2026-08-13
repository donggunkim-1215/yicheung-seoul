/**
 * 이층 : 서울, 0시 - 메인 진입점
 */

document.addEventListener('DOMContentLoaded', () => {
    const game = new GameEngine();
    game.registerScenes(SCENES);
    game.registerScenes(SCENES_CH1);
    game.registerScenes(SCENES_CH2);
    game.registerScenes(SCENES_CH3);
    game.registerScenes(SCENES_CH4);
    game.registerScenes(SCENES_CH5);
    game.registerScenes(SCENES_CH6);
    game.registerScenes(SCENES_CH7);
    game.registerScenes(SCENES_CH8);
    game.registerScenes(SCENES_CH9);
    game.registerScenes(SCENES_CH10);
    game.registerScenes(SCENES_CH11);
    game.registerScenes(SCENES_CH12);
    game.registerScenes(SCENES_CH13);
    game.registerScenes(SCENES_AFFINITY);
    game.registerFlowcharts(FLOWCHARTS);
    game.registerFlowcharts(FLOWCHARTS_CH1);
    game.registerFlowcharts(FLOWCHARTS_CH2);
    game.registerFlowcharts(FLOWCHARTS_CH3);
    game.registerFlowcharts(FLOWCHARTS_CH4);
    game.registerFlowcharts(FLOWCHARTS_CH5);
    game.registerFlowcharts(FLOWCHARTS_CH6);
    game.registerFlowcharts(FLOWCHARTS_CH7);
    game.registerFlowcharts(FLOWCHARTS_CH8);
    game.registerFlowcharts(FLOWCHARTS_CH9);
    game.registerFlowcharts(FLOWCHARTS_CH10);
    game.registerFlowcharts(FLOWCHARTS_CH11);
    game.registerFlowcharts(FLOWCHARTS_CH12);
    game.registerFlowcharts(FLOWCHARTS_CH13);

    setupFullscreenToggle();
});

function setupFullscreenToggle() {
    const btn = document.getElementById('btn-fullscreen');
    if (!btn) return;
    const stateEl = btn.querySelector('.fullscreen-state');

    const isFullscreen = () => !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    );

    const requestFs = (el) => {
        if (el.requestFullscreen) return el.requestFullscreen();
        if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
        if (el.mozRequestFullScreen) return el.mozRequestFullScreen();
        if (el.msRequestFullscreen) return el.msRequestFullscreen();
        return Promise.reject(new Error('Fullscreen API not supported'));
    };

    const exitFs = () => {
        if (document.exitFullscreen) return document.exitFullscreen();
        if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
        if (document.mozCancelFullScreen) return document.mozCancelFullScreen();
        if (document.msExitFullscreen) return document.msExitFullscreen();
        return Promise.reject(new Error('Fullscreen exit not supported'));
    };

    const updateLabel = () => {
        const on = isFullscreen();
        if (stateEl) stateEl.textContent = on ? 'ON' : 'OFF';
        btn.classList.toggle('is-on', on);
    };

    btn.addEventListener('click', async () => {
        try {
            if (isFullscreen()) {
                await exitFs();
            } else {
                await requestFs(document.documentElement);
            }
        } catch (err) {
            console.warn('[fullscreen]', err);
        }
    });

    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange']
        .forEach(ev => document.addEventListener(ev, updateLabel));

    // iOS Safari (iPhone) — Fullscreen API 지원 안 됨. 버튼 숨김.
    const docEl = document.documentElement;
    const fsSupported = !!(
        docEl.requestFullscreen ||
        docEl.webkitRequestFullscreen ||
        docEl.mozRequestFullScreen ||
        docEl.msRequestFullscreen
    );
    if (!fsSupported) {
        btn.style.display = 'none';
    }

    updateLabel();
}
