import {Player} from './player.js';

export class Scene {

    constructor(stage){   
        this.stage = stage;     
    }

    loadScene(){       
        this.player = new Player(this.stage);
    }

    gameLoop(delta) {
        this.player.gameLoop(delta); 
    }

    keyBoardListener(keyboardEvent) {       
        this.player.vx = keyboardEvent.vx;
        this.player.vy = keyboardEvent.vy;
    }
}