import {Player} from './player.js';

export class Scene {

    constructor(stage) {   
        this.stage = stage;     
        this.children = [];
        this.width = 0;
        this.heigth = 0;
    }

    loadScene() {       
        this.player = new Player(this);    
    }

    gameLoop(delta) {
        this.player.gameLoop(delta); 
    }

    keyBoardListener(keyboardEvent) {       
        this.player.vx = keyboardEvent.vx;
        this.player.vy = keyboardEvent.vy;
    }

    canMoveTo(x, y, w, h) {
        if(x < 0 || y < 0 || (x + w) >= (window.innerWidth) || (y + h) >= (window.innerHeight))
        {
            return false;
        } 
        this.children.forEach(x => x.canMoveTo)
        return true;           
    }
}