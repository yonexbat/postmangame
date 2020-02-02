export class LoadingContext {
    constructor() {
        this.loader = PIXI.Loader.shared;
    }

    add(resourceUrlAsString) {
        this.loader.add(resourceUrlAsString);
    }
}