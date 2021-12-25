export default class Background {
  constructor(width, height) {
    this.screenwidth = width;
    this.screenheight = height;
    this.things = new Array();
    this.speed = 20;
  }

  //maintain an array such that the draw func
  //will render every element in that array

  update(frames) {
    //randomly add a new background object
    if (frames % 200 === 0) {
      this.things.push({
        radius: Math.random() * 5 + 1,
        locx: this.screenwidth + 10,
        locy: Math.floor(Math.random() * (this.screenheight - 0 + 1) + 0)
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
      ctx.fillRect(this.things[i].locx, this.things[i].locy, 10, 10);
    }
  }
}
