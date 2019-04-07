// initial number of squares
var numberOfSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var msgDisplay = document.getElementById("msg");
var h1 = document.querySelector("h1");

/* BUTTONS */
var resetButton = document.querySelector("#resetBtn");
var modeButtons = document.querySelectorAll(".mode");

// start page
init();

/* RESET COLORS */
resetButton.addEventListener("click", function() {
    reset();
});

/* FUNCTIONS */

function init() {
    // add click listeners to mode buttons
    setUpModeButtons();
    // add click listeners to squares
    setUpSquares();

    reset();
}

// add click listeners to mode buttons
function setUpModeButtons() {
    for(var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            // remove selected class from all buttons
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
    
            // add selected class to clicked button
            this.classList.add("selected");
    
            // check what game mode is on and set number of squares
            if (this.textContent === "Easy") {
                numberOfSquares = 3;
            }
            else {
                numberOfSquares = 6;
            }
    
            // uptade 
            reset();
        });
    }
}

// add click listeners to squares
function setUpSquares() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function () {
            var clickedColor = this.style.backgroundColor;
            // compare if clicked square has same color as pickedColor
            if (clickedColor === pickedColor) {
                // to do if they match
                msgDisplay.textContent = "Correct!";
                changeBackgroundColor(clickedColor);
                resetButton.textContent = "PLAY AGAIN";
            }
            else {
                // to do if they don't match
                this.style.backgroundColor = "#232323";
                msgDisplay.textContent = "Try Again :(";
            }
        });
    }
}

// change background color to all the squares and h1
function changeBackgroundColor(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    };
    h1.style.backgroundColor = color;
};

// pick random color from colors array
function pickColor() {
    // pick a random number from 0 to 5 (or 0-2 for easy mode)
    var randomColor = Math.floor(Math.random() * colors.length);
    // return random color from colors array
    return colors[randomColor];
};

// generate random colors
// number - how many colors generate
function generateRandomColors(numberOfColors) {
    var colorArray = [];
    // add random colors to array
    for (var i = 0; i < numberOfColors; i++) {
        // get random color and push into array
        colorArray[i] = randomColor();
    }
    // return array with random colors
    return colorArray;
}

// generate random color
function randomColor() {
    // red 0-255
    var red = Math.floor(Math.random() * 256);
    // green 0-255
    var green = Math.floor(Math.random() * 256);
    // blue 0-255
    var blue = Math.floor(Math.random() * 256);

    // return random color as string
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}

// reset setting
function reset() {
    // generate new colors
    colors = generateRandomColors(numberOfSquares);
    // pick new random color
    pickedColor = pickColor();
    // change color display to new picked color
    colorDisplay.textContent = pickedColor;
    // clear msgDisplay 
    msgDisplay.textContent = "";
    // make resetButton says NEW COLORS again
    resetButton.textContent = "New Colors"

    // change squares's color
    for (var i = 0; i < squares.length; i++) 
    {
        // if there is next color
        if (colors[i]) {
            // make all the squares visible
            squares[i].style.display = "block";
            // change the square's background
            squares[i].style.background = colors[i];
        }
        else {
            // hide the rest of sqaures
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
}
