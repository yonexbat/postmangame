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
            type = "canvas";
        };
        PIXI.utils.sayHello(type);

        //Create a Pixi Application    
        this.app = new PIXI.Application({
            antialias: true,
        });
        this.app.renderer.view.style.position = "absolute";
        this.app.renderer.view.style.display = "block";
        this.app.renderer.autoDensity = true;
        this.app.stage.interactive = true;

        this.screenResized();

        this.app.renderer.plugins.interaction.on( 'pointerdown', function() { console.log('mousedown') } );

        this.app.stage.on('pointerdown', (event) =>  {console.log('pointer down')});
        this.app.stage.on('pointerup', (event) => this.keyboard.pointerUp(event));
        this.app.stage.on('pointermove', (event) => this.keyboard.pointerMove(event));

        //Add the canvas that Pixi automatically created for you to the HTML document
        window.document.body.appendChild(this.app.view);
        window.addEventListener('resize', this.screenResized.bind(this))
    }

    screenResized() {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
    }

    loadAssets() {
        PIXI.Loader.shared
            .add("assets/playerleft_1.png")
            .add("assets/playerleft_2.png")
            .add("assets/playerright_1.png")
            .add("assets/playerright_2.png")
            .add("assets/cat.png")
            .add("assets/wall.png")
            .add("assets/exit.png")           
            .add("assets/monsterEggly.png")
            .add("assets/beep.mp3")
            .load(() => { this.load() });
    }

    load() {

        const gameContext = {
            application: this.app,
            keyboard: this.keyboard,  
            restart: this.restartGame,          
        };     

        this.scene = new Scene(gameContext);              
        this.app.ticker.add(delta => { this.gameLoop(delta) });
    }

    gameLoop(delta) {
        this.scene.gameLoop(delta);
    }

    restartGame() {
        location.reload();
    }

}