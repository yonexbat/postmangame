import {GameObject} from "./gameobject.js";

export class Exit extends GameObject {

    constructor(scene){
        super();
        
        this.scene = scene;
        this.w = 64;
        this.h = 64;

        let texture = PIXI.loader.resources["assets/exit.png"].texture
        this.sprite = new PIXI.Sprite(texture);

        this.sprite.x = 256;
        this.sprite.y = 256;
        this.scene.stage.addChild(this.sprite);
    }

    gameLoop(delta){

    }

}