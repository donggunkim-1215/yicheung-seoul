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
});
