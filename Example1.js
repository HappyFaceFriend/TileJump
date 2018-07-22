class Example1 extends Phaser.Scene
{
  constructor()
  {
    super({key:"Example1"});
  }

  preload()
  {
    this.load.image("background",'assets/background.jpg');
    this.load.spritesheet('panda','assets/pandaSprite.png',
    {frameWidth: 28, frameHeight:30});
  }

  create()
  {
    this.bg1=this.add.image(200,300,'background');
    this.bg2=this.add.image(200,300+600,'background');
    this.bgScrollSpeed=100;
    this.canMove=true;
    this.isMoving=false;
    this.playerPos=3;
    var config={
      key:'pandaAnim',
      frames:this.anims.generateFrameNumbers('panda',{
        start:0,
        end:3
      }),
      repeat:-1,
      frameRate:8
    };
    this.anims.create(config);
    this.player=this.add.sprite(200,450,'pandaAnim');
    this.player.setScale(1,1.5);
    this.player.anims.play('pandaAnim');
    /*
    this.input.keyboard.on("keyup_D",function(event){
      this.image.x+=10;
    },this);
    this.key_A=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.input.on('pointerdown',function(event){
      this.image.x=event.x;
      this.image.y=event.y;
    },this);
    this.input.keyboard.on('keyup_P',function(event){
        var physicsImage = this.physics.add.image(this.image.x,this.image.y,"knife");
        physicsImage.setVelocity(Phaser.Math.RND.integerInRange(-100,100),-300);
    },this);
    */
    this.input.keyboard.on('keyup',function(e){
      if(e.key=='d')  {
        this.move(1);
      }
      if(e.key=='a')  {
        this.move(-1);
      }

    },this);
  }
  update(delta)
  {
    this.bg1.y+=this.bgScrollSpeed*game.time.physicsElapsed;
    this.bg2.y+=this.bgScrollSpeed*game.time.physicsElapsed;
    if(this.bg1.y>900)
      this.bg1.y-=1200;
    if(this.bg2.y>900)
      this.bg2.y-=1200;
    if(this.isMoving==true) {

    }
  }

  move(direction) {
    if(this.canMove==true &&
      this.playerPos+direction>=1 && this.playerPos+direction<=5)  {
        this.canMove=false;
        this.isMoving=true;
        this.playerPos+=direction;
        this.canMoveTimeEvent=this.time.addEvent({
          delay:500,
          callback: this.canMoveNow,
          callbackScope: this
        });
    }
    this.player.x=400/5*this.playerPos-400/10;
  }

  canMoveNow()
  {
    this.canMove=true;
    this.isMoving=false;
  }
}
