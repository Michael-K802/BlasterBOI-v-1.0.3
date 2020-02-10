class BounusLevel extends Phaser.Scene {
    constructor(){
        super({key:"BounusLevel"})
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
        // background
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
        // Main variables
        // win / lose conditions
        let win = false;
        gameState.gameOver = false
        let goal = 50; // unit - score
        // level stuff
        const currentL = 1; // current level
        const leveln = 2; // level after this one
        // enemy 
        const genEn = 150; // unit - ms
        const damage = 1; // damage enemys do
        // health and healing
        const healFactor = 1; // rate of healing 
        const regenDelay = 2000; // regen rate
        gameState.maxHealth = 100; // end of regen ability
        gameState.regenMin = 45; // heal min to start regen
        // items and scoring
        const rarity = 200; // chance of special items
        const bounusH = 20; // health gained by geting health pack
        const scoreGet = 2; // amount of points awarded apon collecting coin
        const unit = 'Score'; // unit of Scoring
        // movement
        gameState.sideSpeed = 3; // side to side
        gameState.upSpeed = 5 // up
        gameState.downSpeed = 2 // down
        // shooting and AMMO
        gameState.maxAmmo = 1;
        const rateOfFire = 300; // unit - ms
        // player and stats
        gameState.player = this.physics.add.sprite(300,300,'player');
        gameState.player.setCollideWorldBounds(true);
        gameState.health = 100; // player health
        gameState.score = 0; // player score 
        //text and more text    bottom - score/goal, middle 1 - health - middle 2 - special mod tex - middle 3, mod type, top - inv text?
        gameState.scoreText = this.add.text(5,570,`${unit}:${gameState.score}/${goal}`,{fontSize:'20px',fill:'#f6faff'});
        gameState.healthText = this.add.text(5,546,`Health:${gameState.health}`,{fontSize:'20px',fill:'#f6faff'});
        gameState.modType = this.add.text(5,525,'',{fontSize:'20px',fill:'#f6faff'});
        gameState.specialText = this.add.text(5,505,'',{fontSize:'20px',fill:'#f6faff'});
        // getting the player to move and shoot!
        // key inputs
        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.key_M = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
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
        // enemy generation 
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
        // coin and Items functions and generation
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
            let rN2 = Math.floor(Math.random()*7);
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
                } else if (rN2 === 1){
                    coins.create(x1,y2,'coins').setScale(.5);
                } else if (rN2 === 2){
                    coins.create(enemy.x,enemy.y,'coins').setScale(.5);
                } else if (rN2 === 3){
                    coins.create(x1,y2,'coins').setScale(.5);
                    coins.create(x2,y1,'coins').setScale(.5);
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
                    coins.create(x1,y2,'coins').setScale(.5);
                    coins.create(x2,y1,'coins').setScale(.5);
                }
            }
        }
        function healthPLogic(){
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
        }
        // what happens When?
        this.physics.add.collider(enemys,bounds1,(enemy)=>{ // enemy and boundry
            enemy.destroy();
        })
        this.physics.add.collider(coins,bounds1,(coin)=>{
            coin.destroy(); // coins and bound
        })
        this.physics.add.collider(shot,bounds2,(shot)=>{
            shot.destroy(); // shots and bounds
        })
        this.physics.add.overlap(enemys,shot,(enemy,shot)=>{ // destroy enemys with shot
            enemy.destroy(); 
            shot.destroy();
            coinCreate(enemy);
        })
        this.physics.add.overlap(healthPack,shot,(healthP)=>{
            healthP.destroy(); // healthPack and shot
            healthPLogic();
        })
        // scoring
        let on = true
        function flashGoal(){
            if (on === false){
                gameState.scoreText.setText(`${unit}:${gameState.score}/${goal}`);
                on = true;
            } else if (on === true){
                gameState.scoreText.setText(``);
                on = false
            }
        }
        const flashGoalTI = this.time.addEvent({
            delay: 200,
            callback: flashGoal,
            callbackScope: this,
            loop: true,
        })
        function flashGoalOff(){
            flashGoalTI.paused = true;
            flashGoalOffT.paused = true;
        }
        const flashGoalOffT = this.time.addEvent({
            delay: 2000,
            callback: flashGoalOff,
            callbackScope: this,
            loop: true,
        })
        flashGoalOffT.paused = true;
        flashGoalTI.paused = true;
        let goalIncresse = 50
        let goalReachedNum = 0;
        this.physics.add.overlap(coins,shot,(coin)=>{
            gameState.score += scoreGet;
            coin.destroy()
            gameState.scoreText.setText(`${unit}:${gameState.score}/${goal}`)
            if(gameState.score === goal){
                goal += goalIncresse;
                goalReachedNum += 1;
                flashGoalOffT.paused = false;
                flashGoalTI.paused = false;
                console.log(goalReachedNum)
                if (goalReachedNum === 4){
                    goalIncresse += 50
                    goalReachedNum = 0
                } else {

                }
            }
        })
        // Losing conditions
        let on2 = true
        function flashHealth(){
            if (on2 === false){
                gameState.healthText.setText(`Health:${gameState.health}`);
                on2 = true;
            } else if (on2 === true){
                gameState.healthText.setText(``);
                on2 = false
            }
        }
        const flashHealthTI = this.time.addEvent({
            delay: 200,
            callback: flashHealth,
            callbackScope: this,
            loop: true,
        })
        function flashHealthOff(){
            flashHealthOffT.paused = true;
            flashHealthTI.paused = true;
        }
        const flashHealthOffT = this.time.addEvent({
            delay: 2000,
            callback: flashHealthOff,
            callbackScope: this,
            loop: true,
        })
        flashHealthOffT.paused = true;
        flashHealthTI.paused = true;
        
        this.physics.add.overlap(enemys,gameState.player,(enemy)=>{
            if (gameState.health > 0){
            gameState.health -= damage;
            gameState.healthText.setText(`Health:${gameState.health}`)
            flashHealthOffT.paused = false;
            flashHealthTI.paused = false;
            } 
            if (gameState.health <= 0){
              this.physics.pause();
              gameState.gameOver = true
              this.add.text(250,300,'Game Over',{fill:'#ff1000',fontSize:'25px' })
              this.add.text(200,350,'Click to restart',{fill:'#ff1000',fontSize:'25px' })
              this.input.on('pointerup',()=>{
                this.scene.stop(`BounusLevel`);
                this.scene.start(`TitleScene`);
              })
            }
          })
        // level
        this.add.text(10,20,`Bounus Level`,{fontSize:'30px',fill:'#f6faff'})
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
    }
}
// planned modfyers -- Coin Grab?, Eyes-o-Doom, AMMO conservationist, ReloadReducer, Inflation, Damage Doubler, Hexa Hit, poison coins and rocks, more enemys, TIME Events? for bounus points?
// planned mechanics -- modifyer swict every 210,000 ms? goals to achevie - 50,100,150,200,250,300,350,400,450,500,550,600,700,800,900,1000,1250,1500,1750,2000,2150,2340,2796,3000, (3500, 3750,4000, 5000, 6000, 7000) - if it doesen't get boring. after 5 - 6 swaps intermideat of no mod for 2 - 3 minf, incresses modifyer #? or after 10 - 15 swaps incresses modifyer #? 
// prime mod , secondary mod, tri mod, (LEGEDARY FOURTH MOD) -- a special Modifyer never seen before.