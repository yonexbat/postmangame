import { GameObject } from "./gameobject.js";

const image = 'assets/key/goldkey.png';
const keypickupsound = 'assets/key/keypickup.mp3';

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

    gameLoop(delta) {
        if (this.isPlayerOnIt()) {
            this.keyFound();
        }
    }

    keyFound() {
        this.level.addScore(500);
        this.playsound(keypickupsound);
        const inventoryItem = {
            key: 'key',
            resourcename: image
        };

        this.level.addInventoryItem(inventoryItem);
        this.removeSelf();
    }

   

    static registerResources(loadingContext) {
        loadingContext.add(image);
        loadingContext.add(keypickupsound);
    }
}

