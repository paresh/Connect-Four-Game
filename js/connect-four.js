(function (window, document) {
    var colorId
        , turnLable
        , players
        , row
        , colume
        , gameDone
        , previousGameStarter = 1
        , playerTurn
        , count,

        startGame = function () {
            gameDone = 0;
            count = 0;
            playerTurn = previousGameStarter = (previousGameStarter + 1) % 2;
            turnLable.className = players[playerTurn = (playerTurn + 1) % 2];

            /*set board all element to emply when user click restart*/
            for (row = 1; row < 7; row++)
                for (colume = 1; colume < 8; colume++)
                    board(row, colume).className = '';
        }
        , board = function (i, j) {
            return document.getElementById(colorId + i + j);
        }
        , isCurrentColor = function (i, j) {
            return board(i, j).className === players[playerTurn];
        }
        , moveElement = function (i, j, s) {

            /*To provide animation like moving empty class name*/
            if (s > 0) {
                board(s, j).className = '';
            }
            board(s + 1, j).className = players[playerTurn];
            s === i - 1 ? function (i, j) {
                /*Horizontal check*/
                return function (i, j) {
                        for (row = j - 1; 0 < row && isCurrentColor(i, row); row--) {}
                        for (colume = j + 1; 8 > colume && isCurrentColor(i, colume); colume++) {}
                        return 4 < colume - row;
                    }(i, j) ||
                    /*Vertical check*/
                    function (i, j) {
                        for (c = i + 1; 7 > c && isCurrentColor(c, j); c++) {}
                        return 3 < c - i;
                    }(i, j) ||
                    /*left-to-right-crosse-up*/
                    function (i, j) {
                        for (row = i - 1, colume = j - 1; 0 < row && !(1 > colume) && isCurrentColor(row, colume); row--)
                            colume--;
                        for (c = i + 1, colume = j + 1; 7 > c && !(7 < colume) && isCurrentColor(c, colume); c++)
                            colume++;
                        return 4 < c - row
                    }(i, j) ||
                    /*cross check right to left*/
                    function (i, j) {
                        for (row = i - 1, colume = j + 1; 0 < row && !(7 < colume) && isCurrentColor(row, colume); row--)
                            colume++;
                        for (c = i + 1, colume = j - 1; 7 > c && !(1 > colume) && isCurrentColor(c, colume); c++)
                            colume--;
                        return 4 < c - row;
                    }(i, j);
            }(i, j) ? gameDone = 1 && window.confirm(document.getElementById("winner").innerHTML.replace("%s", players[playerTurn].toLowerCase())) && startGame() : turnLable.className = players[playerTurn = (playerTurn + 1) % 2] : setTimeout(function () {
                moveElement(i, j, s + 1)
            }, 50);
            /* s=i-1 ? (win ? confirm win : change player turn): move element */
        };

    return function (color, restart, player1, player2) {
        colorId = color;
        turnLable = document.getElementById('color');
        players = [document.getElementById('player1').innerHTML, document.getElementById('player2').innerHTML];

        /*Bind click event on each element on the board*/
        for (row = 1; row < 7; row++) {
            for (colume = 1; colume < 8; colume++) {
                board(row, colume).onclick = function (colume, row) {
                    return function () {
                        if (!gameDone) {
                            /*Board element in colume at respected row does not already occupied color than place move*/
                            for (row = 6; row > 0; row--) {
                                if (!board(row, colume).className) {
                                    moveElement(row, colume, 0);
                                    break;
                                }
                            }
                            count++;
                            //console.log("Counter value: "+count);
                            if(count==42)
                                {
                                    alert("Game is Draw Resrart the Game");
                                    startGame();
                                }
                        }
                    };
                }(colume);
            }
        };

        /*Bind click event on restart button*/
        document.getElementById("restart").onclick = function () {
            window.confirm(document.getElementById("newGame").innerHTML) && startGame();
        };

        startGame();
    };
})(window, document)("color", "restart", "player1", "player2");