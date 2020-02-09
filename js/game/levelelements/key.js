import { GameObject } from "./gameobject.js";

const image = 'assets/key/goldkey.png';

export class Key extends GameObject {
    constructor(level) {
        super('Key');
        this.level = level;
    }

    async load(data) {
        this.loadSimpleSprite(image, data.x, data.y);
    }

    canMoveTo(playerInfo) {
        return true;
    }


    static registerResources(loadingContext) {        
        loadingContext.add(image);
    }
}

