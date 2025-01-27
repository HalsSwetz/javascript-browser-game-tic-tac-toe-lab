//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.

let board = [
    '','','',
    '','','',
    '','',''
];
let turn = "X";
let winner = false;
let tie = false;

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#resetButton');


const render = () => {
    updateBoard();
    updateMessage();
}

const updateBoard = () => {
    board.forEach((value, index) => {
        const square = squareEls[index];
        square.textContent = value;
        square.style.fontSize = '45px';
        square.style.color = 'green';
        
})
};

const updateMessage = () => {
    if (winner === false && tie === false) {
        messageEl.textContent = `It's ${turn}'s turn`
    } else if (winner === false && tie === true) {
        messageEl.textContent = 'Tie game!';
    } else  {
        messageEl.textContent = `${turn} wins!`;
    }
}

const placePiece = (index) => {
    board[index] = turn;
    console.log(board);
}

const handleClick = (event) => {
    const squareIndex = parseInt(event.target.id);
    if (board[squareIndex] !== '' || winner || tie) {
        return;
    }
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    if(!winner && !tie) {
    switchPlayerTurn();
    }
    render();
}

const checkForTie = () => {
 if (winner) return;
 if (!board.includes('')){
    tie = true;
 }
}

const switchPlayerTurn = () => {
    if (winner) return;
    if (turn === 'X') {
        turn = 'O';
    } else {
        turn = 'X';
    }
    console.log('Current turn:', turn);
}


const checkForWinner = () => {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
        winner = true;
        return;
    }
}
if (!board.includes('') && !winner) {
    tie = true;
}
}



const init = () => {
    board = [
        '','','',
        '','','',
        '','',''
    ];
    turn = "X";
    winner = false;
    tie = false;
    render ();
}


squareEls.forEach(square => {
    square.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init);































