(function() {
    'use strict';
    console.log('reading js');

    const message = 'Hello and welcome to Geomemory! There are three main tasks/goals for this test that you can try out:\n' +
    '1.	Play the memory game! You have 2 minutes to find all the matches.\n' + 
    '2.	Observe the card animations and their effectiveness in keeping you engaged with the game.\n' +
    '3.	Keep track of how many matches you find and how much time is remaining. Do you find this easy to do?\n' + 
    'Happy testing!';

    alert(message);

    const cards = document.querySelectorAll('.card');   // get all the cards
    const matchesText = document.getElementById('matches');
    const gameOverText = document.getElementById('gameOver');
    const overlay = document.getElementById('overlay');
    const timeText = document.getElementById('time');
    const restartBtn = document.getElementById('restart');

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

    setUpGame();

    function setUpGame() {
        startTimer();
        showCards();    // initially, show all the cards
        matchesText.innerHTML = 'Matches found: 0/8'; 

        // hide overlay
        overlay.className = 'hide';
        overlay.style.opacity = 0;

        for(let i=0; i<pairs.length; i++) {
            document.querySelectorAll(`.q${i+1} .cardtext`)[0].innerHTML = pairs[i].key;
            document.querySelectorAll(`.q${i+1} .cardtext`)[1].innerHTML = pairs[i].value;
        }

        for(var card of cards) {
            card.addEventListener('click', function() {
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
        var seconds = 120;
        timer = setInterval(function () {
            timeText.innerHTML = `Time Remaining: ${seconds}s`;

            if (seconds >= 1) {
                seconds--;
            }
            if(seconds == 0) {
                // stopTimer(timer);
                gameOver();
            }
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
            console.log("you win");
            gameOverText.innerHTML = 'You\'re a Geometry Pro!';
        } else {
            // Still need to deal with the losing case
            gameOverText.innerHTML = 'Maybe you need a refresher!';
        }
        overlay.className = '';
        overlay.style.transform = 'scale(100%)';
        overlay.style.opacity = 1;
    }
})();