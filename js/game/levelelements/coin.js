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
        this.innersprite.rotation += delta*0.1;
    }

    coinpickedUp() {
        this.level.addScore(this.score);
        this.playsound(soundFile);
        this.removeSelf();
    }


    async load(data) {
        this.loadAdvancedSprite(imageFile, data.x, data.y);
        this.innersprite.pivot.set(this.sprite.width/2, this.sprite.height/2);
        this.innersprite.x = this.sprite.width/2;
        this.innersprite.y = this.sprite.height/2;
        this.score = data.score;        
    }

    static registerResources(loadingContext) {
        loadingContext.add(imageFile);
        loadingContext.add(soundFile);
    }
}