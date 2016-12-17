console.log("CONNECTED!");
var numSquares = 6;
var colors = generateRandomColors(numSquares);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.querySelector("#color-display");
var messageDisplay = document.querySelector("#message");
var header = document.querySelector("h1");
var reset = document.querySelector("#reset");
var easyBtn = document.querySelector("#easy");
var hardBtn = document.querySelector("#hard");

colorDisplay.textContent = pickedColor;

easyBtn.addEventListener("click", function() {
    hardBtn.classList.remove("selected");
    this.classList.add("selected");
    numSquares = 3;
    restore();
    for (var i = 0; i < squares.length; i ++) {
        if (colors[i]) {
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
})

hardBtn.addEventListener("click", function() {
    easyBtn.classList.remove("selected");
    this.classList.add("selected");
    numSquares = 6;
    restore();
    for (var i = 0; i < squares.length; i ++) {
        squares[i].style.background = colors[i];
        squares[i].style.display = "block";
    }
});

reset.addEventListener("click", restore);

for (var i = 0; i < squares.length; i ++) {
	// add initial colors to squares
	squares[i].style.background = colors[i];
	// add click listeners to squares
	squares[i].addEventListener("click", function() {
		// grab color of clicked squares
		var clickedColor = this.style.background;
		// compare color to picked color
		if (clickedColor === pickedColor) {
			answerFound();
		} else {
		    this.style.background = "#232323";
		    messageDisplay.textContent = "Try Again!";
		}
	});
}

function restore() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    for (var i = 0; i < squares.length; i ++) {
        squares[i].style.background = colors[i];
    }
    colorDisplay.textContent = pickedColor;
    header.style.background = "steelblue";
    messageDisplay.textContent = "";
    reset.textContent = "New Color";
}

function pickColor() {
    // return a random index between 0 and total of colors.length
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    // make an array
    var arr = [];
    // add num random colors to array
    for (var i = 0; i < num; i++) {
        // Get random color and push into arr
        arr.push(randomColor());
    }
    // return that array
    return arr;
}

function randomColor() {
    // pick a red from 0 - 255
    var r = Math.floor(Math.random() * 256);
    // pick a green from 0 - 255
    var g = Math.floor(Math.random() * 256);
    // pick a blue from 0 - 255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")"
}

function answerFound() {
	for (var i = 0; i < squares.length; i ++) {
		squares[i].style.background = pickedColor;
	}
    messageDisplay.textContent = "Correct!";
	header.style.background = pickedColor;
    reset.textContent = "Play Again?";
}

