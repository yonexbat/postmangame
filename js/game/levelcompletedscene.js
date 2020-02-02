const completedSoundfile = 'assets/gamecompleted.mp3';

export class LevelCompletedScene {

    constructor(gameContext) {
        this.gameContext = gameContext;  
        this.loadScene();  
        this.playingsound = false;
    }

    static registerResources(loadingContext) {        
        loadingContext.add(completedSoundfile);
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
        if(val == true && this.playingsound == false) {
            this.playingsound = true;
            let sound = PIXI.Loader.shared.resources[completedSoundfile];
            sound.sound.play();
        }
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