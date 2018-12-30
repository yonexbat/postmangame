import {Player} from './player.js';
import {Wall} from './wall.js';

export class Scene {

    constructor(stage) {   
        this.stage = stage;     
        this.children = [];
        this.width = 0;
        this.heigth = 0;
    }

    loadScene() {       
        this.player = new Player(this); 
        let wall = new Wall(this);
        this.children.push(wall);   
    }

    gameLoop(delta) {
        this.player.gameLoop(delta); 
        this.children.forEach(x => {
            x.gameLoop(delta);
        });
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
        for(let childNode of this.children) {
            if(!childNode.canMoveTo(x,y,w,h))
            {
                return false;
            }
        }      
        return true;           
    }
}