class LevelSelect5 extends Phaser.Scene {
    constructor(){
        super({key:"LevelSelect5"})
    }
    preload(){
        this.load.image('background','GAMEFILES/Assets/Other/background-pixilart.png');
        this.load.image('player','GAMEFILES/Assets/PlayerStuff/space-ship(revamp)-pixilart.png');
        this.load.image('bound','GAMEFILES/Assets/Other/bar.png')
      }
      create(){
       
        this.add.text(200,50,'LEVEL SELECT!',{fill:'#1acb1b',fontSize:'30px'});
        this.add.text(230,110,`Example`,{fill:'#CACACA',fontSize:'20px'})
        // creating clickables
        const click = this.add.sprite(280,290,`player`).setInteractive();
        const bar = this.physics.add.staticGroup();
        bar.create(300,350,'bound');
        click.on('pointerup',()=>{
          this.scene.stop(`LevelSelect4`)
          this.scene.start(`BounusLevel`);
        });
        this.physics.add.collider((bound,click)=>{})
      }
      update(){
    
      }
    }