import { GameObject } from "./gameobject.js";
import { TileW } from "./gameobject.js";
import { TileH } from "./gameobject.js";

export class MonsterBirdi extends GameObject {

    constructor(level) {
        super('Birdi');
        this.level = level;
    }


    static registerResources(loadingContext) {
        for (let i = 1; i <= 8; i++) {
            const frameImage = `assets/birdi/frame-${i}.png`;
            loadingContext.add(frameImage);
        }
    }


    async load(monsterData) {

        this.sprite = new PIXI.Container();
        this.level.levelContainer.addChild(this.sprite);

        let textures = [];

        for (let i = 1; i <= 8; i++) {
            const frameImage = `assets/birdi/frame-${i}.png`;          
            const texture = this.getTexture(frameImage);
            textures.push(texture);
        }

        this.animatedSprites = new PIXI.AnimatedSprite(textures);
        this.animatedSprites.animationSpeed = 0.167;
        this.animatedSprites.x = (TileW - TileW) / 2;

        this.sprite.addChild(this.animatedSprites);
        this.animatedSprites.play();


        this.x = monsterData.x * TileW;
        this.y = monsterData.y * TileH;
        this.zIndex = 1;


        this.speed = monsterData.speed;
        this.triggerdist = monsterData.triggerdist * TileW;

        this.addPixieSprite();
        this.current = 0;
        this.currentFactor = 1;

        this.wokenup = false;
    }

    gameLoop(delta) {

        const deltax = this.level.player.x - this.x;
        const deltay = this.level.player.y - this.y;
        const mag = Math.sqrt(deltax * deltax + deltay * deltay);

        if (mag < this.triggerdist) {
            this.wokenup = true;
        }

        if (this.wokenup) {

            const dirx = Math.round((deltax / mag) * this.speed);
            const diry = Math.round((deltay / mag) * this.speed);

            this.x += dirx;
            this.y += diry;

            if (dirx > 0) {
                this.animatedSprites.scale.x = 1;
                this.animatedSprites.x = (TileW - TileW) / 2;

            } else if (dirx < 0) {
                this.animatedSprites.scale.x = -1;
                this.animatedSprites.x = TileW - (TileW - TileW) / 2;
            }
        }


        if (this.isPlayerOnIt()) {
            this.level.triggerGameOver();
        }

        //If bird is on cat, cat will eat bird.
        const cats = this.level.getchildrenOfType('Cat');
        for (const cat of cats) {
            if (this.doesIntersect(cat, this)) {
                this.birdDies(cat);
            }
        };
    }

    birdDies(cat) {
        cat.meow();
        this.removeSelf();
    }



    canMoveTo(player) {
        return {
            restricted: false,
            vx: player.vx,
            vy: player.vy,
        };
    }
}