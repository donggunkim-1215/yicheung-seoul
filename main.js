/**
 * 이층 : 서울, 0시 - 메인 진입점
 */

document.addEventListener('DOMContentLoaded', () => {
    const game = new GameEngine();
    game.registerScenes(SCENES);
    game.registerScenes(SCENES_CH1);
    game.registerFlowcharts(FLOWCHARTS);
    game.registerFlowcharts(FLOWCHARTS_CH1);
});
