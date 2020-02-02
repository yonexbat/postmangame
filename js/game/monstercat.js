import { GameObject } from "./gameobject.js";
export class MonsterCat extends GameObject {

    constructor(level) {
        super();
        this.level = level;
    }

    static registerResources(loadingContext) {
        loadingContext.loader.add("assets/cat/cat.png");
    }

    async load(monsterData) {

        let texture = this.level.gameContext.loader.resources["assets/cat/cat.png"].texture
        this.sprite = new PIXI.Sprite(texture);

        this.x = monsterData.x * 64;
        this.y = monsterData.y * 64;
        this.objectType = 'Cat';
        
        this.level.levelContainer.addChild(this.sprite); 
    }

    gameLoop(delta) {

    }
}