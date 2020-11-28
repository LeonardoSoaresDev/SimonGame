//generating a random number from 1 to 4.
var randomNumber = Math.floor(Math.random() * 4);

var startedStatus = false;
var level = 1
var arrayOfRandomNumber = []
var arrayButtonClicked = []

//if some key was pressed the status will be setted to true and the game will start.
$('body').keypress(function () {
    if (startedStatus != true) {
        levelChange();
        displayButtonAlert();
    }
    startedStatus = true;
});

//adding event listener to all buttons.
$('button').click(function (event) {
    //if none key was pressed, when a button was clicked it will invoke the loserAlert() function that will trigger a red light in the background.
    if (startedStatus === false) {
        loserAlert();
    } else {

        //if the status is ok, so when u click on a button it will display a white color to confirm that u clicked on this button.
        $(this).css('background-color', '#ffffff')
        arrayButtonClicked.push(this.value)

        //it will back to the initial color less than 1sec.
        setTimeout(() => {
            $('button').css('background-color', '');
        }, 200);
        checkAnswer(arrayButtonClicked.length - 1)
    }
});

//function to highlight a random button.
function displayButtonAlert() {
    randomNumber = Math.floor(Math.random() * 4);
    arrayOfRandomNumber.push(randomNumber);

    setTimeout(() => {
        $($('button').get(randomNumber)).fadeIn(100).fadeOut(100).fadeIn(100);
    }, 1000);

    //cleaning the arrays with the clicks of the user.
    arrayButtonClicked = []
}

//function to show the loss message when the user click on the wrong button.
function loserAlert() {
    startedStatus = false;
    $('body').css('background-color', 'red');
    $('h1').text('Game over, Press any key to restart');

    setTimeout(() => {
        $('body').css('background-color', "");
    }, 250);

    //if the user clicks on the wrong button, both arrays will be cleaned, and the level will be reseted.
    level = 1;
    arrayOfRandomNumber = []
    arrayButtonClicked = []
}

//function to check if the user answer are correct.
function checkAnswer(currentLevel) {
    if (arrayButtonClicked[currentLevel] == arrayOfRandomNumber[currentLevel]) {
        if (arrayButtonClicked.length === arrayOfRandomNumber.length) {
            level++
            displayButtonAlert();
            levelChange();
        }
    } else {
        loserAlert();
    }
}

//function to change the level text.
function levelChange() {
    $('h1').text(' Level ' + level);
}