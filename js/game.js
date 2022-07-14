$("#level-title").text("Press any where to start, except colors");
$(".container").css("display", "inline");
var buttonColors = ["red", "blue", "green", "yellow"];


var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;


function checkAnswer(currentLevel) {
    userClickedPattern.push(currentLevel);
    var length  = userClickedPattern.length;
    var index = length-1;
    if(userClickedPattern[index] === gamePattern[index]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function (){
                nextSequence();
            },500);
        }
        
    }else{
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout( function (){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, press any where to Restart");
        setTimeout( function (){
            $(document).click(() => {
                window.location.reload();
            });
        },500);
    }
}




$(document).click(function () {
    if (!started) {

        //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }

  });

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");

    //1. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userChosenColour);
    
    
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}


// //2. Creating a new function called playSound() that takes a single input parameter called name.
function playSound(name) {

    //3. Take the code we used to play sound in the nextSequence() function and add it to playSound().
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor) {

    //using jquery to add class to an user selected id
    $("#" + currentColor).addClass("pressed");
  
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
