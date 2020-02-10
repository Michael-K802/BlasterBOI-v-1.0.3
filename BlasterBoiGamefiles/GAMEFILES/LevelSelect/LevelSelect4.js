class LevelSelect4 extends Phaser.Scene {
    constructor(){
      super({key:'LevelSelect4'})
    }
    preload(){
        this.load.image('background','GAMEFILES/Assets/Other/background-pixilart.png');
        this.load.image('l16','GAMEFILES/Assets/LevelSelect/level16.png')
        this.load.image('l17','GAMEFILES/Assets/LevelSelect/level17.png')
        this.load.image('l18','GAMEFILES/Assets/LevelSelect/level18.png')
        this.load.image('l19','GAMEFILES/Assets/LevelSelect/level19.png')
        this.load.image('l20','GAMEFILES/Assets/LevelSelect/level20.png')
        this.load.image('n','GAMEFILES/Assets/LevelSelect/transitions/next.png');
        this.load.image('b','GAMEFILES/Assets/LevelSelect/transitions/back.png');
      }
      create(){
        this.add.image(250,250,'background');
        this.add.image(250,750,'background');
        this.add.image(750,250,'background');
        this.add.image(750,750,'background');
        // variables 
        const min = 16;
        const sec = 17;
        const tri = 18;
        const fou = 19;
        const max = 20;
        const cLS = 4;
        const nLS = 5;
        const pLS = 3;
        // text 
        this.add.text(200,50,'LEVEL SELECT!',{fill:'#1acb1b',fontSize:'30px'});
        this.add.text(240,110,`Levels ${min}-${max}`,{fill:'#CACACA',fontSize:'20px'})
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
          this.scene.start(`LevelSelect${pLS}`);
        })
      }
      update(){
    
      }
    }