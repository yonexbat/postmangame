import { GameObject } from "./gameobject.js";

const mediumSpeed = 5;
const numImages = 6;
const resourceTemplate = 'assets/player/frame-{iterator}_64.png';

export class Player extends GameObject {

    constructor(level){
        super('Player');
        this.level = level;
    }  

    static registerResources(loadingContext) {               
        loadingContext.addFromTemplate(resourceTemplate, numImages);
    }

    async load(playerData) {

        const data = {
            numImages: numImages,
            template: resourceTemplate,
            animationSpeed:  0.167,  
            x: playerData.x,
            y: playerData.y, 
            animatedW: 39,
        };
        this.loadAnimatedSprite(data);
        
        this.vx = 0;
        this.vy = 0;
      
        this.speed = mediumSpeed;

    }

    eatenByMonster() {
        this.x = 0;
        this.y = 0;
    }
    
    gameLoop(delta) {

        const now = {
            x: this.sprite.x,
            y: this.sprite.y,
            w: this.w,
            h: this.h,
            vx: this.vx*this.speed,
            vy: this.vy*this.speed,
        };
        
        const next = this.level.canMoveTo(now);

        if(next.vx !== 0 || next.vy !== 0)
        {
            if(next.vx > 0) {
                this.animatedSprites.scale.x = 1;
                this.animatedSprites.x = (64 - 39) / 2;

            } else if(next.vx < 0) {
                this.animatedSprites.scale.x = -1;
                this.animatedSprites.x = 64 - (64 - 39) / 2;
            }
            this.animatedSprites.play();
        } else {
            this.animatedSprites.stop();
        }

        this.sprite.x = this.sprite.x + next.vx;
        this.sprite.y = this.sprite.y + next.vy;

        if (next.restricted) {
            if(next.vx === 0) {
                this.vx = 0;
            }
            if(next.vy === 0) {
                this.vy = 0;
            }
                        
        }
          
    }
}