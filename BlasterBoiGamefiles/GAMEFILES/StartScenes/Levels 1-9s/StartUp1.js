class StartUp1 extends Phaser.Scene {
    constructor(){
      super({key:'StartUp1'})
    }
    preload(){
      this.load.image('back','GAMEFILES/Assets/Other/background-pixilart.png');
    }
    create(){
      const level = 'One';
      const levelN = 1;
      const primeMod = 'none';
      const secondaryMod = '';
      const goal = 50;
      this.add.image(250,250,'back');
      this.add.image(750,250,'back');
      this.add.image(250,750,'back');
      this.add.image(750,750,'back');
      this.add.text(200,100,`Level ${level}`,{fill:'#f5fa34',fontSize:'35px' })
      this.add.text(220,170,'Objective:',{fill:'#f5fa34',fontSize:'25px'})
      this.add.text(180,220,`Reach a score of ${goal}`,{fill:'#f5fa34',fontSize:'20px'})
      this.add.text(240,310,'Modifiers:',{fill:'#ff2006',fontSize:'20px' })
      this.add.text(270,370,`${primeMod}`,{fill:'#f356f6'})
      this.add.text(230,440,'Click to Start',{fill:'#f5fa34',fontSize:'15px' })
      this.input.on('pointerup',()=>{
        this.scene.stop(`StartUp${levelN}`);
        this.scene.start(`GameScene${levelN}`);
      })
    }
    update(){
  
    }
  }