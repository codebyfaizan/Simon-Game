var buttonColours = ["red", "blue", "green", "yellow"]; //defining button colors 
var gamePattern = []; // empty array to push colors based on random number generated
var userClickedPattern = []; // empty array to push colors based on input by user

var level = 0; // default level which will increment each time the values of both the values inside arrays are same
var started = false; // default state of flag variable which gets true after keypress event listener is triggered

$(document).keypress(function() { //event listener for keypress with anonymous function which contains logic after a key is pressed by the user
    if (!started) { //checks the default value of started as false. if false, then it means key has been pressed by the user
        $("#level-title").text("Level " + level); // Replaces the H1 with level after user presses any key
        nextSequence(); // class next sequence function which contains logic of random number generator to pick random colors out of 4 colors 
        started = true; // sets the flag of started as true
    }
});

$(".btn").click(function() { //event listener for button click with anonymous function which contains logic after a key is pressed by the user
    var userChosenColour = $(this).attr("id"); //variable which saves the color after getting the id attribute associated with the button
    userClickedPattern.push(userChosenColour); // saving the color fetched into an array
    playSound(userChosenColour); // calling play sound function by passing the color as an argument to notify the user that button has been pressed
    animatePress(userChosenColour); // calling button animation 
    checkAnswer(userClickedPattern.length - 1); // calculating the number of elements inside array and passing it to check answer function which will compare the length of user inputs and input created by random number generator
});

function checkAnswer(currentLevel) { //check answer function takes current level as an argument so as to match elements inside both the arrays

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //comparing the elements at same index present in both arrays
        console.log("success");

        if (gamePattern.length === userClickedPattern.length) { // checking the number of elements in both arrays 

            setTimeout(function() {
                nextSequence(); // calling next sequence after a delay of 1000ms for incrementing level as user has correctly pressed the button and elements and length of both arrays matched
            }, 1000);
        }
    } else { // logic if user presses incorrect button 
        console.log("wrong");
        playSound("wrong"); //playing a special sound if user fails and game is over

        $("body").addClass("game-over"); // adding the game-over css class to bring out red screen flash animation 
        setTimeout(function() {
            $("body").removeClass("game-over"); //removing the game-over css class after 200ms
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart"); // Game Over text replaces the level in H1 
        startOver(); // calling start over function to reset the started variable and empty the random number array
    }
}

function nextSequence() {

    userClickedPattern = []; //Resting the inputs of the user in the array so that re-pushing and a re-comparison can be done for a new level
    level++; //incrementing the level
    $("#level-title").text("Level " + level); // displaying the incremented level in H1

    var randomNumber = Math.floor(Math.random() * 4); //generates a pseudo random number between 0 and 3
    var randomChosenColour = buttonColours[randomNumber]; //saving a random color as per random number generated
    gamePattern.push(randomChosenColour); //saving the random color into the array
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // animation to tell the user that a random button/color has been picked by the generator
    playSound(randomChosenColour); // playing a unique sound for a button selected by the random number to help the user to memorise the sequence

}


function playSound(name) { //function to play sound
    var audio = new Audio("sounds/" + name + ".mp3"); //audio path for a unique sound as per the color passed into name argument 
    audio.play();
}

function animatePress(currentColour) { //function for animation which take current color as a input to match the button/color to animate
    $("#" + currentColour).addClass("pressed "); // adds pressed CSS class 

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed"); // removes pressed CSS class thus brining out blinking animation

    }, 100); // time interval between adding and removing pressed class is 100ms 
}

function startOver() { // Start over function to reset level and random number array and state of started flag variable present inside the code
    level = 0;
    gamePattern = [];
    started = false;
}