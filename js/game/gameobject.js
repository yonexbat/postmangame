export class GameObject {

    canMoveTo(player) {

        //nächste position berechnen
        const x = player.x + player.vx;
        const y = player.y + player.vy;
        const w = player.w;
        const h = player.h;

       


        if (x + (w - 1) >= this.sprite.x && x <= this.sprite.x + (this.w - 1) &&
            y + (h - 1) >= this.sprite.y && y <= this.sprite.y + (this.h - 1)) {

                
            let deltaX = 0;
            if (player.vx > 0) {
                deltaX = this.sprite.x - (player.x + player.w);
                if(deltaX < 0) {
                    deltaX = 0;
                }
            }
            if (player.vx < 0) {
                deltaX =  -1*(player.x - (this.sprite.x + this.w));
                if(deltaX > 0) {
                    deltaX  = 0;
                }

            }

            
            let deltaY = 0;
            
            
            if (player.vy > 0) {
                deltaY = this.sprite.y - (player.y + (player.h));
                if(deltaY < 0) {
                    deltaY = 0;
                }
            }
            if (player.vy < 0) {
                deltaY = -1*(player.y - (this.sprite.y + this.h));
                if(deltaY > 0) {
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
            vx: player.vx,
            vy: player.vy,
        };
    }
}