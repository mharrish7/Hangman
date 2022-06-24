let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
var score = 0;
var streak = 0;
var lose = 0;

const cor = new Audio('sounds/correct.wav');
const wro = new Audio('sounds/wrong.wav');
const nex = new Audio('sounds/next.wav');

function randomWord() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      answer = JSON.parse(this.response)[0];
      console.log(answer);
      if(lose == 0){
              document.querySelector('.stat').innerHTML = "Begin 🔥";

      }

    }
  };
  xhttp.open("GET", "https://random-word-api.herokuapp.com/word", true);
  xhttp.send();
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
  
}

document.addEventListener('keypress',function(e){
  var lett = 'abcdefghijklmnopqrstuvwxyz'.split('');
  for(i of lett){
    if(e.key == i && lose == 0){
      handleGuess(i);
    }
  }
})

function generateBut() {

  var letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

  for (i of letters) {
    var but = document.createElement('button')
    but.innerHTML = i;
    but.id = i;
    document.querySelector('#keyboard').appendChild(but);
  }

  for (i of letters) {
    document.querySelector('#' + i).addEventListener('click', function () {
      handleGuess(this.id);
    })
  }


}

function handleGuess(chosenLetter) {
  console.log(chosenLetter);
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).disabled = true;

  if (answer.indexOf(chosenLetter) >= 0 && lose == 0) {
    guessedWord();
    checkIfGameWon();
    cor.play();
    score += 50 + 100 * streak;
    streak++;
  } else if (answer.indexOf(chosenLetter) === -1 && lose == 0) {
    if(mistakes < 6){
      mistakes++;
    }
    streak = 0;
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    var letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
    document.querySelector('.stat').innerHTML = 'YOU WON! 😎';
    nex.play();
    lose = 1;


    for (i of letters) {
      document.querySelector('#' + i).disabled = false;
    }
  }
  document.querySelector('.score').innerHTML = "Score : " + score;

}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.querySelector('.stat').innerHTML = 'YOU Lost 😢';
    wro.play();
    lose = 1;
  }
  document.querySelector('.score').innerHTML = "Score : " + score;
  if (localStorage['max'] == undefined) {
    localStorage.setItem('max', score);
  } else if (localStorage['max'] < score) {
    localStorage.setItem('max', score);
  }

  document.querySelector('.best').innerHTML = "Best score : " + localStorage['max'];

}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
  if (localStorage['max'] == undefined) {
    localStorage.setItem('max', score);
  } else if (localStorage['max'] < score) {
    localStorage.setItem('max', score);
  }
  document.querySelector('.best').innerHTML = "Best score : " + localStorage['max'];

}



function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.jpg';
  lose = 0;

  randomWord();
  guessedWord();
  var letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

  for (i of letters) {
    document.querySelector('#' + i).disabled = false;
  }
  score = 0;
  document.querySelector('.score').innerHTML = "";
  document.querySelector('.stat').innerHTML = 'loading ..';

}


randomWord();

var i1 = setInterval(checkw, 1000)

function checkw() {
  if (answer.length == 0) {
    randomWord();
    console.log('ss');
  } else {
    clearInterval(i1);
    generateBut();
    guessedWord();
  }
}