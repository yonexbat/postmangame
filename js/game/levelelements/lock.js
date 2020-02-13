import { GameObject } from "./gameobject.js";


const image = 'assets/key/goldlock.png';

export class Lock extends GameObject {
    
    constructor(level) {
        super('Lock');
        this.level = level;
        this.removed = false;
    }

    async load(data) {
        this.loadSimpleSprite(image, data.x, data.y);
    }

    canMoveTo(playerInfo) {
        const numItems = this.level.numInventoryItems('key');
        if(numItems > 0) {
            return true;
        }

        return super.canMoveTo(playerInfo);        
    }

    gameLoop(delta) {
        if(this.isPlayerOnIt()) {
            this.removeLock();
        } 
    }

    removeLock(){
        if(this.removed === false) {
            this.removed = true;
            this.level.removeOneInventoryItem('key');
        }
        this.removeSelf();
        this.level.addScore(1000);
    }

    
    static registerResources(loadingContext) {        
        loadingContext.add(image);
    }
}