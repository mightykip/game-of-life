define(function() {

    var createNewBoardWithRandomData = function(rows, columns) {
        var board = [];
        for (var row=0; row<rows; row++) {
            board[row] = [];
            for (var col=0; col< columns; col++) {
                board[row][col] = Math.floor(Math.random()*2);
            }
        }
        return board;
    };

    return {
        createNewBoardWithRandomData: createNewBoardWithRandomData
    };

});