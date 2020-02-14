class BounusLevel extends Phaser.Scene {
  constructor() {
    super({ key: "BounusLevel" })
  }
  preload() {
    this.load.image('background', 'GAMEFILES/Assets/Other/background-pixilart.png');
    this.load.image('player', 'GAMEFILES/Assets/PlayerStuff/space-ship(revamp)-pixilart.png')
    this.load.image('shot', 'GAMEFILES/Assets/PlayerStuff/shot.png');
    this.load.image('enemy', 'GAMEFILES/Assets/ENEMY/asteroid(revamped)-pixilart.png');
    this.load.image('healthPack', 'GAMEFILES/Assets/PlayerStuff/health-pack-pixilart.png');
    this.load.image('coins', 'GAMEFILES/Assets/Other/coin-pixilart.png');
    this.load.image('bar', 'GAMEFILES/Assets/Other/bar.png');
    this.load.image('Inv', 'GAMEFILES/Assets/PlayerStuff/invincablility-pack-pixilart.png')
    this.load.image('eye', 'GAMEFILES/Assets/ENEMY/EYEOFDOOM!.png')
  }
  create() {
    // background
    this.add.image(250, 250, 'background');
    this.add.image(250, 750, 'background');
    this.add.image(750, 250, 'background');
    this.add.image(750, 750, 'background');
    const bounds1 = this.physics.add.staticGroup();
    const bounds2 = this.physics.add.staticGroup();
    // bottom
    bounds1.create(50, 640, 'bar');
    bounds1.create(150, 640, 'bar');
    bounds1.create(250, 640, 'bar');
    bounds1.create(350, 640, 'bar');
    bounds1.create(450, 640, 'bar');
    bounds1.create(550, 640, 'bar');
    // top
    bounds2.create(50, -5, 'bar');
    bounds2.create(150, -5, 'bar');
    bounds2.create(250, -5, 'bar');
    bounds2.create(350, -5, 'bar');
    bounds2.create(450, -5, 'bar');
    bounds2.create(550, -5, 'bar');
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
    const rarity = 150; // chance of special items
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
    gameState.AMMOb = 500;
    // player and stats
    gameState.player = this.physics.add.sprite(300, 300, 'player');
    gameState.player.setCollideWorldBounds(true);
    gameState.health = 100; // player health
    gameState.score = 0; // player score 
    //text and more text    bottom - score/goal, middle 1 - health - middle 2 - special mod tex - middle 3, mod type, top - inv text?
    gameState.scoreText = this.add.text(5, 570, `${unit}:${gameState.score}/${goal}`, { fontSize: '20px', fill: '#f6faff' });
    gameState.healthText = this.add.text(5, 546, `Health:${gameState.health}`, { fontSize: '20px', fill: '#f6faff' });

    gameState.specialText = this.add.text(5, 525, '', { fontSize: '20px', fill: '#f6faff' });
    // getting the player to move and shoot!
    // key inputs
    this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.key_M = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    const shot = this.physics.add.group();
    this.fireShot = () => {
      shot.create(gameState.player.x, gameState.player.y, 'shot');
      shot.setVelocityY(-1010);
      gameState.ammo -= 1;
    }
    function reload() {
      gameState.ammo += .5;
      if (gameState.mEnemys === true) {
        gameState.reload2.paused = false;
        gameState.reload.paused = true;
        gameState.reloadReduce.paused = true
      } else if (gameState.ReloadR === true) {
        gameState.reload2.paused = true;
        gameState.reload.paused = true;
        gameState.reloadReduce.paused = false
      } else {
        gameState.reload.paused = false;
        gameState.reload2.paused = true;
        gameState.reloadReduce.paused = true
      }
    }
    gameState.reload = this.time.addEvent({
      delay: rateOfFire,
      callback: reload,
      callbackScope: this,
      loop: true,
    });
    // secondary reload
    gameState.reload2 = this.time.addEvent({
      delay: 100,
      callback: reload,
      callbackScope: this,
      loop: true
    })
    // third reload -- Reload Reducer!
    gameState.reloadReduce = this.time.addEvent({
      delay: 650,
      callback: reload,
      callbackScope: this,
      loop: true,
    })
    gameState.reload.paused = false;
    gameState.reload2.paused = true;
    gameState.reloadReduce.paused = true
    // enemy generation 
    const enemys = this.physics.add.group();
    function genEnemy() {
      let xCoord = Math.random() * 600;
      enemys.create(xCoord, -70, 'enemy');
      if (gameState.mEnemys === true) {
        enemyLoop2.paused = false;
        enemyLoop3.paused = false;
      } else {
        enemyLoop2.paused = true;
        enemyLoop3.paused = true;
      }
    }

    const enemyLoop = this.time.addEvent({
      delay: genEn,
      callback: genEnemy,
      callbackScope: this,
      loop: true,
    })
    // extra loops! 
    const enemyLoop2 = this.time.addEvent({
      delay: 121,
      callback: genEnemy,
      callbackScope: this,
      loop: true,
    })
    const enemyLoop3 = this.time.addEvent({
      delay: 101,
      callback: genEnemy,
      callbackScope: this,
      loop: true,
    })
    enemyLoop2.paused = true;
    enemyLoop3.paused = true;
    // secondary enemy
    const eye = this.physics.add.group();
    function enemy2Create(enemy) {
      let rN1 = Math.floor(Math.random() * 10)
      let rN2 = Math.floor(Math.random() * 5);
      let rN3 = Math.random() * 40;
      let x1 = enemy.x += rN3
      let x2 = enemy.x -= rN3
      let y1 = enemy.y += rN3
      let y2 = enemy.y -= rN3
      if (rN1 === 0) {
        eye.create(x1, y1, 'eye').setScale(.75)
        eye.create(x1, y2, 'eye').setScale(.75)
        eye.create(x2, y1, 'eye').setScale(.75)
        eye.create(x2, y2, 'eye').setScale(.75)
        eye.create(enemy.x, enemy.y, 'eye').setScale(.75)
      } else {
        if (rN2 === 0) {
          eye.create(enemy.x, enemy.y, 'eye').setScale(.75)
          console.log(1)
        } else if (rN2 === 1) {
          eye.create(enemy.x, enemy.y, 'eye').setScale(.75)
          console.log(2)
        } else if (rN2 === 2) {
          eye.create(x1, y1, 'eye').setScale(.75)
          eye.create(x2, y2, 'eye').setScale(.75)
          console.log(3)
        } else if (rN2 === 3) {
          eye.create(x1, y2, 'eye')
          eye.create(x2, y1, 'eye').setScale(.75)
          console.log(4)
        } else if (rN2 === 4) {
          eye.create(x1, y1, 'eye').setScale(.75)
          eye.create(x1, y2, 'eye').setScale(.75)
          eye.create(x2, y1, 'eye').setScale(.75)
          eye.create(x2, y2, 'eye').setScale(.75)
          console.log(5)
        } else {
          console.log(0)
        }
      }
    }
    // coin and Items functions and generation
    const healthPack = this.physics.add.group()
    const power1 = this.physics.add.group();
    function itemGen(x, y) {
      healthPack.create(x, y, 'healthPack').setScale(.75);
    }
    const coins = this.physics.add.group();
    function coinCreate(enemy) {
      let rN1 = Math.floor(Math.random() * rarity);
      let rN2 = Math.floor(Math.random() * 7);
      let rN3 = Math.random() * 20;
      let x1 = enemy.x += rN3
      let x2 = enemy.x -= rN3
      let y1 = enemy.y += rN3
      let y2 = enemy.y -= rN3
      if (rN1 === 0) {
        itemGen(enemy.x, enemy.y);
      } else {
        if (rN2 === 0) {
          coins.create(enemy.x, enemy.y, 'coins').setScale(.5);
        } else if (rN2 === 1) {
          coins.create(x1, y2, 'coins').setScale(.5);
        } else if (rN2 === 2) {
          coins.create(enemy.x, enemy.y, 'coins').setScale(.5);
        } else if (rN2 === 3) {
          coins.create(x1, y2, 'coins').setScale(.5);
          coins.create(x2, y1, 'coins').setScale(.5);
        } else if (rN2 === 4) {
          coins.create(x1, y1, 'coins').setScale(.5);
          coins.create(x1, y2, 'coins').setScale(.5);
          coins.create(x2, y1, 'coins').setScale(.5);
          coins.create(x2, y2, 'coins').setScale(.5);
        } else if (rN2 === 5) {
          coins.create(x1, y2, 'coins').setScale(.5);
          coins.create(x2, y1, 'coins').setScale(.5);
        } else if (rN2 === 6) {
          coins.create(enemy.x, enemy.y, 'coins').setScale(.5);
          coins.create(x1, y2, 'coins').setScale(.5);
          coins.create(x2, y1, 'coins').setScale(.5);
        }
      }
    }
    function healthPLogic() {
      if (gameState.health >= 131 && gameState.health <= 149) {
        let overflow = gameState.health + bounusH - 150;
        gameState.health += bounusH;
        gameState.health -= overflow;
        gameState.healthText.setText(`Health:${gameState.health}`);
        let bp = overflow * 2;
        gameState.score += bp;
        gameState.scoreText.setText(`${unit}:${gameState.score}/${goal}`)
      } else if (gameState.health <= 130) {
        gameState.health += bounusH;
        gameState.healthText.setText(`Health:${gameState.health}`)
      } else if (gameState.health === 150) {
        gameState.score += 40;
        gameState.scoreText.setText(`${unit}:${gameState.score}/${goal}`)
        if (gameState.score >= goal) {
          enemyLoop.paused = true;
          this.add.text(250, 300, 'You Win!', { fill: '#f23413', fontSize: '25px' })
          this.add.text(150, 350, `Click to go to level ${leveln}`, { fill: '#f5fa34', fontSize: '25px' })
          this.input.on('pointerup', () => {
            this.scene.stop(`GameScene1`);
            this.scene.start(`StartUp${leveln}`);
          })
        }
      }
    }
    // poison logic
    function poison() {
      if (gameState.health > 0) {
        gameState.health -= damage;
        gameState.healthText.setText(`Health:${gameState.health}`)
      }
      if (gameState.health <= 0) {
        this.physics.pause();
        gameState.reload.paused = true
        gameState.gameOver = true
        resetBoi.paused = false;
        this.add.text(250, 300, 'Game Over', { fill: '#ff1000', fontSize: '25px' })
        this.add.text(200, 350, 'Click to restart', { fill: '#ff1000', fontSize: '25px' })
        this.input.on('pointerup', () => {
          this.scene.stop(`BounusLevel`);
          this.scene.start(`BounusLevel`);
        })
      }
    }
    const poisonTick = this.time.addEvent({
      delay: 700,
      callback: poison,
      callbackScope: this,
      loop: true,
    })
    function stopfunction() {
      poisonTick.paused = true;
      stop.paused = true;
    };
    const stop = this.time.addEvent({
      delay: 10000,
      callback: stopfunction,
      callbackScope: this,
      loop: true,
    })
    poisonTick.paused = true;
    stop.paused = true;
    // what happens When?
    this.physics.add.collider(enemys, bounds1, (enemy) => { // enemy and boundry
      enemy.destroy();
    })
    this.physics.add.collider(coins, bounds1, (coin) => {
      coin.destroy(); // coins and bound
    })
    this.physics.add.collider(shot, bounds2, (shot) => {
      shot.destroy(); // shots and bounds
    })
    this.physics.add.overlap(enemys, shot, (enemy, shot) => { // destroy enemys with shot
      enemy.destroy();
      shot.destroy();
      if (eyesODoom === true) {
        enemy2Create(enemy);
      } else {
        coinCreate(enemy);
      }
    })
    this.physics.add.overlap(eye, shot, (enemy) => {
      enemy.destroy();
      coinCreate(enemy)
    })
    this.physics.add.overlap(healthPack, shot, (healthP) => {
      healthP.destroy(); // healthPack and shot
      healthPLogic();
    })
    this.physics.add.overlap(coins, gameState.player, () => {
      if (poisonCoins === true) {
        poisonTick.paused = false;
        stop.paused = false;
      }
    })
    // scoring

    let on = true
    function flashGoal() {
      if (on === false) {
        gameState.scoreText.setText(`${unit}:${gameState.score}/${goal}`);
        on = true;
      } else if (on === true) {
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
    function flashGoalOff() {
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
    let highScoreBeet = 0
    this.physics.add.overlap(coins, shot, (coin) => {
      if (cGrab === true) {
        gameState.score += 1
      } else if (Inflation === true) {
        gameState.score += .5
      } else {
        gameState.score += scoreGet;
      }

      coin.destroy()
      if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score
        gameState.highScoreText.setText(`HighScore: ${gameState.highScore}`)
      }
      gameState.scoreText.setText(`${unit}:${gameState.score}/${goal}`)
      if (gameState.score >= goal) {
        goal += goalIncresse;
        goalReachedNum += 1;
        gameState.score += 10
        flashGoalOffT.paused = false;
        flashGoalTI.paused = false;
        if (goalReachedNum === 3) {
          goalIncresse += 50
          goalReachedNum = 0
        } else {

        }
      }
    })
    // Losing conditions
    function resetLevel() {
      this.scene.stop(`BounusLevel`);
      this.scene.start(`TitleScene`);
    }
    const resetBoi = this.time.addEvent({
      delay: 30000,
      callback: resetLevel,
      callbackScope: this,
      loop: true
    })
    resetBoi.paused = true;
    let on2 = true
    function flashHealth() {
        if (on2 === false) {
            gameState.healthText.setText(`Health:${gameState.health}`);
            on2 = true;
        } else if (on2 === true) {
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
    function flashHealthOff() {
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

    this.physics.add.overlap(enemys, gameState.player, (enemy) => {
      if (gameState.health > 0) {
        if (DamageDoubler === true) {
          gameState.health -= 2;
          gameState.healthText.setText(`Health:${gameState.health}`)
          flashHealthOffT.paused = false;
          flashHealthTI.paused = false;
        } else if (HexaHit === true) {
          gameState.health -= 6
          gameState.healthText.setText(`Health:${gameState.health}`)
          flashHealthOffT.paused = false;
          flashHealthTI.paused = false;
        } else {
          gameState.health -= damage;
          gameState.healthText.setText(`Health:${gameState.health}`)
          flashHealthOffT.paused = false;
          flashHealthTI.paused = false;
        }
      }
      if (gameState.health <= 0) {
        this.physics.pause();
        gameState.healthText.setText(`Health: 0`)
        gameState.reload.paused = true;
      gameState.reload2.paused = true;
      gameState.reloadReduce.paused = true
        gameState.gameOver = true
        resetBoi.paused = false;
        this.add.text(250, 300, 'Game Over', { fill: '#ff1000', fontSize: '25px' })
        this.add.text(200, 350, 'Click to restart', { fill: '#ff1000', fontSize: '25px' })
        this.input.on('pointerup', () => {
          this.scene.stop(`BounusLevel`);
          this.scene.start(`BounusLevel`);
        })
      }
    })
    this.physics.add.overlap(eye, gameState.player, (enemy) => {
      if (gameState.health > 0) {
        if (DamageDoubler === true) {
          gameState.health -= 2;
        } else if (HexaHit === true) {
          gameState.health -= 6
        } else {
          gameState.health -= damage;
        }
        gameState.healthText.setText(`Health:${gameState.health}`)
        flashHealthOffT.paused = false;
        flashHealthTI.paused = false;
      }
      if (gameState.health <= 0) {
        this.physics.pause();
        gameState.healthText.setText(`Health: 0`)
        gameState.reload.paused = true;
      gameState.reload2.paused = true;
      gameState.reloadReduce.paused = true
        gameState.gameOver = true
        resetBoi.paused = false;
        this.add.text(250, 300, 'Game Over', { fill: '#ff1000', fontSize: '25px' })
        this.add.text(200, 350, 'Click to restart', { fill: '#ff1000', fontSize: '25px' })
        this.input.on('pointerup', () => {
          this.scene.stop(`BounusLevel`);
          this.scene.start(`BounusLevel`);
        })
      }
    })
    // level
    this.add.text(10, 20, `Bounus Level`, { fontSize: '25px', fill: '#f6faff' })
    gameState.highScoreText = this.add.text(10, 50, `HighScore: ${gameState.highScore}`, { fontSize: '15px', fill: '#f6faff' });
    gameState.modType = this.add.text(10, 70, '', { fontSize: '15px', fill: '#f6faff' });
    // changing modifyers
    // mod list from most common to least common!
    let cGrab = false;
    let eyesODoom = false;
    gameState.AMMO = false;
    gameState.ReloadR = false;
    let DamageDoubler = false;
    let Inflation = false;
    let poisonCoins = false;
    let HexaHit = false;
    gameState.mEnemys = false;
    let timeSwaped = 0;
    let previousMod = ''
    let toShow = ''
    // mod swict timer!
    function turnOff() {
      gameState.specialText.setText(``)
      if (previousMod === 'cGrab') {
        cGrab = false
      } else if (previousMod === 'eyesODoom') {
        eyesODoom = false
      } else if (previousMod === 'AMMO') {
        gameState.AMMO = false
      } else if (previousMod === 'ReloadR') {
        gameState.ReloadR = false
      } else if (previousMod === 'DamageDoubler') {
        DamageDoubler = false
      } else if (previousMod === 'Inflation') {
        Inflation = false
      } else if (previousMod === 'poisonCoins') {
        poisonCoins = false
      } else if (previousMod === 'HexaHit') {
        HexaHit = false
      } else if (previousMod === 'mEnemys') {
        gameState.mEnemys = false;
      }
    }
    function randomMod() {
      let randomN = Math.floor(Math.random() * 20);
      if (randomN === 0 && toShow !== "Coin Grab") {
        cGrab = true
        previousMod = "cGrab"
        toShow = "Coin Grab"
        gameState.modType.setText(`Modifyer: ${toShow}`)
      } else if ((randomN === 1 || randomN === 2 ) && toShow !== "Eyes-O-Doom") {
        eyesODoom = true
        previousMod = "eyesODoom"
        toShow = "Eyes-O-Doom"
        gameState.modType.setText(`Modifyer: ${toShow}`)
      } else if ((randomN === 5 || randomN === 6 || randomN === 7 || randomN === 8) && toShow !== "AMMO conservationist") {
        gameState.AMMO = true
        previousMod = "AMMO"
        toShow = "AMMO conservationist"
        gameState.modType.setText(`Modifyer: ${toShow}`)
      } else if ((randomN === 9 || randomN === 10 || randomN === 3 || randomN === 4) && toShow !== "Reload Reducer") {
        gameState.ReloadR = true
        previousMod = "ReloadR"
        toShow = "Reload Reducer"
        gameState.modType.setText(`Modifyer: ${toShow}`)
      } else if (randomN === 11 && toShow !== "Damagedoubler") {
        DamageDoubler = true
        previousMod = "DamageDoubler"
        toShow = "Damagedoubler"
        gameState.modType.setText(`Modifyer: ${toShow}`)
      } else if ((randomN === 12 || randomN === 13) && toShow !== "Hexa Hit") {
        HexaHit = true
        previousMod = "HexaHit"
        toShow = "Hexa Hit"
        gameState.modType.setText(`Modifyer: ${toShow}`)
      } else if (randomN === 14 && toShow !== "Inflation") {
        Inflation = true
        previousMod = "Inflation"
        toShow = "Inflation"
        gameState.modType.setText(`Modifyer: ${toShow}`)
      } else if ((randomN === 15 || randomN === 16 || randomN === 17) && toShow !== "Poison Coins") {
        poisonCoins = true
        previousMod = "poisonCoins"
        toShow = "Poison Coins"
        gameState.modType.setText(`Modifyer: ${toShow}`)
      } else if ((randomN === 18 || randomN === 19) && toShow !== "More Enemys") {
        gameState.mEnemys = true
        previousMod = "mEnemys"
        toShow = "More Enemys"
        gameState.modType.setText(`Modifyer: ${toShow}`)
      }
    }
    function modSwap() {
      if (timeSwaped === 0) {
        cGrab = true;
        previousMod = "cGrab"
        timeSwaped += 1
        toShow = "Coin Grab"
        console.log(previousMod)
      } else if (timeSwaped === 1) {
        turnOff()
        eyesODoom = true;
        previousMod = "eyesODoom"
        timeSwaped += 1
        toShow = "Eyes-O-Doom"
        console.log(previousMod)
      } else {
        turnOff()
        timeSwaped += 1
        randomMod();
        console.log(previousMod)
      }
      gameState.modType.setText(`Modifyer: ${toShow}`)
    }
    const swapTimer = this.time.addEvent({
      delay: 40301, // ms
      callback: modSwap,
      callbackScope: this,
      loop: true
    })
    this.textset = () => {
      if (gameState.AMMO === true) {
        gameState.specialText.setText(`AMMO: ${gameState.AMMOb}`)
      }
    }
  }
  update() {
    if (this.key_W.isDown && !gameState.gameOver) {
      gameState.player.y -= gameState.upSpeed;
    } else {
      gameState.player.setVelocityY(0);
    }
    if (this.key_S.isDown && !gameState.gameOver) {
      gameState.player.y += gameState.downSpeed;
    } else {
      gameState.player.setVelocityY(0)
    }
    if (this.key_A.isDown && !gameState.gameOver) {
      gameState.player.x -= gameState.sideSpeed;
    } else {
      gameState.player.setVelocityY(0);
    }
    if (this.key_D.isDown && !gameState.gameOver) {
      gameState.player.x += gameState.sideSpeed;
    } else {
      gameState.player.setVelocityY(0)
    }
    // rate of fire
    if (gameState.ammo === gameState.maxAmmo && this.key_M.isDown && !gameState.gameOver) {
      if (gameState.AMMO === true && gameState.AMMOb > 0) {
        gameState.AMMOb -= 1
        this.fireShot();
        gameState.reload.paused = false;
        this.textset()
      } else if (gameState.AMMOb === 0 && gameStateAMMO === true) {

      } else {
        this.fireShot();
        if (gameState.mEnemy === true) {
          gameState.reload.paused = true;
          gameState.reload2.paused = false;
          gameState.reloadReduce.paused = true
        } else if (gameState.ReloadR === true) {
          gameState.reload.paused = true;
          gameState.reload2.paused = true;
          gameState.reloadReduce.paused = false
        } else {
          gameState.reload.paused = false;
          gameState.reload2.paused = true;
          gameState.reloadReduce.paused = true
        }
      }
    } else if (gameState.ammo >= 1 && this.key_M.isDown && !gameState.gameOver) {
      if (gameState.AMMO === true && gameState.AMMOb > 0) {
        gameState.AMMOb -= 1
        this.fireShot();
        gameState.reload.paused = false;
      } else if (gameState.AMMOb === 0 && gameState.AMMO === true) {

      } else {
        this.fireShot();
        if (gameState.mEnemy === true) {
          gameState.reload.paused = true;
          gameState.reload2.paused = false;
          gameState.reloadReduce.paused = true
        } else if (gameState.ReloadR === true) {
          gameState.reload.paused = true;
          gameState.reload2.paused = true;
          gameState.reloadReduce.paused = false
        } else {
          gameState.reload.paused = false;
          gameState.reload2.paused = true;
          gameState.reloadReduce.paused = true
        }
      }
    } else if (gameState.ammo === gameState.maxAmmo && !gameState.gameOver) {
      gameState.reload.paused = true;
      gameState.reload2.paused = true;
      gameState.reloadReduce.paused = true
    }

  }
}
// high score fo all --- 1512
