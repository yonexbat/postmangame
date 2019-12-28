const mediumSpeed = 4;

export class Player {

    constructor(scene){
        this.scene = scene;
        let texture = PIXI.loader.resources["assets/cat.png"].texture
        this.sprite = new PIXI.Sprite(texture);
        this.vx = 0;
        this.vy = 0;
        this.h = 64;
        this.w = 64;
        this.speed = mediumSpeed;
        this.scene.stage.addChild(this.sprite);
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
        
        const next = this.scene.canMoveTo(now);

        this.sprite.x = this.sprite.x + next.vx;
        this.sprite.y = this.sprite.y + next.vy;

        if (next.restricted) {
            let sound =  PIXI.loader.resources["assets/beep.mp3"]; 
            sound.sound.play();
        }
          
    }

}