export class GameObject {

    constructor() {
        this.h = 64;
        this.w = 64;
        this.objectType = 'Generic'; 
    }

    get x() {
        return this.sprite.x;
    }

    set x(val) {
        this.sprite.x = val;
    }

    get y() {
        return this.sprite.y;
    }

    set y(val) {
        this.sprite.y = val;
    }

    get zIndex() {
        return this.sprite.zIndex;
    }

    set zIndex(val) {
        this.sprite.zIndex = val;
    }

    isPlayerOnIt() {
        
        if (this.level && this.level.player) {
            return this.doesIntersect(this.level.player, this);
        }
        return false;
    }


    canMoveTo(playerInfo) {

        //nächste position berechnen
        const x = playerInfo.x + playerInfo.vx;
        const y = playerInfo.y + playerInfo.vy;
        const w = playerInfo.w;
        const h = playerInfo.h;



        if (x + (w - 1) >= this.x && x <= this.x + (this.w - 1) &&
            y + (h - 1) >= this.y && y <= this.y + (this.h - 1)) {

            let deltaX = 0;
            if (playerInfo.vx > 0) {
                deltaX = this.x - (playerInfo.x + playerInfo.w);
                if (deltaX < 0) {
                    deltaX = 0;
                }
            }
            if (playerInfo.vx < 0) {
                deltaX = -1 * (playerInfo.x - (this.x + this.w));
                if (deltaX > 0) {
                    deltaX = 0;
                }

            }

            let deltaY = 0;

            if (playerInfo.vy > 0) {
                deltaY = this.y - (playerInfo.y + (playerInfo.h));
                if (deltaY < 0) {
                    deltaY = 0;
                }
            }
            if (playerInfo.vy < 0) {
                deltaY = -1 * (playerInfo.y - (this.y + this.h));
                if (deltaY > 0) {
                    deltaY = 0;
                }
            }

            return {
                restricted: true,
                vx: deltaX,
                vy: deltaY,
            };
        }

        return {
            restricted: false,
            vx: playerInfo.vx,
            vy: playerInfo.vy,
        };
    }

    async load() {

    }

    doesIntersect(gameObject1, gameObject2) {

        const x1 = gameObject1.x;
        const y1 = gameObject1.y;
        const h1 = gameObject1.h;
        const w1 = gameObject1.w;

        const x2 = gameObject2.x;
        const y2 = gameObject2.y;
        const h2 = gameObject2.h;
        const w2 = gameObject2.w;

        if (x1 + (w1 - 1) >= x2 && x1 <= x2 + (w2 - 1) &&
            y1 + (h1 - 1) >= y2 && y1 <= y2 + (h2 - 1)) {
            return true;
        }

        return false;
    }

    removeSelf() {
        this.level.removeChild(this);
        this.sprite.visible = false;
    }
}