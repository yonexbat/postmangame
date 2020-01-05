import { Player } from './player.js';
import { Wall } from './wall.js';
import { Exit } from './exit.js';
import { MonsterEggly } from './monstereggly.js';
import { Floor } from './floor.js';

export class LevelScene {

    constructor(gameContext) {
        this.gameContext = gameContext;
        this.children = [];
        this.width = 0;
        this.heigth = 0;
        this.gameoverListener = [];
        this.levelCompletedListener = [];        
    }
    

    async load(level) {
             
        this.levelContainer = new PIXI.Container();
        this.gameContext.application.stage.addChild(this.levelContainer);

        let floor = new Floor(this);
        await floor.load();

        
        let levelData = await this.loadLevel(level);
        await this.loadWalls(levelData.walls);

        let exit = new Exit(this);
        await exit.load(levelData.exit);
        this.children.push(exit);

        await this.loadMonstersEggli(levelData.monsterseggli);
        
        this.player = new Player(this);
        await this.player.load(levelData.player);
        
        this.gameContext.keyboard.addKeyboardListener((event) => this.keyBoardListener(event));
    }

    async loadLevel(level) {
        const url = `assets/level/level${level}.json`;
        let levelString =  await fetch(url);
        return levelString.json();
    }

    async loadWalls(wallData) {
        for(let wallinstanceDate of wallData) {
            let wall = new Wall(this);
            await wall.load(wallinstanceDate);
            this.children.push(wall);
        }
    }

    async loadMonstersEggli(monsterData) {
        for(let monsterinstanceData of monsterData) {
            let monster = new MonsterEggly(this);
            await monster.load(monsterinstanceData);
            this.children.push(monster);
        }
    }


    gameLoop(delta) {
        this.player.gameLoop(delta);
        this.children.forEach(x => {
            x.gameLoop(delta);
        });
        this.centerPlayer();
    }

    centerPlayer() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const deltaX = this.player.x - centerX;
        const deltaY = this.player.y - centerY;
        this.levelContainer.x = -deltaX;
        this.levelContainer.y = -deltaY;
    }

    keyBoardListener(keyboardEvent) {
        this.player.vx = keyboardEvent.vx;
        this.player.vy = keyboardEvent.vy;

        
        this.levelContainer.x = this.player.x;
        this.levelContainer.y = this.player.y;

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

        if (x < 0 || y < 0) {
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