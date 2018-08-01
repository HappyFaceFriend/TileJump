
var clientWidth = function () {
  return Math.max(window.innerWidth, document.documentElement.clientWidth);
};
var clientHeight = function () {
  return Math.max(window.innerHeight, document.documentElement.clientHeight);
};
var height=1180;
var width=720;
var tabSize=90;
var game =new Phaser.Game(width,height,Phaser.CANVAS, 'ld29', null, false, false);

var charId=0;

var charLock=[true,true,true,true,true,true];

var LOAD={
    preload:  function(){
      game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    game.scale.refresh();
      game.load.image('background','assets/bg.png');
        game.load.image('background2','assets/bg2.jpg');
      game.load.image('background3','assets/bg3.jpg');

      this.charList=['owl','fox','cat','chip','ck','dog'];
      for(i=0; i<this.charList.length; i++) {
        let s=this.charList[i];
        game.load.image(s+'Effect','assets/characters/'+s+'effect.png',170,170,1);
        game.load.spritesheet(s+'Idle','assets/characters/'+s+'idle.png',170, 170, 10);
        game.load.spritesheet(s+'Up','assets/characters/'+s+'1.png',170, 170, 4);
        game.load.spritesheet(s+'Down','assets/characters/'+s+'2.png',170, 170, 4);
        game.load.spritesheet(s+'Die','assets/characters/'+s+'death.png',170, 170, 7);
        game.load.spritesheet(s+'Fly','assets/characters/'+s+'fly.png',170,170,12);
      }
      game.load.image('cloud0','assets/cloud/0.png');
      game.load.image('cloud1','assets/cloud/1.png');
      game.load.image('cloud2','assets/cloud/2.png');
      game.load.image('cloud3','assets/cloud/3.png');
      game.load.image('cloud4','assets/cloud/4.png');
      game.load.image('cloud5','assets/cloud/5.png');
      game.load.image('cloud6','assets/cloud/6.png');
      game.load.image('great','assets/great.png');
      game.load.image('excellent','assets/excellent.png');
      for(i=0; i<10; i++)
      game.load.image('num'+i,'assets/number/'+i+'.png');
      game.load.spritesheet('trap','assets/trapsprite.png',180,180,20);
      game.load.image('surprize','assets/surprize.png');

      game.load.image('spring1','assets/spring/1.png');
      game.load.image('spring2','assets/spring/2.png');
      game.load.image('spring3','assets/spring/3.png');
      game.load.image('summer1','assets/summer/1.png');
      game.load.image('summer2','assets/summer/2.png');
      game.load.image('summer3','assets/summer/3.png');
      game.load.image('fall1','assets/fall/1.png');
      game.load.image('fall2','assets/fall/2.png');
      game.load.image('fall3','assets/fall/3.png');
      game.load.image('winter1','assets/winter/1.png');
      game.load.image('winter2','assets/winter/2.png');
      game.load.image('winter3','assets/winter/3.png');


      game.load.image('ringEffect','assets/effect.png');

      game.load.image('pauseBg','assets/pauseBg.png');
      game.load.image('pauseButton','assets/pause.png');
      game.load.image('restartButton','assets/restart.png');

      game.load.image('startButtonMain','assets/main/start.png')
      game.load.image('bgMain','assets/main/bg.png');
      game.load.image('boardMain','assets/main/board.png');
      game.load.image('creditMain','assets/main/credit.png');
      game.load.image('helpMain','assets/main/help.png');
      game.load.image('logoMain','assets/main/logo.png');
      game.load.image('logobgMain','assets/main/logobg.png');
      game.load.image('menuMain','assets/main/menu.png');
      game.load.image('patternMain','assets/main/pattern.png');
      game.load.image('soundOffMain','assets/main/soundoff.png');
      game.load.image('soundOnMain','assets/main/soundon.png');
      game.load.image('tileMain','assets/main/tile.png');
      game.load.image('rankingStartMain','assets/main/rankingstart.png');

      game.load.image('startButtonSelect','assets/select/gamestart.png')

      game.load.image('1on','assets/select/1on.png');
      for(let i=2; i<=6; i++) {
        game.load.image(''+i+'on','assets/select/'+i+'on.png');
        game.load.image(''+i+'off','assets/select/'+i+'off.png');
      }
      game.load.image('textSelect','assets/select/text.png');

      game.load.image('bgOver','assets/over/bg.png');
      game.load.image('restartOver','assets/over/re.png');
      game.load.image('1stOver','assets/over/1st.png');
      game.load.image('2ndOver','assets/over/2nd.png');
      game.load.image('3rdOver','assets/over/3rd.png');
      game.load.image('allrankingOver','assets/over/allranking.png');
      game.load.image('bar1Over','assets/over/bar1.png');
      game.load.image('bar2Over','assets/over/bar2.png');
      game.load.image('bestOver','assets/over/best.png');
      game.load.image('boardOver','assets/over/board.png');
      game.load.image('bragOver','assets/over/brag.png');
      game.load.image('friendrankingOver','assets/over/friendranking.png');
      game.load.image('lowerOver','assets/over/lower.png');

      game.load.image('closeButton','assets/help/close.png');
      game.load.image('textHelp','assets/help/text.png');
      game.load.image('textCredit','assets/credit/text.png');

    },
    create:   function(){
      game.state.start('titlest');
    },
    update: function(){}
};
var patternSpeed=40;
function movePattern(p1,p2) {
  p1.x+=patternSpeed*game.time.physicsElapsed;
  p2.x+=patternSpeed*game.time.physicsElapsed;
  if(p1.x>p1.width)
    p1.x-=p1.width*2;
  if(p2.x>p1.width)
    p2.x-=p1.width*2;
}
var TITLE={
    preload:  function(){},
    create:   function(){
      this.bg=game.add.image(0,0,'bgMain');
      this.pattern1=game.add.image(0,0,'patternMain');
      this.pattern2=game.add.image(this.pattern1.width,0,'patternMain');
      this.startButton=game.add.button(49,1109-tabSize,'startButtonMain', startOnClilckMain, this);
      this.helpButton=game.add.button(32,164-40-tabSize,'helpMain', helpOnClickMain, this);
      this.creditButton=game.add.button(122,164-40-tabSize,'creditMain', creditOnClickMain, this);
      this.soundButton=game.add.button(width-110,164-40-tabSize,'soundOnMain',soundOnClickMain,this);
      this.rankingButton=game.add.button(368,1109-tabSize,'rankingStartMain', rankingOnClickMain, this);
      this.board=game.add.image(0,0-tabSize,'boardMain');
      this.tile=game.add.image(53,571-tabSize,'tileMain');
      this.logobg=game.add.image(85,141-tabSize+50,'logobgMain');
      this.logo=game.add.image(108,161-tabSize+50,'logoMain');

      this.logoMove=50;
      this.ceta=0;
      this.moveSpeed=Math.PI*0.7;
    },
    update: function(){
      movePattern(this.pattern1,this.pattern2);
      this.logo.y=161-tabSize+50+this.logoMove*(Math.sin(this.ceta))/2;
      this.ceta+=this.moveSpeed*game.time.physicsElapsed;
    }
};
function startOnClilckMain(){
  game.state.start('charselectst');
}
function helpOnClickMain(){
  game.state.start('helpst');
}
function rankingOnClickMain(){
}
function soundOnClickMain(){
}
function creditOnClickMain(){
  game.state.start('creditst');
}
var CHARSELECT={
    preload:  function(){},
    create:   function(){
      this.dy=tabSize;
      this.bg=game.add.image(0,-this.dy,'bgMain');
      this.pattern1=game.add.image(0,0,'patternMain');
      this.pattern2=game.add.image(this.pattern1.width,0,'patternMain');
      this.startButton=game.add.button(217,1112-tabSize,'startButtonSelect', startOnClilckSelect, this);

      this.selectButtons=[];
      for(let i=1; i<=6; i++) {
        if(charLock[i-1]) {
          let idx=i;
          this.selectButtons.push(game.add.button(13+236*((i-1)%3),244+336*Math.round((i-2)/3)-this.dy,''+i+'on',selBut(i-1),this));
        } else {
          let idx=i;
          this.selectButtons.push(game.add.button(13+236*((i-1)%3),244+336*Math.round((i-2)/3)-this.dy,''+i+'off',notBut,this));
        }
      }
      this.bg=game.add.image(43,167-this.dy,'textSelect');
    },
    update: function(){
      movePattern(this.pattern1,this.pattern2);
    }
};
function notBut() {

}
var selBut=function(id) {
  return function(){
    charId=id;
  }
}


function startOnClilckSelect(){
  game.state.start('gamest');
}
function getCharId()  {
  return charId;
}
function closeOnClick() {
  game.state.start('titlest');
}

var HELP={
    preload:  function(){},
    create:   function(){
      this.dy=tabSize;
      this.bg=game.add.image(0,-this.dy,'bgMain');
      this.pattern1=game.add.image(0,0,'patternMain');
      this.pattern2=game.add.image(this.pattern1.width,0,'patternMain');
      this.closeButton=game.add.button(32,164-40-tabSize,'closeButton', closeOnClick, this);
      this.text=game.add.image(50,146-tabSize,'textHelp');
      this.text.scale.setTo(0.85,0.85);
    },
    update: function(){
      movePattern(this.pattern1,this.pattern2);
    }
};
var CREDIT={
    preload:  function(){},
    create:   function(){
      this.dy=tabSize;
      this.bg=game.add.image(0,-this.dy,'bgMain');
      this.pattern1=game.add.image(0,0,'patternMain');
      this.pattern2=game.add.image(this.pattern1.width,0,'patternMain');
      this.closeButton=game.add.button(32,164-40-tabSize,'closeButton', closeOnClick, this);
      this.text=game.add.image(150,176-tabSize,'textCredit');
    },
    update: function(){
      movePattern(this.pattern1,this.pattern2);
    }
};

var GAME={
  preload:  function(){
  },
  create:   function(){
        this.charList=['owl','fox','cat','dog','chip','ck'];
    this.gameState=0;
    //this.bg=AddImage(0,0,'background');
    this.bg=AddImage(0,0,'background');
    this.pauseBG=AddImage(0,0,'pauseBg');
    this.pauseBG.kill();

    this.pauseButton = game.add.button(width-40,40, 'pauseButton', pauseOnClick, this);
    this.pauseButton.scale.set(1,1);
    this.pauseButton.x-=this.pauseButton.width;
    this.touchOnUI=false;
    this.resumeButton = game.add.button(width/2,height/2, 'restartButton', pauseOnClick, this);
    this.resumeButton.anchor.setTo(0.5,0.5);
    this.resumeButton.scale.set(1,1);
    this.resumeButton.kill();


    this.cloudSpeed=1;
    this.bgAlpha=0;
    this.tiles=[];
    this.newTile=[];
    this.newTileNum=0;
    this.tileSpeed=[];
    this.clouds=[];
    this.cloudNum=0;
    this.tileType=[];
    this.season=1;
    this.seasonText=["","spring","summer","fall","winter"];
    this.oneTileX=72;
    this.oneTileY=42;
    this.playerDX=270-this.oneTileX;  //290
    this.playerDY=554-this.oneTileY;
    this.characterString=this.charList[getCharId()];
    this.player=AddImage(this.playerDX,this.playerDY,this.characterString+'Effect');

    this.player.loadTexture(this.characterString+'Idle', 0);
    this.player.animations.add('Idle');
    this.player.loadTexture(this.characterString+'Up', 0);
    this.player.animations.add('Up');
    this.player.loadTexture(this.characterString+'Down', 0);
    this.player.animations.add('Down');
    this.player.loadTexture(this.characterString+'Die', 0);
    this.player.animations.add('Die');
    this.player.loadTexture(this.characterString+'Fly', 0);
    this.player.animations.add('Fly');
    changePlayerAnim('Idle',10,true);


    //changePlayerAnim(GAME.playerDX,GAME.playerDY,this.characterString+'Idle',10,10,true);
    //this.player.kill();
    //this.player.revive();
    this.game.input.onDown.add(itemTouched, this);


    this.fasterAnim=1.5;
    //this.newTile=this.add.image(274-72*(this.moveTime-1),648+42*(this.moveTime+1),'tile');
    this.leadTileX=288-this.oneTileX; //+24
    this.leadTileY=648-this.oneTileY; //+102
    this.newTileAnswerX=288;
    this.newTileAnswerY=648;
    this.tileDir=[];
    this.defaultTileSpeed=5;

    this.bgType=0;
    pushTile(0,0,''+this.seasonText[this.season]+'1');
    pushTile(0,0,''+this.seasonText[this.season]+'2');
    pushTile(0,0,''+this.seasonText[this.season]+'3');

    this.jumpState=0;
    this.eDis=0;
    this.jumpSpeed=8;
    this.eTime=0;

    this.animSpeed=20;

    this.effectScale=1;

    this.score=0;
    this.scoreImages=[];
    this.stage=1;


    this.eFrame=0;
    createClouds();


    this.effect=AddImage(this.player.x,this.player.y,this.characterString+'Effect');
    this.ringEffect=AddImage(this.player.x,this.player.y+190,'ringEffect');
    this.effect.anchor.setTo(0.5, 0.5);
    this.ringEffect.anchor.setTo(0.5, 0.5);
    this.effect.x=this.player.x+this.player.width/2;
    this.ringEffect.x=this.player.x+this.player.width/2;
    this.effect.y=this.player.y+this.player.height/2;
    this.effect.kill();
    this.ringEffect.kill();


    this.effectTextE=AddImage(this.player.x+this.player.width/2,this.player.y+10,'excellent');
    this.effectTextE.anchor.setTo(0.5, 0.5);
    this.effectTextE.kill();
    this.effectTextG=AddImage(this.player.x+this.player.width/2,this.player.y+10,'great');
    this.effectTextG.anchor.setTo(0.5, 0.5);
    this.effectTextG.kill();
    this.effectTextType=0;


    this.surprize=AddImage(this.player.x-40,this.player.y-40,'surprize');
    this.surprize.kill();

    this.dTime=0.016;

    this.readyTile=[];
    for(let i =0; i<7; i++)  {
      this.readyTile.push(AddImage(-200,-200,'spring'+((i%3)+1)));
      this.readyTile[i].kill();
    }
    this.trapTile=AddImage(-200,-200,'trap');
    this.trapTile.animations.add('trap');
    this.trapTile.animations.play('trap',20,true);
    this.trapTile.kill();

    this.tailLength=7;
    createNewTile(0);
    createNewTile(1);
    createNewTile(2);
    this.seasonTileLeft=0;
    this.newSeasonTileIdx=1;

    this.landedTrap=false;
    this.touchBuffer=false;

    this.idleAnimSpeed=10;
    this.upAnimSpeed=60;
    this.flyAnimSpeed=60;
    this.downAnimSpeed=11/0.3;
    this.deathAnimSpeed=20;
    setRenderOrder();
  },
  update: function(){
    moveBG();
    if(this.eFrame>0)
    this.eFrame++;
    if(this.score>=(this.stage)*300)  {
      this.stage+=1;
      this.season+=1;
      if(this.season>4)
      this.season=1;
      changeSeason(this.season);
    }/*
    if(this.score>=50 && this.bgType==0) {
    GAME.bg2=AddImage(0,0,'background2');
    this.bgType=0.5;
  }
  if(this.score>=150 && this.bgType==1)  {
  GAME.bg3=AddImage(0,0,'background3');
  this.bgType=1.5;
}
if(this.bgType==0.5)  {
change2BG();
}
if(this.bgType==1.5)  {
change3BG();
}*/
//if(this.jumpState==0 || this.jumpState==4)
if(this.jumpState!=-3)
moveNewTile();
//game.world.bringToTop(this.player);
if(this.gameState==0) {
  if(this.jumpState==0) {
    for(let i=0; i<this.newTile.length; i++)  {
      if(this.tileDir[i]==1 && this.newTile[i].x<0-this.newTile[i].width){
        resetNewTile(i);
        game.world.bringToTop(GAME.newTile[0]);
        game.world.bringToTop(GAME.newTile[1]);
        game.world.bringToTop(GAME.newTile[2]);
        game.world.bringToTop(this.player);
      }
      else if(this.tileDir[i]==-1 && this.newTile[i].x>width+this.newTile[i].width)  {

        resetNewTile(i);
        game.world.bringToTop(GAME.newTile[0]);
        game.world.bringToTop(GAME.newTile[1]);
        game.world.bringToTop(GAME.newTile[2]);
        game.world.bringToTop(this.player);
      }
    }
  }
  if(this.jumpState==0.5) { //점프 버튼 누른 직후
    this.eTime+=this.dTime;
    if(this.eTime>=4/this.upAnimSpeed) {
      this.eTime=0;
      this.jumpState=1;
      changePlayerAnim('Fly',this.flyAnimSpeed,false);
    }
  }
  else if(this.jumpState==1) {  //이동 1
    moveOthers(-this.oneTileX*this.dTime * this.jumpSpeed,0);
    this.eDis+=this.oneTileX*this.dTime * this.jumpSpeed;
    if(this.eDis>=this.oneTileX) {
      moveOthers(this.eDis-this.oneTileX,0);
      this.jumpState=2;
      this.eDis=0;
    }
  }
  else if(this.jumpState==-1) {
    this.eTime+=this.dTime;
    if(this.surprize.alpha>0) {
      this.surprize.alpha-=this.dTime*3;
      if(this.surprize.alpha<0) {
        this.surprize.alpha=0;
        this.surprize.kill();
      }
    }
    if(this.eTime>=0.7) {
      this.eTime=0;
      this.jumpState=-2;
      this.player.anchor.setTo(0.5, 0.5);
      this.player.x+=this.player.width/2;
      this.player.y+=this.player.height/2;
    }
  }
  else if(this.jumpState==-2) {
    if(this.player.x>this.tiles[this.tiles.length-1].x || (this.landedTrap&&this.player.x>this.tiles[this.tiles.length-1].x+20))
    game.world.bringToTop(this.tiles[this.tiles.length-1]);
    this.player.y+=800*this.dTime;
    this.player.angle-=this.dTime*360*5;
    if(this.player.y>height+this.player.height/2+800)  {
      this.jumpState=-3;  //게임 오버
    }
  }
  else if(this.jumpState==2){ //이동 2
    moveOthers(0,-this.oneTileY*this.dTime * this.jumpSpeed);  //걸린시간 :
    this.eDis+=this.oneTileY*this.dTime * this.jumpSpeed;
    if(this.eDis>=this.oneTileY) {
      moveOthers(0,this.eDis-this.oneTileY);
      this.eDis=0;
      if(getAccuracy()>0.8 || this.landedTrap) {
        this.jumpState=-1;

        changePlayerAnim('Die',this.deathAnimSpeed,false);
        this.surprize.revive();
        this.surprize.alpha=1;
        game.world.bringToTop(this.surprize);
      }
      else {
        changePlayerAnim('Down',this.downAnimSpeed,false);
        if(getAccuracy()<0.3) {
          addScore(100);
          this.effectTextType=1;
        } else{
          addScore(50);
          this.effectTextType=2;
        }
        activateEffects();
        this.jumpState=3;
      }
    }
  }
  else if(this.jumpState==3)  { //잠깐 멈추는 곳 - 착지애니메이션
    this.eTime+=this.dTime;
    if(this.touchBuffer)  {
      createNewTile(this.newTile.length);
      Jump();
      this.touchBuffer=false;
    }
    this.moveX=this.tiles[this.tiles.length-1].x-this.leadTileX;
    this.moveY=this.tiles[this.tiles.length-1].y-this.leadTileY;
    moveOthers(-this.moveX*this.dTime*10, -this.moveY*this.dTime*10);
    if(this.eTime>=0.3) {
      this.eTime=0;
      this.jumpState=0;

      changePlayerAnim('Idle',this.idleAnimSpeed,true);
      moveOthers(-(this.tiles[this.tiles.length-1].x-this.leadTileX),-(this.tiles[this.tiles.length-1].y-this.leadTileY));
      createNewTile(this.newTile.length);
    }
  }
  else if(this.jumpState==-3)  {
    this.overBG=AddImage(0,0,'bgOver');
    this.board=AddImage(108,345,'boardOver');
    this.best=AddImage(149,337,'bestOver');
    this.allranking=AddImage(136,515,'allrankingOver');
    this.friendranking=AddImage(359,515,'friendrankingOver');
    this.lower=AddImage(138,813,'lowerOver');
    this.bar1=AddImage(140,611,'bar1Over');
    this.bar2=AddImage(140,667,'bar2Over');
    this.first=AddImage(155,618,'1stOver');
    this.second=AddImage(155,674,'2ndOver');
    this.third=AddImage(155,730,'3rdOver');

    this.pauseButton = game.add.button(377,933, 'restartOver', restartGame, this);
    this.bragButton = game.add.button(106,933, 'bragOver', bragOver, this);
    this.jumpState=-4;
  }
}
updateEffects();
if(this.jumpState>=0)
setRenderOrder();
}
}
function restartGame()  {
  game.state.start('titlest');
}
function bragOver() {

}
function activateEffects() {

  GAME.ringEffect.revive();
  game.world.bringToTop(GAME.ringEffect);
  GAME.effect.revive();
  game.world.bringToTop(GAME.effect);
  GAME.effect.alpha=1;
  GAME.ringEffect.alpha=1;
  GAME.effectScale=1;
  if(GAME.effectTextType==1) {
    GAME.effectTextE.revive();
    game.world.bringToTop(GAME.effectTextE);
    GAME.effectTextE.alpha=1;
    GAME.effectTextE.y=GAME.player.y+10;
  }
  else if(GAME.effectTextType==2)  {
    GAME.effectTextG.revive();
    game.world.bringToTop(GAME.effectTextG);
    GAME.effectTextG.y=GAME.player.y+10;
    GAME.effectTextG.alpha=1;
  }
}
function updateEffects(type) {

  if(GAME.effectTextE.alive==true) {
    GAME.effectTextE.alpha-=GAME.dTime*3;
    GAME.effectTextE.y-=GAME.dTime*70;
    if(GAME.effectTextE.alpha-GAME.dTime*2<=0)
      GAME.effectTextE.kill();
  }
  if(GAME.effectTextG.alive==true) {
    GAME.effectTextG.alpha-=GAME.dTime*3;
    GAME.effectTextG.y-=GAME.dTime*70;
    if(GAME.effectTextG.alpha-GAME.dTime*2<=0)
      GAME.effectTextG.kill();
  }
  if(GAME.effect.alive==true) {
    GAME.effect.alpha-=GAME.dTime*4;
    GAME.effectScale+=GAME.dTime*5;
    GAME.effect.scale.setTo(GAME.effectScale,GAME.effectScale);
    if(GAME.effect.alpha-GAME.dTime*4<=0)  {
      GAME.effect.kill();
    }
  }
  if(GAME.ringEffect.alive==true) {
    GAME.ringEffect.alpha-=GAME.dTime*3;
    GAME.ringEffect.scale.setTo(GAME.effectScale,GAME.effectScale);
    if(GAME.ringEffect.alpha-GAME.dTime*3<=0)  {
      GAME.ringEffect.kill();
        GAME.effectScale=0;
    }
  }
}
function addScore(n)  {
  GAME.score+=n;
  let x=360.0;
  let y=20;
  let k=GAME.score.toString();
  for(let i=0; i<GAME.scoreImages.length; i++)
  GAME.scoreImages[i].destroy();
  GAME.scoreImages=[];
  x-=k.length/2.0*50;
  //x=200;
  for(let i=0; i<k.length; i++) {
    GAME.scoreImages.push(AddImage(x+(i*50),y,'num'+k[i]));
  }
}
function resetNewTile(i)  {
  if(i==0 && Math.random()>=0.8 && GAME.tileType[i]>0)  {
    GAME.newTile[i].kill();
    GAME.trapTile.revive();
    GAME.tileType[i]=-1;
    let temp=GAME.newTile[i];
    GAME.newTile[i]=GAME.trapTile;
    GAME.trapTile=temp;
  }
  else if(GAME.tileType[i]<0) {
    GAME.newTile[i].kill();
    GAME.trapTile.revive();
    GAME.tileType[i]=GAME.season;
    let temp=GAME.newTile[i];
    GAME.newTile[i]=GAME.trapTile;
    GAME.trapTile=temp;
  }
  let a=7;
  GAME.tileDir[i]=1;
  if(Math.random()>=0.5)  {
    a=-(6+i);
    GAME.tileDir[i]=-1;
  }
  GAME.newTile[i].x=GAME.newTileAnswerX+GAME.oneTileX*a;
  GAME.newTile[i].y=GAME.newTileAnswerY+GAME.oneTileY*-a + GAME.oneTileY*i*2;
  if(GAME.tileType[i]<0)  {
    GAME.newTile[i].x-=90-71;
    GAME.newTile[i].y-=90-82;
  }
  //GAME.tileSpeed[i]=Math.random()*1.5+GAME.defaultTileSpeed;
  GAME.tileSpeed[i]=GAME.defaultTileSpeed;
}
function createNewTile(i)  {
  GAME.newTile[i]=GAME.readyTile[0];
  GAME.readyTile.splice(0,1);
  resetNewTile(i);
  GAME.tileType[i]=GAME.season;
  GAME.newTile[i].revive();
}
function moveNewTile()  {
  for(let i=0; i<3; i++)  {
    GAME.newTile[i].x+=-GAME.oneTileX*GAME.dTime*GAME.tileSpeed[i]*GAME.tileDir[i];
    GAME.newTile[i].y+=GAME.oneTileY*GAME.dTime*GAME.tileSpeed[i]*GAME.tileDir[i];
  }
}
function moveNewTile(n)  {
  for(i=0; i<GAME.newTile.length; i++)  {
    if(i!=n)  {
      GAME.newTile[i].x+=-GAME.oneTileX*GAME.dTime*GAME.tileSpeed[i]*GAME.tileDir[i];
      GAME.newTile[i].y+=GAME.oneTileY*GAME.dTime*GAME.tileSpeed[i]*GAME.tileDir[i];
    }
  }
}
function moveOthers(x,y)  {
  for(i=0; i<GAME.tiles.length; i++) {
    GAME.tiles[i].x+=x;
    GAME.tiles[i].y+=y;
  }
  for(i=0; i<GAME.newTile.length; i++)  {
    GAME.newTile[i].x+=x;
    GAME.newTile[i].y+=y;
  }
}
function pushNewTile(x,y) {
  GAME.tiles.push(GAME.newTile[0]);
  GAME.newTile.splice(0,1);
  GAME.tileSpeed.splice(0,1);
  GAME.tileDir.splice(0,1);
  GAME.tileType.splice(0,1);
  delIfOverTail();
}
function delIfOverTail(){
  if(GAME.tiles.length==GAME.tailLength+1){
    GAME.tiles[0].x=-200;
    if(GAME.seasonTileLeft>0) {
      GAME.seasonTileLeft-=1;
      GAME.tiles[0].destroy();
      GAME.readyTile.push(AddImage(-200,-200,GAME.seasonText[GAME.season]+GAME.newSeasonTileIdx));
      GAME.newSeasonTileIdx++;
      if(GAME.newSeasonTileIdx==4)
      GAME.newSeasonTileIdx=1;

    }
    else{
      GAME.tiles[0].kill();
      GAME.readyTile.push(GAME.tiles[0]);
    }
    GAME.tiles.splice(0,1);

  }
}
function pauseOnClick() {
  if(game.paused){
    game.paused=false;
    GAME.pauseButton.revive();
    GAME.pauseBG.kill();
    GAME.resumeButton.kill();
  }
  else{
    GAME.pauseBG.revive();
    game.world.bringToTop(GAME.pauseBG);
    GAME.pauseButton.kill();
    GAME.resumeButton.revive();
    game.world.bringToTop(GAME.resumeButton);
    game.paused=true;
  }

}
function itemTouched(pointer) {
  if(!(game.input.x>width-40-GAME.pauseButton.width && game.input.y<40+GAME.pauseButton.height)
  && game.paused==false) {
    if(GAME.jumpState==0 || GAME.jumpState==3)
    {
      if(GAME.jumpState==3) {

        createNewTile(this.newTile.length);
      }
      Jump();
    }
    else if(GAME.jumpState==2)
    {
      GAME.touchBuffer=true;
    }
  }
}
function Jump()
{
  changePlayerAnim('Up',GAME.upAnimSpeed,false);
  GAME.jumpState=0.5;
  //addScore(1);
  //if(GAME.eFrame>0)
  //document.write(GAME.eFrame);
  GAME.eFrame+=1;
  if(GAME.tileType[0]<0)
  GAME.landedTrap=true;
  pushNewTile(GAME.newTile[0].x,GAME.newTile[0].y);

  game.world.bringToTop(GAME.player);
}
function changePlayerAnim(key,speed,loop) {
  GAME.player.loadTexture(GAME.characterString+key, 0);
  GAME.player.animations.play(key,speed,loop);
}

function getAccuracy() {
  let x=GAME.leadTileX-GAME.tiles[GAME.tiles.length-1].x;
  let y=GAME.leadTileY-GAME.tiles[GAME.tiles.length-1].y;
  return abs(x/72);
}
function pushTile(x,y,key)  {
  for(i=0; i<GAME.tiles.length; i++) {
    GAME.tiles[i].x-=GAME.oneTileX;
    GAME.tiles[i].y-=GAME.oneTileY;
  }
  GAME.tiles.push(AddImage(GAME.leadTileX+x,GAME.leadTileY+y,key));

  delIfOverTail();
}
function change2BG()  {
  GAME.bg2.alpha=GAME.bgAlpha;
  GAME.bgAlpha+=GAME.dTime/3;
  if(GAME.bgAlpha>=1) {
    GAME.bgType=1;
    GAME.bg2.alpha=1;
    GAME.bgAlpha=0;
  }
}
function change3BG()  {
  GAME.bg3.alpha=GAME.bgAlpha;
  GAME.bgAlpha+=GAME.dTime/3;
  if(GAME.bgAlpha>=1) {
    GAME.bgType=2;
    GAME.bg3.alpha=1;
  }
}

function AddImage(x,y,key)  {
  let i = GAME.add.image(x,y,key);
  //i.scale.setTo(2,2);
  return i;
}

function changeSeason(season) {
  for(let i=0; i<GAME.readyTile.length; i++) {
    GAME.readyTile[i].destroy();
    GAME.readyTile[i]=AddImage(-200,-200,GAME.seasonText[GAME.season]+(i%3+1));
  }
  GAME.seasonTileLeft=GAME.tailLength;
}

function abs(x) {
  if(x<0)
  return -x;
  return x;
}
function setRenderOrder() {
  for(i=0; i<GAME.clouds.length; i++)  {
    for(j=0; j<GAME.clouds[i].length; j++)  {
      game.world.bringToTop(GAME.clouds[i][j]);
    }
  }
  for(i=0; i<GAME.tiles.length; i++)
  game.world.bringToTop(GAME.tiles[i]);

  for(i=0; i<GAME.newTile.length; i++)
  game.world.bringToTop(GAME.newTile[i]);

  for(i=0; i<GAME.scoreImages.length; i++)
  game.world.bringToTop(GAME.scoreImages[i]);
  if(GAME.effectText!=null)
  game.world.bringToTop(GAME.effectText);

  game.world.bringToTop(GAME.ringEffect);
  game.world.bringToTop(GAME.player);

  game.world.bringToTop(GAME.effect);
  game.world.bringToTop(GAME.surprize);

}
function createClouds() {
  GAME.clouds.push(AddImage(-150,50,'cloud0'));
  GAME.clouds.push(AddImage(220,450,'cloud1'));
  GAME.clouds.push(AddImage(-20,680,'cloud2'));
  GAME.clouds.push(AddImage(450,800,'cloud3'));
  GAME.clouds.push(AddImage(-150,1050,'cloud4'));
  GAME.clouds.push(AddImage(360,270,'cloud5'));
  GAME.clouds.push(AddImage(430,90,'cloud6'));
  for(i=0; i<GAME.clouds.length; i++)  {
    GAME.clouds[i].alpha=Math.random()*0.7+0.3;
  }
}
function moveBG() {
  let l=GAME.clouds.length;
  for(i=0; i<GAME.clouds.length; i++) {
    GAME.clouds[i].x-=GAME.dTime*GAME.oneTileX*GAME.cloudSpeed;
    GAME.clouds[i].y-=GAME.dTime*GAME.oneTileY*GAME.cloudSpeed;
    if(GAME.clouds[i].x+GAME.clouds[i].width<0) {
      if(Math.random()>=0.25)  {
        GAME.clouds[i].x=width;
        GAME.clouds[i].y=(Math.random())*height;
      }
      else  {
        GAME.clouds[i].x=(Math.random()/2+0.5)*width;
        GAME.clouds[i].y=height;
      }
      GAME.clouds[i].alpha=Math.random()*0.7+0.3;

    }
  }

}

game.state.add('loadst',LOAD)
game.state.add('titlest',TITLE);
game.state.add('creditst',CREDIT);
game.state.add('helpst',HELP);
game.state.add('charselectst',CHARSELECT);
game.state.add('gamest',GAME);

game.state.start('loadst');
