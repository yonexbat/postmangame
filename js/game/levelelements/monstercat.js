import { GameObject } from "./gameobject.js";

const imageFile = 'assets/cat/cat.png';
const soundFile = 'assets/cat/cat.mp3';

export class MonsterCat extends GameObject {

    constructor(level) {
        super('Cat');
        this.level = level;
    }
    
    async load(monsterData) {
        this.loadSimpleSprite(imageFile, monsterData.x, monsterData.y);        
    }

    meow() {
        let sound = PIXI.Loader.shared.resources[soundFile];
        sound.sound.play();
    }

    static registerResources(loadingContext) {
        loadingContext.add(imageFile);
        loadingContext.add(soundFile);
    }
}