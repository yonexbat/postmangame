import { GameObject } from "./gameobject.js";

export class Exit extends GameObject {

    constructor(level, exitData) {
        super();

        this.level = level;

        let texture = PIXI.Loader.shared.resources["assets/exit.png"].texture
        this.sprite = new PIXI.Sprite(texture);

        this.x = exitData.x * 64;
        this.y = exitData.y * 64;
        
        this.level.levelContainer.addChild(this.sprite); 
    }

    gameLoop(delta) {
        if(this.isPlayerOnIt()) {
            this.level.triggerLevelCompleted();            
        } 
    }

    canMoveTo(player) {
        return {
            restricted: false,
            vx: player.vx,
            vy: player.vy,
        };        
    }

    static registerResources(loadingContext) {        
        loadingContext.loader.add("assets/exit.png");
    }

}