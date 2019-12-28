export class GameObject {
    
    canMoveTo(player) {

        //nächste position berechnen
        const x = player.x + player.vx;
        const y = player.y + player.vy;
        const w = player.w;
        const h = player.h;

        if(x + w >= this.sprite.x  && x <= this.sprite.x + this.w &&
            y + h >= this.sprite.y && y <= this.sprite.y + this.h) {
             
            return {
                restricted: true,
                vx: 0,
                vy: 0
            };   
        }

        return {
            restricted: false,
            vx: player.vx,
            vy: player.vy,
        };
    }
}