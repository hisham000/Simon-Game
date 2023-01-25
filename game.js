let userClickedPattern=[];
let buttonColours = ["red", "blue", "green", "yellow"]; 
let gamePattern=[];
let level =0;
let started=false;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(event) {
    playSound($(this).attr("id"));
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress($(this).attr("id"));
    checkAnswer(userClickedPattern.length-1);
  });

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
       if((userClickedPattern.length)==(gamePattern.length)){
        setTimeout(function () {
            nextSequence();
          }, 1000);
       }
      
    }
    else{
        let sound_wrong = new Audio("sounds/wrong.mp3");
        sound_wrong.play;
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function nextSequence(){
    let randomNumber = Math.floor(Math.random() *3)+1;
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function playSound(name) {
    let sound =  new Audio("sounds/"+name+".mp3");
    sound.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;

}
