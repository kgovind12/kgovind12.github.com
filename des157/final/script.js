(function() {
    'use strict';
    console.log('reading js');

    // get all the cards
    // var question1Cards = document.getElementsByClassName('q1');
    // var question2Cards = document.getElementsByClassName('q2');
    // var question3Cards = document.getElementsByClassName('q3');
    // var question4Cards = document.getElementsByClassName('q4');
    // var question5Cards = document.getElementsByClassName('q5');
    // var question6Cards = document.getElementsByClassName('q6');
    // var question7Cards = document.getElementsByClassName('q7');
    // var question8Cards = document.getElementsByClassName('q8');

    const cards = document.querySelectorAll('.card');   // get all the cards
    const matchesText = document.getElementById('matches');

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

    for(var card of cards) {
        card.addEventListener('click', function() {
            console.log(`flipping ${this.className}`);
            this.classList.toggle('flip');
            gameData.cardsOpened++;

            // if this is the first open card, get its class and move on
            if(gameData.cardsOpened == 1) {
                gameData.class1 = this.className;
            }

            // if this is the second open card, get its class and check for a match
            if(gameData.cardsOpened == 2) {
                gameData.class2 = this.className;
                if(checkMatch(gameData.class1, gameData.class2)) {
                    // if they are a match, increment matches and remove those cards from the board
                    gameData.matchesFound++;
                    setTimeout(function() { hideCards(gameData.class1) }, 1500);
                } else {
                    // if they are not a match, flip them back over and continue
                    setTimeout(closeCards, 1500);
                }
                gameData.cardsOpened = 0;
            }
        });
    }

    function checkMatch(class1, class2) {
        if (class1 === class2) {
            matchesText.innerHTML = `Matches: ${gameData.matchesFound}/8`;
            return true;
        } else {
            return false;
        }
    }

    function hideCards(matchedClass) {
        for(var matchedCard of document.getElementsByClassName(matchedClass)) {
            matchedCard.style.visibility = 'hidden';
        }
    }

    function closeCards() {
        for(var openCard of document.querySelectorAll('.flip')) {
            console.log(`closing ${openCard.className}`);
            openCard.classList.remove('flip');
        }
    }
})();