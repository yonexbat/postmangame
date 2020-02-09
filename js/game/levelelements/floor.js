import { GameObject, TileW, TileH } from './gameobject.js';

const image = 'assets/grass.png';

export class Floor extends GameObject {


    constructor(level) {
        super('Floor');
        this.level = level;              
    }

    gameLoop(delta) {

    }

    async load(floordata) {
        let texture = this.getTexture(image);
        this.sprite = new PIXI.TilingSprite(texture, TileW*floordata.w, TileH*floordata.h);
        this.sprite.x = 0;
        this.sprite.y = 0;
        this.addPixieSprite();        
    }

    static registerResources(loadingContext) {        
        loadingContext.add(image);
    }

}