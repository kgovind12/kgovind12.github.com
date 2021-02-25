// This is a two player version of the Game of Pig
// Both players have their own 'roll' and 'pass' buttons. 

(function(){
    'use strict';
    console.log('reading js');

    // variables for all buttons / clickable elements
    const startGame = document.getElementById('startgame');
    const playAgain = document.getElementById('playagain');
    const quitGame = document.getElementById('quitgame');
    const rollPlayer1 = document.getElementById('roll1');
    const rollPlayer2 = document.getElementById('roll2');
    const passPlayer1 = document.getElementById('pass1');
    const passPlayer2 = document.getElementById('pass2');

    // variables for other game elements
    const playGameScreen = document.getElementById('playgame');
    const messageText = document.getElementById('message');
    const playerTurn = document.getElementById('playerturn');
    var dice = ['die1.png', 'die2.png', 'die3.png', 'die4.png', 'die5.png', 'die6.png'];
    var dice1 = document.getElementById('dice1');
    var dice2 = document.getElementById('dice2');
    const scorePlayer1 = document.getElementById('score1');
    const scorePlayer2 = document.getElementById('score2');
    const winnerText = document.getElementById('winner');
    const overlay = document.getElementById('win-overlay');
    const overlayContent = document.getElementById('overlaycontent');
    var turn = 0; // equal to 0 for player 1, 1 for player 2
    var gameOver = false;

    // sounds
    const diceRollSound = new Audio('media/rolldice.wav');
    const gameWinSound = new Audio('media/win.flac');

    // create an object for each player
    var playerOne = {
        score: 0,
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0
    }

    var playerTwo = {
        score: 0,
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 1
    }

    // start the game
    startGame.addEventListener('click', function(event) {
        event.preventDefault();

        // show the playgame screen and hide the start button
        playGameScreen.style.opacity = 1;
        playGameScreen.className = '';
        startGame.className = 'hide';
        startGame.style.display = 'none';
        gameSetup();
    });


    // reset the game
    playAgain.addEventListener('click', function(event) {
        event.preventDefault();

        // show the playgame screen and hide the overlay
        playGameScreen.style.opacity = 1;
        playGameScreen.className = '';
        overlay.className = 'hide';
        gameSetup();
    });


    // when player one clicks roll
    rollPlayer1.addEventListener('click', function(event) {
        // check if it is player one's turn, else return
        event.preventDefault();

        if(turn == 0 && !gameOver) {
            rollDice(playerOne);
        } else {
            return;
        }
    });

    rollPlayer2.addEventListener('click', function(event) {
        // check if it is player two's turn, else return
        event.preventDefault();

        if(turn == 1 && !gameOver) {
            rollDice(playerTwo);
        } else {
            return;
        }
    });

    passPlayer1.addEventListener('click', function() {
        if(turn == 0 && !gameOver) {
            turn = !turn;   // set turn to 1
            playerTurn.innerHTML = 'Player 2\'s turn';
            rollPlayer1.innerHTML = 'Roll';
            messageText.innerHTML = 'Player 1 passed';
        } else {
            return;
        }
    });

    passPlayer2.addEventListener('click', function() {
        if(turn == 1 && !gameOver) {
            turn = !turn;   // set turn to 0
            playerTurn.innerHTML = 'Player 1\'s turn';
            rollPlayer2.innerHTML = 'Roll';
            messageText.innerHTML = 'Player 2 passed';
        } else {
            return;
        }
    });

    // set up (or reset) the game and all the variables
    function gameSetup() {
        playerTurn.innerHTML = 'Player 1\'s turn';
        quitGame.className = '';
        overlay.className = 'hide';
        overlayContent.className = 'hide';
        messageText.innerHTML = '';
        playerOne.score = 0;
        playerTwo.score = 0;
        playerOne.roll1 = 0;
        playerOne.roll2 = 0;
        playerTwo.roll1 = 0;
        playerTwo.roll2 = 0;
        playerOne.rollSum = 0;
        playerTwo.rollSum = 0;
        scorePlayer1.innerHTML = '0';
        scorePlayer2.innerHTML = '0';
        rollPlayer1.innerHTML = 'Roll';
        rollPlayer2.innerHTML = 'Roll';
        turn = 0;
        gameOver = false;
    }

    function rollDice(player) {
        // play roll dice sound
        diceRollSound.play();

        // generate random numbers on the dice
        player.roll1 = Math.floor(Math.random()*6) + 1;
        player.roll2 = Math.floor(Math.random()*6) + 1;
        dice1.setAttribute('src', `images/${dice[player.roll1-1]}`);
        dice2.setAttribute('src', `images/${dice[player.roll2-1]}`);
        player.rollSum = player.roll1 + player.roll2;

        if(player.rollSum === 2) {
            // Snake eyes - empty the score
            messageText.innerHTML = 'Oops! Snake eyes!';
            player.score = 0;
            player.index == 0 ? (scorePlayer1.innerHTML = '0') : (scorePlayer2.innerHTML = '0');
            player.index == 0 ? (rollPlayer1.innerHTML = 'Roll') : (rollPlayer2.innerHTML = 'Roll'); // set the player's button back to 'Roll'
            turn = !turn;
            playerTurn.innerHTML = `Player ${turn+1}'s turn`;
        } else if(player.roll1 === 1 || player.roll2 === 1) {
            // One rolled - switch turn
            player.index == 0 ? (rollPlayer1.innerHTML = 'Roll') : (rollPlayer2.innerHTML = 'Roll'); // set the player's button back to 'Roll'
            turn = !turn;
            messageText.innerHTML = `You rolled a one! Switching to Player ${turn+1}`;
            playerTurn.innerHTML = `Player ${turn+1}'s turn`;
        } else {
            // game proceeds
            player.score += player.rollSum;
            messageText.innerHTML = `You scored ${player.rollSum} points!`;
            if(turn == 0) {
                scorePlayer1.innerHTML = `${player.score}`;
                rollPlayer1.innerHTML = 'Roll again';
                rollPlayer2.innerHTML = 'Roll';
            } else {
                scorePlayer2.innerHTML = `${player.score}`;
                rollPlayer2.innerHTML = 'Roll again';
                rollPlayer1.innerHTML = 'Roll';
            }

            checkWinningCondition();
        }

        return;
    }

    function showOverlay(player){
        // play winning sound
        gameWinSound.play();

        overlay.className = '';
        overlayContent.className = '';
        overlay.style.transform = 'scale(100%)';
        overlay.style.opacity = 1;
        overlayContent.style.opacity = 1;
        winnerText.innerHTML = `Player ${player.index + 1} wins!`;
    }

    function checkWinningCondition(){
        if(playerOne.score >= 30) {
            // player one wins
            messageText.innerHTML = '';
            setTimeout(function() {showOverlay(playerOne); }, 1000);
            gameOver = true;
        } else if(playerTwo.score >= 30){
            // player two wins
            messageText.innerHTML = '';
            setTimeout(function() {showOverlay(playerTwo); }, 1000);
            gameOver = true;
        } else {
            // continue the game
            return;
        }
    }

})();