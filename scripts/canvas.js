define(function () {
    $('body').append('<canvas id="grid"></canvas><canvas id="canvas"></canvas>');

    var xStep, yStep;

    window.addEventListener('resize', resizeCanvas, false);

    var drawGrid = function (board) {
        var canvas = document.getElementById('grid'),
            context = canvas.getContext('2d');

        calculateSteps(board);

        console.log(xStep, yStep);

        context.strokeStyle = "#ddd";

        context.beginPath();
        for (y = 0; y <= canvas.height; y += yStep) {
            context.moveTo(0, y);
            context.lineTo(canvas.width, y);
        }
        context.stroke();

        context.beginPath();
        for (x = 0; x <= canvas.width; x += xStep) {
            context.moveTo(x, 0);
            context.lineTo(x, canvas.height);
        }
        context.stroke();
    };

    var calculateSteps = function(board) {
        var canvas = document.getElementById('canvas');
        xStep = canvas.width / board[0].length;
        yStep = canvas.height / board.length;
    };

    var resizeCanvas = function (board) {
        var canvas = document.getElementById('canvas'),
            grid = document.getElementById('grid'),
            context = canvas.getContext('2d');
        grid.width = canvas.width = window.innerWidth;
        grid.height = canvas.height = window.innerHeight;
        drawGrid(board);
    };

    var setUpBoard = function(board) {
        resizeCanvas(board);
    };

    function drawBlock(y, x) {
        var canvas = document.getElementById('canvas'),
            context = canvas.getContext('2d');
        context.fillStyle = '#000';
        context.fillRect(x * xStep + 1, y * yStep + 1, xStep - 1, yStep - 1);
    }

    var drawField = function (board) {
        var canvas = document.getElementById('canvas'),
            grid = document.getElementById('grid'),
            context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (var row = 1; row < board.length - 1; row++) {
            for (var col = 1; col < board[0].length - 1; col++) {
                if (board[row][col] === 1)
                    drawBlock(row, col);
            }
        }
    };

    return {
        drawField: drawField,
        setUpBoard: setUpBoard
    };
});