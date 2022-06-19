var programming_languages = [
	"python",
	"piano",
  "keyboard",
  "cherry",
  "pro",
  "delhi",
  "India",
  "NITT",
  "Trichy",
  "2KMart",
  "Lassi",
  "Spider",
]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
var score = 0;
var streak = 0;

function randomWord() {
  answer = programming_languages[Math.floor(Math.random() * programming_languages.length)];
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
    score += 50 + 100*streak;
    streak ++;
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    streak = 0;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
  }
  document.querySelector('.score').innerHTML = "Score : " + score;
  
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
  document.querySelector('.score').innerHTML = "Score : " + score;
  if(localStorage['max'] == undefined){
    localStorage.setItem('max',score);
  }
  else if(localStorage['max'] < score){
    localStorage.setItem('max',score);
  }

  document.querySelector('.best').innerHTML = "Best score : " + localStorage['max'];

}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
  if(localStorage['max'] == undefined){
    localStorage.setItem('max',score);
  }
  else if(localStorage['max'] < score){
    localStorage.setItem('max',score);
  }
  document.querySelector('.best').innerHTML = "Best score : " + localStorage['max'];

}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.jpg';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
  score = 0;
  document.querySelector('.score').innerHTML = "";

}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
