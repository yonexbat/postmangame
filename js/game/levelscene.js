import { Player } from './levelelements/player.js';
import { Wall } from './levelelements/wall.js';
import { Exit } from './levelelements/exit.js';
import { MonsterEggly } from './levelelements/monstereggly.js';
import { Floor } from './levelelements/floor.js';
import { MonsterBirdi } from './levelelements/monsterbirdi.js';
import { MonsterCat } from './levelelements/monstercat.js';
import { PlayerInfo } from './levelelements/playerinfo.js';
import { Key } from './levelelements/key.js';
import { Lock } from './levelelements/lock.js';

export class LevelScene {


    constructor(gameContext) {
        this.gameContext = gameContext;
        this.children = [];
        this.width = 0;
        this.heigth = 0;
        this.gameoverListener = [];
        this.levelCompletedListener = [];  
    }

    static registerResources(loadingContext) {    

        const objectClasses = [
            Player,
            MonsterBirdi,
            MonsterEggly,
            MonsterCat,
            Floor,
            Wall,
            Exit,
            Key,
            Lock,
        ];
        
        objectClasses.forEach(clazz => {
            clazz.registerResources(loadingContext);
        });
    }
    

    async load(level) {
             
        this.gameconfig = await this.loadConfig();
        this.levelContainer = new PIXI.Container();
        this.levelContainer.sortableChildren = true;
        this.gameContext.application.stage.addChild(this.levelContainer);
        
        let levelData = await this.loadLevel(level);
        await this.buildLevel(levelData);
    }

    async buildLevel(levelData) {

        await this.loadFloor(levelData.floor);
        await this.loadExit(levelData.exit);
        await this.loadMonstersEggli(levelData.monsterseggli);
        await this.loadMonsterBirdy(levelData.monstersbirdi);
        await this.loadMonsterCat(levelData.monstercat);
        await this.loadWalls(levelData.walls);
        await this.loadPlayer(levelData.player);
        await this.loadPlayerInfo();
        await this.loadKeys(levelData.keys);
        await this.loadLocks(levelData.locks);
     
        this.gameContext.keyboard.addKeyboardListener((event) => this.keyBoardListener(event));
    }

    async loadLevel(level) {
        const url = `assets/level/level${level}.json`;
        let levelString =  await fetch(url);
        return levelString.json();
    }

    async loadConfig() {
        const url = `assets/gameconfig.json`;
        let configString =  await fetch(url);
        return configString.json();
    }


    async loadKeys(keyData) {
        for(let keyInstanceData of keyData) {
           let  key = new Key(this);
           await key.load(keyInstanceData);
           this.children.push(key);
        }
    }

    async loadLocks(list) {
        for(let instance of list) {
           let  lock = new Lock(this);
           await lock.load(instance);
           this.children.push(lock);
        }
    }

    async loadPlayer(playerData) {
        this.player = new Player(this);
        await this.player.load(playerData);
    }

    async loadPlayerInfo() {
        this.playerInfo = new PlayerInfo(this);
        await this.playerInfo.load();
        this.children.push(this.playerInfo);
    }

    async loadExit(exitData) {
        let exit = new Exit(this);
        await exit.load(exitData);
        this.children.push(exit);
    }

    async loadFloor(floorData) {
        let floor = new Floor(this);
        await floor.load(floorData);
    }

    async loadWalls(wallData) {
        for(let wallinstanceDate of wallData) {
            let wall = new Wall(this);
            await wall.load(wallinstanceDate);
            this.children.push(wall);
        }
    }

    async loadArray(dataList, constructorFn) {
        for(let dataItem of dataList) {
            let createdItem = new constructorFn(this);
            await createdItem.load(dataItem);
            this.children.push(dataItem);
        }
    }

    async loadMonstersEggli(monsterData) {
        for(let monsterinstanceData of monsterData) {
            let monster = new MonsterEggly(this);
            await monster.load(monsterinstanceData);
            this.children.push(monster);
        }
    }

    async loadMonsterBirdy(monsterData) {
        for(let monsterinstanceData of monsterData) {
            let monster = new MonsterBirdi(this);
            await monster.load(monsterinstanceData);
            this.children.push(monster);
        }
    }

    async loadMonsterCat(monsterData) {
        for(let monsterinstanceData of monsterData) {
            let monster = new MonsterCat(this);
            await monster.load(monsterinstanceData);
            this.children.push(monster);
        }
    }



    gameLoop(delta) {
        this.player.gameLoop(delta);
        this.children.forEach(x => {
            x.gameLoop(delta);
        });
        this.centerPlayer();
    }

    centerPlayer() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const deltaX = this.player.x - centerX;
        const deltaY = this.player.y - centerY;
        this.levelContainer.x = -deltaX;
        this.levelContainer.y = -deltaY;
    }

    keyBoardListener(keyboardEvent) {
        this.player.vx = keyboardEvent.vx;
        this.player.vy = keyboardEvent.vy;

        
        this.levelContainer.x = this.player.x;
        this.levelContainer.y = this.player.y;

    }

    triggerGameOver() {
        this.gameoverListener.forEach(gameOverFn => gameOverFn());
    }

    triggerLevelCompleted() {
        this.levelCompletedListener.forEach(completeFn => completeFn());
    }

    addGameOverListener(fn) {
        this.gameoverListener.push(fn);
    }

    addLevelCompletedListener(fn) {
        this.levelCompletedListener.push(fn);
    }

    canMoveTo(playerInfo) {
        const x = playerInfo.x + playerInfo.vx;
        const y = playerInfo.y + playerInfo.vy;
        const w = playerInfo.w;
        const h = playerInfo.h;

        if (x < 0 || y < 0) {
            return {
                restricted: true,
                vx: 0,
                vy: 0
            };
        }

        for (let childNode of this.children) {
            const next = childNode.canMoveTo(playerInfo);
            if (next.restricted) {
                return next;
            }
        }

        return {
            restricted: false,
            vx: playerInfo.vx,
            vy: playerInfo.vy,
        };
    }


    getchildrenOfType(typeName) {
        return this.children.filter(x => x.objectType === typeName);
    }

    removeChild(obj) {
        const index = this.children.indexOf(obj);
        this.children.splice(index, 1);
    }

    addScore(val) {
        this.playerInfo.score += val;
    }

    addInventoryItem(item) {
        this.playerInfo.addInventoryItem(item);
    }

    numInventoryItems(key) {
        return this.playerInfo.numInventoryItems(key);
    }

    removeOneInventoryItem(key) {
        this.playerInfo.removeOneInventoryItem(key);
    }

    set visible(val) {
        this.levelContainer.visible = val;
    }

    get visible() {
        return this.levelContainer.visible;
    }

    get designMode() {
        return this.gameconfig.designmode.enabled
    }
}