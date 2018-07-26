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
    this.load.image('tile','assets/tile0.png');

    this.charList=['bird','fox','cat','dog','chip','ck'];
    for(i=0; i<this.charList.length; i++) {
      var s=this.charList[i];
      this.load.image(s+'Effect','assets/characters/'+s+'effect.png');
      this.load.spritesheet(s+'Idle','assets/characters/'+s+'idle.png',190, 190, 10);
      this.load.spritesheet(s+'Up','assets/characters/'+s+'1.png',190, 190, 7);
      this.load.spritesheet(s+'Down','assets/characters/'+s+'3.png',190, 190, 11);
      this.load.spritesheet(s+'Die','assets/characters/'+s+'deathsprite.png',190, 190, 7);
      this.load.image(s+'Fly','assets/characters/'+s+'fly.png');
    }
    this.load.image('cloud0','assets/cloud/0.png');
    this.load.image('cloud1','assets/cloud/1.png');
    this.load.image('cloud2','assets/cloud/2.png');
    this.load.image('cloud3','assets/cloud/3.png');
    this.load.image('cloud4','assets/cloud/4.png');
    this.load.image('cloud5','assets/cloud/5.png');
    this.load.image('cloud6','assets/cloud/6.png');
    this.load.image('great','assets/great.png');
    this.load.image('excellent','assets/excellent1.png');
    for(i=0; i<10; i++)
      this.load.image('num'+i,'assets/number/'+i+'.png');
    this.load.image('score','assets/score.png');
    this.load.image('trap1','assets/trap1.png');
    this.load.image('trap2','assets/trap2.png');
    this.load.image('surprize','assets/surprize.png');

        this.load.image('spring1','assets/spring/1.png');
        this.load.image('spring2','assets/spring/2.png');
        this.load.image('spring3','assets/spring/3.png');
            this.load.image('summer1','assets/summer/1.png');
            this.load.image('summer2','assets/summer/2.png');
            this.load.image('summer3','assets/summer/3.png');
                this.load.image('fall1','assets/fall/1.png');
                this.load.image('fall2','assets/fall/2.png');
                this.load.image('fall3','assets/fall/3.png');
                    this.load.image('winter1','assets/winter/1.png');
                    this.load.image('winter2','assets/winter/2.png');
                    this.load.image('winter3','assets/winter/3.png');


    this.load.image('ringEffect','assets/effect.png');
  },
  create:   function(){
    this.bg=GAME.add.image(0,0,'background');
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
    this.playerDX=264-this.oneTileX;  //290
    this.playerDY=546-this.oneTileY;
    this.characterString=this.charList[0];
    this.player=this.add.image(this.playerDX,this.playerDY,this.characterString+'Up');


    changePlayerAnim(GAME.playerDX,GAME.playerDY,this.characterString+'Idle',10,10,true);
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

    createNewTile(0);
    createNewTile(1);
    createNewTile(2);
    createClouds();
  },
  update: function(){
    moveBG();
    if(this.score>=(this.stage)*300)  {
      this.stage+=1;
      this.season+=1;
      if(this.season>4)
      this.season=1;
    }
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
    //if(this.jumpState==0 || this.jumpState==4)
    moveNewTile();
    game.world.bringToTop(this.player);
    if(this.jumpState==0) {
      for(let i=0; i<this.newTileNum; i++)  {
        if(this.tileDir[i]==1 && this.newTile[i].x<0-this.newTile[i].width){
          this.newTile[i].destroy();
          this.newTileNum-=1;
          createNewTile(i);
        }
        else if(this.tileDir[i]==-1 && this.newTile[i].x>width+this.newTile[i].width)  {
          this.newTile[i].destroy();
          this.newTileNum-=1;
          createNewTile(i);
        }
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
          this.ringEffect=this.add.image(this.player.x,this.player.y+190,'ringEffect');
          this.effect.anchor.setTo(0.5, 0.5);
          this.ringEffect.anchor.setTo(0.5, 0.5);
          this.effect.x=this.player.x+this.player.width/2;
          this.ringEffect.x=this.player.x+this.player.width/2;
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
        this.ringEffect.destroy();
        this.effectScale=1;
      }
      else{
        this.effect.alpha-=game.time.physicsElapsed*5;
        this.ringEffect.alpha-=game.time.physicsElapsed*5;
        this.effectScale+=game.time.physicsElapsed*5;
        this.effect.scale.setTo(this.effectScale,this.effectScale);
        this.ringEffect.scale.setTo(this.effectScale,this.effectScale);
      }
      if(this.eTime>=0.5) {
        this.eTime=0;
        this.jumpState=4;

        changePlayerAnim(GAME.playerDX,GAME.playerDY,this.characterString+'Idle',10,10,true);

        if(this.effectText!=null)
        this.effectText.destroy();
      }
    }
    else if(this.jumpState==4)  { //카메라 이동
      this.moveX=this.tiles[this.tiles.length-1].x-this.leadTileX;
      this.moveY=this.tiles[this.tiles.length-1].y-this.leadTileY;
      moveOthers(-this.moveX*game.time.physicsElapsed*10, -this.moveY*game.time.physicsElapsed*10);
      if(abs(this.tiles[this.tiles.length-1].x-this.leadTileX)<3)  {
        moveOthers(-(this.tiles[this.tiles.length-1].x-this.leadTileX),-(this.tiles[this.tiles.length-1].y-this.leadTileY));
        createNewTile(2);
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

  for(i=0; i<GAME.newTileNum; i++)
  game.world.bringToTop(GAME.newTile[i]);

  for(i=0; i<GAME.scoreImages.length; i++)
  game.world.bringToTop(GAME.scoreImages[i]);
  if(GAME.effectText!=null)
  game.world.bringToTop(GAME.effectText);

  if(GAME.ringEffect!=null)
  game.world.bringToTop(GAME.ringEffect);
  game.world.bringToTop(GAME.player);
  if(GAME.playerFlyAnim!=null)
  game.world.bringToTop(GAME.playerFlyAnim);

  if(GAME.effect!=null)
  game.world.bringToTop(GAME.effect);
  if(GAME.surprize!=null)
  game.world.bringToTop(GAME.surprize);

}
function createClouds() {
  GAME.clouds.push(GAME.add.image(-150,50,'cloud0'));
  GAME.clouds.push(GAME.add.image(220,450,'cloud1'));
  GAME.clouds.push(GAME.add.image(-20,680,'cloud2'));
  GAME.clouds.push(GAME.add.image(450,800,'cloud3'));
  GAME.clouds.push(GAME.add.image(-150,1050,'cloud4'));
  GAME.clouds.push(GAME.add.image(360,270,'cloud5'));
  GAME.clouds.push(GAME.add.image(430,90,'cloud6'));
  for(i=0; i<GAME.clouds.length; i++)  {
      GAME.clouds[i].passed=false;
      GAME.clouds[i].origY=GAME.clouds[i].y;
      GAME.clouds[i].origX=GAME.clouds[i].x;
      GAME.clouds[i].idx=i;
      GAME.clouds[i].alpha=Math.random()*0.7+0.3;
  }
}
function moveBG() {
  let l=GAME.clouds.length;
  for(i=0; i<GAME.clouds.length; i++) {
    GAME.clouds[i].x-=game.time.physicsElapsed*GAME.oneTileX*GAME.cloudSpeed;
    GAME.clouds[i].y-=game.time.physicsElapsed*GAME.oneTileY*GAME.cloudSpeed;
    if((GAME.clouds[i].x<0 || GAME.clouds[i].y<0) && GAME.clouds[i].passed==false)  {
        GAME.clouds[i].passed=true;

        if(Math.random()>=0.5)
          GAME.clouds.push(GAME.add.image(width,(Math.random())*height,'cloud'+GAME.clouds[i].idx));
        else
          GAME.clouds.push(GAME.add.image((Math.random())*width,height,'cloud'+GAME.clouds[i].idx));
        GAME.clouds[GAME.clouds.length-1].idx=GAME.clouds[i].idx;
        GAME.clouds[GAME.clouds.length-1].passed=false;
        GAME.clouds[GAME.clouds.length-1].alpha=Math.random()*0.7+0.3;




    }
    if(GAME.clouds[i].x+GAME.clouds[i].width<0) {
      GAME.clouds[i].destroy();
      GAME.clouds.splice(i,1);

    }
  }

}
function addScore(n)  {
  GAME.score+=n;
  var x=380.0;
  var y=20;
  var k=GAME.score.toString();
  for(i=0; i<GAME.scoreImages.length; i++)
    GAME.scoreImages[i].destroy();
  GAME.scoreImages=[];
  x-=k.length/2.0*49;
  for(i=0; i<k.length; i++) {
    GAME.scoreImages.push(GAME.add.image(x+(i*27),y,'num'+k[i]));
  }
}
function createNewTile(i)  {
  var r=Math.random();
  var a=7;
  GAME.tileDir.push(0);
  GAME.tileSpeed.push(0);
  GAME.newTile.push(null);
  GAME.tileDir[i]=1;
  if(r>=0.5)  {
    a=-(6+i);
    GAME.tileDir[i]=-1;
  }
  GAME.speedInc=-1;
  var x=GAME.newTileAnswerX+GAME.oneTileX*a;
  var y=GAME.newTileAnswerY+GAME.oneTileY*-a + GAME.oneTileY*i*2;
  var t=Math.random();
  var n=1;
  if(GAME.tileType[i]>0 && t>=0.8)  {
    if(t>=0.9) {
      GAME.newTile[i]=GAME.add.image(x,y-30,'trap1');
      GAME.tileType[i]=-1;
    }
    else {
      GAME.newTile[i]=GAME.add.image(x,y-30,'trap2');
      GAME.tileType[i]=-2;
    }
  }
  else {
      if(t>=0.6) {
        n=1;
      }
      else if(t>=0.3) {
        n=2
      }
      else{n=3}

      GAME.newTile[i]=GAME.add.image(x,y,''+GAME.seasonText[GAME.season]+n);
      GAME.tileType[i]=GAME.season+0.1*n;
  }
  var s=Math.random()*1.5+GAME.defaultTileSpeed;
  GAME.tileSpeed[i]=GAME.defaultTileSpeed;
  GAME.newTileNum+=1;
  //GAME.speedInc=Math.random()<=0.5 ? -1 : 1;
  //GAME.tileSpeed+=GAME.speedInc;
}
function moveNewTile()  {
  //-1~4~10
  for(i=0; i<GAME.newTileNum; i++)  {
    GAME.newTile[i].x+=-GAME.oneTileX*game.time.physicsElapsed*GAME.tileSpeed[i]*GAME.tileDir[i];
    //GAME.movedX+=abs(GAME.oneTileX*game.time.physicsElapsed*GAME.tileSpeed*GAME.tileDir);
    GAME.newTile[i].y+=GAME.oneTileY*game.time.physicsElapsed*GAME.tileSpeed[i]*GAME.tileDir[i];
  }
  /*if(GAME.movedX/72>=2) {
    GAME.speedInc=Math.random()<=0.5 ? -1 : 1;
    if(GAME.tileSpeed>=2)
      GAME.speedInc=1;
    else if(GAME.tileSpeed<=8)
      GAME.speedInc=-1;
    GAME.tileSpeed+=GAME.speedInc*1.5;
    GAME.movedX=0;
  }*/
  //왼쪽에서 오는것 : 2*72, 4*72 (-1)
  //오른쪽에서 오는것 : 6*72, 4*72 (1)
}
function moveNewTile(n)  {
  //-1~4~10
  for(i=0; i<GAME.newTileNum; i++)  {
      if(i!=n)  {
      GAME.newTile[i].x+=-GAME.oneTileX*game.time.physicsElapsed*GAME.tileSpeed[i]*GAME.tileDir[i];
      GAME.newTile[i].y+=GAME.oneTileY*game.time.physicsElapsed*GAME.tileSpeed[i]*GAME.tileDir[i];
    }
  }
}
function moveOthers(x,y)  {
  for(i=0; i<GAME.tiles.length; i++) {
    GAME.tiles[i].x+=x;
    GAME.tiles[i].y+=y;
  }

  for(i=0; i<GAME.newTileNum; i++)  {
    GAME.newTile[i].x+=x;
    //GAME.movedX+=abs(GAME.oneTileX*game.time.physicsElapsed*GAME.tileSpeed*GAME.tileDir);
    GAME.newTile[i].y+=y;
  }
}
function pushTile(x,y,key)  {
  for(i=0; i<GAME.tiles.length; i++) {
    GAME.tiles[i].x-=GAME.oneTileX;
    GAME.tiles[i].y-=GAME.oneTileY;
  }
  GAME.tiles.push(GAME.add.image(GAME.leadTileX+x,GAME.leadTileY+y,key));
}
function pushNewTile(x,y) {
  if(GAME.tileType[0]==-1)
  GAME.tiles.push(GAME.add.image(x,y,'trap1'));
  else if(GAME.tileType[0]==-2)
  GAME.tiles.push(GAME.add.image(x,y,'trap2'));
  else
    GAME.tiles.push(GAME.add.image(x,y,''+GAME.seasonText[GAME.season]+Math.floor(GAME.tileType[0]*10-GAME.season*10)));
}
function destoryTile()  {
  GAME.newTile[0].destroy();
  GAME.newTile.splice(0,1);
  GAME.newTileNum-=1;
  GAME.tileSpeed.splice(0,1);
  GAME.tileDir.splice(0,1);
  GAME.tileType.splice(0,1);
}
function itemTouched(pointer) {
  if(GAME.jumpState==0)
  {
    changePlayerAnim(GAME.playerDX,GAME.playerDY,this.characterString+'Up',7,GAME.animSpeed*GAME.fasterAnim,false);
    GAME.jumpState=0.5;

    pushNewTile(this.newTile[0].x,this.newTile[0].y);
    destoryTile();
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
