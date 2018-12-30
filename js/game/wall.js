export class Wall {
    constructor(scene){
        this.scene = scene;
        this.w = 64;
        this.h = 128;

        
        let texture = PIXI.loader.resources["assets/wall.png"].texture
        this.sprite = new PIXI.TilingSprite(texture, this.w, this.h);
        this.sprite.x = 128;
        this.sprite.y = 128;
        this.scene.stage.addChild(this.sprite);
    }

    gameLoop(delta){

    }

    canMoveTo(x, y, w, h) {
        if(x + w >= this.sprite.x  && x <= this.sprite.x + this.w &&
            y + h >= this.sprite.y && y <= this.sprite.y + this.h){
                return false;
        }
        return true;
    }
}