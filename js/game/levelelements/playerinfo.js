import { GameObject, TileH, TileW } from "./gameobject.js";

export class PlayerInfo extends GameObject {

    constructor(level) {
        super('Player');
        this.level = level;
        this._score = 0;
        this.inventory = new Map();
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

    gameLoop(delta) {
        this.setTextToDisplay();
    }

    addInventoryItem(inventoryItem) {
        let texture = this.getTexture(inventoryItem.resourcename);
        inventoryItem.sprite = new PIXI.Sprite(texture);

        let inventoryTypeArray;
        if (this.inventory.has(inventoryItem.key)) {
            inventoryTypeArray = this.inventory.get(inventoryItem.key);
        } else {
            inventoryTypeArray = [];
            this.inventory.set(inventoryItem.key, inventoryTypeArray);
        }
        inventoryTypeArray.push(inventoryItem);

        let index = this.getItemCount() - 1;
        const coords = this.getInvetoryCoords(index);
        inventoryItem.sprite.x = coords.x;
        inventoryItem.sprite.y = coords.y;
        this.sprite.addChild(inventoryItem.sprite);
    }

    numInventoryItems(key) {
        if (this.inventory.has(key)) {
            let arr = this.inventory.get(key);
            return arr.length;
        }
        return 0;
    }

    removeOneInventoryItem(key) {
        if (this.numInventoryItems(key) > 0) {
            const array = this.inventory.get(key);
            const firstItem = array.pop();
            if (array.length == 0) {
                this.inventory.delete(key);
            }
            this.sprite.removeChild(firstItem.sprite);
        }
    }

    getItemCount() {
        let count = 0;
        for (let value of this.inventory.values()) {
            count += value.length;
        }
        return count;
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
        if (this.level.designMode) {
            let x = Math.floor(this.level.player.x / 64);
            let y = Math.floor(this.level.player.y / 64);
            const text = `Pünktli: ${this._score}, x: ${x}, y: ${y}`;
            this.toplefttext.text = text;
        } else {
            const text = `Pünktli: ${this._score}`;
            this.toplefttext.text = text;
        }
    }

}