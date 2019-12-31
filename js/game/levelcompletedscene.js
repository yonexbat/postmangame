export class LevelCompletedScene {

    constructor(gameContext) {
        this.gameContext = gameContext;  
        this.loadScene();  
    }

    loadScene() {
        this.levelContainer = new PIXI.Container();
        this.gameContext.application.stage.addChild(this.levelContainer);

        let wellDoneText = new PIXI.Text('Guet gmacht Aute!\n Drück R, um no einisch ...',
        { 
             fontFamily: 'Arial', 
             fontSize: 72, 
             fill: 0x0010ff, 
             align: 'center' 
        });      
        this.levelContainer.addChild(wellDoneText);
        this.levelContainer.visible = false;
        this.gameContext.keyboard.addKeyboardListener((event) => this.keyBoardListener(event));
    }

    set visible(val) {
        this.levelContainer.visible = val;
    }

    get visible() {
        return this.levelContainer.visible;
    }

    keyBoardListener(keyboardEvent) { 
        if(this.visible) {
           
            if(keyboardEvent.key === 'R' || keyboardEvent.key === 'r') {
                this.gameContext.restart();
            }
        }              
    }

}