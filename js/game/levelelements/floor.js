import { GameObject, TileW, TileH } from './gameobject.js';

const image = 'assets/grass.png';

export class Floor extends GameObject {


    constructor(level) {
        super('Floor');
        this.level = level;              
    }

    gameLoop(delta) {

    }

    async load() {
        let texture = this.getTexture(image);
        this.sprite = new PIXI.TilingSprite(texture, TileW*10000, TileH*10000);
        this.sprite.x = 0;
        this.sprite.y = 0;
        this.addPixieSprite();        
    }

    static registerResources(loadingContext) {        
        loadingContext.add(image);
    }

}