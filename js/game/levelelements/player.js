import { GameObject } from "./gameobject.js";

const mediumSpeed = 5;
const wallHitSoundFile = 'assets/beep.mp3';

export class Player extends GameObject {

    constructor(level){
        super('Player');
        this.level = level;
    }  

    async load(playerData) {
        this.sprite = new PIXI.Container();
        this.level.levelContainer.addChild(this.sprite);

        let textures = [];

        for(let i=1; i<= 6; i++) {
            
            const frameImage = `assets/player/frame-${i}_64.png`;
            const texture = this.getTexture(frameImage);
            textures.push(texture);
        }
        
        this.animatedSprites = new PIXI.AnimatedSprite(textures);
        this.animatedSprites.animationSpeed = 0.167; 
        this.animatedSprites.x = (64 - 39) / 2;

        this.sprite.addChild(this.animatedSprites);
        
        this.vx = 0;
        this.vy = 0;
        this.h = 64;
        this.w = 64;
        
        this.x = playerData.x * 64;
        this.y = playerData.y * 64;

        this.speed = mediumSpeed;
        this.addPixieSprite();
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
            let sound =  this.getResource(wallHitSoundFile);
            sound.sound.play();
        }
          
    }

    static registerResources(loadingContext) {        
        for (let i=1; i<= 6; i++) {
            const frameImage = `assets/player/frame-${i}_64.png`;
            loadingContext.add(frameImage);
        } 
        loadingContext.add(wallHitSoundFile);
    }
}