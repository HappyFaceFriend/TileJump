var clientWidth = function () {
  return Math.max(window.innerWidth, document.documentElement.clientWidth);
};
var clientHeight = function () {
  return Math.max(window.innerHeight, document.documentElement.clientHeight);
};

var height=1280;
var width=720;
var game = new Phaser.Game(width,height,Phaser.AUITO);

var GAME={
  preload:  function(){
    this.load.image('background','assets/bg.png');
    this.load.image('background2','assets/bg2.png');
    this.load.image('background3','assets/bg3.png');
    this.load.image('tile','assets/tile.png');

    this.charList=['bird','fox','cat','dog','chip','ck'];
    for(i=0; i<this.charList.length; i++) {
      var s=this.charList[i];
      this.load.image(s+'Effect','assets/characters/'+s+'effect.png');
      this.load.spritesheet(s+'Idle','assets/characters/'+s+'idle.png',190, 190, 5);
      this.load.spritesheet(s+'Up','assets/characters/'+s+'1.png',190, 190, 7);
      this.load.spritesheet(s+'Down','assets/characters/'+s+'3.png',190, 190, 11);
      this.load.spritesheet(s+'Die','assets/characters/'+s+'deathsprite.png',190, 190, 7);
      this.load.image(s+'Fly','assets/characters/'+s+'fly.png');
    }
    this.load.image('cloud0','assets/cloud1.png');
    this.load.image('cloud1','assets/cloud2.png');
    this.load.image('cloud2','assets/cloud3.png');
    this.load.image('cloud3','assets/cloud4.png');
    this.load.image('cloud4','assets/cloud5.png');
    this.load.image('great','assets/great.png');
    this.load.image('excellent','assets/excellent1.png');
    for(i=0; i<10; i++)
      this.load.image('num'+i,'assets/number/'+i+'.png');
    this.load.image('score','assets/score.png');
    this.load.image('trap1','assets/trap1.png');
    this.load.image('trap2','assets/trap2.png');
    this.load.image('surprize','assets/surprize.png');
  },
  create:   function(){
    this.bg=GAME.add.image(0,0,'background');
    this.bgAlpha=0;
    this.scoreText=this.add.image(198,20,'score');
    this.tiles=[];
    this.clouds=[[],[],[],[],[]];
    createClouds();
    this.oneTileX=72;
    this.oneTileY=42;
    this.playerDX=250-this.oneTileX;
    this.playerDY=546-this.oneTileY;
    this.characterString=this.charList[0];
    this.player=this.add.image(this.playerDX,this.playerDY,this.characterString+'Up');


    changePlayerAnim(GAME.playerDX,GAME.playerDY,this.characterString+'Idle',5,8,true);
    this.game.input.onDown.add(itemTouched, this);


    this.tileSpeed=4;
    this.fasterAnim=1.5;
    //this.newTile=this.add.image(274-72*(this.moveTime-1),648+42*(this.moveTime+1),'tile');
    this.leadTileX=274-this.oneTileX;
    this.leadTileY=648-this.oneTileY;
    this.newTileAnswerX=274;
    this.newTileAnswerY=648;
    this.tileDir=1;
    this.defaultTileSpeed=4;

    this.bgType=0;
    pushTile(0,0,'tile');
    pushTile(0,0,'tile');
    pushTile(0,0,'tile');
    pushTile(0,0,'tile');

    this.jumpState=0;
    this.eDis=0;
    this.jumpSpeed=8;
    this.tileType=1;
    this.eTime=0;

    this.animSpeed=20;

    this.effectScale=1;


    this.score=0;
    this.scoreImages=[];

    this.speedInc=1;
    this.movedX=0;

    createNewTile();
  },
  update: function(){
    moveBG();
    if(this.score>=50 && this.bgType==0) {
      GAME.bg2=GAME.add.image(0,0,'background2');
      this.bgType=0.5;
    }
    if(this.score>=150 && this.bgType==1)  {
      GAME.bg3=GAME.add.image(0,0,'background3');
      this.bgType=1.5;
    }
    if(this.bgType==0.5)  {
      change2BG();
    }
    if(this.bgType==1.5)  {
      change3BG();
    }
    if(this.jumpState!=3) {
      moveNewTile();
    }
    game.world.bringToTop(this.player);
    if(this.jumpState==0) {
      if(this.tileDir==1 && this.newTile.x<0-this.newTile.width){
        this.newTile.destroy();
        createNewTile();
      }
      else if(this.tileDir==-1 && this.newTile.x>width+this.newTile.width)  {

        this.newTile.destroy();
        createNewTile();
      }
    }
    if(this.jumpState==0.5) { //점프 버튼 누른 직후
      this.eTime+=game.time.physicsElapsed;
      if(this.eTime>=7/this.animSpeed/this.fasterAnim) {
        this.eTime=0;
        this.jumpState=1;
        changePlayerAnim(GAME.playerDX,GAME.playerDY,this.characterString+'Fly',0,0,false);
      }
    }
    else if(this.jumpState==1) {  //이동 1
      moveOthers(-this.oneTileX*game.time.physicsElapsed * this.jumpSpeed,0);
      this.eDis+=this.oneTileX*game.time.physicsElapsed * this.jumpSpeed;
      if(this.eDis>=this.oneTileX) {
        moveOthers(this.eDis-this.oneTileX,0);
        this.jumpState=2;
        this.eDis=0;
      }
    }
    else if(this.jumpState==-1) {
      this.eTime+=game.time.physicsElapsed;
      if(this.surprize.alpha>0) {
        this.surprize.alpha-=game.time.physicsElapsed*3;
        if(this.surprize.alpha<0) {
          this.surprize.alpha=0;
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
      if(this.player.x>this.tiles[this.tiles.length-1].x)
      game.world.bringToTop(this.tiles[this.tiles.length-1]);
      this.player.y+=800*game.time.physicsElapsed;
      this.player.angle-=game.time.physicsElapsed*360*5;
      if(this.player.y>height+this.player.height/2+800)  {
        this.jumpState=-3;  //게임 오버
      }
    }
    else if(this.jumpState==2){ //이동 2
      moveOthers(0,-this.oneTileY*game.time.physicsElapsed * this.jumpSpeed);  //걸린시간 :
      this.eDis+=this.oneTileY*game.time.physicsElapsed * this.jumpSpeed;
      if(this.eDis>=this.oneTileY) {
        moveOthers(0,this.eDis-this.oneTileY);
        this.eDis=0;
        this.jumpState=3;
        if(getAccuracy()>1 || this.tileType<0) {
          this.jumpState=-1;

          changePlayerAnim(GAME.playerDX,GAME.playerDY,this.characterString+'Die',7,60,false);
          this.surprize=this.add.image(this.player.x-40,this.player.y-40,'surprize');
        }
        else {
          changePlayerAnim(GAME.playerDX,GAME.playerDY,this.characterString+'Down',11,this.animSpeed,false);
          this.effect=this.add.image(this.player.x,this.player.y,this.characterString+'Effect');
          this.effect.anchor.setTo(0.5, 0.5);
          this.effect.x=this.player.x+this.player.width/2;
          this.effect.y=this.player.y+this.player.height/2;

          if(getAccuracy()<0.3) {
            addScore(100);
            this.effectText=this.add.image(this.player.x+this.player.width/2,this.player.y+10,'excellent');
            this.effectText.anchor.setTo(0.5, 0.5);
          }
          else{
            addScore(50);
            this.effectText=this.add.image(this.player.x+this.player.width/2,this.player.y+10,'great');
            this.effectText.anchor.setTo(0.5, 0.5);
          }
        }
      }
    }
    else if(this.jumpState==3)  { //잠깐 멈추는 곳 - 착지애니메이션
      this.eTime+=game.time.physicsElapsed;
      if(this.effectText!=null) {
        this.effectText.alpha-=game.time.physicsElapsed*2;
        this.effectText.y-=game.time.physicsElapsed*70;
        game.world.bringToTop(this.effect);
      }
      if(this.eTime>=0.2) {
        this.effect.destroy();
        this.effectScale=1;
      }
      else{
        this.effect.alpha-=game.time.physicsElapsed*5;
        this.effectScale+=game.time.physicsElapsed*5;
        this.effect.scale.setTo(this.effectScale,this.effectScale);
        game.world.bringToTop(this.effect);

      }
      if(this.eTime>=0.5) {
        this.eTime=0;
        this.jumpState=4;

        changePlayerAnim(GAME.playerDX,GAME.playerDY,this.characterString+'Idle',5,8,true);

        if(this.effectText!=null)
        this.effectText.destroy();
      }
    }
    else if(this.jumpState==4)  { //카메라 이동
      this.moveX=this.tiles[this.tiles.length-1].x-this.leadTileX;
      this.moveY=this.tiles[this.tiles.length-1].y-this.leadTileY;
      moveOthers(-this.moveX*game.time.physicsElapsed*5, -this.moveY*game.time.physicsElapsed*5);
      if(abs(this.tiles[this.tiles.length-1].x-this.leadTileX)<3)  {
        moveOthers(-(this.tiles[this.tiles.length-1].x-this.leadTileX),-(this.tiles[this.tiles.length-1].y-this.leadTileY));
        createNewTile();
        this.jumpState=0;

      }
    }

    setRenderOrder();
  }

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

  game.world.bringToTop(GAME.newTile);

  game.world.bringToTop(GAME.scoreText);
  for(i=0; i<GAME.scoreImages.length; i++)
  game.world.bringToTop(GAME.scoreImages[i]);
  if(GAME.effectText!=null)
  game.world.bringToTop(GAME.effectText);

  game.world.bringToTop(GAME.player);
  if(GAME.playerFlyAnim!=null)
  game.world.bringToTop(GAME.playerFlyAnim);

  if(GAME.effect!=null)
  game.world.bringToTop(GAME.effect);
  if(GAME.surprize!=null)
  game.world.bringToTop(GAME.surprize);

}
function createClouds() {
  GAME.clouds[2].push(GAME.add.image(90,185,'cloud2'));
  GAME.clouds[0].push(GAME.add.image(603,480,'cloud0'));
  GAME.clouds[0].push(GAME.add.image(0,683,'cloud0'));
  GAME.clouds[0][1].scale.setTo(1.3,1.3);
  GAME.clouds[1].push(GAME.add.image(60,1180,'cloud1'));
  GAME.clouds[2].push(GAME.add.image(431,956,'cloud2'));
  GAME.clouds[3].push(GAME.add.image(285,280,'cloud3'));
  GAME.clouds[3].push(GAME.add.image(-200,1000,'cloud3'));
  GAME.clouds[4].push(GAME.add.image(-300,140,'cloud4'));
  for(i=0; i<GAME.clouds.length; i++)  {
    for(j=0; j<GAME.clouds[i].length; j++)  {
      GAME.clouds[i][j].passed=false;
      GAME.clouds[i][j].origY=GAME.clouds[i][j].y;
    }
  }
}
function moveBG() {
  for(i=0; i<GAME.clouds.length; i++)  {
    for(j=0; j<GAME.clouds[i].length; j++)  {
      var level=8000/(Math.sqrt(GAME.clouds[i][j].height*GAME.clouds[i][j].width*GAME.clouds[i][j].scale.x*GAME.clouds[i][j].scale.y)+i*30);
      GAME.clouds[i][j].x-=level*game.time.physicsElapsed;
      if(GAME.clouds[i][j].x<0-(GAME.clouds[i][j].width/2)*(i/3) && GAME.clouds[i][j].passed==false)  {
        var tempY=GAME.clouds[i][j].origY+200*(2*Math.random()-1);
        GAME.clouds[i][j].passed=true;
        GAME.clouds[i].push(GAME.add.image(width,tempY,'cloud'+i));
        GAME.clouds[i][GAME.clouds[i].length-1].passed=false;
        GAME.clouds[i][GAME.clouds[i].length-1].origY=GAME.clouds[i][j].origY;
        GAME.clouds[i][GAME.clouds[i].length-1].scale.setTo(GAME.clouds[i][j].scale.x,GAME.clouds[i][j].scale.y);
      }
      if(GAME.clouds[i][j].x<0-GAME.clouds[i][j].width) {
        GAME.clouds[i][j].destroy();
        GAME.clouds[i].splice(j,1);
      }
    }
  }
}
function addScore(n)  {
  GAME.score+=n;
  var x=380;
  var y=20;
  var k=GAME.score.toString();
  for(i=0; i<GAME.scoreImages.length; i++)
  GAME.scoreImages[i].destroy();
  GAME.scoreImages=[];
  for(i=0; i<k.length; i++) {
    GAME.scoreImages.push(GAME.add.image(x+(i*27),y,'num'+k[i]));
  }
}
function createNewTile()  {
  var r=Math.random();
  var a=6.2;
  GAME.tileDir=1;
  if(r>=0.5)  {
    a=-5.8;
    GAME.tileDir=-1;
  }

  var x=GAME.newTileAnswerX+GAME.oneTileX*a;
  var y=GAME.newTileAnswerY+GAME.oneTileY*-a;
  var t=Math.random();
  if(GAME.tileType>0 && t>=0.6)  {
    if(t>=0.8) {
      GAME.newTile=GAME.add.image(x,y-30,'trap1');
      GAME.tileType=-1;
    }
    else {
      GAME.newTile=GAME.add.image(x,y-30,'trap2');
      GAME.tileType=-2;
    }
  }
  else {
    GAME.newTile=GAME.add.image(x,y,'tile');
    GAME.tileType=1;
  }
  var s=Math.random()*1.5+GAME.defaultTileSpeed;
  GAME.tileSpeed=s;
  if(GAME.tileType<0)
    GAME.tileSpeed=2*GAME.defaultTileSpeed;
  GAME.movedX=0;
  GAME.speedInc=Math.random()<=0.5 ? -1 : 1;
  GAME.tileSpeed+=GAME.speedInc;
}
function moveNewTile()  {
  GAME.newTile.x+=-GAME.oneTileX*game.time.physicsElapsed*GAME.tileSpeed*GAME.tileDir;
  GAME.movedX+=abs(GAME.oneTileX*game.time.physicsElapsed*GAME.tileSpeed*GAME.tileDir);
  GAME.newTile.y+=GAME.oneTileY*game.time.physicsElapsed*GAME.tileSpeed*GAME.tileDir;
  if(GAME.movedX/72>=2) {
    GAME.speedInc=Math.random()<=0.5 ? -1 : 1;
    if(GAME.tileSpeed>=2)
      GAME.speedInc=1;
    else if(GAME.tileSpeed<=8)
      GAME.speedInc=-1;
    GAME.tileSpeed+=GAME.speedInc*1.5;
    GAME.movedX=0;

  }

}
function moveOthers(x,y)  {
  for(i=0; i<GAME.tiles.length; i++) {
    GAME.tiles[i].x+=x;
    GAME.tiles[i].y+=y;
  }
  GAME.newTile.x+=x;
  GAME.newTile.y+=y;
}
function pushTile(x,y,key)  {
  for(i=0; i<GAME.tiles.length; i++) {
    GAME.tiles[i].x-=GAME.oneTileX;
    GAME.tiles[i].y-=GAME.oneTileY;
  }
  GAME.tiles.push(GAME.add.image(GAME.leadTileX+x,GAME.leadTileY+y,key));
}
function pushNewTile(x,y) {
  if(GAME.tileType==1)
  GAME.tiles.push(GAME.add.image(x,y,'tile'));
  else if(GAME.tileType==-1)
  GAME.tiles.push(GAME.add.image(x,y,'trap1'));
  else if(GAME.tileType==-2)
  GAME.tiles.push(GAME.add.image(x,y,'trap2'));
}
function itemTouched(pointer) {
  if(GAME.jumpState==0)
  {
    changePlayerAnim(GAME.playerDX,GAME.playerDY,this.characterString+'Up',7,GAME.animSpeed*GAME.fasterAnim,false);
    GAME.jumpState=0.5;

    pushNewTile(this.newTile.x,this.newTile.y);
    this.newTile.destroy();
  }
}

function changePlayerAnim(x,y,key,frameNum,speed,loop) {
  GAME.player.destroy();
  if(frameNum==0)
  GAME.player=GAME.add.image(x,y,key,frameNum);
  else {
    GAME.player=GAME.add.image(x,y,key,frameNum);
    GAME.playerFlyAnim=GAME.player.animations.add(key);
    GAME.playerFlyAnim.play(speed,loop);
  }
}

function getAccuracy() {
  var x=GAME.leadTileX-GAME.tiles[GAME.tiles.length-1].x;
  var y=GAME.leadTileY-GAME.tiles[GAME.tiles.length-1].y;
  return abs(x/72);
}
function change2BG()  {
  GAME.bg2.alpha=GAME.bgAlpha;
  GAME.bgAlpha+=game.time.physicsElapsed/3;
  if(GAME.bgAlpha>=1) {
    GAME.bgType=1;
    GAME.bg2.alpha=1;
    GAME.bgAlpha=0;
  }
}
function change3BG()  {
  GAME.bg3.alpha=GAME.bgAlpha;
  GAME.bgAlpha+=game.time.physicsElapsed/3;
  if(GAME.bgAlpha>=1) {
    GAME.bgType=2;
    GAME.bg3.alpha=1;
  }
}

game.state.add('GAME',GAME);
game.state.start('GAME');
