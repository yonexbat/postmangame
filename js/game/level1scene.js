import { Player } from './player.js';
import { Wall } from './wall.js';
import { Exit } from './exit.js';
import { MonsterEggly } from './monstereggly.js';

export class Level1Scene {

    constructor(gameContext) {
        this.gameContext = gameContext;
        this.children = [];
        this.width = 0;
        this.heigth = 0;
        this.gameoverListener = [];
        this.levelCompletedListener = [];
        this.loadScene();
    }
    

    loadScene() {
             
        this.levelContainer = new PIXI.Container();
        this.gameContext.application.stage.addChild(this.levelContainer);

        let wall = new Wall(this);
        let exit = new Exit(this);
        let monsterEggli = new MonsterEggly(this);
        
        this.player = new Player(this);
        
        this.children.push(wall);
        this.children.push(exit);
        this.children.push(monsterEggli);
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

    triggerGameOver() {
        this.gameoverListener.forEach(gameOverFn => gameOverFn());
    }

    triggerLevelCompleted() {
        this.levelCompletedListener.forEach(completeFn => completeFn());
    }

    addGameOverListener(fn) {
        this.gameoverListener.push(fn);
    }

    addLevelCompletedListener(fn) {
        this.levelCompletedListener.push(fn);
    }

    canMoveTo(playerInfo) {
        const x = playerInfo.x + playerInfo.vx;
        const y = playerInfo.y + playerInfo.vy;
        const w = playerInfo.w;
        const h = playerInfo.h;

        if (x < 0 || y < 0 || (x + w) >= (window.innerWidth) || (y + h) >= (window.innerHeight)) {
            return {
                restricted: true,
                vx: 0,
                vy: 0
            };
        }

        for (let childNode of this.children) {
            const next = childNode.canMoveTo(playerInfo);
            if (next.restricted) {
                return next;
            }
        }

        return {
            restricted: false,
            vx: playerInfo.vx,
            vy: playerInfo.vy,
        };
    }

    set visible(val) {
        this.levelContainer.visible = val;
    }

    get visible() {
        return this.levelContainer.visible;
    }
}