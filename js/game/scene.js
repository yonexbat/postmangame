import { Level1Scene } from './level1scene.js';

export class Scene {

    constructor(stage) {
        this.stage = stage;        
    }

    loadScene() {
        this.level1Scene = new Level1Scene(this.stage);
        this.level1Scene.loadScene();
    }

    gameLoop(delta) {
       this.level1Scene.gameLoop(delta);
    }

    keyBoardListener(keyboardEvent) {
        this.level1Scene.keyBoardListener(keyboardEvent);        
    }
}