import {Keyboard} from "./keyboard.js";
 
export class Game {

    
    constructor() {
        this.direction = 1;
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
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        
        //Add the canvas that Pixi automatically created for you to the HTML document
        window.document.body.appendChild(this.app.view);        
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

        /*
        if(this.direction > 0) {
            this.cat.x += 1;
        } else {
            this.cat.x -= 1;
        }
        if(this.cat.x > window.innerWidth)
        {
            this.direction = -1;
        }
        else if(this.cat.x < 0) {
            this.direction = 1;
        }*/
    }

    keyBoardListener(keyboardEvent) {
        console.log("keaboardevent");
        this.cat.vx = keyboardEvent.vx;
        this.cat.vy = keyboardEvent.vy;
    }
}