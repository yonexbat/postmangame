import { GameObject } from "./gameobject.js";

export class MonsterEggly extends GameObject {

    constructor(scene){
        super();
        this.scene = scene;
        let texture = PIXI.loader.resources["assets/monsterEggly.png"].texture
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.x = 64*6;
        this.sprite.y = 0;
        
        this.h = 64;
        this.w = 64;
        this.speed = 3;

        this.scene.stage.addChild(this.sprite);
    }  

    gameLoop(delta) {
        this.sprite.y = this.sprite.y + this.speed;    
        if(this.sprite.y + this.h > window.innerHeight || this.sprite.y <= 0) {
            this.speed *= -1;
        }

    }
}