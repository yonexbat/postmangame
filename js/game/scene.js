import { LevelScene } from './levelscene.js';
import { GameOverScene } from './gameoverscene.js';
import { LevelCompletedScene } from './levelcompletedscene.js';

export class Scene {

    constructor(gameContext) {
        this.gameContext = gameContext;  
    }

    async load() {
        this.levelScene = new LevelScene(this.gameContext);
        await this.levelScene.load(1);
        
        this.gameOverScene = new GameOverScene(this.gameContext);
        this.leveCompletedScene = new LevelCompletedScene(this.gameContext);

        this.levelScene.addGameOverListener((result) => {
            this.gameOverScene.visible = true;
            this.levelScene.visible = false;
        });       

        this.levelScene.addLevelCompletedListener(() => {
            this.leveCompletedScene.visible = true;
            this.levelScene.visible = false;
        })
    }

    gameLoop(delta) {
       this.levelScene.gameLoop(delta);
    }
}