import { GameObject } from "./gameobject.js";

const mediumSpeed = 5;

export class Player extends GameObject {

    constructor(level, playerData){
        super();
        this.level = level;

        this.sprite = new PIXI.Container();
        this.level.levelContainer.addChild(this.sprite);

        let textures = [
            PIXI.Loader.shared.resources["assets/playerright_1.png"].texture,
            PIXI.Loader.shared.resources["assets/playerright_2.png"].texture,
        ];

        
        this.animatedSprites = new PIXI.AnimatedSprite(textures);
        this.animatedSprites.animationSpeed = 0.167; 

        this.sprite.addChild(this.animatedSprites);
        
        this.vx = 0;
        this.vy = 0;
        this.h = 64;
        this.w = 64;
        
        this.x = playerData.x * 64;
        this.y = playerData.y * 64;

        this.speed = mediumSpeed;
        this.level.levelContainer.addChild(this.sprite);
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
                this.animatedSprites.x = 0;

            } else if(next.vx < 0) {
                this.animatedSprites.scale.x = -1;
                this.animatedSprites.x = 64;
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
            let sound =  PIXI.Loader.shared.resources["assets/beep.mp3"]; 
            sound.sound.play();
        }
          
    }

}