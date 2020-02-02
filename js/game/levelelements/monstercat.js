import { GameObject } from "./gameobject.js";
export class MonsterCat extends GameObject {

    constructor(level) {
        super('Cat');
        this.level = level;
    }

    static registerResources(loadingContext) {
        loadingContext.loader.add("assets/cat/cat.png");
        loadingContext.loader.add("assets/cat/cat.mp3");
    }

    async load(monsterData) {

        let texture = this.level.gameContext.loader.resources["assets/cat/cat.png"].texture
        this.sprite = new PIXI.Sprite(texture);

        this.x = monsterData.x * 64;
        this.y = monsterData.y * 64;

        this.level.levelContainer.addChild(this.sprite);
    }

    meow() {
        let sound = PIXI.Loader.shared.resources["assets/cat/cat.mp3"];
        sound.sound.play();
    }

    gameLoop(delta) {

    }
}