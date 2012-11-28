define(['canvas', 'board'], function(canvas, board) {

    var state = 0;
    var gameBoard = board.createNewBoardWithRandomData(100, 200);

    canvas.setUpBoard(gameBoard);

    var isAliveOrDead = function(board, row, col) {
        var result = 0;
        var sum = board[row-1][col-1] + board[row-1][col] + board[row-1][col+1]
            + board[row][col-1] + board[row][col+1]
            + board[row+1][col-1] + board[row+1][col] + board[row+1][col+1];
        if (board[row][col] === 1) {
            if (sum === 2 || sum === 3) {
                result = 1;
            }
        } else if (sum === 3) {
            result = 1;
        }
        return result;
    };

    var tick = function(board) {
        var cloneOfBoard = JSON.parse(JSON.stringify(board));
        for (var row=1; row<cloneOfBoard.length-1; row++) {
            for (var col=1; col<cloneOfBoard[row].length-1; col++) {
                cloneOfBoard[row][col] = isAliveOrDead(board, row, col);
            }
        }
        return cloneOfBoard;
    };

    var gameOfLife = function(board, drawField) {
        drawField(board);
        if (state === 1) {
            setTimeout(function() {
                gameOfLife(tick(board), drawField);
            }, 0);
        }
    };

    return {
        start: function() {
            state = 1;
            gameOfLife(gameBoard, canvas.drawField);
        },
        stop: function() {
            state = 0;
        }
    };

});