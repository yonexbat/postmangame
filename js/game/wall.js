import { GameObject } from './gameobject.js';

export class Wall extends GameObject {

    constructor(level, wallinstanceData) {
        super();
        this.level = level;
        this.w = wallinstanceData.w * 64;
        this.h = wallinstanceData.h * 64;

        let texture = PIXI.Loader.shared.resources["assets/wall.png"].texture
        this.sprite = new PIXI.TilingSprite(texture, this.w, this.h);
        this.level.levelContainer.addChild(this.sprite);



        this.x = wallinstanceData.x * 64;
        this.y = wallinstanceData.y * 64;
    }

    async load() {

    }

    gameLoop(delta) {

    }

}