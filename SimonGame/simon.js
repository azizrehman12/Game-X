var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){
    var clickedbutton = $(this).attr("id");
    userClickedPattern.push(clickedbutton);

    playSound(clickedbutton);
    animatePress(clickedbutton);
    checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success.")

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong.mp3");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game-over, Press any key to restart.");

        startOver();
    }
}

function nextSequence() {

    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);

    var random = Math.floor((Math.random() * 4)) ;
    var randomChosenColour = buttonColors[random];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("/"+name+".mp3");
    audio.play();
} 

function animatePress(color){
    $("#"+color).addClass("pressed");

    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    }, 100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}