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
        this.playsound(soundFile);
    }

    static registerResources(loadingContext) {
        loadingContext.add(imageFile);
        loadingContext.add(soundFile);
    }
}