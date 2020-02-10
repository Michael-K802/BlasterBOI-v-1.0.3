const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    backgroundColor: 0x000000,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 100 },
        enableBody: true,
      }
    },
    scene: [TitleScene,LevelSelect1,LevelSelect2,LevelSelect3,LevelSelect4,LevelSelect5,StartUp1,GameScene1,StartUp2,GameScene2,StartUp3,GameScene3,StartUp4,GameScene4,StartUp5,GameScene5,StartUp6,GameScene6,StartUp7,GameScene7,StartUp8,GameScene8,StartUp9,GameScene9,StartUp10,GameScene10,StartUp11,GameScene11,StartUp12,GameScene12,StartUp13,GameScene13,StartUp14,GameScene14,StartUp15,GameScene15,StartUp16,GameScene16,StartUp17,GameScene17,StartUp18,GameScene18,StartUp19,GameScene19,StartUp20,GameScene20,BounusLevel,Example]
  };
  
  const game = new Phaser.Game(config);
  let gameState = {
      highScore: 0,
}