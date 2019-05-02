conwayBoard = null;

/**
 * Sets interval timer for running Conwya's game of life
 */
function runConway() {
    setInterval(conway, 200);
}

/**
 * Implimentation of Conway's game of life
 */
function conway() {
    var generatedHTML = "";
    conway.colorPallet = [
        "#8967ff", //purple
        "#ff6a6a", //red
        "#fdffbc", //yellow
        "#a3ff9c", //green
        "#c1e8f6", //cyan
        "#5654ff"  //blue
    ];

    conway.fontsize = 14;

    if (conwayBoard == null) {
        firstRun();
    } else {
        conway.w = conwayBoard.length;
        conway.h = conwayBoard[0].length;
    }

    nextTurn(conwayBoard);
    document.getElementById("conway").innerHTML = getHTMLString(conwayBoard);

    /** 
     * If this is the first run, randomly populate cells
     */
    function firstRun() {
        conway.w = Math.floor(window.outerWidth / conway.fontsize) - 4;
        conway.h = Math.floor(window.outerHeight / conway.fontsize / 6);
        console.log("#############" + conway.colorPallet.length);

        conwayBoard = [];
        for (var i = 0; i < conway.w; i += 1) {
            conwayBoard.push([]);
            /* populate more cells towards the top of the screen (for looks) */
            for (var j = 0; j < conway.h; j += 1) {
                if (j < Math.floor(conway.h / 2)) {
                    if (Math.floor(Math.random() * 3) == 0) {
                        conwayBoard[i].push(makeCell());
                    } else {
                        conwayBoard[i].push(null);
                    }
                } else if (j < Math.floor(conway.h / 4)) {
                    if (Math.floor(Math.random() * 5) == 0) {
                        conwayBoard[i].push(conway.colorPallet);
                    } else {
                        conwayBoard[i].push(null);
                    }
                }
                else {
                    conwayBoard[i].push(null);
                }
            }
        }
    }

    /**
     * Computes next turn in Conways game of life
     */
    function nextTurn(board) {
        for (var i = 0; i < board.length; i += 1) {
            for (var j = 0; j < board[0].length; j += 1) {
                var n = countNeighbors(board, i, j);
                if (board[i][j] == null) {
                    if (n == 3) {
                        board[i][j] = makeCell();
                    }
                } else {
                    if (n < 2 || n > 3) {
                        board[i][j] = null;
                    }
                }
            }
        }
        
        /** 
         * Finds amountof nieghbors on board 
         */
        function countNeighbors(board, x ,y) {
            var n = 0;
            for (var i = x-1; i <= x+1; i++) {
                if  (i > 0 && i < board.length - 1) {
                    for (var j = y-1; j <= y+1; j++) {
                        if (i == x && j == y) {
                            continue;
                        }

                        if (j > 0 && j < board[0].length - 1) {
                            if (board[i][j] != null) {
                                n += 1;
                            }
                        }
                    }
                }
            }

            return n;
        }
    }
    
    /** 
     * Converts board to HTML string 
    */
    function getHTMLString(board) {
        if (typeof board === undefined) {
            return "";
        }

        var htmlString = "";
        
        for (var j = 0; j < board[0].length; j += 1) {
            for (var i = 0; i < board.length; i += 1) {
                // twice to make bars look square
                if (board[i][j] != null) {
                    htmlString += "<font color=\"" + board[i][j].color + "\">██</font>";
                }
                else {
                    htmlString += "&nbsp&nbsp";
                }
            }
            htmlString += "<br>";
        }

        return htmlString;
    }

    /**
     * Make a conway board cell object
     */
    function makeCell() {
        return {
            color: conway.colorPallet[Math.floor(Math.random() * conway.colorPallet.length)]
        };
    }
}