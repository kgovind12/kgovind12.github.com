(function() {
    'use strict';
    console.log('reading js');

    const cards = document.querySelectorAll('.card');   // get all the cards
    const matchesText = document.getElementById('matches');
    const gameOverText = document.getElementById('gameOver');
    const overlay = document.getElementById('overlay');

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

    setUpGame();

    function setUpGame() {
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
                            // card.disabled = false;
                            // card.style.pointerEvents = 'auto';
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
    }

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

    // hide the cards with given class
    function hideCards(matchedClass) {
        for(var matchedCard of document.getElementsByClassName(matchedClass)) {
            matchedCard.style.visibility = 'hidden';
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
        if(gameData.matchesFound == 8) {
            gameOverText.innerHTML = 'You\'re a Geometry pro!';
        } else {
            // Still need to deal with the losing case
            gameOverText.innerHTML = 'Try again! You\'ll get there!'
        }
        overlay.className = '';
        overlay.style.transform = 'scale(100%)';
        overlay.style.opacity = 1;
    }
})();