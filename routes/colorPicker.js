var express = require("express");
var router = express.Router();

//Index Route
router.get('/', function(request, response)
	{
		response.render("./colorPickingGame.ejs");
	});

module.exports = router;

if (typeof document !== 'undefined') 
{
	//Variables
	var numOfSquares = 6;
	var colors = [];
	var pickedColor;

	var resetButton = document.querySelector("#reset");
	var modeButtons = document.querySelectorAll(".mode");
	var squares = document.querySelectorAll(".square");
	var pickedDisplay = document.querySelector("#rgbGoal");
	var messageDisplay = document.querySelector("#message");
	var h1Background = document.querySelector("h1");

	initalRun();

	//Changing display upon reset
	pickedDisplay.textContent = pickedColor;

	//Button Functionality
	resetButton.addEventListener("click", function(){
		reset();
	});


	//Functions for mechanic functionality
	function initalRun()
	{
		setupModeButton();
		squareFunctionality();
		reset();
	}

	function squareFunctionality(){
		for(var count = 0; count < squares.length; count++)
		{
			//add click listener to squares
			squares[count].addEventListener("click", function(){
				//Grabs color of Clicked Square
				var colorGuess = this.style.backgroundColor;
				//Compares the guessed color to pickedColor
				if(colorGuess === pickedColor){
					messageDisplay.textContent = "Correct!";
					resetButton.textContent = "Play again?";
					changeColors(pickedColor);
					h1Background.style.backgroundColor = pickedColor;
				}
				else
				{
					this.style.backgroundColor = "#232323";
					messageDisplay.textContent = "Try Again";
				}
			});
		}
		reset();
	}

	function setupModeButton()
	{
		for(var count = 0; count < modeButtons.length; count++)
		{
			modeButtons[count].addEventListener("click",function(){
				modeButtons[0].classList.remove("selected");
				modeButtons[1].classList.remove("selected");
				modeButtons[2].classList.remove("selected");
				this.classList.add("selected");
				if(this.textContent === "Easy")
				{
					numOfSquares = 3;
				}
				else if(this.textContent === "Extra Hard")
				{
					numOfSquares = 9;
				}
				else
				{
					numOfSquares = 6;
				}
				reset()
			})
		}
	}

	function reset()
	{
		//Generates new colors
		colors = generateRGBValues(numOfSquares);
		//Picks new colors and changes display
		pickedColor = pickColor();
		pickedDisplay.textContent = pickedColor;
		//Resets h1 background to black
		h1Background.style.backgroundColor = "FireBrick";
		//Set button to say New Colors
		resetButton.textContent = "New Colors";
		//Reset Messege to nothing
		messageDisplay.textContent = "";
		for(var count = 0; count < squares.length; count++)
		{
			if(colors[count])
			{
				squares[count].style.display = "block";
				squares[count].style.backgroundColor = colors[count];
			}
			else
			{
				squares[count].style.display = "none";
			}
		}
	}

	function changeColors(color)
	{
		for (var count = 0; count < squares.length; count++)
			{
				squares[count].style.backgroundColor = pickedColor;
			}
	}

	function pickColor()
	{
		var randomRGB = Math.floor(Math.random() * colors.length);
		return colors[randomRGB];
	}

	function generateRGBValues(num)
	{
		//Make an array
		var rgbArray = [];
		//Add Num of random colors to array
		for(var count = 0; count < num; count++)
		{
			rgbArray[count] = randomColor();
		}
		//Return array
		return rgbArray;
	}

	function randomColor()
	{
		var randomRed = Math.floor(Math.random() * 256);
		var randomGreen = Math.floor(Math.random() * 256)
		var randomBlue = Math.floor(Math.random() * 256)
		return "rgb(" + randomRed + ", " + randomGreen + ", " + randomBlue + ")";
	}
}