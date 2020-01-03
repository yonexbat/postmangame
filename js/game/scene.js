import { Level1Scene } from './level1scene.js';
import { GameOverScene } from './gameoverscene.js';
import { LevelCompletedScene } from './levelcompletedscene.js';

export class Scene {

    constructor(gameContext) {
        this.gameContext = gameContext;
        this.loadScene();    
    }

    loadScene() {
        this.level1Scene = new Level1Scene(this.gameContext);
        this.gameOverScene = new GameOverScene(this.gameContext);
        this.leveCompletedScene = new LevelCompletedScene(this.gameContext);

        this.level1Scene.addGameOverListener((result) => {
            this.gameOverScene.visible = true;
            this.level1Scene.visible = false;
        });       

        this.level1Scene.addLevelCompletedListener(() => {
            this.leveCompletedScene.visible = true;
            this.level1Scene.visible = false;
        })
    }

    gameLoop(delta) {
       this.level1Scene.gameLoop(delta);
    }
}