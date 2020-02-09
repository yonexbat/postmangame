import { GameObject } from "./gameobject.js";

export class PlayerInfo extends GameObject {

    constructor(level) {
        super('Player');
        this.level = level;
        this._score = 0;
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