import {Keyboard} from "./keyboard.js";
 
export class Game {

    
    constructor() {
        this.keyboard = new Keyboard();
        this.keyboard.addKeyboardListener(this.keyBoardListener.bind(this));
    }

    get app() {
        return this._app;
    }

    set app(value) {
        this._app = value;
    }    
   

    init() {
        this.loadCanvas();
        this.loadSprites();
    }

    loadCanvas(){
        let type = "WebGL";
        if(!PIXI.utils.isWebGLSupported()){
            type = "canvas"
        };
        PIXI.utils.sayHello(type);

        //Create a Pixi Application    
        this.app = new PIXI.Application();
        this.app.renderer.view.style.position = "absolute";
        this.app.renderer.view.style.display = "block";
        this.app.renderer.autoResize = true;
        this.screenResized();
        
        //Add the canvas that Pixi automatically created for you to the HTML document
        window.document.body.appendChild(this.app.view); 
        
        window.addEventListener('resize', this.screenResized.bind(this))
    }

    screenResized(){
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
    }

    loadSprites(){
        PIXI.loader
            .add("assets/cat.png")
            .load(() => {this.setup()});
    }

    setup() {
        //Create the cat sprite
        this.cat = new PIXI.Sprite(PIXI.loader.resources["assets/cat.png"].texture);
        this.cat.vx = 0;
        this.cat.vy = 0;
        //Add the cat to the stage
        this.app.stage.addChild(this.cat);
        this.app.ticker.add(delta => {this.gameLoop(delta)});
    }

    gameLoop(delta) {

        this.cat.x += this.cat.vx;
        this.cat.y += this.cat.vy;
        
    }

    keyBoardListener(keyboardEvent) {
        console.log("keaboardevent");
        this.cat.vx = keyboardEvent.vx;
        this.cat.vy = keyboardEvent.vy;
    }
}