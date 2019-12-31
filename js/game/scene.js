import { Level1Scene } from './level1scene.js';
import { GameOverScene } from './gameoverscene.js';
import { LevelCompletedScene } from './levelcompletedscene.js';

export class Scene {

    constructor(stage) {
        this.stage = stage;    
        this.loadScene();    
    }

    loadScene() {
        this.level1Scene = new Level1Scene(this.stage);
        this.gameOverScene = new GameOverScene(this.stage);
        this.leveCompletedScene = new LevelCompletedScene(this.stage);

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

    keyBoardListener(keyboardEvent) {
        this.level1Scene.keyBoardListener(keyboardEvent);        
    }
}