conwayBoard = null;

function runConway() {
    setInterval(conway, 200);
}

function conway() {
    console.log("##########################Called conway");
    var generatedHTML = "";
    conway.colorPallet = [
        "#af67ff", //purple
        "#ff6a6a", //red
        "#fdffbc", //yellow
        "#a3ff9c", //green
        "#f8f8f8", //white
        "#b2b2b2", //grey
        "#b2b2b2", //cyan
        "#5654ff"  //blue
    ];

    conway.fontsize = 14;


    if (conwayBoard == null) {
        conway.w = Math.floor(window.outerWidth / conway.fontsize) - 4;
        conway.h = Math.floor(window.outerHeight / conway.fontsize / 5);
        console.log("0");
        conwayBoard = [];
        for (var i = 0; i < conway.w; i += 1) {
            conwayBoard.push([]);
            for (var j = 0; j < conway.h; j += 1) {
                if (j < Math.floor(conway.h / 2)) {
                    if (Math.floor(Math.random() * 7) == 0) {
                        conwayBoard[i].push("█");
                    } else {
                        conwayBoard[i].push("&nbsp");
                    }
                } else if (j < Math.floor(conway.h / 4)) {
                    if (Math.floor(Math.random() * 20) == 0) {
                        conwayBoard[i].push("█");
                    } else {
                        conwayBoard[i].push("&nbsp");
                    }
                }
                else {
                    conwayBoard[i].push("&nbsp");
                }
            }
        }
    } else {
        conway.w = conwayBoard.length;
        conway.h = conwayBoard[0].length;
    }

    console.log("arr dim: width = " + conwayBoard.length + ", hieght = " + conwayBoard[0].length);

    console.log("1");

    nextTurn(conwayBoard);
    document.getElementById("conway").innerHTML = getHTMLString(conwayBoard);
}

function getHTMLString(board) {
    if (typeof board === undefined) {
        return "";
    }

    var htmlString = "";
    
    for (var j = 0; j < board[0].length; j += 1) {
        for (var i = 0; i < board.length; i += 1) {
            //console.log("GenerateHTML: i = " + i + ", j = " + j);
            // twice to make bars look square
            htmlString += board[i][j];
            htmlString += board[i][j];
        }
        htmlString += "<br>";
    }

    return htmlString;
}

function nextTurn(board) {
    console.log("2 - " + board.length + "x" + board[0].length);

    for (var i = 0; i < board.length; i += 1) {
        for (var j = 0; j < board[0].length; j += 1) {
            var n = countNeighbors(board, i, j);
            console.log("i = " + i + ",j = " + j + ": n =" + n);
            if (board[i][j] == "&nbsp") {
                if (n == 3) {
                    board[i][j] = "█";
                }
            } else {
                if (n < 2 || n > 3) {
                    board[i][j] = "&nbsp";
                }
            }
        }
    }
}

function countNeighbors(board, x ,y) {
    var n = 0;
    for (var i = x-1; i <= x+1; i++) {
        if  (i > 0 && i < board.length - 1) {
            for (var j = y-1; j <= y+1; j++) {
                if (i == x && j == y) {
                    continue;
                }

                if (j > 0 && j < board[0].length - 1) {
                    //console.log("2.2 - i = " + i + ",j = " + j);
                    if (board[i][j] != "&nbsp") {
                        n += 1;
                    }
                }
            }
        }
    }

    return n;
}