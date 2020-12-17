document.addEventListener('DOMContentLoaded', () => {


  // create array of image pairs
  const cardsArray = [
    {
      name: 'dino',
      img: 'images/dino.png'
    },
    {
      name: 'dino',
      img: 'images/dino.png'
    },
    {
      name: 'tiger',
      img: 'images/tiger.png'
    },
    {
      name: 'tiger',
      img: 'images/tiger.png'
    },
    {
      name: 'elephant',
      img: 'images/elephant.png'
    },
    {
      name: 'elephant',
      img: 'images/elephant.png'
    },
    {
      name: 'hippo',
      img: 'images/hippo.png'
    },
    {
      name: 'hippo',
      img: 'images/hippo.png'
    }
  ]


  // define vars for the game, chosen cards and score

  const gameBoard = document.querySelector('.gameBoard')
  const displayResult = document.querySelector('#result')
  var cardsChosen = []
  var cardsChosenID = []
  var cardsWon = []


  // create start button

  let button = document.createElement('button')
  button.textContent = "Start"
  button.addEventListener('click', createBoard)
  document.querySelector('.buttonContainer').appendChild(button)


  // function to initialize game board with cards

  function createBoard() {
    gameBoard.innerHTML = ""
    displayResult.textContent = ''

    // randomize cards each time the game is started
    cardsArray.sort(() => 0.5 - Math.random())

    // create the cards array, and give a data id relative to the cards index in the cardsArray
    for (var i = 0; i < cardsArray.length; i++) {
      var newCard = document.createElement('img')
      newCard.setAttribute('src', 'images/blank.png')
      newCard.setAttribute('data-id', i)
      newCard.addEventListener('click', flipCard)
      gameBoard.appendChild(newCard)
    }
  }


  // when a card is pressed check for matches

  function checkForMatch() {
    var cards = document.querySelectorAll('img')
    const optionOneID = cardsChosenID[0]
    const optionTwoID = cardsChosenID[1]


    // check if the two cards chosen are deeply similar

    if (cardsChosen[0] === cardsChosen[1]) {
      // if a match is found, display text, add the cards to the cardsWon array, and make the card display an "empty" image
      document.querySelector('.foundMatch').textContent = 'You found a match!'

      cards[optionOneID].setAttribute('src', 'images/empty.png')
      cards[optionTwoID].setAttribute('src', 'images/empty.png')

      cardsWon.push(cardsChosen)
    } else {
      // if no match, then return the cards to their initial state

      cards[optionOneID].setAttribute('src', 'images/blank.png')
      cards[optionTwoID].setAttribute('src', 'images/blank.png')
    }

    cardsChosen = []
    cardsChosenID = []
    displayResult.textContent = cardsWon.length


    // If cardsWon length is the amount of cards / 2, you have won the game

    if (cardsWon.length === cardsArray.length / 2) {
      displayResult.textContent = 'You won!'
      button.textContent = "Start"
    }


    // remove the found match after a set interval
    setTimeout(
      () => {
        document.querySelector('.foundMatch').textContent = ''
      },
      3000
    )
  }


  // function to show the image associated with the card that is clicked
  function flipCard() {
    // Make button text "Restart", as the game is in progress
    button.textContent = "Restart"

    var cardID = this.getAttribute('data-id')

    // end function is an already flipped card is clicked
    if (this.getAttribute('src') === 'images/empty.png') {
      return
    }

    cardsChosen.push(cardsArray[cardID].name)
    cardsChosenID.push(cardID)
    this.setAttribute('src', cardsArray[cardID].img)

    // if you have clicked two cards, check if they are a match
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 200)
    }
  }

})
