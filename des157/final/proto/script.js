// Geomemory is an educational memory game to help students memorize geometry formulae in an easy and fun way!
// This game was created using the concepts from studio 3, but adapted for interactive learning.
// Sounds are fully self-made.

(function() {
    'use strict';
    console.log('reading js');

    const cards = document.querySelectorAll('.card');   // get all the cards
    const matchesText = document.getElementById('matches');
    const gameOverText = document.getElementById('gameOver');
    const overlay = document.getElementById('overlay');
    const timeText = document.getElementById('time');
    const restartBtn = document.getElementById('restart');
    const startBtn = document.getElementById('start');

    // sounds
    const cardFlipSound = new Audio('media/Click.mp3'); // made by snapping a hair clip
    const correctMatch = new Audio('media/Correct.mp3');    // made by flicking a steel water bottle
    const wrongMatch = new Audio('media/Wrong.mp3');    // made by shaking a pill bottle (completely safe)
    const gameWin = new Audio('media/Gamewin.mp3'); // made using a piano
    const gameLose = new Audio('media/Gamelose.mp3');   // made using a piano

    // create a list of key-value pair objects
    // using HTML &times entity for multiplication and <sup></sup> tag for exponents
    var pairs = [
        { key: 'Area of a triangle', value: '1/2&times;W&times;H' },
        { key: 'Area of a square', value: 'A<sup>2</sup>' },
        { key: 'Perimeter of a square', value: '4&times;A' },
        { key: 'Perimeter of a rectangle', value: '2&times;(L+W)' },
        { key: 'Area of a rectangle', value: 'L&times;W' },
        { key: 'Volume of a cube', value: 'A<sup>3</sup>' },
        { key: 'Volume of a cuboid', value: 'L&times;W&times;H' },
        { key: 'Area of a parallelogram', value: 'W&times;H' }
    ]
    
    var gameData = {
        cardsOpened: 0,    // initial number of open cards
        class1: '',        // class of the first open card
        class2: '',        // class of the second open card
        matchesFound: 0
    }

    var timer;

    // initially, hide the restart button and the game text
    restartBtn.style.display = 'none';
    matchesText.style.visibility = 'hidden';
    timeText.style.visibility = 'hidden';

    // button that starts the game
    startBtn.addEventListener('click', startGame);

    function startGame() {
        startTimer();
        showCards();    // initially, show all the cards
        matchesText.innerHTML = 'Matches found: 0/8'; 
        timeText.style.color = 'black';
        timeText.style.visibility = 'visible';
        matchesText.style.visibility = 'visible';

        // show the restart btn and hide the start btn
        startBtn.style.display = 'none';
        restartBtn.style.display = 'inline-block';

        // hide overlay
        overlay.className = 'hide';
        overlay.style.opacity = 0;

        for(let i=0; i<pairs.length; i++) {
            document.querySelectorAll(`.q${i+1} .cardtext`)[0].innerHTML = pairs[i].key;
            document.querySelectorAll(`.q${i+1} .cardtext`)[1].innerHTML = pairs[i].value;
        }

        for(var card of cards) {
            card.addEventListener('click', function() {
                cardFlipSound.play();
                this.classList.toggle('flip');
                gameData.cardsOpened++;
    
                // if this is the first open card, get its class and move on
                if(gameData.cardsOpened == 1) {
                    gameData.class1 = this.className;
                }
    
                // if this is the second open card, get its class and check for a match
                if(gameData.cardsOpened == 2) {
                    // disable card click
                    disableClick(cards, true);

                    gameData.class2 = this.className;
                    if(checkMatch(gameData.class1, gameData.class2)) {
                        // if they are a match, increment matches and remove those cards from the board
                        gameData.matchesFound++;  
                        
                        setTimeout(function() { 
                            correctMatch.play();

                            // enable card click after response completes
                            disableClick(cards, false);
                            hideCards(gameData.class1);
                            matchesText.innerHTML = `Matches found: ${gameData.matchesFound}/8`; 
                            if(gameData.matchesFound == 8) {
                                gameOver();
                            }
                        }, 1500);
                    } else {
                        // if they are not a match, flip them back over and continue
                        setTimeout(function () {
                            wrongMatch.play();
                            closeCards();
                            disableClick(cards, false);
                        }, 1500);
                    }
                    gameData.cardsOpened = 0;
                }
            });
        }

        restartBtn.addEventListener('click', function () {
            location.reload();
        });
    }

    // start a timer for 120 seconds
    function startTimer() {
        var seconds = 12;
        timer = setInterval(function () {
            if (seconds >= 0) {
                seconds--;
            }

            if(seconds < 10) {
                timeText.style.color = 'red';
            }

            if(seconds == 0) {
                gameOver();
            }

            timeText.innerHTML = `Time Remaining: ${seconds}s`;
        }, 1000);
    }

    // clear the set interval
    function stopTimer(timer) {
        clearInterval(timer);
        timeText.innerHTML = `Time Remaining: 0s`;
    }

    // do not allow cards to be clicked while response is happening
    function disableClick(cards, disabled) {
        if(disabled) {
            for(var card of cards) {
                card.style.pointerEvents = 'none';
            }
        } else {
            for(var card of cards) {
                card.style.pointerEvents = 'auto';
            }
        }
    }

    // return true if card1 matches card2
    function checkMatch(class1, class2) {
        if (class1 === class2) {
            return true;
        } else {
            return false;
        }
    }

    // hide all the cards
    function hideAllCards() {
        for(var card of cards) {
            card.style.visibility = 'hidden';
        }
    }

    // hide the cards with given class
    function hideCards(matchedClass) {
        for(var matchedCard of document.getElementsByClassName(matchedClass)) {
            matchedCard.style.visibility = 'hidden';
        }
    }

    function showCards() {
        for(var card of cards) {
            card.style.visibility = 'visible';
        }
    }

    // close all the cards
    function closeCards() {
        for(var openCard of document.querySelectorAll('.flip')) {
            openCard.classList.remove('flip');
        }
    }

    // if the game is over, display the game over overlay
    function gameOver() {
        hideAllCards();
        stopTimer(timer);
        
        if(gameData.matchesFound == 8) {
            // game is won
            gameWin.play();
            gameOverText.innerHTML = 'You\'re a Geometry Pro!';
        } else {
            // game is lost
            gameLose.play();
            gameOverText.innerHTML = 'Maybe you need a refresher!';
        }
        overlay.className = '';
        overlay.style.transform = 'scale(100%)';
        overlay.style.opacity = 1;
    }
})();