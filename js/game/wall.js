import { GameObject } from './gameobject.js';

export class Wall extends GameObject {

    constructor(level) {
        super();
        this.level = level;
        this.w = 64;
        this.h = 128;

        let texture = PIXI.loader.resources["assets/wall.png"].texture
        this.sprite = new PIXI.TilingSprite(texture, this.w, this.h);
        this.sprite.x = 128;
        this.sprite.y = 128;
        this.level.levelContainer.addChild(this.sprite);
    }

    gameLoop(delta) {

    }

}