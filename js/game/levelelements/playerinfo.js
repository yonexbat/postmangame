import { GameObject,TileH, TileW } from "./gameobject.js";

export class PlayerInfo extends GameObject {

    constructor(level) {
        super('Player');
        this.level = level;
        this._score = 0;
        this.inventory = [];
    }

    static registerResources(loadingContext) {
    }

    get score() {
        return this._score;
    }

    set score(val) {
        this._score = val;
        this.setTextToDisplay();        
    }

    async load() {
        this.sprite = new PIXI.Container();
        this.level.player.sprite.addChild(this.sprite);
        this.toplefttext = new PIXI.Text('hello',
            {
                fontFamily: 'Arial',
                fontSize: 36,
                fill: 0xff1010,
                align: 'center'
            });

        let pos = this.getTopLeft();
        this.toplefttext.x = pos.x;
        this.toplefttext.y = pos.y;


        this.sprite.addChild(this.toplefttext);
        this.score = 0;
    }

    addInventoryItem(resourcename) {
        let texture = this.getTexture(resourcename);
        let inventorySprite = new PIXI.Sprite(texture);
        this.inventory.push(inventorySprite);
        let index = this.inventory.indexOf(inventorySprite);
        const coords  = this.getInvetoryCoords(index);
        inventorySprite.x = coords.x;
        inventorySprite.y = coords.y;
        this.sprite.addChild(inventorySprite);
    }

    getInvetoryCoords(index) {
        let topleft = this.getTopLeft();
        topleft.y += TileH;
        topleft.x += TileW * index;
        return topleft;
    }

    getTopLeft() {
        const relX = window.innerWidth / 2;
        const relY = window.innerHeight / 2;
        return {
            x: -1 * relX,
            y: -1 * relY,
        }
    }

    setTextToDisplay() {
        const text = `Pünktli: ${this._score}`
        this.toplefttext.text = text;
    }

}