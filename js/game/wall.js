import { GameObject } from './gameobject.js';

export class Wall extends GameObject {

    constructor(level, wallinstanceData) {
        super('Wall');
        this.level = level;
    }

    gameLoop(delta) {

    }

    async load(wallinstanceData) {
        this.w = wallinstanceData.w * 64;
        this.h = wallinstanceData.h * 64;

        let texture = this.level.gameContext.loader.resources["assets/wall.png"].texture
        this.sprite = new PIXI.TilingSprite(texture, this.w, this.h);
        this.level.levelContainer.addChild(this.sprite);



        this.x = wallinstanceData.x * 64;
        this.y = wallinstanceData.y * 64;
    }

    static registerResources(loadingContext) {        
        loadingContext.loader.add("assets/wall.png");
    }

}