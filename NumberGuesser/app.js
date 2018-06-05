// Game values
let min = 1,
    max = 10,
    winningNum = getWinningNum(min, max),
    guessesLeft = 3;

// Interface elements
const UIgame = document.querySelector('#game'),
      UIminNum = document.querySelector('.min-num'),
      UImaxNum = document.querySelector('.max-num'),
      UIguessBtn = document.querySelector('#guess-btn'),
      UIguessInput = document.querySelector('#guess-input'),
      UImessage = document.querySelector('.message');

// Assign UI min and max
UIminNum.textContent = min;
UImaxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

// Listen for guess
UIguessBtn.addEventListener('click', function(){
  let guess = parseInt(UIguessInput.value);

  //Validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  } else {

  // Check if winning number
  if(guess === winningNum){
    //Game over won
    gameOver(true, `Crongatulations! The number ${winningNum} is correct, you won!`);
  } else {
    //Wrong Number
    guessesLeft -= 1

    if(guessesLeft === 0){
      // Gamer over - lost
      gameOver(false, `Looks like you're out of luck, you didn't get the right number, it was the number ${winningNum}`)
    } else {
      setMessage(`Wrong number! Try again! You have ${guessesLeft} guesses left!`, 'red');
    }
  }
}
});

function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';

  UIguessInput.disabled = true;
  UIguessInput.style.borderColor = color;
  setMessage(msg, color);

  // Play again
  UIguessBtn.value = 'Play Again';
  UIguessBtn.className += 'play-again';
}

function getWinningNum(min, max){
  const number = Math.floor(Math.random()*(max-min+1)+min);
  return number;
}

function setMessage(message, color){
  UImessage.style.color = color;
  UImessage.textContent = message;

}
