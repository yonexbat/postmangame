import { GameObject } from "./gameobject.js";

export class MonsterEggly extends GameObject {

    constructor(level){
        super();
        this.level = level;
        let texture = PIXI.Loader.shared.resources["assets/monsterEggly.png"].texture
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.x = 64*6;
        this.sprite.y = 0;
        
        this.speed = 3;

        this.level.levelContainer.addChild(this.sprite);
    }  

    gameLoop(delta) {
        this.sprite.y = this.sprite.y + this.speed;    
        if(this.sprite.y + this.h > window.innerHeight || this.sprite.y <= 0) {
            this.speed *= -1;
        }
        if(this.isPlayerOnIt()) {
            this.level.triggerGameOver();
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