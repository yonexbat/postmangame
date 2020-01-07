import { GameObject } from './gameobject.js';

export class Floor extends GameObject {

    constructor(level) {
        super();
        this.level = level;
    }

    gameLoop(delta) {

    }

    async load() {
        let texture = this.level.gameContext.loader.resources["assets/grass.png"].texture
        this.sprite = new PIXI.TilingSprite(texture, 64*10000, 64*10000);
        this.sprite.x = 0;
        this.sprite.y = 0;
        this.level.levelContainer.addChild(this.sprite);
    }

    static registerResources(loadingContext) {        
        loadingContext.loader.add("assets/grass.png");
    }

}