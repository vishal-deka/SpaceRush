import "./styles.css";
import Player from "./Player.js";
import InputHandler from "./InputHandler.js";
import Background from "./Background";
import NPC from "./NPC.js";

const canvas = document.getElementById("canvas1");
let gamestate = 0;
canvas.width = 800;
canvas.height = 600;

let canvasPosX = Math.floor(canvas.getBoundingClientRect().x);
let canvasPosY = Math.floor(canvas.getBoundingClientRect().y);

const ctx = canvas.getContext("2d");

let player = new Player(canvas.width, canvas.height);
player.draw(ctx);

document.addEventListener("keypress", (event) => {
  if (event.code === "Space") {
    player.fireBullet();
  }
});

//let background = new Background(canvas.width, canvas.height);
let npcs = new NPC(canvas.width, canvas.height);

new InputHandler(player);
let lasttime = 0;
let frames = 0;

//create the game loop here
function gameLoop(timestamp) {
  if (gamestate === 0) {
    ctx.clearRect(0, 0, 800, 600);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fill();
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Paused. Press Enter to continue", 400, 300);
  } else {
    frames += 1;
    let delta = timestamp - lasttime;
    lasttime = timestamp;

    ctx.clearRect(0, 0, 800, 600);

    //handling player
    player.update(delta);
    player.draw(ctx);

    //handle npcs
    npcs.update(frames);
    npcs.draw(ctx);

    //handling bakcground objects
    //background.update(frames);
    //background.draw(ctx);

    //handling bullets
    if (player.bullets.length !== 0) {
      for (let b = 0; b < player.bullets.length; b++) {
        player.bullets[b].posx += player.bulletspeed / delta;
      }
    }

    //handle collission
    if (player.bullets.length > 0 && npcs.things.length > 0) {
      for (let i = 0; i < npcs.things.length; i++) {
        const npc = npcs.things[i];
        let rect1 = { x: npc.locx, y: npc.locy, h: npc.height, w: npc.width };

        for (let j = 0; j < player.bullets.length; j++) {
          const bullet = player.bullets[j];
          let rect2 = {
            x: bullet.posx,
            y: bullet.posy,
            w: player.bulletwidth,
            h: player.bulletheight
          };

          if (
            rect2.y >= rect1.y &&
            rect2.y <= rect1.y + rect1.h &&
            rect2.x + rect2.w >= rect1.x + rect1.w
          ) {
            // collision detected!
            player.bullets.splice(j, 1);
            npcs.things.splice(i, 1);
            break;
          }
        }
      }
    }
  }
  requestAnimationFrame(gameLoop);
}
gameLoop(0);
document.addEventListener("keydown", (event) => {
  if (event.code === "Escape") gamestate = 0;
  if (event.code === "Enter") gamestate = 1;
});
