require(["jquery"], function($) {

    var board = [];
    for (var row=0; row<100; row++) {
        board[row] = [];
        for (var col=0; col< 100; col++) {
            board[row][col] = Math.floor(Math.random()*2);
        }
    }

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
        console.log('tick');
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
        setTimeout(function() {
            gameOfLife(tick(board), drawField);
        }, 0);
    };

    $(function() {
        var xStep, yStep;

        window.addEventListener('resize', resizeCanvas, false);

        var drawGrid = function() {
            var canvas = document.getElementById('grid'),
                context = canvas.getContext('2d');

            context.strokeStyle = "#ddd";

            context.beginPath();
            for (y = 0; y <= canvas.height; y += yStep) {
                context.moveTo(0, y);
                context.lineTo(canvas.width, y);
            }
            context.stroke();

            context.beginPath();
            for(x = 0; x <= canvas.width; x += xStep) {
                context.moveTo(x, 0);
                context.lineTo(x, canvas.height);
            }
            context.stroke();
        };

        var resizeCanvas = function() {
            var canvas = document.getElementById('canvas'),
                grid = document.getElementById('grid'),
                context = canvas.getContext('2d');
            grid.width = canvas.width = window.innerWidth;
            grid.height = canvas.height = window.innerHeight;
            xStep = canvas.width / 100;
            yStep = canvas.height / 100;
            drawGrid();
            var drawField = function(board) {
                var canvas = document.getElementById('canvas'),
                    grid = document.getElementById('grid'),
                    context = canvas.getContext('2d');
                context.clearRect (0 , 0 , canvas.width , canvas.height);
                for (var row=1; row<board.length-1; row++) {
                    for (var col=1; col< board[row].length-1; col++) {
                        if (board[row][col] === 1)
                            drawBlock(row, col);
                    }
                }
            };
            gameOfLife(board, drawField);
        };
        resizeCanvas();

        function drawBlock(x, y) {
            var canvas = document.getElementById('canvas'),
                context = canvas.getContext('2d');
            context.fillStyle = '#000';
            context.fillRect (x*xStep+1, y*yStep+1, xStep-1, yStep-1);
        }
    });
});
