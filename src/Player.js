export default class Player {
  constructor(width, height) {
    this.screenwidth = width;
    this.screenheight = height;
    this.width = 25;
    this.height = 50;
    this.image = new Image();
    this.image.src = "../assets/images/Ship5.png";
    this.bulletimage = new Image();
    this.bulletimage.src = "../assets/images/shot6_3.png";
    this.position = {
      x: width / 20,
      y: height / 2
    };
    this.xspeed = 0;
    this.yspeed = 0;
    this.MaxSpeed = 20;

    this.bullets = new Array();
    this.bulletheight = 5;
    this.bulletwidth = 10;
    this.bulletspeed = 30;
  }

  draw(ctx) {
    ctx.fillStyle = "blue";
    //ctx.fillRect(this.position.x, this.position.y, 50, 30);
    ctx.drawImage(
      this.image,
      this.position.x - this.width,
      this.position.y - this.height,
      120,
      100
    );
    //drawing bullets
    if (this.bullets.length !== 0) {
      for (let b = 0; b < this.bullets.length; b++) {
        ctx.fillRect(
          this.bullets[b].posx,
          this.bullets[b].posy,
          this.bulletwidth,
          this.bulletheight
        );
        ctx.drawImage(
          this.bulletimage,
          this.bullets[b].posx - 50,
          this.bullets[b].posy - 60
        );
      }
    }
  }

  update(delta) {
    if (!delta) return;
    this.position.x += this.xspeed / delta;
    this.position.y += this.yspeed / delta;

    if (this.position.x <= 0) this.position.x = 0;
    if (this.position.x > this.screenwidth - this.width)
      this.position.x = this.screenwidth - this.width;

    if (this.position.y <= 0) this.position.y = 0;
    if (this.position.y >= this.screenheight - this.height)
      this.position.y = this.screenheight - this.height;

    if (this.bullets.length !== 0) {
      for (let b = 0; b < this.bullets.length; b++) {
        if (this.bullets[b].posx > this.screenwidth) this.bullets.shift();
        else break;
        //if the first bullet is not out of frame
        //then the others are definitely not
      }
    }
  }

  fireBullet() {
    //adding a bullet to the bullets array with position of player
    this.bullets.push({
      //bullet has to come out of the edge of player
      posx: Math.round(this.position.x + 80),
      posy: Math.round(this.position.y + 4)
    });
  }
}
