// import Game from "./game.js";

export default class GameView {
    constructor(root) {
        this.root = root;
        this.root.innerHTML = `
            <div class="header">
                <div class="header__turn">
                    <!-- code get from update(); -->
                </div>
                <div class="header__status">
                <!-- code get from update(); -->
                </div>
                <button type="button" class="header__restart">
                    <i class="material-icons"> Refresh </i>
                </button>
            </div>
            <div class="board">
                <div class="board__tile" data-index="0"></div>
                <div class="board__tile" data-index="1"></div>
                <div class="board__tile" data-index="2"></div>
                <div class="board__tile" data-index="3"></div>
                <div class="board__tile" data-index="4"></div>
                <div class="board__tile" data-index="5"></div>
                <div class="board__tile" data-index="6"></div>
                <div class="board__tile" data-index="7"></div>
                <div class="board__tile" data-index="8"></div>
            </div>
        `;

        this.onTileClick = undefined;
        this.onRestartClick = undefined;

        this.root.querySelectorAll(".board__tile").forEach(itrator => {
            itrator.addEventListener("click", () => {
                this.onTileClick(itrator.dataset.index);
            });
        });

        this.root.querySelector(".header__restart").addEventListener("click", ()=> {
            if(this.onRestartClick) {
                this.onRestartClick();
            }
        });
    }

    update(newGameObj) {
        this.updateTurn(newGameObj);
        this.updateStatus(newGameObj);
        this.updateBoard(newGameObj);
    }
    updateTurn(newGameObj) {
        this.root.querySelector(".header__turn").textContent = `${newGameObj.turn}'s turn`;
    }
    updateStatus(newGameObj) {
        let status = "In Progress";

        if(newGameObj.findWinnigCombination()) {
            status = `${newGameObj.turn} is Winner !`;
        }
        else if(!newGameObj.isInProgress()) {
            status = `It's a tie !`;
        }

        this.root.querySelector(".header__status").textContent = status;
    }
    updateBoard(newGameObj) {
        const winningCombination = newGameObj.findWinnigCombination();

        for(let i=0; i<newGameObj.board.length; i++) {
            const tile = this.root.querySelector(`.board__tile[data-index="${i}"]`);

            tile.classList.remove("board__tile--winner");
            tile.textContent = newGameObj.board[i];

            if(winningCombination && winningCombination.includes(i)) {
                tile.classList.add("board__tile--winner");
            }
        }
    }
}

