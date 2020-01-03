export class GameObject {

    constructor() {
        this.h = 64;
        this.w = 64;
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


    isPlayerOnIt() {
        
        if (this.level && this.level.player) {

            const x = this.level.player.x;
            const y = this.level.player.y;
            const h = this.level.player.h;
            const w = this.level.player.w;

            if (x + (w - 1) >= this.x && x <= this.x + (this.w - 1) &&
                y + (h - 1) >= this.y && y <= this.y + (this.h - 1)) {
                return true;
            }
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
}