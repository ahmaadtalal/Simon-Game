var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var highScore = 0;

$(".start-button").click(function() {
  if (!$("div.rules").hasClass("show-rules") && !started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".restart-button").click(function() {
  if (started && !$("div.rules").hasClass("show-rules")) {
    startOver();
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(document).keypress(function(event) {
  if (!$("div.rules").hasClass("show-rules") && event.key === "Enter" && !started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over. Enter to Restart");
    $("div.rules-button").show();
    if (level > highScore) {
      highScore = level;
      $("#high-score").text("High Score : " + highScore);
    }
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

var keys = {
  "g": "green",
  "r": "red",
  "y": "yellow",
  "b": "blue"
};

$(document).keydown(function(event) {
  if (keys[event.key]) {
    var userChosenColour = keys[event.key];
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
});

$("div.rules-button").on("click", function() {
  if ($("div.rules").hasClass("show-rules")) {

    $("div.rules").fadeOut(500, function() {
      $(this).removeClass("show-rules").addClass("blur-background");
    });
    $("div.main-container").removeClass("blur-background");
  } else {

    $("div.rules").fadeIn(500, function() {
      $(this).removeClass("blur-background").addClass("show-rules");
    });
    $("div.main-container").addClass("blur-background");
  }
});

$("p.x-button").on("click", function() {
  $("div.rules").fadeOut(500, function() {
    $(this).removeClass("show-rules").addClass("blur-background");
  });
  setTimeout(function() {
    $("div.main-container").removeClass("blur-background");
  }, 500);
});
