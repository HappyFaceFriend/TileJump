//import {ListView} from "/phaser-list-view.js"

var clientWidth = function() {
  return Math.max(window.innerWidth, document.documentElement.clientWidth);
};
var clientHeight = function() {
  return Math.max(window.innerHeight, document.documentElement.clientHeight);
};
var height = 1180;
var width = 720;
var tabSize = 90;
var game = new Phaser.Game(width, height, Phaser.CANVAS, 'ld29', null, false, false);

var charId = 0;

var charLock = [true, false, false, false, false, false];

var charlockCond = [0, 500, 2000, 4000, 10000, 20000];

var fallSound;
var jumpSound;
var clickSound;
var mainSound;
var downSound;
var gameSound;
var excellentSound;
var feverSound;
var LOADLOAD  ={

    preload: function() {
      game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVeritcally = true;
      game.scale.refresh();
      game.load.image('loadbg','assets/loadingbg.png');
      game.load.spritesheet('loadAnim', 'assets/characters/ckfly.png', 170, 170, 12);
    },
    create: function()  {
        game.state.start('loadst');

    },
    update: function(){}
}
var LOAD = {
  preload: function() {
    document.getElementById("bd").style.backgroundColor = "#000C31";
    this.add.image(0,0,'loadbg');
    this.loadAnim=this.add.image(279,453,'loadAnim');
    this.loadAnim.animations.add('animload');
    this.loadAnim.animations.play('animload', 30, true);
    this.charList = ['owl', 'fox', 'cat', 'chip', 'ck', 'dog'];

    for (let i = 0; i < this.charList.length; i++) {
      let s = this.charList[i];
      game.load.image(s + 'Effect', 'assets/characters/' + s + 'effect.png', 170, 170, 1);
      game.load.spritesheet(s + 'Idle', 'assets/characters/' + s + 'idle.png', 170, 170, 10);
      game.load.spritesheet(s + 'Up', 'assets/characters/' + s + '1.png', 170, 170, 4);
      game.load.spritesheet(s + 'Down', 'assets/characters/' + s + '2.png', 170, 170, 4);
      game.load.spritesheet(s + 'Die', 'assets/characters/' + s + 'death.png', 170, 170, 7);
      game.load.spritesheet(s + 'Fly', 'assets/characters/' + s + 'fly.png', 170, 170, 12);
    }

    game.load.image('background', 'assets/bg.png');
    for (let i = 0; i < 7; i++)
      game.load.image('cloud' + i, 'assets/cloud/' + i + '.png');
    game.load.image('great', 'assets/great.png');
    game.load.image('excellent', 'assets/excellent.png');
    for (let i = 0; i < 10; i++)
      game.load.image('num' + i, 'assets/number/' + i + '.png');
    game.load.image('surprize', 'assets/surprize.png');
    for (let i = 1; i <= 3; i++) {
      game.load.image('fevertile' + i, 'assets/fever/tile/' + i + '.png');
    }
    for (let i = 1; i <= 3; i++) {
      game.load.image('spring' + i, 'assets/spring/' + i + '.png');
      game.load.image('summer' + i, 'assets/summer/' + i + '.png');
      game.load.image('fall' + i, 'assets/fall/' + i + '.png');
      game.load.image('winter' + i, 'assets/winter/' + i + '.png');
    }
    game.load.image('comboText', 'assets/comboText.png');
    for (let i = 0; i < 10; i++)
      game.load.image('combonum' + i, 'assets/comboNum/' + i + '.png');
    game.load.image('bonus+', 'assets/combobonus/+.png');
    for (let i = 0; i < 10; i++)
      game.load.image('bonus' + i, 'assets/combobonus/' + i + '.png');

    for (let i = 1; i <= 5; i++)
      game.load.image('star' + i, 'assets/effect/star' + i + '.png')
    game.load.image('ringEffect', 'assets/effect.png');
    game.load.image('exring', 'assets/effect/floor.png');
    game.load.image('shadow1', 'assets/shadow1.png');
    game.load.image('shadow2', 'assets/shadow2.png');

    game.load.image('pauseBg', 'assets/pauseBg.png');
    game.load.image('pauseButton', 'assets/pause.png');
    game.load.image('restartButton', 'assets/restart.png');

    game.load.image('startButtonMain', 'assets/main/start.png')
    game.load.image('bgMain', 'assets/main/bg.png');
    game.load.image('boardMain', 'assets/main/board.png');
    game.load.image('creditMain', 'assets/main/credit.png');
    game.load.image('helpMain', 'assets/main/help.png');
    game.load.image('logoMain', 'assets/main/logo.png');
    game.load.image('logobgMain', 'assets/main/logobg.png');
    game.load.image('patternMain', 'assets/main/pattern.png');
    game.load.image('soundOffMain', 'assets/main/soundoff.png');
    game.load.image('soundOnMain', 'assets/main/soundon.png');
    game.load.image('rankingStartMain', 'assets/main/rankingstart.png');
    game.load.image('tileMain','assets/main/tile.png');

    game.load.image('startButtonSelect', 'assets/select/gamestart.png')

    game.load.image('1on', 'assets/select/1on.png');
    for (let i = 2; i <= 6; i++) {
      //game.load.image('' + i + 'on', 'assets/character/' + i + '.png');
      game.load.image('' + i + 'off', 'assets/select/' + i + 'off.png');
      game.load.image('' + i + 'on', 'assets/select/' + i + 'on.png');
    }
    game.load.image('textSelect', 'assets/select/text.png');

    game.load.image('bgOver', 'assets/over/bg.png');
    game.load.image('restartOver', 'assets/over/re.png');
    game.load.image('1stOver', 'assets/over/1st.png');
    game.load.image('2ndOver', 'assets/over/2nd.png');
    game.load.image('3rdOver', 'assets/over/3rd.png');
    game.load.image('allrankingOver', 'assets/over/allranking.png');
    game.load.image('bar1Over', 'assets/over/bar1.png');
    game.load.image('bar2Over', 'assets/over/bar2.png');
    game.load.image('bestOver', 'assets/over/best.png');
    game.load.image('boardOver', 'assets/over/board.png');
    game.load.image('bragOver', 'assets/over/brag.png');
    game.load.image('friendrankingOver', 'assets/over/friendranking.png');
    game.load.image('lowerOver', 'assets/over/lower.png');

    game.load.image('closeButton', 'assets/help/close.png');
    game.load.image('textHelp', 'assets/help/help2.png');
    game.load.image('textCredit', 'assets/credit/text.png');

    for (let i = 0; i < 10; i++)
      game.load.image('overnum' + i, 'assets/over/score1/' + i + '.png');
    for (let i = 0; i < 10; i++)
      game.load.image('main' + i, 'assets/main/rankingscore/' + i + '.png');
    game.load.image('main,', 'assets/main/rankingscore/,.png');
    game.load.image('mainText', 'assets/main/rankingscore/text.png');
    game.load.image('mainp', 'assets/main/rankingscore/p.png');

    game.load.audio('fall', 'assets/sounds/fail_1.mp3');
    game.load.audio('jump', 'assets/sounds/jump_2.mp3');
    game.load.audio('down', 'assets/sounds/jump_3.mp3');
    game.load.audio('main', 'assets/sounds/main_1.mp3');
    game.load.audio('click', 'assets/sounds/click.mp3');
    game.load.audio('game', 'assets/sounds/game.mp3');
    game.load.audio('excellent', 'assets/sounds/soundEf2.mp3');
    game.load.audio('fever', 'assets/sounds/main_5.mp3');

    for (let i = 1; i <= 5; i++) {
      game.load.image('unlock' + i, 'assets/unlock/' + i + '.png');
    }
    game.load.image('feverbg1','assets/fever/bg/bg1.png');
    game.load.image('feverbg2','assets/fever/bg/bg2.png');
    game.load.image('feverbg3','assets/fever/bg/bg3.png');
    game.load.image('feverbg4','assets/fever/bg/bg4.png');
    game.load.image('feverstar1','assets/fever/bg/star1.png');
    game.load.image('feverstar2','assets/fever/bg/star2.png');
    game.load.image('feverstar3','assets/fever/bg/star3.png');
    game.load.image('feverstar4','assets/fever/bg/star4.png');
    game.load.image('feverbar','assets/fever/gaugeui/bar.png');
    game.load.image('feverbareffect','assets/fever/gaugeui/effect.png');
    game.load.image('fevergauge','assets/fever/gaugeui/gauge.png');
    game.load.image('fevertext','assets/fever/text.png');
    game.load.image('fevercentereffect','assets/fever/centereffect.png');

  },
  create: function() {
    if (fallSound == null)
      fallSound = this.game.add.audio('fall');
    if (jumpSound == null) {
      jumpSound = this.game.add.audio('jump');
      jumpSound.volume -= 0.55;
    }
    if (clickSound == null)
      clickSound = this.game.add.audio('click');
    if (mainSound == null) {
      mainSound = this.game.add.audio('main');
      mainSound.volume += 0.5;
      mainSound.loopFull();
      mainSound.stop();
      mainSound.isPlaying = false;
    }
    if (gameSound == null) {
      gameSound = this.game.add.audio('game');
      gameSound.volume += 0.3;
      gameSound.loopFull();
      gameSound.stop();
    }
    if (downSound == null)
      downSound = this.game.add.audio('down');
      if (feverSound == null) {
        feverSound = this.game.add.audio('fever');
        feverSound.volume+=0.2;
      }
    if (excellentSound == null) {
      excellentSound = this.game.add.audio('excellent');
      excellentSound.volume-=0.1;
    }

    game.state.start('titlest');
  },
  update: function() {}
};
var patternSpeed = 40;

function movePattern(p1, p2) {
  p1.x += patternSpeed * game.time.physicsElapsed;
  p2.x += patternSpeed * game.time.physicsElapsed;
  if (p1.x > p1.width)
    p1.x -= p1.width * 2;
  if (p2.x > p1.width)
    p2.x -= p1.width * 2;
}
var TITLE = {
  preload: function() {
    document.getElementById("bd").style.backgroundColor = "#5AE5FE";
  },
  create: function() {
    gameSound.stop();
    if (mainSound.isPlaying == false) {
      mainSound.play();
      mainSound.isPlaying = true;
    }
    this.bg = game.add.image(0, 0, 'bgMain');
    this.pattern1 = game.add.image(0, 0, 'patternMain');
    this.pattern2 = game.add.image(this.pattern1.width, 0, 'patternMain');
    this.startButton = game.add.button(49, 1109 - tabSize, 'startButtonMain', startOnClilckMain, this);
    this.helpButton = game.add.button(32, 164 - 40 - tabSize, 'helpMain', helpOnClickMain, this);
    this.creditButton = game.add.button(122, 164 - 40 - tabSize, 'creditMain', creditOnClickMain, this);
    this.soundButton = game.add.button(width - 110, 164 - 40 - tabSize, 'soundOnMain', soundOnClickMain, this);
    this.soundOff = game.add.image(width - 110, 164 - 40 - tabSize, 'soundOffMain')
    if (!fallSound.mute)
      this.soundOff.kill();
    this.rankingButton = game.add.button(368, 1109 - tabSize, 'rankingStartMain', rankingOnClickMain, this);
    this.board = game.add.image(0, 0 - tabSize, 'boardMain');
    this.tile = game.add.image(53, 571 - tabSize, 'tileMain');
    this.logobg = game.add.image(85, 141 - tabSize + 50, 'logobgMain');
    this.logo = game.add.image(108, 161 - tabSize + 50, 'logoMain');

    this.logoMove = 50;
    this.ceta = 0;
    this.moveSpeed = Math.PI * 0.7;

    this.numList = [];
    let highscore = localStorage['TileJumpHighScore'] || '0';
    listNum(2342312123, 631, 821 - 66);
    listNum(highscore, 631, 821); //66
    rankNum(95, 631, 887);
    rankNum(2, 631, 887 + 66);
  },
  update: function() {
    movePattern(this.pattern1, this.pattern2);
    this.logo.y = 161 - tabSize + 50 + this.logoMove * (Math.sin(this.ceta)) / 2;
    this.ceta += this.moveSpeed * game.time.physicsElapsed;
  }
};

function soundOnClickMain() {
  if (TITLE.soundOff.alive)
    TITLE.soundOff.kill();
  else
    TITLE.soundOff.revive();
  clickSound.play();
  fallSound.mute = !fallSound.mute;
  jumpSound.mute = !jumpSound.mute;
  clickSound.mute = !clickSound.mute;
  mainSound.mute = !mainSound.mute;
  gameSound.mute = !gameSound.mute;
  excellentSound.mute = !excellentSound.mute;
  downSound.mute=!downSound.mute;
  feverSound.mute =!feverSound.mute;
}

function listNum(num, x, y) {
  let nums = num.toString();
  //let x=_x-nums.length*
  TITLE.numList.push([]);
  let comnum = (nums.length - 1) / 3;
  for (let i = 0; i < nums.length; i++) {
    TITLE.numList[TITLE.numList.length - 1].push(
      TITLE.add.image(x - ((nums.length - i) * 16 + comnum * 7), y, 'main' + nums[i]));
    if ((nums.length - i) % 3 == 1 && i != nums.length - 1) {
      comnum--;
      TITLE.numList[TITLE.numList.length - 1].push(
        TITLE.add.image(x - ((nums.length - i) * 16 + (comnum - 1) * 7 - 1), y + 4, 'main,'));
    }
  }
}

function rankNum(num, x, y) {
  TITLE.numList.push([]);
  let nums = num.toString();
  let _x = x - Math.floor(nums.length * 16) - 45 - 16;
  for (let i = 0; i < nums.length; i++) {
    TITLE.numList[TITLE.numList.length - 1].push(
      TITLE.add.image(_x + ((i) * 16) + 45, y, 'main' + nums[i]));

  }
  TITLE.numList[TITLE.numList.length - 1].push(
    TITLE.add.image(_x, y, 'mainText'));
  TITLE.numList[TITLE.numList.length - 1].push(
    TITLE.add.image(x - 16, y - 1, 'mainp'));
}

function startOnClilckMain() {
  clickSound.play();
  game.state.start('charselectst');
}

function startOnClilckSelect() {
  clickSound.play();
  game.state.start('gamest');
}

function helpOnClickMain() {
  clickSound.play();
  game.state.start('helpst');
}

function creditOnClickMain() {
  clickSound.play();
  //localStorage['TileJumpHighScore'] = '0';
  game.state.start('creditst');
}
var CHARSELECT = {
  preload: function() {},
  create: function() {
    this.dy = tabSize;
    this.bg = game.add.image(0, -this.dy, 'bgMain');
    this.pattern1 = game.add.image(0, 0, 'patternMain');
    this.pattern2 = game.add.image(this.pattern1.width, 0, 'patternMain');
    this.startButton = game.add.button(217, 1112 - tabSize, 'startButtonSelect', startOnClilckSelect, this);
    let highScore = Number(localStorage['TileJumpHighScore'] || '0');
    for (let i = 0; i < 6; i++) {
      if (charlockCond[i] > highScore) {
        charLock[i] = false;
      } else
        charLock[i] = true;
    }
    this.selectButtons = [];
    for (let i = 1; i <= 6; i++) {
      if (charLock[i - 1]) {
        let idx = i;
        this.selectButtons.push(game.add.button(13 + 236 * ((i - 1) % 3), 244 + 336 * Math.round((i - 2) / 3) - this.dy, '' + i + 'on', selBut(i - 1), this));
      } else {
        let idx = i;
        this.selectButtons.push(game.add.button(13 + 236 * ((i - 1) % 3), 244 + 336 * Math.round((i - 2) / 3) - this.dy, '' + i + 'off', notBut, this));
      }
      CHARSELECT.selectButtons[i - 1].tint = 0xBBBBBB;
    }
    CHARSELECT.selectButtons[charId].tint = 0xFFFFFF;
    this.bg = game.add.image(43, 167 - this.dy, 'textSelect');
  },
  update: function() {
    movePattern(this.pattern1, this.pattern2);
  }
};

function notBut() {

}

var selBut = function(id) {
  return function() {
    clickSound.play();
    for (let i = 0; i < 6; i++)
      CHARSELECT.selectButtons[i].tint = 0xBBBBBB;
    //CHARSELECT.selectButtons[charId].key=''+(charId+1)+'select';
    charId = id;
    CHARSELECT.selectButtons[id].tint = 0xFFFFFF;
  }

}

function getCharId() {
  return charId;
}

function closeOnClick() {
  clickSound.play();
  game.state.start('titlest');
}

var HELP = {
  preload: function() {},
  create: function() {
    this.dy = tabSize;
    this.bg = game.add.image(0, -this.dy, 'bgMain');
    this.pattern1 = game.add.image(0, 0, 'patternMain');
    this.pattern2 = game.add.image(this.pattern1.width, 0, 'patternMain');
    this.closeButton = game.add.button(32, 164 - 40 - tabSize, 'closeButton', closeOnClick, this);
    this.text = game.add.image(89, 146 - tabSize, 'textHelp');
    //this.text.scale.setTo(0.85, 0.85);
  },
  update: function() {
    movePattern(this.pattern1, this.pattern2);
  }
};
var CREDIT = {
  preload: function() {},
  create: function() {
    this.dy = tabSize;
    this.bg = game.add.image(0, -this.dy, 'bgMain');
    this.pattern1 = game.add.image(0, 0, 'patternMain');
    this.pattern2 = game.add.image(this.pattern1.width, 0, 'patternMain');
    this.closeButton = game.add.button(32, 164 - 40 - tabSize, 'closeButton', closeOnClick, this);
    this.text = game.add.image(150, 176 - tabSize, 'textCredit');
  },
  update: function() {
    movePattern(this.pattern1, this.pattern2);
  }
};

var GAME = {
  preload: function() {
    document.getElementById("bd").style.backgroundColor = "#6FCAFF";
  },
  create: function() {
    this.charList = ['owl', 'fox', 'cat', 'chip', 'ck', 'dog'];
    //this.bg=AddImage(0,0,'background');
    this.bg = AddImage(0, 0, 'background');
    this.pauseBG = AddImage(0, 0, 'pauseBg');
    this.pauseBG.kill();

    this.pauseButton = game.add.button(width - 40, 40, 'pauseButton', pauseOnClick, this);
    this.pauseButton.scale.set(1, 1);
    this.pauseButton.x -= this.pauseButton.width;
    this.touchOnUI = false;
    this.resumeButton = game.add.button(width / 2, height / 2, 'restartButton', pauseOnClick, this);
    this.resumeButton.anchor.setTo(0.5, 0.5);
    this.resumeButton.scale.set(1, 1);
    this.resumeButton.kill();


    this.cloudSpeed = 1;
    this.bgAlpha = 0;
    this.tiles = [];
    this.newTile = [];
    this.tileSpeed = [];
    this.clouds = [];
    this.cloudNum = 0;
    this.tileType = [];
    this.season = 1;
    this.seasonText = ["", "spring", "summer", "fall", "winter"];
    this.oneTileX = 72;
    this.oneTileY = 42;
    this.playerDX = 270 - this.oneTileX; //290
    this.playerDY = 554 - this.oneTileY;
    this.characterString = this.charList[getCharId()];
    this.player = AddImage(this.playerDX, this.playerDY, this.characterString + 'Effect');

    this.player.loadTexture(this.characterString + 'Idle', 0);
    this.player.animations.add('Idle');
    this.player.loadTexture(this.characterString + 'Up', 0);
    this.player.animations.add('Up');
    this.player.loadTexture(this.characterString + 'Down', 0);
    this.player.animations.add('Down');
    this.player.loadTexture(this.characterString + 'Die', 0);
    this.player.animations.add('Die');
    this.player.loadTexture(this.characterString + 'Fly', 0);
    this.player.animations.add('Fly');
    changePlayerAnim('Idle', 10, true);

    this.game.input.onDown.add(itemTouched, this);

    this.leadTileX = 288 - this.oneTileX; //+24
    this.leadTileY = 648 - this.oneTileY; //+102
    this.newTileAnswerX = 288;
    this.newTileAnswerY = 648;
    this.tileDir = [];
    this.patternRatioDefault = 1.5;
    this.patternRatio = this.patternRatioDefault;
    this.defaultTileSpeed = 3.5;

    this.bgType = 0;
    pushTile(0, 0, '' + this.seasonText[this.season] + '1');
    pushTile(0, 0, '' + this.seasonText[this.season] + '2');
    pushTile(0, 0, '' + this.seasonText[this.season] + '3');

    this.jumpState = 0;
    this.eDis = 0;
    this.jumpSpeed = 8;
    this.eTime = 0;

    this.animSpeed = 20;

    this.effectScale = 1;

    this.score = 0;
    this.scoreImages = [];
    this.stage = 1;
    createClouds();
    this.comboText = AddImage(width / 2, 300, 'comboText');
    this.comboText.anchor.setTo(0.5, 0.5);
    this.comboTextProgress = 0;
    this.comboText.kill();

    this.surprize = AddImage(this.player.x - 40, this.player.y - 40, 'surprize');
    this.surprize.kill();


    this.tailLength = 7;
    this.seasonTileLeft = 0;
    this.newSeasonTileIdx = 1;

    this.touchBuffer = false;

    this.idleAnimSpeed = 15;
    this.upAnimSpeed = 60;
    this.flyAnimSpeed = 60;
    this.downAnimSpeed = 11 / 0.3;
    this.deathAnimSpeed = 40;

    this.holdTile = [];
    this.tileMoved = [];
    this.isPattern1ing = false;
    this.scoredBlocks = 0;
    this.eTimeTest = 0;

    this.combo = 0;
    this.comboImages = [];
    this.comboEffectProgress = 0;

    this.shadow = null;
    this.shadowX = this.playerDX + 25;
    this.shadowY = this.playerDY + 100;

    this.stars = [];
    this.starDir = [];
    this.starProg = [];

    this.charEffects = [];
    this.ringEffects = [];
    this.textEffects = [];

    this.feverState=0;
    this.oldNewTiles=[];
    this.nextFeverTile=1;

    this.feverAddSpeed=1;

    this.feverBars=[];
    this.feverGauges=[];
    this.gaugecombo=0;
    for(let i=0; i<5; i++)  {
      this.feverBars.push(AddImage(30+138*i,1040,'feverbar'));
    }


    if (getCharId() % 2 == 1)
      this.shadow = game.add.image(this.shadowX + 62, this.shadowY + 35, 'shadow1');
    else
      this.shadow = game.add.image(this.shadowX + 62, this.shadowY + 35, 'shadow2');
    this.shadow.anchor.setTo(0.5, 0.5);
    for (let i = 0; i < 6; i++)
      createNewTile(i);
    addScore(0);
    mainSound.stop();
    mainSound.isPlaying = false;
    gameSound.play();
    this.purescore=0;
  },
  update: function() {
    moveBG();
    if (this.purescore >= (this.stage) * 1500) {
      this.stage += 1;
      this.season += 1;
      if (this.season > 4)
        this.season = 1;
      if (this.patternRatioDefault > 0.75)
        this.patternRatioDefault -= 0.075;
    }
    if (this.jumpState > -3 && this.feverState==0)
      moveNewTile(-1);
    if (this.jumpState == 0 && this.feverState==0) {
      for (let i = 0; i < this.newTile.length; i++) {
        if (this.tileDir[i] == 1 && this.newTile[i].x < -144 ||
          this.tileDir[i] == -1 && this.newTile[i].x > 720) {
          this.holdTile[i] = true;
          this.isPattern1ing = false;
        }
      }
      if (isAllTileHeld()) {
        releasePattern1();
      }
    }

    if (this.jumpState == 0.5) {
      this.eTime += game.time.physicsElapsed* this.feverAddSpeed;
      if (this.eTime >= 4 / this.upAnimSpeed) {
        this.eTime = 0;
        this.jumpState = 1;
        changePlayerAnim('Fly', this.flyAnimSpeed* this.feverAddSpeed, false);
      }
    } else if (this.jumpState == 1) { //이동 1
      moveOthers(-this.oneTileX * game.time.physicsElapsed * this.jumpSpeed* this.feverAddSpeed, 0);
      this.eDis += this.oneTileX * game.time.physicsElapsed * this.jumpSpeed* this.feverAddSpeed;
      if (this.shadow.scale.x >= 0) {
        if (1 - this.eDis / (this.oneTileX / 2) >= 0)
          this.shadow.scale.setTo(1 - this.eDis / (this.oneTileX / 2));
        else
          this.shadow.scale.setTo(0);
      }
      if (this.eDis >= this.oneTileX) {
        moveOthers(this.eDis - this.oneTileX, 0);
        this.jumpState = 2;
        this.eDis = 0;
        if (getAccuracy() > 0.7)
          this.shadow.kill();
      }
    } else if (this.jumpState == -1) {
      this.eTime += game.time.physicsElapsed* this.feverAddSpeed;
      if (this.surprize.alpha > 0) {
        this.surprize.alpha -= game.time.physicsElapsed * 3* this.feverAddSpeed;
        if (this.surprize.alpha < 0) {
          this.surprize.alpha = 0;
          this.surprize.kill();
        }
      }
      if (this.eTime >= 0.4) {
        this.eTime = 0;
        this.jumpState = -2;
        this.player.anchor.setTo(0.5, 0.5);
        this.player.x += this.player.width / 2;
        this.player.y += this.player.height / 2;
        fallSound.play();
      }
    } else if (this.jumpState == -2) {
      if (this.player.x > this.tiles[this.tiles.length - 1].x || (this.player.x > this.tiles[this.tiles.length - 1].x + 20))
        game.world.bringToTop(this.tiles[this.tiles.length - 1]);
      this.player.y += 800 * game.time.physicsElapsed;
      this.player.angle -= game.time.physicsElapsed * 360 * 5;
      if (this.player.y > height + this.player.height / 2 + 800) {
        this.jumpState = -3;
      }
    } else if (this.jumpState == 2) {
      moveOthers(0, -this.oneTileY * game.time.physicsElapsed * this.jumpSpeed* this.feverAddSpeed);
      this.eDis += this.oneTileY * game.time.physicsElapsed * this.jumpSpeed* this.feverAddSpeed;
      if (this.shadow.scale.x <= 1) {
        if (this.shadow.alive && (this.eDis - this.oneTileY / 2) / (this.oneTileY / 2) >= 0) {
          this.shadow.scale.setTo((this.eDis - this.oneTileY / 2) / (this.oneTileY / 2));
          if ((this.eDis - this.oneTileY / 2) / (this.oneTileY / 2) >= 1)
            this.shadow.scale.setTo(1);
        }
      }
      if (this.eDis >= this.oneTileY) {
        moveOthers(0, this.eDis - this.oneTileY);
        this.eDis = 0;
        if (getAccuracy() > 0.7) {
          this.jumpState = -1;

          changePlayerAnim('Die', this.deathAnimSpeed, false);
          this.surprize.revive();
          this.surprize.alpha = 1;
          game.world.bringToTop(this.surprize);
          this.shadow.kill();
          gameSound.stop();
        } else {
          this.scoredBlocks++;
          changePlayerAnim('Down', this.downAnimSpeed, false);
          addCombo(1);
          this.gaugecombo++;
          let sc = 0;
          if (this.combo >= 2)
            sc += Math.floor(this.combo / 10 + 1) * 10;
          if (getAccuracy() < 0.3) {
            excellentSound.play();
            sc += 100;
            this.effectTextType = 1;
          } else {
            downSound.play();
            sc += 50;
            this.effectTextType = 2;
          }
          addScore(sc);
          if(this.feverState==0)
            this.purescore+=sc;
          activateEffects();
          this.jumpState = 3;
          if(this.gaugecombo>=5)  {
            this.gaugecombo=0;
            let g=AddImage(82+this.feverGauges.length*138,1090,'fevergauge');
            g.anchor.setTo(0.5);
            g.scale.setTo(0.3);
            this.feverGauges.push(g);

          }
        }
      }
    } else if (this.jumpState == 3) {
      this.eTime += game.time.physicsElapsed;
      this.moveX = this.tiles[this.tiles.length - 1].x - this.leadTileX;
      this.moveY = this.tiles[this.tiles.length - 1].y - this.leadTileY;

      if(this.feverState==0 && this.feverGauges.length>=5)  {
        moveOthers(-this.moveX, -this.moveY);
        createNewTile(this.newTile.length);
        this.jumpState = 0;
        startFever();
        return;
      }
      if (this.touchBuffer) {
        moveOthers(-this.moveX, -this.moveY);
        createNewTile(this.newTile.length);
        Jump();
        this.touchBuffer = false;
      }
      moveOthers(-this.moveX * game.time.physicsElapsed * 10, -this.moveY * game.time.physicsElapsed * 10);
      if (this.eTime >= 0.3) {
        this.eTime = 0;
        this.jumpState = 0;
        changePlayerAnim('Idle', this.idleAnimSpeed, true);
        moveOthers(-this.moveX, -this.moveY);
        createNewTile(this.newTile.length);
      }
    } else if (this.jumpState == -3) {
      this.overBG = AddImage(0, 0, 'bgOver');
      this.board = AddImage(108, 345, 'boardOver');
      this.allranking = AddImage(136, 515, 'allrankingOver');
      this.friendranking = AddImage(359, 515, 'friendrankingOver');
      this.lower = AddImage(138, 813, 'lowerOver');
      this.bar1 = AddImage(140, 611, 'bar1Over');
      this.bar2 = AddImage(140, 667, 'bar2Over');
      this.first = AddImage(155, 618, '1stOver');
      this.second = AddImage(155, 674, '2ndOver');
      this.third = AddImage(155, 730, '3rdOver');

      this.pauseButton = game.add.button(317, 933, 'restartOver', restartGame, this);
      this.bragButton = game.add.button(106, 933, 'bragOver', bragOver, this);
      this.jumpState = -4;
      this.unlockEffect = [];
      let highScore = Number(localStorage['TileJumpHighScore'] || '0');
      if (highScore < this.score) {
        this.best = AddImage(149, 337, 'bestOver');
        unlockCharacters(highScore);
        localStorage['TileJumpHighScore'] = this.score.toString();
      }
      overScore();
    } else if (this.jumpState == -4) {
      updateUnlock();
    }
    updateEffects();
    updateComboEffect();
    if(this.feverState==1)
      updateFever();
    if (this.jumpState >= 0)
      setRenderOrder();
  }
}
function startFever()  {
  document.getElementById("bd").style.backgroundColor = "#041b47";
  gameSound.stop();
  feverSound.play();

  GAME.feverState=1;
  GAME.feverBg=AddImage(0,0,'feverbg1');
  GAME.feverBg2=AddImage(0,0,'feverbg2');
  GAME.feverBg3=AddImage(0,0,'feverbg3');
  GAME.feverBg4=AddImage(0,0,'feverbg4');
  GAME.centerEffect=AddImage(128,428,'fevercentereffect');
  GAME.feverText=AddImage(152,119,'fevertext');

  GAME.feverFade=1;

  GAME.feverBg.alpha=0;
  GAME.feverBg2.alpha=0;
  GAME.feverBg3.alpha=0;
  GAME.feverBg4.alpha=0;
  GAME.centerEffect.alpha=0;
  GAME.feverbgToggle=0;
  GAME.feverToggleA=1;
  GAME.newTileAnswerX-=45/2;
  GAME.newTileAnswerY-=47/2;
  GAME.leadTileX-=45/2;
  GAME.leadTileY-=47/2;
  GAME.warncnt=0;
  GAME.feverText.anchor.setTo(0.5);
  GAME.feverText.x+=417/2;
  GAME.feverText.y+=60;
  GAME.feverText.scale.setTo(0.8);
  GAME.fevetTextProg=0;
  GAME.bgStars=[];
  GAME.feverFadeState=0;
  for(let i=GAME.newTile.length-1; i>=0; i--)  {
    GAME.newTile[i].kill();
    GAME.oldNewTiles.push(GAME.newTile.pop());
  }
  for(let i=0; i<8; i++) {
    let t=AddImage(GAME.newTileAnswerX+i*GAME.oneTileX,GAME.newTileAnswerY+i*GAME.oneTileY,'fevertile'+GAME.nextFeverTile)
     t.smoothed = true;
    GAME.newTile.push(t);
    UpdateNextFeverTile();
  }
  for(let i=0; i<width/150; i++)  {
    for(let j=0; j<height/150; j++) {
      let s=AddImage(i*150+20+Math.random()*110,j*150+20+Math.random()*110, 'feverstar'+Math.floor(Math.random()*4+1));
      s.alpha=0.3+Math.random*0.3;
      s.scale.setTo(Math.random()*0.5 + 0.5);

      GAME.bgStars.push(s);
    }
  }
  GAME.feverAddSpeed=2;
  GAME.feverETime=0;
  GAME.gaugeEffects=[];
  for(let i=0; i<5; i++)  {
    let g=AddImage(82+i*138,1090,'feverbareffect');
    g.anchor.setTo(0.5);
    GAME.gaugeEffects.push(g);
  }
}
function fadeFever()  {
  document.getElementById("bd").style.backgroundColor = "#6FCAFF";
  GAME.feverFade-=game.time.physicsElapsed;
  GAME.feverBg.alpha=GAME.feverFade;
  GAME.feverBg2.alpha=GAME.feverFade;
    GAME.feverBg4.alpha=GAME.feverFade;
    GAME.feverBg3.alpha=GAME.feverFade;
    GAME.centerEffect.alpha=GAME.feverFade;
    GAME.feverText.alpha=GAME.feverFade;
    for(let i=0; i<GAME.bgStars.length;i++) {
      GAME.bgStars[i].alpha=GAME.feverFade;
    }
      for(let i=0; i<5; i++)  {
        GAME.gaugeEffects[i].alpha=GAME.feverFade;
      }
    for(let i=0; i<GAME.feverGauges.length; i++)  {
      GAME.feverGauges[i].scale.setTo(GAME.feverFade);
    }
    for(let i=0; i<GAME.oldNewTiles.length; i++)  {
      if(!GAME.oldNewTiles[i].alive)
        GAME.oldNewTiles[i].revive();
      GAME.oldNewTiles[i].alpha=1-GAME.feverFade;
    }
  if(GAME.feverFade-game.time.physicsElapsed<=0) {

    if(GAME.feverETime>=6 && (GAME.jumpState==0 || GAME.jumpState==3)) {
      endFever();
    }
  }
}
function endFever() {
GAME.feverAddSpeed=1;
GAME.newTileAnswerX+=45/2;
GAME.newTileAnswerY+=47/2;
GAME.leadTileX+=45/2;
GAME.leadTileY+=47/2;
  GAME.moveX=0;
  GAME.moveY=0;
  GAME.jumpState=0;
  GAME.feverState=0;
  GAME.oldFeverTiles=[];
  GAME.feverBg.destroy();
    GAME.feverBg2.destroy();
    GAME.feverBg4.destroy();
    GAME.feverBg3.destroy();
    GAME.centerEffect.destroy();
    GAME.feverText.destroy();
      for(let i=0; i<5; i++)  {
        GAME.gaugeEffects[i].destroy();
      }
      for(let i=0; i<GAME.bgStars.length;i++) {
        GAME.bgStars[i].destroy();
      }
    for(let i=0; i<GAME.feverGauges.length; i++)  {
      GAME.feverGauges[i].destroy();
    }
    GAME.feverGauges=[];

    for(let i=GAME.newTile.length-1; i>=0; i--)  {
      GAME.newTile.pop().destroy();
    }
    GAME.newTile=[];
    for(let i=GAME.oldNewTiles.length-1; i>=0; i--)  {
      GAME.newTile.push(GAME.oldNewTiles.pop());
      GAME.newTile[GAME.newTile.length-1].revive();
    }
    for(let i=0; i<GAME.newTile.length; i++)  {
      GAME.newTile[i].alpha=1;
    }
    feverSound.stop();
    gameSound.play();
}
function UpdateNextFeverTile() {
  GAME.nextFeverTile++;
  if(GAME.nextFeverTile>3)
    GAME.nextFeverTile=1;
}
function updateFever()  {
  GAME.feverETime+=game.time.physicsElapsed;
if(GAME.feverbgToggle+GAME.feverToggleA*game.time.physicsElapsed>=1 || GAME.feverbgToggle+GAME.feverToggleA*game.time.physicsElapsed<=0)  {
  GAME.feverTextProg=0;
    GAME.feverToggleA*=-1;
}
  GAME.feverbgToggle+=GAME.feverToggleA*game.time.physicsElapsed;
  GAME.feverBg3.alpha=GAME.feverbgToggle;
GAME.feverBg4.alpha=1-GAME.feverbgToggle;
  if(GAME.feverBg.alpha<1)  {
    GAME.feverBg.alpha+=game.time.physicsElapsed*3;
    GAME.feverBg3.alpha=game.time.physicsElapsed*3;
    GAME.feverBg4.alpha=game.time.physicsElapsed*3;
    if(GAME.feverBg.alpha>1)  {
      GAME.feverBg.alpha=1;
      GAME.feverBg3.alpha=1;
      GAME.feverBg4.alpha=1;
    }
  }
  if(GAME.feverTextProg==0)  {
    GAME.feverText.scale.setTo(GAME.feverText.scale.x+game.time.physicsElapsed);
    if(GAME.feverText.scale.x>=1) {
      GAME.feverText.scale.setTo(1);
      GAME.feverTextProg=1;
    }
  } else if(GAME.feverTextProg==1)  {
    GAME.feverText.scale.setTo(GAME.feverText.scale.x-game.time.physicsElapsed/5);
  }

  GAME.centerEffect.alpha=0;
  for(let i=0; i<5; i++)  {
    GAME.gaugeEffects[i].rotation+=game.time.physicsElapsed;
  }
  if(GAME.feverETime>=5-3 && GAME.warncnt<=3)  {
    if(GAME.feverBg2.alpha-game.time.physicsElapsed <=0)  {
      GAME.feverBg2.alpha+=1;
      GAME.warncnt++;
      if(GAME.warncnt==4) {
        GAME.feverBg2.kill();
      }
    }
      GAME.feverBg2.alpha-=game.time.physicsElapsed;
    }
  if(GAME.feverETime>=5)  {
    fadeFever();
  }
}
function renderFeverBG()  {
  if(GAME.feverState==0)
  return;
  game.world.bringToTop(GAME.feverBg);
  for(let i=0; i<GAME.bgStars.length; i++)
  game.world.bringToTop(GAME.bgStars[i]);
  game.world.bringToTop(GAME.feverBg2);
      game.world.bringToTop(GAME.feverBg3);
        game.world.bringToTop(GAME.feverBg4);
}
function renderFeverUI()  {

  if(GAME.feverState==1)  {
    game.world.bringToTop(GAME.feverText);
      for(let i=0; i<5; i++)  {
        game.world.bringToTop(GAME.gaugeEffects[i]);
      }
        game.world.bringToTop(GAME.centerEffect);
    }
}
function unlockCharacters(highScore) {
  for (let i = 5; i >= 0; i--) {
    if (highScore < charlockCond[i] && charlockCond[i] <= GAME.score) {
      console.log(i);
      GAME.unlockEffect.push(AddImage(108, 30, 'unlock' + (i)));
    }
  }
}

function updateUnlock() {
  if (GAME.unlockEffect.length == 0)
    return;
  GAME.eTime += game.time.physicsElapsed;
  if (GAME.eTime >= 1) {
    if (GAME.unlockEffect[GAME.unlockEffect.length - 1].alpha - game.time.physicsElapsed <= 0.1) {
      GAME.unlockEffect[GAME.unlockEffect.length - 1].destroy();
      GAME.unlockEffect.pop();
      GAME.eTime = 0;
      return;
    }
    GAME.unlockEffect[GAME.unlockEffect.length - 1].alpha -= game.time.physicsElapsed;
    GAME.unlockEffect[GAME.unlockEffect.length - 1].y -= game.time.physicsElapsed * 30;
  }
}

function listNumOver(num, x, y) {
  let nums = num.toString();
  //let x=_x-nums.length*
  TITLE.numList.push([]);
  let comnum = (nums.length - 1) / 3;
  for (let i = 0; i < nums.length; i++) {
    TITLE.numList[TITLE.numList.length - 1].push(
      TITLE.add.image(x - ((nums.length - i) * 16 + comnum * 7), y, 'main' + nums[i]));
    if ((nums.length - i) % 3 == 1 && i != nums.length - 1) {
      comnum--;
      TITLE.numList[TITLE.numList.length - 1].push(
        TITLE.add.image(x - ((nums.length - i) * 16 + (comnum - 1) * 7 - 1), y + 4, 'main,'));
    }
  }
}

function isAllTileHeld() {
  for (let i = 0; i < GAME.newTile.length; i++) {
    if (GAME.holdTile[i] == false)
      return false;
  }
  return true;
}

function releasePattern1() {
  GAME.combo = 0;
  GAME.gaugecombo=0;

  for (let i = 0; i < GAME.newTile.length; i++) {
    resetNewTile(i);
    let r = (Math.random()) / 3 * 2;
    GAME.patternRatio = r + GAME.patternRatioDefault;
    if (GAME.tileDir[i] == -1) {
      GAME.newTile[i].x += -72 * (0 + GAME.patternRatio) * i;
      GAME.newTile[i].y += 42 * (0 + GAME.patternRatio) * i;
    } else {
      GAME.newTile[i].x += 72 * (2 + GAME.patternRatio) * i;
      GAME.newTile[i].y += -(2 + GAME.patternRatio) * 42 * i;
    }
    GAME.holdTile[i] = false;
  }
  GAME.isPattern1ing = true;
}

function addScore(n) {
  GAME.score += n;
  let x = 360.0;
  let y = 20;
  let k = GAME.score.toString();
  for (let i = 0; i < GAME.scoreImages.length; i++)
    GAME.scoreImages[i].destroy();
  GAME.scoreImages = [];
  x -= k.length / 2.0 * 50;
  //x=200;
  for (let i = 0; i < k.length; i++) {
    GAME.scoreImages.push(AddImage(x + (i * 50), y, 'num' + k[i]));
  }
}

function overScore() {
  let x = width / 2;
  let y = 429;
  let k = GAME.score.toString();
  GAME.overscoreImages = [];
  x -= k.length / 2 * 51;
  //x=200;
  for (let i = 0; i < k.length; i++) {
    GAME.overscoreImages.push(AddImage(x + (i * 51), y, 'overnum' + k[i]));
  }
}

function addCombo(n) {
  GAME.combo += n;
  if (GAME.combo < 2)
    return;
  let x = width / 2+10;
  let y = 300+40;
  let k = GAME.combo.toString();
  for (let i = 0; i < GAME.comboImages.length; i++)
    GAME.comboImages[i].destroy();
  GAME.comboImages = [];
  x -= Math.floor(k.length / 2) * 35 + 164 / 2;
  for (let i = 0; i < k.length; i++) {
    GAME.comboImages.push(AddImage(x + (i * 35), y, 'combonum' + k[i]));
    GAME.comboImages[i].anchor.setTo(0.5, 0.5);
  }
  GAME.comboImages.push(AddImage(x + ((k.length) * 35 + 164 / 2 - 10), y, 'comboText'));
  GAME.comboImages[k.length].anchor.setTo(0.5, 0.5);
  GAME.comboEffectProgress = 0;
  let len = GAME.comboImages.length;

  x = width / 2 + 20; //28*36
  y = 300 - 50+40;
  let bonus = Math.floor(GAME.combo / 10 + 1) * 10;
  k = '';
  k = bonus.toString();
  x -= Math.floor(k.length / 2) * 14 + 28 / 2;
  for (let i = 0; i < k.length; i++) {
    GAME.comboImages.push(AddImage(x + (i * 28), y, 'bonus' + k[i]));
    GAME.comboImages[len + i].anchor.setTo(0.5, 0.5);
  }
  GAME.comboImages.push(AddImage(x - ((k.length) * 14 + 28 / 2 - 10), y, 'bonus+'));
  GAME.comboImages[GAME.comboImages.length - 1].anchor.setTo(0.5, 0.5);
  GAME.comboEffectProgress = 0;
}

function updateComboEffect() {
  if (GAME.comboImages.length > 0) {
    GAME.comboEffectProgress += game.time.physicsElapsed;
    for (let i = 0; i < GAME.comboImages.length; i++) {
      let s = GAME.comboEffectProgress * 5;
      if (s >= 1) s = 1; {
        GAME.comboImages[i].scale.setTo(s);
        GAME.comboImages[i].alpha = 1 - (GAME.comboEffectProgress - 1 / 5);
      }
      GAME.comboImages[i].y -= game.time.physicsElapsed * 30;
    }
    if (GAME.comboEffectProgress >= 1) {
      for (let i = 0; i < GAME.comboImages.length; i++) {
        GAME.comboImages[i].destroy();
      }
      GAME.comboImages = [];
      GAME.comboEffectProgress = 0;
    }
  }
}

function resetNewTile(i) {
  let a = 6;
  GAME.tileDir[i] = 1;
  if (Math.random() >= 0.5) {
    a = -6;
    GAME.tileDir[i] = -1;
  }
  GAME.newTile[i].x = GAME.newTileAnswerX + GAME.oneTileX * a;
  GAME.newTile[i].y = GAME.newTileAnswerY + GAME.oneTileY * -a + GAME.oneTileY * i * 2;
  GAME.tileSpeed[i] = GAME.defaultTileSpeed;
  GAME.holdTile[i] = true;
  GAME.tileMoved[i] = 0;
}

function createNewTile(i) {
  if(GAME.feverState==1)  {
    GAME.newTile.push(AddImage(GAME.newTileAnswerX+i*GAME.oneTileX,GAME.newTileAnswerY+i*GAME.oneTileY,'fevertile'+GAME.nextFeverTile));
    UpdateNextFeverTile();
    return;
  }
  GAME.tileDir.push(0);
  GAME.tileSpeed.push(0);
  GAME.holdTile.push(true);
  GAME.tileMoved.push(0);
  GAME.newTile.push(GAME.add.image(-200, -200, '' + GAME.seasonText[GAME.season] + Math.floor(Math.random() * 3 + 1)));
  GAME.tileType[i] = GAME.season;
  resetNewTile(i);
  let tt;
  if (GAME.isPattern1ing) {
    let r = (Math.random()) / 3 * 2;
    GAME.patternRatio = r + GAME.patternRatioDefault;
    if (GAME.tileDir[i] == -1 && GAME.tileDir[i - 1] == -1) {
      GAME.newTile[i].x = GAME.newTile[i - 1].x - GAME.patternRatio * 72;
      GAME.newTile[i].y = GAME.newTile[i - 1].y + 42 * 2 + GAME.patternRatio * 42;
      tt = 0;
    } else if (GAME.tileDir[i] == 1 && GAME.tileDir[i - 1] == 1) {
      GAME.newTile[i].x = GAME.newTile[i - 1].x + 72 * 2 + GAME.patternRatio * 72;
      GAME.newTile[i].y = GAME.newTile[i - 1].y - GAME.patternRatio * 42;
      tt = 0;
    } else if (GAME.tileDir[i] == 1 && GAME.tileDir[i - 1] == -1) {
      GAME.newTile[i].x = 2 * (GAME.newTileAnswerX + 72 * (i - 1)) - GAME.newTile[i - 1].x + 72 * 2 + GAME.patternRatio * 72;
      GAME.newTile[i].y = 2 * (GAME.newTileAnswerY + 42 * (i - 1)) - GAME.newTile[i - 1].y - GAME.patternRatio * 42;
      tt = 1;
    } else {
      GAME.newTile[i].x = 2 * (GAME.newTileAnswerX + 72 * (i - 1)) - GAME.newTile[i - 1].x - GAME.patternRatio * 72;
      GAME.newTile[i].y = 2 * (GAME.newTileAnswerY + 42 * (i - 1)) - GAME.newTile[i - 1].y + 42 * 2 + GAME.patternRatio * 42;
      tt = -1;
    }
    GAME.holdTile[i] = false;
    GAME.tileMoved[i] = GAME.tileMoved[i - 1];

  }
}

function moveNewTile(n) {
  for (let i = 0; i < GAME.newTile.length; i++) {
    if (i != n) {
      if (!GAME.holdTile[i]) {
        GAME.newTile[i].x += -GAME.oneTileX * game.time.physicsElapsed * GAME.tileSpeed[i] * GAME.tileDir[i];
        GAME.newTile[i].y += GAME.oneTileY * game.time.physicsElapsed * GAME.tileSpeed[i] * GAME.tileDir[i];
        GAME.tileMoved[i] += game.time.physicsElapsed;
      }
    }
  }
}

function moveOthers(x, y) {
  for (let i = 0; i < GAME.tiles.length; i++) {
    GAME.tiles[i].x += x;
    GAME.tiles[i].y += y;
  }
  for (let i = 0; i < GAME.newTile.length; i++) {
    GAME.newTile[i].x += x;
    GAME.newTile[i].y += y;
  }
  moveArray(x,y,GAME.charEffects);
  moveArray(x,y,GAME.ringEffects);
  //moveArray(x,y,GAME.textEffects);
  moveArray(x,y,GAME.stars);
}
function moveArray(x,y,arr) {
  for(let i=0; i<arr.length; i++) {
    arr[i].x+=x;
    arr[i].y+=y;
  }
}

function pushNewTile(x, y) {
  GAME.newTile[0].alpha=1;
  GAME.tiles.push(GAME.newTile[0]);
  getRidOfNewTile(0);
  delIfOverTail();
}

function destroyNewTile(i) {
  GAME.newTile[i].destroy();
  getRidOfNewTile(i);
}

function getRidOfNewTile(i) {
  GAME.newTile.splice(i, 1);
  if(GAME.feverState==1)
  return;
  GAME.tileSpeed.splice(i, 1);
  GAME.tileDir.splice(i, 1);
  GAME.tileType.splice(i, 1);
  GAME.holdTile.splice(i, 1);
  GAME.tileMoved.splice(i, 1);
}

function delIfOverTail() {
  if (GAME.tiles.length == GAME.tailLength + 1) {
    GAME.tiles[0].destroy();
    GAME.tiles.splice(0, 1);
  }
}

function pauseOnClick() {
  if (game.paused) {
    game.paused = false;
    GAME.pauseButton.revive();
    GAME.pauseBG.kill();
    GAME.resumeButton.kill();
  } else {
    GAME.pauseBG.revive();
    game.world.bringToTop(GAME.pauseBG);
    GAME.pauseButton.kill();
    GAME.resumeButton.revive();
    game.world.bringToTop(GAME.resumeButton);
    game.paused = true;
  }

}

function itemTouched(pointer) {
  if (!(game.input.x > width - 40 - GAME.pauseButton.width && game.input.y < 40 + GAME.pauseButton.height) &&
    game.paused == false) {
    if (GAME.jumpState == 0 || GAME.jumpState == 3) {
      if (GAME.jumpState == 3) {

        moveOthers(-(GAME.tiles[GAME.tiles.length - 1].x - GAME.leadTileX), -(GAME.tiles[GAME.tiles.length - 1].y - GAME.leadTileY));
        createNewTile(GAME.newTile.length);
      }
      Jump();
    } else if (GAME.jumpState == 2) {
      GAME.touchBuffer = true;
    }
  }
}

function Jump() {
    jumpSound.play();
    changePlayerAnim('Up', GAME.upAnimSpeed, false);
    GAME.jumpState = 0.5;
    pushNewTile(GAME.newTile[0].x, GAME.newTile[0].y);

    game.world.bringToTop(GAME.player);
}

function changePlayerAnim(key, speed, loop) {
  GAME.player.loadTexture(GAME.characterString + key, 0);
  GAME.player.animations.play(key, speed, loop);
}

function getAccuracy() {
  let x = GAME.leadTileX - GAME.tiles[GAME.tiles.length - 1].x;
  let y = GAME.leadTileY - GAME.tiles[GAME.tiles.length - 1].y;
  return abs(x / 72);
}

function pushTile(x, y, key) {
  for (let i = 0; i < GAME.tiles.length; i++) {
    GAME.tiles[i].x -= GAME.oneTileX;
    GAME.tiles[i].y -= GAME.oneTileY;
  }
  GAME.tiles.push(AddImage(GAME.leadTileX + x, GAME.leadTileY + y, key));

  delIfOverTail();
}

function change2BG() {
  GAME.bg2.alpha = GAME.bgAlpha;
  GAME.bgAlpha += game.time.physicsElapsed / 3;
  if (GAME.bgAlpha >= 1) {
    GAME.bgType = 1;
    GAME.bg2.alpha = 1;
    GAME.bgAlpha = 0;
  }
}

function change3BG() {
  GAME.bg3.alpha = GAME.bgAlpha;
  GAME.bgAlpha += game.time.physicsElapsed / 3;
  if (GAME.bgAlpha >= 1) {
    GAME.bgType = 2;
    GAME.bg3.alpha = 1;
  }
}

function AddImage(x, y, key) {
  let i = GAME.add.image(x, y, key);
  //i.scale.setTo(2,2);
  return i;
}

function abs(x) {
  if (x < 0)
    return -x;
  return x;
}

function setRenderOrder() {
  for (let i = 0; i < GAME.clouds.length; i++) {
    for (let j = 0; j < GAME.clouds[i].length; j++) {
      game.world.bringToTop(GAME.clouds[i][j]);
    }
  }
  renderFeverBG();
  for (let i = 0; i < GAME.tiles.length; i++)
    game.world.bringToTop(GAME.tiles[i]);

  for (let i = 0; i < GAME.newTile.length; i++)
    game.world.bringToTop(GAME.newTile[i]);
  if(GAME.feverState==1)  {
    for(let i=0; i<GAME.oldNewTiles.length; i++)
    game.world.bringToTop(GAME.oldNewTiles[i]);
  }
  game.world.bringToTop(GAME.shadow);
  for (let i = 0; i < GAME.scoreImages.length; i++)
    game.world.bringToTop(GAME.scoreImages[i]);
  for (let i = 0; i < GAME.textEffects.length; i++) {
    game.world.bringToTop(GAME.textEffects[i]);
  }

  for (let i = 0; i < GAME.ringEffects.length; i++) {
    game.world.bringToTop(GAME.ringEffects[i]);
  }
    for (let i = 0; i < GAME.stars.length; i++) {
      if(GAME.starDir[i]>=Math.PI*1.2 && GAME.starDir[i]<=Math.PI*1.8)
        game.world.bringToTop(GAME.stars[i]);
    }
  game.world.bringToTop(GAME.player);

  for (let i = 0; i < GAME.charEffects.length; i++) {
    game.world.bringToTop(GAME.charEffects[i]);
  }
  game.world.bringToTop(GAME.surprize);

  for (let i = 0; i < GAME.stars.length; i++) {
    if(!(GAME.starDir[i]>=Math.PI*1.2 && GAME.starDir[i]<=Math.PI*1.8))
      game.world.bringToTop(GAME.stars[i]);
  }
  for(let i=0; i<GAME.comboImages.length;i++) {
    game.world.bringToTop(GAME.comboImages[i]);
  }
  for(let i=0; i<GAME.feverBars.length;i++) {
    game.world.bringToTop(GAME.feverBars[i]);
  }
    renderFeverUI();
  for(let i=0; i<GAME.feverGauges.length;i++) {
    game.world.bringToTop(GAME.feverGauges[i]);
  }


}

function createClouds() {
  GAME.clouds.push(AddImage(-150, 50, 'cloud0'));
  GAME.clouds.push(AddImage(220, 450, 'cloud1'));
  GAME.clouds.push(AddImage(-20, 680, 'cloud2'));
  GAME.clouds.push(AddImage(450, 800, 'cloud3'));
  GAME.clouds.push(AddImage(-150, 1050, 'cloud4'));
  GAME.clouds.push(AddImage(360, 270, 'cloud5'));
  GAME.clouds.push(AddImage(430, 90, 'cloud6'));
  for (let i = 0; i < GAME.clouds.length; i++) {
    GAME.clouds[i].alpha = Math.random() * 0.7 + 0.3;
  }
}

function moveBG() {
  let l = GAME.clouds.length;
  for (let i = 0; i < GAME.clouds.length; i++) {
    GAME.clouds[i].x -= game.time.physicsElapsed * GAME.oneTileX * GAME.cloudSpeed;
    GAME.clouds[i].y -= game.time.physicsElapsed * GAME.oneTileY * GAME.cloudSpeed;
    if (GAME.clouds[i].x + GAME.clouds[i].width < 0) {
      if (Math.random() >= 0.25) {
        GAME.clouds[i].x = width;
        GAME.clouds[i].y = (Math.random()) * height;
      } else {
        GAME.clouds[i].x = (Math.random() / 2 + 0.5) * width;
        GAME.clouds[i].y = height;
      }
      GAME.clouds[i].alpha = Math.random() * 0.7 + 0.3;

    }
  }

}

function restartGame() {
  clickSound.play();
  game.state.start('titlest');
}

function activateEffects() {
  if (GAME.effectTextType == 1) {
    let ce = AddImage(GAME.player.x, GAME.player.y, GAME.characterString + 'Effect');
    ce.anchor.setTo(0.5);
    ce.tint = 0xBBFA66;
    ce.x+=GAME.player.width/2;
    ce.y+=GAME.player.height/2;
    GAME.charEffects.push(ce);
    let re = AddImage(GAME.player.x, GAME.player.y + 190, 'exring');
    re.anchor.setTo(0.5);
    re.scale.setTo(0.5);
    re.x+=GAME.player.width/2;
    GAME.ringEffects.push(re);
    let te = AddImage(GAME.player.x + GAME.player.width / 2, GAME.player.y + 10, 'excellent');
    te.anchor.setTo(0.5);
    GAME.textEffects.push(te);
    for (let i = 0; i < 7; i++) {
      let nStar = AddImage(GAME.playerDX + 95, GAME.playerDY + 120, 'star' + (Math.floor(Math.random() * 5) + 1))
      nStar.anchor.setTo(0.5);
      GAME.stars.push(nStar);
      GAME.starDir.push(Math.random() * 2 * Math.PI);
      GAME.starProg.push(0);
    }
  } else if (GAME.effectTextType == 2) {
    let ce = AddImage(GAME.player.x, GAME.player.y, GAME.characterString + 'Effect');
    ce.anchor.setTo(0.5);
    ce.tint = 0xF9B468;
    ce.x+=GAME.player.width/2;
    ce.y+=GAME.player.height/2;
    GAME.charEffects.push(ce);
    let re = AddImage(GAME.player.x, GAME.player.y + 190, 'ringEffect');
    re.tint = 0xF9B468;
    re.x+=GAME.player.width/2;
    re.anchor.setTo(0.5);
    re.scale.setTo(0.8);
    GAME.ringEffects.push(re);
    let te = AddImage(GAME.player.x + GAME.player.width / 2, GAME.player.y + 10, 'great');
    te.anchor.setTo(0.5);
    GAME.textEffects.push(te);
  }
}

function updateEffects(type) {
  for(let i=0; i<GAME.feverGauges.length; i++) {
    if(GAME.feverGauges[i].scale.x<1) {
      GAME.feverGauges[i].scale.setTo(GAME.feverGauges[i].scale.x+game.time.physicsElapsed*6);
      if(GAME.feverGauges[i].scale.x>1) {
        GAME.feverGauges[i].scale.setTo(1);
      }
    }
  }
  for (let i = 0; i < GAME.textEffects.length; i++) {
    GAME.textEffects[i].alpha -= game.time.physicsElapsed * 3;
    GAME.textEffects[i].y -= game.time.physicsElapsed * 70;
    if (GAME.textEffects[i].alpha - game.time.physicsElapsed * 2 <= 0) {
      GAME.textEffects[i].destroy();
      GAME.textEffects.splice(i, 1);
    }
  }
    for (let i = 0; i < GAME.charEffects.length; i++) {
      GAME.charEffects[i].alpha -= game.time.physicsElapsed * 4;
      GAME.charEffects[i].scale.setTo(GAME.charEffects[i].scale.x + game.time.physicsElapsed * 5);
      if (GAME.charEffects[i].alpha - game.time.physicsElapsed * 4 <= 0) {
        GAME.charEffects[i].destroy();
        GAME.charEffects.splice(i, 1);
      }
    }
    for (let i = 0; i < GAME.ringEffects.length; i++) {
      if(GAME.ringEffects[i].scale.x<1.2)
        GAME.ringEffects[i].scale.setTo(GAME.ringEffects[i].scale.x + game.time.physicsElapsed * 3);
      if (GAME.ringEffects[i].scale.x>=1.2) {
        GAME.ringEffects[i].alpha -= game.time.physicsElapsed * 3;
        if(GAME.ringEffects[i].alpha-game.time.physicsElapsed * 3<=0) {
        GAME.ringEffects[i].destroy();
        GAME.ringEffects.splice(i, 1);
      }
      }
    }
    for (let i = 0; i < GAME.stars.length; i++) {
      GAME.starProg[i] += game.time.physicsElapsed;
      if (GAME.starProg[i] <= 0.2) {
        GAME.stars[i].x += game.time.physicsElapsed * 500 * Math.cos(GAME.starDir[i]);
        GAME.stars[i].y += game.time.physicsElapsed * 250 * Math.sin(GAME.starDir[i]);
        if (GAME.starDir[i] >= Math.PI * 0.5 && GAME.starDir[i] <= Math.PI * 1.5)
          GAME.stars[i].rotation += game.time.physicsElapsed * 360;
        else
          GAME.stars[i].rotation -= game.time.physicsElapsed * 360;
      } else if (GAME.starProg[i] <= 0.7) {
        GAME.stars[i].x += game.time.physicsElapsed * 80 * Math.cos(GAME.starDir[i]);
        GAME.stars[i].y += game.time.physicsElapsed * 60 * Math.sin(GAME.starDir[i]);
        if (GAME.starDir[i] >= Math.PI * 0.5 && GAME.starDir[i] <= Math.PI * 1.5)
          GAME.stars[i].rotation += game.time.physicsElapsed * 3;
        else
          GAME.stars[i].rotation -= game.time.physicsElapsed * 3;
        GAME.stars[i].alpha -= game.time.physicsElapsed * 2;
      } else {
        GAME.stars[i].destroy();
        GAME.stars.splice(i, 1);
        GAME.starDir.splice(i, 1);
        GAME.starProg.splice(i, 1);
      }
    }
  }
  game.state.add('loadloadst', LOADLOAD)

  game.state.add('loadst', LOAD)
  game.state.add('titlest', TITLE);
  game.state.add('creditst', CREDIT);
  game.state.add('helpst', HELP);
  game.state.add('charselectst', CHARSELECT);
  game.state.add('gamest', GAME);

  game.state.start('loadloadst');
