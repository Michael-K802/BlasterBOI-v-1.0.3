class GameScene18 extends Phaser.Scene {
    constructor(){
        super({key:"GameScene18"})
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
        this.load.image('eye','GAMEFILES/Assets/ENEMY/EYEOFDOOM!.png')
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
      const goal = 900; // unit - score
      const rateOfFire = 140; // unit - ms
      const genEn = 50; // unit - ms
      const rarity = 100; // chance of medpack
      const leveln = 19; // level after this one
      const damage = 1; // damage enemys do
      const currentL = 18; // current level
      const regenDelay = 1000; // regen rate
      const bounusH = 20; // health gained by geting health pack
      const scoreGet = 2; // amount of points awarded apon collecting coin
      const healFactor = 1; // rate of healing 
      const unit = 'Score'; // unit of Scoring
      gameState.sideSpeed = 3; // side to side
      gameState.upSpeed = 5 // up
      gameState.downSpeed = 2 // down
      gameState.maxHealth = 100;
      gameState.regenMin = 45;
      gameState.maxAmmo = 1;
      // player and stats 
      gameState.player = this.physics.add.sprite(250,500,'player')
      gameState.player.setCollideWorldBounds(true);
      gameState.health = 100;
      gameState.score = 0;
      gameState.ammo = 0;
      gameState.scoreText = this.add.text(10,570,`${unit}:${gameState.score}/${goal}`,{fontSize:'20px',fill:'#f6faff'});
      gameState.healthText = this.add.text(10,545,'Health:100',{fontSize:'20px',fill:'#fdf1da'});
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
        gameState.ammo -= 1;
      }
      function reload(){
        gameState.ammo += .5;
      }
      gameState.reload = this.time.addEvent({
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
      const eye = this.physics.add.group();
      function enemy2Create(enemy){
        let rN1 = Math.floor(Math.random()*10)
        let rN2 = Math.floor(Math.random()*5);
        let rN3 = Math.random()*40;
        let x1 = enemy.x += rN3 
        let x2 = enemy.x -= rN3
        let y1 = enemy.y += rN3
        let y2 = enemy.y -= rN3
        if (rN1 === 0){
          eye.create(x1,y1,'eye').setScale(.75)
          eye.create(x1,y2,'eye').setScale(.75)
          eye.create(x2,y1,'eye').setScale(.75)
          eye.create(x2,y2,'eye').setScale(.75)
          eye.create(enemy.x,enemy.y,'eye').setScale(.75)
        } else {
          if (rN2 === 0){
            eye.create(enemy.x,enemy.y,'eye').setScale(.75)
            console.log(1)
          } else if (rN2 === 1){
            eye.create(enemy.x,enemy.y,'eye').setScale(.75)
            console.log(2)
          } else if (rN2 === 2){
            eye.create(x1,y1,'eye').setScale(.75)
            eye.create(x2,y2,'eye').setScale(.75)
            console.log(3)
          } else if (rN2 === 3){
            eye.create(x1,y2,'eye')
            eye.create(x2,y1,'eye').setScale(.75)
            console.log(4)
          } else if (rN2 === 4){
            eye.create(x1,y1,'eye').setScale(.75)
            eye.create(x1,y2,'eye').setScale(.75)
            eye.create(x2,y1,'eye').setScale(.75)
            eye.create(x2,y2,'eye').setScale(.75)
            console.log(5)
          } else {
            console.log(0)
          }
        }
      }
      const healthPack = this.physics.add.group()
      const power1 = this.physics.add.group();
      function itemGen(x,y){
        let rN = Math.floor(Math.random()*10);
        if (rN === 0 || rN === 1){
          power1.create(x,y,'Inv').setScale(.75);
        } else {
          healthPack.create(x,y,'healthPack').setScale(.75);
        }
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
        enemy2Create(enemy);
      })
      this.physics.add.overlap(eye,shot,(enemy)=>{
        enemy.destroy();
        coinCreate(enemy)
      })
      this.physics.add.overlap(healthPack,shot,(healthP)=>{
        healthP.destroy();
        if (gameState.health >= 131 && gameState.health <= 149 ){
          let overflow = gameState.health + bounusH -150;
          gameState.health += bounusH;
          gameState.health -= overflow;
          gameState.healthText.setText(`Health:${gameState.health}`);
          let bp = overflow * 2;
          gameState.score += bp;
          gameState.scoreText.setText(`${unit}:${gameState.score}/${goal}`)
        } else if (gameState.health <= 130){
          gameState.health += bounusH;
          gameState.healthText.setText(`Health:${gameState.health}`)
        } else if (gameState.health === 150){
          gameState.score += 40;
          gameState.scoreText.setText(`${unit}:${gameState.score}/${goal}`)
           if (gameState.score >= goal){
          enemyLoop.paused = true;
          this.add.text(250,300,'You Win!',{fill:'#f23413',fontSize:'25px' })
          this.add.text(150,350,`Click to go to level ${leveln}`,{fill:'#f5fa34',fontSize:'25px' })
          this.input.on('pointerup',()=>{
            this.scene.stop(`GameScene1`);
            this.scene.start(`StartUp${leveln}`);
          })
        }
        }
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
        } else if (gameState.health > 0){
        gameState.health -= damage;
        gameState.healthText.setText(`Health:${gameState.health}`)
        } else if (gameState.health <= 0){
          gameState.reGen.destroy()
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
      this.physics.add.overlap(eye,gameState.player,(enemy)=>{
        if (win === true){
          // so you don't die when you win
        } else if (gameState.health > 0){
        gameState.health -= damage;
        gameState.healthText.setText(`Health:${gameState.health}`)
        } else if (gameState.health <= 0){
          gameState.reGen.destroy()
          this.physics.pause();
          this.add.text(250,300,'Game Over',{fill:'#ff1000',fontSize:'25px' })
          this.add.text(200,350,'Click to restart',{fill:'#ff1000',fontSize:'25px' })
          this.input.on('pointerup',()=>{
            this.scene.stop(`GameScene${currentL}`);
            this.scene.start(`GameScene${currentL}`);
          })
        }
      })
      // healing 
      function heal(){
        gameState.health += healFactor;
        gameState.healthText.setText(`Health:${gameState.health}`)
      }
      gameState.reGen = this.time.addEvent({
        delay: regenDelay,
        callback: heal,
        callbackScope: this,
        loop: true,
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
      if (gameState.ammo === gameState.maxAmmo && this.key_M.isDown  && !gameState.gameOver){
          this.fireShot();
         gameState.reload.paused = false;
      } else if (gameState.ammo >= 1 && this.key_M.isDown && !gameState.gameOver){
        this.fireShot();
         gameState.reload.paused = false;
      } else if (gameState.ammo === gameState.maxAmmo && !gameState.gameOver){
         gameState.reload.paused = true;
      }
      // healing limits
      if (gameState.health >= gameState.maxHealth && !gameState.gameOver){
        gameState.reGen.paused = true;
      } else if (gameState.health <= gameState.regenMin && !gameState.gameOver){
        gameState.reGen.paused = false;
      } 
    }
  }
  