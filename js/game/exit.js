import { GameObject } from "./gameobject.js";

export class Exit extends GameObject {

    constructor(level) {
        super();

        this.level = level;

        let texture = PIXI.loader.resources["assets/exit.png"].texture
        this.sprite = new PIXI.Sprite(texture);

        this.sprite.x = 256;
        this.sprite.y = 256;
        this.level.levelContainer.addChild(this.sprite);

        this.wellDoneText = new PIXI.Text('Guet gmacht Aute!',
         { 
             fontFamily: 'Arial', 
             fontSize: 72, 
             fill: 0xff1010, 
             align: 'center' 
        });      
    }

    gameLoop(delta) {
        if(this.isPlayerOnIt()) {
            this.level.stage.addChild(this.wellDoneText);
        } else {
            this.level.stage.removeChild(this.wellDoneText);
        }
    }

    canMoveTo(player) {
        return {
            restricted: false,
            vx: player.vx,
            vy: player.vy,
        };        
    }

}