export default class NPC {
  constructor(width, height) {
    this.screenwidth = width;
    this.screenheight = height;
    this.things = new Array();
    this.speed = 20;
    this.image = new Image();
    this.image.src = "../assets/images/Ship1.png";
  }

  //maintain an array such that the draw func
  //will render every element in that array

  update(frames) {
    //randomly add a new background object
    if (frames % 200 === 0) {
      let y = Math.floor(
        Math.random() * (this.screenheight - 60 - 30 + 1) + 60
      );
      //console.log(y );

      this.things.push({
        width: 50,
        height: 30,
        locx: Math.round(this.screenwidth + 10),
        locy: Math.round(y)
      });
    }

    for (let i = 0; i < this.things.length; i++) {
      if (this.things[i].locx <= 0) this.things.shift();
      else break;
    }
    for (let i = 0; i < this.things.length; i++) {
      this.things[i].locx -= 0.6;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    for (let i = 0; i < this.things.length; i++) {
      /*ctx.fillRect(
        this.things[i].locx,
        this.things[i].locy,
        this.things[i].width,
        this.things[i].height
      );*/
      ctx.drawImage(
        this.image,
        this.things[i].locx,
        this.things[i].locy - this.things[i].height / 2
      );
    }
  }
}
