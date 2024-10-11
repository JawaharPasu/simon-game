var buttonColors = ["red", "yellow", "blue", "green"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence () {
    $("h1").text("Level " + level);
    userClickedPattern = [];
    var randomChosencolor = buttonColors[Math.floor(Math.random()*4)];
    gamePattern.push(randomChosencolor);
    $("#"+randomChosencolor).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(randomChosencolor);
    level++;
}

$(".btn").on("click", function() { 
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor); 
    animatePress(userChosenColor);
    if (gamePattern.length === userClickedPattern.length) checkAnswer(level);   
});

$(document).on("keypress", function () {    
    nextSequence();
});

$("h1").on("click", function () {
    nextSequence();
});

function playSound(color) {
    var audio = new Audio("sounds/"+color + ".mp3");
    audio.play();
}

function animatePress(color) {
    $("#"+color).addClass("pressed");
    setTimeout(function() {
        $("#"+color).removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel) {
    for(var i=0; i<gamePattern.length; i++) {
        if (gamePattern[i]!==userClickedPattern[i]) {
            console.log("game over");
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
            gamePattern = [];
            userClickedPattern = [];
            level = 0;
            $("h1").text("Game over, press any key or here to restart");
            return;
        }
    }
    console.log("game complete");
    setTimeout(nextSequence(), 5000);
}