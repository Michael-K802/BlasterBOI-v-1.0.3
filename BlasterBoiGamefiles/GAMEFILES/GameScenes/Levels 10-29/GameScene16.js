class GameScene16 extends Phaser.Scene {
    constructor(){
        super({key:"GameScene16"})
    }
    preload(){
        this.load.image('background','GAMEFILES/Assets/Other/background-pixilart.png');
        this.load.image('player','GAMEFILES/Assets/PlayerStuff/space-ship(revamp)-pixilart.png')
        this.load.image('shot','GAMEFILES/Assets/PlayerStuff/shot.png');
        this.load.image('enemy','GAMEFILES/Assets/ENEMY/asteroid(revamped)-pixilart.png');
        this.load.image('healthPack','GAMEFILES/Assets/PlayerStuff/health-pack-pixilart.png');
        this.load.image('coins','GAMEFILES/Assets/Other/coin-pixilart.png');
        this.load.image('bar','GAMEFILES/Assets/Other/bar.png');
        this.load.image('Inv','GAMEFILES/Assets/PlayerStuff/invincablility-pack-pixilart.png')
    }
    create(){
      this.add.image(250,250,'background');
      this.add.image(250,750,'background');
      this.add.image(750,250,'background');
      this.add.image(750,750,'background');
      const bounds1 = this.physics.add.staticGroup();
      const bounds2 = this.physics.add.staticGroup();
       // bottom
       bounds1.create(50,640,'bar');
       bounds1.create(150,640,'bar');
       bounds1.create(250,640,'bar');
       bounds1.create(350,640,'bar');
       bounds1.create(450,640,'bar');
       bounds1.create(550,640,'bar');
      // top
      bounds2.create(50,-5,'bar');
      bounds2.create(150,-5,'bar');
      bounds2.create(250,-5,'bar');
      bounds2.create(350,-5,'bar');
      bounds2.create(450,-5,'bar');
      bounds2.create(550,-5,'bar');
      // variables
      gameState.gameOver = false
      let win = false;
      const goal = 800; // unit - score
      const rateOfFire = 300; // unit - ms
      const genEn = 100; // unit - ms
      const rarity = 500; // chance of medpack
      const leveln = 17; // level after this one
      const damage = 1; // damage enemys do
      const currentL = 16; // current level
      const regenDelay = 2000; // regen rate
      const bounusH = 20; // health gained by geting health pack
      const scoreGet = 2; // amount of points awarded apon collecting coin
      const healFactor = 1; // rate of healing 
      const unit = 'Score'; // unit of Scoring
      gameState.sideSpeed = 3; // side to side
      gameState.upSpeed = 5 // up
      gameState.downSpeed = 2 // down
      gameState.maxHealth = 100;
      gameState.regenMin = 45;
      gameState.reload = 0;
      // player and stats 
      gameState.player = this.physics.add.sprite(250,500,'player')
      gameState.player.setCollideWorldBounds(true);
      gameState.score = 0;
      gameState.ammo = 200;
      gameState.ammoText = this.add.text(10,520,`AMMO:${gameState.ammo}`,{fontSize:'20px',fill:'#f356f6'})
      gameState.scoreText = this.add.text(10,545,`${unit}:${gameState.score}/${goal}`,{fontSize:'20px',fill:'#f6faff'});
      this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      this.key_M = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
      // shooting and stuff
      const shot = this.physics.add.group();
      this.fireShot = ()=>{
        shot.create(gameState.player.x,gameState.player.y,'shot');
        shot.setVelocityY(-1010);
        gameState.reload -= 1;
        gameState.ammo -= 1
        gameState.ammoText.setText(`AMMO:${gameState.ammo}`)
      }
      function reload(){
        gameState.reload += .5;
      }
      gameState.reloadS = this.time.addEvent({
        delay: rateOfFire,
        callback: reload,
        callbackScope: this,
        loop: true,
      });
      // enemys and coins
      const enemys = this.physics.add.group();
      function genEnemy(){
        let xCoord = Math.random()*600;
        enemys.create(xCoord,-70,'enemy');
      }
      const enemyLoop = this.time.addEvent({
        delay: genEn,
        callback: genEnemy,
        callbackScope: this,
        loop: true,
      })
      const power1 = this.physics.add.group();
      function itemGen(x,y){
        power1.create(x,y,'Inv').setScale(.75);
      }
      const coins = this.physics.add.group();
      function coinCreate(enemy){
        let rN1 = Math.floor(Math.random()*rarity);
        let rN2 = Math.floor(Math.random()*5);
        let rN3 = Math.random()*20;
        let x1 = enemy.x += rN3 
        let x2 = enemy.x -= rN3
        let y1 = enemy.y += rN3
        let y2 = enemy.y -= rN3
        if (rN1 === 0){
          itemGen(enemy.x,enemy.y);
        } else {
            if (rN2 === 0){
                coins.create(enemy.x,enemy.y,'coins').setScale(.5);
                console.log(1)
            } else if (rN2 === 1){
                coins.create(enemy.x,enemy.y,'coins').setScale(.5);
                console.log(2)
            } else if (rN2 === 2){
                coins.create(enemy.x,enemy.y,'coins').setScale(.5);
                console.log(3)
            } else if (rN2 === 3){
                coins.create(x1,y2,'coins').setScale(.5);
                coins.create(x2,y1,'coins').setScale(.5);
                console.log(4)
            } else if (rN2 === 4){
                coins.create(x1,y1,'coins').setScale(.5);
                coins.create(x1,y2,'coins').setScale(.5);
                coins.create(x2,y1,'coins').setScale(.5);
                coins.create(x2,y2,'coins').setScale(.5);
            } else if (rN2 === 5){
                coins.create(x1,y2,'coins').setScale(.5);
                coins.create(x2,y1,'coins').setScale(.5);
            } else if (rN2 === 6){
                coins.create(enemy.x,enemy.y,'coins').setScale(.5);
            }
        }
      }
      // what happens When
      this.physics.add.collider(enemys,bounds1,(enemy)=>{
        enemy.destroy();
      })
      this.physics.add.collider(coins,bounds1,(coin)=>{
        coin.destroy();
      })
      this.physics.add.collider(shot,bounds2,(shot)=>{
        shot.destroy();
      })
      this.physics.add.overlap(enemys,shot,(enemy,shot)=>{
        enemy.destroy();
        shot.destroy();
        coinCreate(enemy);
      })
      // invincablity logic
      let dT = true;
      function reset(){
        dT = true;
        gameState.invText.setText(``)
        timer.paused = true;
      }
      gameState.invText = this.add.text(10,450,``,{fontSize:'20px',fill:'#fdf1da'})
      const timer = this.time.addEvent({
        delay: 5000,
        callback: reset,
        callbackScope: this,
        loop: true,
      })
      timer.paused = true;
      this.physics.add.overlap(power1,shot,(poweri)=>{
        poweri.destroy();
        if (!dT){
          gameState.score += 10;
          gameState.scoreText.setText(`${unit}:${gameState.score}/${goal}`)
        } else {
          dT = false;
          timer.paused = false;
          gameState.invText.setText('Invincable!')
        }
        
      })
      // scoring and win condititions
      this.physics.add.overlap(coins,shot,(coin)=>{
        coin.destroy();
        gameState.score += scoreGet
        gameState.scoreText.setText(`${unit}:${gameState.score}/${goal}`)
        if (gameState.score >= goal){
          win = true;
          enemyLoop.paused = true;
          this.add.text(250,300,'You Win!',{fill:'#22ff13',fontSize:'25px' })
          this.add.text(150,350,`Click to go to level ${leveln}`,{fill:'#22ff13',fontSize:'25px' })
          this.input.on('pointerup',()=>{
            this.scene.stop(`GameScene1`);
            this.scene.start(`StartUp${leveln}`);
          })
        }
      })
       // losing conditions
      this.physics.add.overlap(enemys,gameState.player,(enemy)=>{
        if (win === true){
          // so you don't die when you win
        } else if (!dT){
          // invincability
        } else {
          this.physics.pause();
          gameState.gameOver = true
          this.add.text(250,300,'Game Over',{fill:'#ff1000',fontSize:'25px' })
          this.add.text(200,350,'Click to restart',{fill:'#ff1000',fontSize:'25px' })
          this.input.on('pointerup',()=>{
            this.scene.stop(`GameScene${currentL}`);
            this.scene.start(`GameScene${currentL}`);
          })
        }
      })
      // level
      this.add.text(10,20,`LEVEL:${currentL}`,{fontSize:'30px',fill:'#f6faff'})
    }
    update(){
      if (this.key_W.isDown && !gameState.gameOver){
        gameState.player.y -= gameState.upSpeed;
      } else {
        gameState.player.setVelocityY(0);
      }
      if (this.key_S.isDown && !gameState.gameOver){
        gameState.player.y += gameState.downSpeed;
      } else {
        gameState.player.setVelocityY(0)
      }
      if (this.key_A.isDown && !gameState.gameOver){
        gameState.player.x -= gameState.sideSpeed;
      } else {
        gameState.player.setVelocityY(0);
      }
      if (this.key_D.isDown && !gameState.gameOver){
        gameState.player.x += gameState.sideSpeed;
      } else {
        gameState.player.setVelocityY(0)
      }
      // rate of fire
      if (gameState.ammo > 0){
        if (gameState.reload === 1 && this.key_M.isDown && !gameState.gameOver ){
            this.fireShot();
           gameState.reloadS.paused = false;
        } else if (gameState.reload >= 1 && this.key_M.isDown && !gameState.gameOver){
          this.fireShot();
           gameState.reloadS.paused = false;
        } else if (gameState.reload === 1 && !gameState.gameOver){
           gameState.reloadS.paused = true;
        }
      }
      
      // healing limits
      if (gameState.health >= gameState.maxHealth && !gameState.gameOver){
        gameState.reGen.paused = true;
      } else if (gameState.health <= gameState.regenMin && !gameState.gameOver){
        gameState.reGen.paused = false;
      } 
    }
  }