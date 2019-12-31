export class LevelCompletedScene {

    constructor(gameContext) {
        this.gameContext = gameContext;  
        this.loadScene();  
    }

    loadScene() {
        this.levelContainer = new PIXI.Container();
        this.gameContext.application.stage.addChild(this.levelContainer);

        let wellDoneText = new PIXI.Text('Guet gmacht Aute!',
        { 
             fontFamily: 'Arial', 
             fontSize: 72, 
             fill: 0xff1010, 
             align: 'center' 
        });      
        this.levelContainer.addChild(wellDoneText);
        this.levelContainer.visible = false;
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
                location.reload();
            }
        }              
    }

}