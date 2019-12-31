export class Keyboard {    
    
    constructor()
    {
        
        this.vx = 0;
        this.vy = 0;
        this.key = null;
        this.keyboardlisteners = [];

        //Register Event listeners
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
    
    addKeyboardListener(listener){
        this.keyboardlisteners.push(listener);
    }

    downListener(domObject, theEvent){        
        switch(theEvent.code)
        {
            case "ArrowDown":
                if(this.vy <= 0) {
                    this.vy = 1;
                    this.fireEvent();
                };
                break;
            case "ArrowUp":
                if(this.vy >= 0) {
                    this.vy = -1;
                    this.fireEvent();
                };
                break;
            case "ArrowLeft":
                if(this.vx >= 0){
                    this.vx = -1;
                    this.fireEvent();
                }
                break;
            case "ArrowRight":
                if(this.vx <= 0){
                    this.vx = 1;
                    this.fireEvent();
                }
                break;  
            default:
                this.key = theEvent.key;
                this.fireEvent();       
                break;   
        }
    }

    upListener(domObject, theEvent) {        
        switch(theEvent.code)
        {
            case "ArrowDown":
            case "ArrowUp":
                if(this.vy != 0) {
                    this.vy = 0;
                    this.fireEvent();
                };
                break;                        
            case "ArrowLeft":
            case "ArrowRight":
                if(this.vx != 0) {
                    this.vx = 0;
                    this.fireEvent();
                };
                break;
        }
    }

    fireEvent() {
        const event = {
            vx: this.vx,
            vy: this.vy,
            key: this.key,
        };        
        this.keyboardlisteners.forEach((listener) => {
            listener(event);
        });     
    }
}