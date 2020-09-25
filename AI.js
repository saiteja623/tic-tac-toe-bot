//tic tac toe board
var board = ["x", "", "", "", "", "", "", "", ""];
//declare the scores
let scores = {
  x: 1,
  o: -1,
  tie: 0,
};
var currentPlayer = "o"; //declare the current player
//make changes to the board;
function markSymbol(i) {
  if (currentPlayer == "o" && board[i] == "") {
    board[i] = "o";
    resetBoard(board);
    changePlayer();
    var winner = checkwin(); //checking if player wins
    if (winner != null && winner != undefined) {
      declareWin(winner);
      setTimeout(emptyBoard, 1000);
    } else {
      //if the player doesnot wins
      if (board[4] == "") {
        //if the middle place is empty then best move is 4 index;
        index = 4;
      } else {
        //if it is not empty then predict the best move
        var index = nextBestStep(board);
      }
      board[index] = "x";
      resetBoard(board);
      changePlayer();
      var winner2 = checkwin(); //check if the move wins the game
      if (winner2 != null && winner2 != undefined) {
        declareWin(winner2);
        setTimeout(emptyBoard, 1000);
      }
    }
  }
}
//reset the board
function resetBoard(board) {
  var cells = document.querySelectorAll(".cell");
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerHTML = board[i];
  }
}
function emptyBoard() {
  var cells = document.querySelectorAll(".cell");
  for (var i = 0; i < cells.length; i++) {
    if (i == 0) {
      cells[i].innerHTML = "x";
    } else {
      cells[i].innerHTML = "";
    }
  }
  for (var i = 0; i < board.length; i++) {
    if (i == 0) {
      board[i] = "x";
    } else {
      board[i] = "";
    }
  }
  console.log("empty", board);
}

//declare the winner on screen
function declareWin(winner) {
  var winId = document.getElementById("win");
  if (winner == "x" || winner == "o") {
    winId.innerHTML = winner + "  Wins";
  } else {
    winId.innerHTML = winner + "!";
  }
  setTimeout(() => {
    winId.innerHTML = "";
  }, 1000);
}
//change the player
function changePlayer() {
  currentPlayer == "o" ? (currentPlayer = "o") : (currentPlayer = "o");
}
//check if he wins
function checkwin() {
  var winner = null;
  var emptyEle = null;
  if (checkEqual(0, 1, 2)) {
    winner = board[0];
    return winner;
  } else if (checkEqual(3, 4, 5)) {
    winner = board[3];
    return winner;
  } else if (checkEqual(6, 7, 8)) {
    winner = board[6];
    return winner;
  } else if (checkEqual(0, 3, 6)) {
    winner = board[0];
    return winner;
  } else if (checkEqual(1, 4, 7)) {
    winner = board[1];
    return winner;
  } else if (checkEqual(2, 5, 8)) {
    winner = board[2];
    return winner;
  } else if (checkEqual(0, 4, 8)) {
    winner = board[0];
    return winner;
  } else if (checkEqual(2, 4, 6)) {
    winner = board[2];
    return winner;
  } else {
    for (var i = 0; i < board.length; i++) {
      if (board[i] != "") {
        emptyEle = emptyEle + 1;
      }
    }
    if (emptyEle == 9) {
      return "tie";
    }
  }
}
//check  if all the three indexes are equal
function checkEqual(a, b, c) {
  if (board[a] == board[b] && board[b] == board[c]) {
    if (board[a] != "") {
      return true;
    }
  } else {
    return false;
  }
}

//deciding the next best step by AI
function nextBestStep() {
  var bestScore = -Infinity;
  var bestIndex = 0;
  //find the empty slot
  for (var i = 0; i < board.length; i++) {
    if (board[i] == "") {
      board[i] = "x";
      var score = miniMax(board, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        bestIndex = i;
      }
    }
  }
  return bestIndex;
}
function miniMax(board, isMaxiPlaying) {
  //check if the selected place wins
  var winner = checkwin();
  if (winner != null) {
    return scores[winner];
  }
  if (isMaxiPlaying) {
    //check for ai
    let bestScore = -Infinity;
    for (var i = 0; i < board.length; i++) {
      if (board[i] == "") {
        board[i] = "x";
        let score = miniMax(false);
        board[i] = "";
        if (score > bestScore) {
          bestScore = score;
        }
      }
    }
    return bestScore;
  } else {
    //check for human
    let bestScore = Infinity;
    for (var i = 0; i < board.length; i++) {
      if (board[i] == "") {
        board[i] = "o";
        let score = miniMax(board, true);
        board[i] = "";
        if (score < bestScore) {
          bestScore = score;
        }
      }
    }
    return bestScore;
  }
}
