const $ = function (id) {
  return document.getElementById(id)
}

const words = ['candy', 'ghost', 'mummy', 'pumpkin', 'spider', 'skeleton', 'vampire', 'zombie']
const images = ['images/candy.jpg', 'images/ghost.png', 'images/mummy2.jpg', 'images/pumpkinface.png', 'images/spider.jpg', 'images/skeleton.jpg', 'images/vampire.jpg', 'images/zombie.jpg']
let word
const img = document.createElement('img')
const parent = $('img')
let answerArray = []
let userGuess
let rightGuess = false
let userRightGuess = 0
let left = 9
let wins = 0
let losses = 0

function random () {
  const random = Math.floor(Math.random() * words.length)
  word = words[random]
  img.src = images[random]
}

function showBlank () {
  for (i = 0; i < word.length; i++) {
    answerArray[i] = '_'
  }
  $('guess').innerHTML = answerArray.join(' ')
}

// guesses left

function guessesLeft () {
  $('left').innerHTML = left
}

// wins

function winsScore () {
  $('wins').innerHTML = wins
}

// losses
function lossesScore () {
  $('losses').innerHTML = losses
}

// show wrong guess
function wrongGuess (char) {
  $('wrong').innerHTML += char + ', '
}

// resent function
function initialGame () {
  if ($('winImage')) {
    $('winImage').remove()
  }
  left = 9
  answerArray = []
  $('wrong').innerHTML = ''
  userRightGuess = 0
  rightGuess = false
  guessesLeft()
  random()
  showBlank()
}

// call initial function
initialGame()
winsScore()
lossesScore()

// check letter
function showLetter (char, str) {
  for (let j = 0; j < str.length; j++) {
    if (char === str[j]) {
      rightGuess = true
      answerArray.splice(j, 1, char)
      userRightGuess++
    }
  }
  $('guess').innerHTML = answerArray.join(' ')
}

// check length
const matchLength = function () {
  if (word.length === userRightGuess) return true
  else return false
}

// user guess
document.onkeyup = function (event) {
  userGuess = event.key.toLowerCase()
  showLetter(userGuess, word)
  if (rightGuess) {
    rightGuess = false
    if (matchLength()) {
      const audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/win.mp3')
      audio.play()
      img.setAttribute('id', 'winImage')
      parent.appendChild(img)
      wins++
      winsScore()
      setTimeout(initialGame, 2000)
    } else {

    }
  } else {
    left--
    if (left < 1) {
      initialGame()
      losses++
      lossesScore()
    } else {
      wrongGuess(userGuess)
      guessesLeft()
    }
  }
}
