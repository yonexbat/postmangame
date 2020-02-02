export class LoadingContext {
    constructor() {
        this.loader = PIXI.Loader.shared;
    }

    add(resourceUrlAsString) {
        this.loader.add(resourceUrlAsString);
    }

    addFromTemplate(resourceTemplate, num) {
        for (let i = 1; i <= num; i++) {
            const resource = resourceTemplate.replace('{iterator}', `${i}`);
            this.add(resource);
        }
    }
}