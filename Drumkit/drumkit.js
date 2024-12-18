for(var i=0; i<document.querySelectorAll(".drum").length; i++){
    document.querySelectorAll(".drum")[i].addEventListener("click",
    function(){
        var num = this.innerHTML;
        makesound(num);
        buttonAnimation(num);
    })
}

document.addEventListener("keypress", function(event){
    makesound(event.key);
    buttonAnimation(event.key);
} );
    
        function makesound(key){
            switch(key){
                case"w":
                var audio = new Audio("tom-1.mp3");
                audio.play();
                break;
    
                case"a":
                var audio = new Audio("tom-2.mp3");
                audio.play();
                break;
    
                case"s":
                var audio = new Audio("tom-3.mp3");
                audio.play();
                break;
    
                case"d":
                var audio = new Audio("tom-4.mp3");
                audio.play();
                break;
    
                case"j":
                var audio = new Audio("snare.mp3");
                audio.play();
                break;
    
                case"k":
                var audio = new Audio("crash.mp3");
                audio.play();
                break;
    
                case"l":
                var audio = new Audio("kick-bass.mp3");
                audio.play();
                break;
    
                default:
                    console.log (innerHTML);
            }
        }

        function buttonAnimation(clickedkey){
            var key = document.querySelector("."+clickedkey);
            key.classList.add("pressed");
            
            setTimeout(function(){
                key.classList.remove("pressed");
            }, 100);
        }