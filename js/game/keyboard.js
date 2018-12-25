export class Keyboard {
    
    constructor()
    {
        const thisObject = this;
        window.addEventListener(
            "keydown", function(event) {
                thisObject.downListener(this, event);
                event.preventDefault();
            }, false);
        
        window.addEventListener(
            "keyup", function(event) {
                thisObject.upListener(this, event);
                event.preventDefault();
            }, false);
    } 
    
    downListener(domObject, theEvent){
        console.log(`down clicked ${theEvent.code} `);
    }

    upListener(domObject, theEvent) {
        console.log(`up clicked ${theEvent.code} `);
    }
}