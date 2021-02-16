(function(){
    'use strict';
    console.log("reading js");

    const images = document.querySelectorAll('main img');
    const mainContainer = document.querySelector('main');
    const overlay = document.querySelector('#overlay');
    const overlayImg = document.querySelector('#overlay img');
    const closeBtn = document.querySelector('.close');
    const imageDesc = document.querySelector('#overlay p');

    mainContainer.addEventListener('click', function(event){
        // leftscroll and rightscroll are transparent divs for flipping carousel images
        // if leftscroll is clicked, flip to the left
        if(event.target.id == 'leftscroll'){
            flipLeft();
        }
        // if rightscroll is clicked, flip to the right
        else if(event.target.id == 'rightscroll'){
            flipRight();
        }
    });

    function flipRight(){
        // store the images in variables
        const currentImg = document.querySelector('.current');
        const prevImg = document.querySelector('.prev');
        const nextImg = document.querySelector('.next');
        const rightImg = document.querySelector('.right');
        const leftImg = document.querySelector('.left');
        const farLeftImg = document.querySelector('.farleft');
        const farRightImg = document.querySelector('.farright');

        // current becomes prev, prev becomes left
        // left becomes far left
        // far left wraps around and becomes far right
        currentImg.className = 'image prev';
        prevImg.className = 'image left';
        leftImg.className = 'image farleft';
        farLeftImg.className = 'image farright';

        // far right becomes right, right becomes next
        // next becomes current
        farRightImg.className = 'image right'
        rightImg.className = 'image next';
        nextImg.className = 'image current';
    }

    function flipLeft(){
        // make new variables because the images have changed classes
        const currentImg = document.querySelector('.current');
        const prevImg = document.querySelector('.prev');
        const nextImg = document.querySelector('.next');
        const rightImg = document.querySelector('.right');
        const leftImg = document.querySelector('.left');
        const farLeftImg = document.querySelector('.farleft');
        const farRightImg = document.querySelector('.farright');

        // current becomes next, next becomes right
        // right becomes far right
        // far right wraps around and becomes far left
        currentImg.className = 'image next';
        nextImg.className = 'image right';
        rightImg.className = 'image farright';
        farRightImg.className = 'image farleft';

        // far left becomes left, left becomes prev
        // prev becomes current
        farLeftImg.className = 'image left';
        leftImg.className = 'image prev';
        prevImg.className = 'image current';
    }

    // if the current image is clicked, open this overlay
    for(let image of images){
        image.addEventListener('click', function(event){
            overlay.className = 'showing';
            overlayImg.setAttribute('src', event.target.getAttribute('src'));

            // set the image description depending on the id of the image clicked
            switch(event.target.id){
                case 'img1':
                    imageDesc.innerHTML = 'This photo was taken at the Hare Creek Bridge in Fort Bragg. Under the bridge is a small beach. I visited during Winter Break last year and loved sitting by the rocks!';
                    break;
                case 'img2':
                    imageDesc.innerHTML = 'This photo was taken at Lake Elizabeth in Fremont, California. I used to come here all the time as a kid and always loved the sunsets. Here you can see the orange glow of the sun through the trees.';
                    break;
                case 'img3':
                    imageDesc.innerHTML = 'This photo was taken at Lake Elizabeth as well, though the bridge is a new addition to the park. A walk along this bridge gives me plenty of time to enjoy the fresh air and the view of the lake!';
                    break;
                case 'img4':
                    imageDesc.innerHTML = 'This photo was taken at Pismo Beach, California, with the help of a pair of sunglasses to give it a pinkish glow. I love the serenity of the ocean at dusk - and the herons that walk along the beach!';
                    break;
                case 'img5':
                    imageDesc.innerHTML = 'Taken near Bellagio, Las Vegas, this photo of a bright fountain shows us what the neon capital is all about! I visited during the spring of 2018, and loved the myth and magic of the city!';
                    break;
                case 'img6':
                    imageDesc.innerHTML = 'Taken at Las Vegas, Nevada, this photo shows what the heart of the city looks like at night. With the lively music and people, I never get bored. It\'s a must visit for lovers of bright city lights!';
                    break;
                case 'img7':
                    imageDesc.innerHTML = 'Taken at the San Francisco Exploratorium, this photo shows the excited sea on a windy afternoon. I love eating grilled cheese here while watching the waves - but it can get a little chilly!';
                    break;
                default:
                    imageDesc.innerHTML = 'Select a photo to see what it\'s all about!';
            }
        });
    }

    // close the overlay
    closeBtn.addEventListener('click', function(){
        overlay.className = 'hidden';
    });
})();