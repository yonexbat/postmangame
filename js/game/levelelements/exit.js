import { GameObject } from "./gameobject.js";

const image = 'assets/exit.png';

export class Exit extends GameObject {

    constructor(level) {
        super('Exit');
        this.level = level;
    }

    async load(exitData) {
        this.loadSimpleSprite(image, exitData.x, exitData.y);
    }

    gameLoop(delta) {
        if(this.isPlayerOnIt()) {
            this.level.triggerLevelCompleted();            
        } 
    }

    canMoveTo(player) {
        return {
            restricted: false,
            vx: player.vx,
            vy: player.vy,
        };        
    }

    static registerResources(loadingContext) {        
        loadingContext.add(image);
    }

}