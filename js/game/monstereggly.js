import { GameObject } from "./gameobject.js";

export class MonsterEggly extends GameObject {

    constructor(level) {
        super();
        this.level = level;
      
    }

    async load(monsterData) {
        
        let texture = PIXI.Loader.shared.resources[`assets/eggli/frame-${1}.png`].texture
        this.sprite = new PIXI.Sprite(texture);


        this.x = monsterData.x * 64;
        this.y = monsterData.y * 64;

        this.dir = monsterData.dir;
        this.dist = monsterData.dist;

        this.speed = monsterData.speed;

        this.level.levelContainer.addChild(this.sprite);
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
        loadingContext.loader.add(`assets/eggli/frame-${1}.png`);
        loadingContext.loader.add(`assets/eggli/gothit.png`);
    }
}