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
import { Coin } from './levelelements/coin.js';

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
            Coin,
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
      
        this.levelContainer.scale.x = this.gameconfig.scale;
        this.levelContainer.scale.y = this.gameconfig.scale;
      
        await this.buildLevel(levelData);
    }

    async buildLevel(levelData) {

        await this.loadItem(levelData.floor, Floor);
        await this.loadItem(levelData.exit, Exit);
        await this.loadArray(levelData.monsterseggli, MonsterEggly);
        await this.loadArray(levelData.monstersbirdi, MonsterBirdi);
        await this.loadArray(levelData.keys, Key);
        await this.loadArray(levelData.locks, Lock);
        await this.loadArray(levelData.coins, Coin);
        await this.loadArray(levelData.walls, Wall);
        await this.loadArray(levelData.monstercat, MonsterCat);

        await this.loadPlayer(levelData.player);
        this.playerInfo = await this.loadItem(null, PlayerInfo);

        this.gameContext.keyboard.addKeyboardListener((event) => this.keyBoardListener(event));
    }


    async loadPlayer(playerData) {
        this.player = new Player(this);
        await this.player.load(playerData);
    }

    async loadLevel(level) {
        const url = `assets/level/level${level}.json`;
        let levelString = await fetch(url);
        return levelString.json();
    }

    async loadConfig() {
        const url = `assets/gameconfig.json`;
        let configString = await fetch(url);
        return configString.json();
    }


    async loadArray(dataList, constructorFn) {
        for (let dataItem of dataList) {
            await this.loadItem(dataItem, constructorFn);
        }
    }

    async loadItem(data, constructorFn) {
        let item = new constructorFn(this);
        await item.load(data);
        this.children.push(item);
        return item;
    }


    gameLoop(delta) {
        this.player.gameLoop();
        this.children.forEach(x => {
            x.gameLoop(delta);
        });
        this.centerPlayer();
    }

    centerPlayer() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const deltaX = (this.player.x - centerX);
        const deltaY = (this.player.y - centerY);
        this.levelContainer.x = -deltaX*this.gameconfig.scale;
        this.levelContainer.y = -deltaY*this.gameconfig.scale;
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