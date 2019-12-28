import { GameObject } from './gameobject.js';

export class Wall extends GameObject {

    constructor(scene) {
        super();
        this.scene = scene;
        this.w = 64;
        this.h = 128;

        let texture = PIXI.loader.resources["assets/wall.png"].texture
        this.sprite = new PIXI.extras.TilingSprite(texture, this.w, this.h);
        this.sprite.x = 128;
        this.sprite.y = 128;
        this.scene.stage.addChild(this.sprite);
    }

    gameLoop(delta) {

    }

}