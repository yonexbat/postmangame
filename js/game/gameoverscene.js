const gameoverSoundFile = 'assets/gameover.mp3';

export class GameOverScene {

    constructor(gameContext) {
        this.gameContext = gameContext;
        this.loadScene();
        this.playingsound = false;
    }

    static registerResources(loadingContext) {
        loadingContext.add(gameoverSoundFile)
    }


    loadScene() {
        this.levelContainer = new PIXI.Container();
        this.gameContext.application.stage.addChild(this.levelContainer);

        let wellDoneText = new PIXI.Text('Pass chley uf Aute!\nDrück R und probier no einisch',
            {
                fontFamily: 'Arial',
                fontSize: 72,
                fill: 0xff1010,
                align: 'center'
            });
        this.levelContainer.addChild(wellDoneText);
        this.levelContainer.visible = false;
        this.gameContext.keyboard.addKeyboardListener((event) => this.keyBoardListener(event));
    }

    set visible(val) {
        this.levelContainer.visible = val;
        if (val === true && this.playingsound == false) {
            this.playingsound = true;
            let sound = PIXI.Loader.shared.resources[gameoverSoundFile];
            sound.sound.play();
        }
    }

    get visible() {
        return this.levelContainer.visible;
    }

    keyBoardListener(keyboardEvent) {
        if (this.visible) {
            if (keyboardEvent.key === 'R' || keyboardEvent.key === 'r') {
                this.gameContext.restart();
            }
        }
    }
}