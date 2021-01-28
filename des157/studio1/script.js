(function(){
    'use strict';

    const story = document.querySelector('.story');
    const form = document.querySelector('form');
    const formFields = document.querySelectorAll('input');
    const storyText = document.querySelector('.story p');

    form.addEventListener('submit', function(e){
        e.preventDefault();

        for(let i=0; i<formFields.length; i++){
            // if(formFields[i].value == ""){
            //     alert("Please fill out all the fields!");
            //     return;
            // }
            
            formFields[i].value = formFields[i].value.trim();
            if (i != 2){
                formFields[i].value = formFields[i].value.toLowerCase();
            }
        }

        storyText.innerHTML = 'Welcome to the Tillydrone rainforest! You can find lots of <span>' + formFields[0].value + '</span> creatures here. We have quiet sloths, colorful macaws, and a few golden bamboo lemurs. If you look <span>' + formFields[1].value + '</span>, you might even catch a river otter or two! Our tour guide, <span class="name">' + formFields[2].value + '</span>, will show you around our diverse rainforest kingdom, and you will also get a chance to <span>' + formFields[3].value + '</span> some rare butterflies. But watch out for the poisonous <span>' + formFields[4].value + '</span>! We hope you have a great time!';
        
        story.classList.add('reveal'); 
        form.classList.add('hide');
    });
})();