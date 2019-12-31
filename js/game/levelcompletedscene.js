export class LevelCompletedScene {

    constructor(stage) {
        this.stage = stage;  
        this.loadScene();  
    }

    loadScene() {
        this.levelContainer = new PIXI.Container();
        this.stage.addChild(this.levelContainer);

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

}