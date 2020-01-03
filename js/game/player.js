import { GameObject } from "./gameobject.js";

const mediumSpeed = 5;

export class Player extends GameObject {

    constructor(level){
        super();
        this.level = level;
        let texture = PIXI.loader.resources["assets/playerright_1.png"].texture
        this.sprite = new PIXI.Sprite(texture);
        this.vx = 0;
        this.vy = 0;
        this.h = 64;
        this.w = 64;
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

        this.sprite.x = this.sprite.x + next.vx;
        this.sprite.y = this.sprite.y + next.vy;

        if (next.restricted) {
            if(next.vx === 0) {
                this.vx = 0;
            }
            if(next.vy === 0) {
                this.vy = 0;
            }
            let sound =  PIXI.loader.resources["assets/beep.mp3"]; 
            sound.sound.play();
        }
          
    }

}