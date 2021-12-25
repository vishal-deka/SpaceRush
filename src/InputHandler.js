export default class InputHandler {
  constructor(player) {
    document.addEventListener("keydown", (event) => {
      switch (event.code) {
        /*
        case "ArrowLeft":
          player.xspeed = -player.MaxSpeed;
          break;
        case "ArrowRight":
          player.xspeed = player.MaxSpeed;
          break;
        */
        case "ArrowUp":
          player.yspeed = -player.MaxSpeed;
          break;
        case "ArrowDown":
          player.yspeed = player.MaxSpeed;
          break;

        //case "Space":
        //  player.fireBullet();
        //  break;
      }
    });
    document.addEventListener("keyup", (event) => {
      player.xspeed = 0;
      player.yspeed = 0;
    });
  }
}
