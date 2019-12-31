import { Keyboard } from "./keyboard.js";
import { Scene } from "./scene.js";

export class Game {


    constructor() {
        this.keyboard = new Keyboard();
    }

    get app() {
        return this._app;
    }

    set app(value) {
        this._app = value;
    }

    init() {
        this.loadCanvas();
        this.loadAssets();
    }

    loadCanvas() {
        let type = "WebGL";
        if (!PIXI.utils.isWebGLSupported()) {
            type = "canvas"
        };
        PIXI.utils.sayHello(type);

        //Create a Pixi Application    
        this.app = new PIXI.Application({
            antialias: true,
        });
        this.app.renderer.view.style.position = "absolute";
        this.app.renderer.view.style.display = "block";
        this.app.renderer.autoResize = true;
        this.screenResized();

        //Add the canvas that Pixi automatically created for you to the HTML document
        window.document.body.appendChild(this.app.view);
        window.addEventListener('resize', this.screenResized.bind(this))
    }

    screenResized() {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
    }

    loadAssets() {
        PIXI.loader
            .add("assets/cat.png")
            .add("assets/wall.png")
            .add("assets/exit.png")
            .add("assets/monsterEggly.png")
            .add("assets/beep.mp3")
            .load(() => { this.load() });
    }

    load() {

        this.scene = new Scene(this.app.stage);
        this.scene.loadScene();
        this.keyboard.addKeyboardListener(this.scene.keyBoardListener.bind(this.scene));
        this.app.ticker.add(delta => { this.gameLoop(delta) });
    }

    gameLoop(delta) {
        this.scene.gameLoop(delta);
    }
}