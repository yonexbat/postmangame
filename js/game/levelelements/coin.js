import { GameObject } from "./gameobject.js";

const imageFile = 'assets/coin/powercoin.png';
const soundFile = 'assets/coin/coinpickup.mp3';

export class Coin extends GameObject {

    constructor(level) {
        super('Coin');
        this.level = level;
    }

    canMoveTo(playerInfo) {
        return true;
    }

    gameLoop(delta) {
        if (this.isPlayerOnIt()) {
            this.coinpickedUp();
        }
    }

    coinpickedUp() {
        this.level.addScore(this.score);
        this.playsound(soundFile);
        this.removeSelf();
    }


    async load(data) {
        this.loadSimpleSprite(imageFile, data.x, data.y);
        this.score = data.score
    }

    static registerResources(loadingContext) {
        loadingContext.add(imageFile);
        loadingContext.add(soundFile);
    }
}