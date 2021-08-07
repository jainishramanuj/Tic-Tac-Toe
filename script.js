import Game from "./game.js";
import GameView from "./gameView.js";

let newGame = new Game();
let newGameView = new GameView(document.getElementById('app'));

newGameView.onTileClick = function(i) {
    newGame.makeMove(i);
    newGameView.update(newGame);
};

newGameView.onRestartClick = function() {
    newGame = new Game();
    newGameView.update(newGame);
};

newGameView.update(newGame);