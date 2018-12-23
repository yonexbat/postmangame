 export class Game {

    constructor(app) {
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
        let cat = new PIXI.Sprite(PIXI.loader.resources["assets/cat.png"].texture);
  
        //Add the cat to the stage
        this.app.stage.addChild(cat);
    }

}