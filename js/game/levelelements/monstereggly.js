import { GameObject } from "./gameobject.js";

const image = `assets/eggli/frame-${1}.png`;
const imagehit = `assets/eggli/gothit.png`;

export class MonsterEggly extends GameObject {

    constructor(level) {
        super('Eggly');
        this.level = level;
    }

    async load(monsterData) {
        
        this.loadSimpleSprite(image, monsterData.x, monsterData.y);

        this.dir = monsterData.dir;
        this.dist = monsterData.dist;

        this.speed = monsterData.speed;

        this.current = 0;
        this.currentFactor = 1;

        this.vx = 0;
        this.vy = 0;

        switch (this.dir) {
            case "north":
                this.vx = 0;
                this.vy = -1;
                break;
            case "south":
                this.vx = 0;
                this.vy = 1;
                break;
            case "west":
                this.vx = -1;
                this.vy = 0;
                break;
            case "east": 
                this.vx = 1;
                this.vy = 0;
                break;
        }
        this.vx *= this.speed;
        this.vy *= this.speed;
        
        this.iterations = this.dist*64 / this.speed;
    }

    gameLoop(delta) {

        this.x = this.x + this.vx * this.currentFactor;
        this.y = this.y + this.vy * this.currentFactor;

        if(this.current >= this.iterations) {
            this.currentFactor = -1;
        }   
        if(this.current <= 0) {
            this.currentFactor = 1;
        }
        this.current += this.currentFactor;
        
        if (this.isPlayerOnIt()) {
            this.level.triggerGameOver();
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
        loadingContext.add(imagehit);
    }
}