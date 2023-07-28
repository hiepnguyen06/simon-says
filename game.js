let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let bestLevel = 0;

//start game check
$(".start").click(function() {
    $(".intro").removeClass("toggle");
    $(".container").removeClass("hidden");
    $(this).fadeOut();
    setTimeout(function() {
        nextSequence();
        updateLevelText();
    }, 2000);
});

// button click events
$(".btn").click(function() {
    let userChosenColor = $(this).attr("id");
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})

//randomized color sequence 
function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4); 
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    bestScore();
    updateLevelText();
}

function updateLevelText() {
    $("h1").text("Level " + level);
}

function checkAnswer(index) {
    if (userClickedPattern[index] === gamePattern[index]) {
        console.log("Correct")
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
                updateLevelText();
                userClickedPattern = [];
            },1000);
        }
    } else {
        gameOver();
        playSound("wrong");
    }
    
}

function bestScore() {
    if (level > bestLevel) {
        bestLevel = level;
        $(".best-score").text(bestLevel);   
    }
}

function gameOver() {
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    },200);
    $("h1").text("GAME OVER");
    setTimeout(function() {
        resetGame();
    },2000);
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

function resetGame() {
    $(".container").addClass("hidden");
    $(".intro").addClass("toggle");
    $("h1").text("Simon Says...");
    $(".start").fadeIn();
    $(".best-score").text(bestLevel);
}

// sound 
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}









