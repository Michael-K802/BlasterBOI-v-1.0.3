class LevelSelect1 extends Phaser.Scene {
    constructor(){
      super({key:'LevelSelect1'})
    }
    preload(){
      this.load.image('background','GAMEFILES/Assete/Other/background-pixilart.png');
      this.load.image('l1','GAMEFILES/Assets/LevelSelect/level1.png')
      this.load.image('l2','GAMEFILES/Assets/LevelSelect/level2.png')
      this.load.image('l3','GAMEFILES/Assets/LevelSelect/level3.png')
      this.load.image('l4','GAMEFILES/Assets/LevelSelect/level4.png')
      this.load.image('l5','GAMEFILES/Assets/LevelSelect/level5.png')
      this.load.image('n','GAMEFILES/Assets/LevelSelect/transitions/next.png');
      this.load.image('b','GAMEFILES/Assets/LevelSelect/transitions/back.png');
    }
    create(){
      this.add.image(250,250,'background');
      this.add.image(250,750,'background');
      this.add.image(750,250,'background');
      this.add.image(750,750,'background');
      // variables 
      const min = 1;
      const sec = 2;
      const tri = 3;
      const fou = 4;
      const max = 5;
      const cLS = 1;
      const nLS = 2;
      const pLS = 0;
      // text 
      this.add.text(200,50,'LEVEL SELECT!',{fill:'#1acb1b',fontSize:'30px'});
      this.add.text(250,110,`Levels ${min}-${max}`,{fill:'#CACACA',fontSize:'20px'})
      // creating clickables
      const lS1 = this.add.sprite(150,250,`l${min}`).setInteractive();
      const lS2 = this.add.sprite(450,250,`l${sec}`).setInteractive();
      const lS3 = this.add.sprite(300,350,`l${tri}`).setInteractive();
      const lS4 = this.add.sprite(150,450,`l${fou}`).setInteractive();
      const lS5 = this.add.sprite(450,450,`l${max}`).setInteractive();
      const next = this.add.sprite(460,550,'n').setInteractive();
      const back = this.add.sprite(160,550,`b`).setInteractive();
      // what happens?
      lS1.on('pointerup',()=>{
        this.scene.stop(`LevelSelect${cLS}`)
        this.scene.start(`StartUp${min}`);
      });
      lS2.on('pointerup',()=>{
        this.scene.stop(`LevelSelect${cLS}`)
        this.scene.start(`StartUp${sec}`);
      });
      lS3.on('pointerup',()=>{
        this.scene.stop(`LevelSelect${cLS}`)
        this.scene.start(`StartUp${tri}`);
      });
      lS4.on('pointerup',()=>{
        this.scene.stop(`LevelSelect${cLS}`)
        this.scene.start(`StartUp${fou}`);
      });
      lS5.on('pointerup',()=>{
        this.scene.stop(`LevelSelect${cLS}`)
        this.scene.start(`StartUp${max}`);
      });
      next.on('pointerup',()=>{
        this.scene.stop(`LevelSelect${cLS}`);
        this.scene.start(`LevelSelect${nLS}`);
      })
      back.on('pointerup',()=>{
        this.scene.stop(`LevelSelect${cLS}`);
        this.scene.start(`TitleScene`);
      })
    }
    update(){
  
    }
  }