import { Player } from './player.js';
import { Wall } from './wall.js';
import { Exit } from './exit.js';

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
        let exit = new Exit(this);
        this.children.push(wall);
        this.children.push(exit);
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

    canMoveTo(player) {
        const x = player.x + player.vx;
        const y = player.y + player.vy;
        const w = player.w;
        const h = player.h;

        if (x < 0 || y < 0 || (x + w) >= (window.innerWidth) || (y + h) >= (window.innerHeight)) {
            return {
                restricted: true,
                vx: 0,
                vy: 0
            };
        }

        for (let childNode of this.children) {
            const next = childNode.canMoveTo(player);
            if (next.restricted) {
                return next;
            }
        }

        return {
            restricted: false,
            vx: player.vx,
            vy: player.vy,
        };
    }
}