import {Game} from "./infra/game.js"

document.addEventListener("DOMContentLoaded", function(event) { 
    const game = new Game();
    game.init();
 });