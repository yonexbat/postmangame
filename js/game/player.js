export class Player {
    constructor(scene){
        this.scene = scene;
        this.sprite = new PIXI.Sprite(PIXI.loader.resources["assets/cat.png"].texture);
        this.vx = 0;
        this.vy = 0;
        this.h = 64;
        this.w = 64;
        this.scene.stage.addChild(this.sprite);
    }  
    
    gameLoop(delta) {

        const newX = this.sprite.x + this.vx;
        const newY =  this.sprite.y + this.vy;
        if(this.scene.canMoveTo(newX, newY, this.w, this.h))
        {
            this.sprite.x = newX;
            this.sprite.y = newY;
            return;        
        }
        this.vx = 0;
        this.vy = 0;        
    }
}