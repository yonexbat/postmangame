import { Keyboard } from "./keyboard.js";
import { Scene } from "./scene.js";
import { MonsterBirdi } from "./levelelements/monsterbirdi.js";
import { Player } from "./levelelements/player.js";
import { MonsterEggly } from "./levelelements/monstereggly.js";
import {Floor} from "./levelelements/floor.js";
import { Wall } from "./levelelements/wall.js";
import { Exit } from "./levelelements/exit.js";
import { MonsterCat } from "./levelelements/monstercat.js";
import { LoadingContext } from "./loadingcontext.js";

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

        this.app.renderer.plugins.interaction.on('pointerdown', function() { console.log('mousedown') } );


        //Add the canvas that Pixi automatically created for you to the HTML document
        window.document.body.appendChild(this.app.view);
        window.addEventListener('resize', this.screenResized.bind(this))
    }

    screenResized() {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
    }

    loadAssets() {

        const objectClasses = [
            Player,
            MonsterBirdi,
            MonsterEggly,
            MonsterCat,
            Floor,
            Wall,
            Exit,
        ];

        const loadingContext = new LoadingContext();

        objectClasses.forEach(clazz => {
            clazz.registerResources(loadingContext);
        });
       

        PIXI.Loader.shared                       
            .load(() => { this.load() });
    }

    async load() {

        const gameContext = {
            application: this.app,
            keyboard: this.keyboard,  
            restart: this.restartGame, 
            loader: PIXI.Loader.shared,         
        };     

        this.scene = new Scene(gameContext);        
        await this.scene.load();      
        this.app.ticker.add(delta => { this.gameLoop(delta) });
        window.focus();
    }

    gameLoop(delta) {
        this.scene.gameLoop(delta);
    }

    restartGame() {
        location.reload();
    }
}