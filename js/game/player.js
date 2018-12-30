export class Player {
    constructor(stage){
        this.stage = stage;
        this.sprite = new PIXI.Sprite(PIXI.loader.resources["assets/cat.png"].texture);
        this.vx = 0;
        this.vy = 0;
        this.stage.addChild(this.sprite);
    }  
    
    gameLoop(delta) {
        this.sprite.x += this.vx;
        this.sprite.y += this.vy;        
    }
}