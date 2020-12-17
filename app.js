document.addEventListener('DOMContentLoaded', () => {

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

  const gameBoard = document.querySelector('.gameBoard')
  const displayResult = document.querySelector('#result')
  var cardsChosen = []
  var cardsChosenID = []
  var cardsWon = []

  let button = document.createElement('button')
  button.textContent = "Start"
  button.addEventListener('click', createBoard)
  document.querySelector('.buttonContainer').appendChild(button)

  function createBoard() {
    gameBoard.innerHTML = ""
    displayResult.textContent = ''

    cardsArray.sort(() => 0.5 - Math.random())

    for (var i = 0; i < cardsArray.length; i++) {
      var newCard = document.createElement('img')
      newCard.setAttribute('src', 'images/blank.png')
      newCard.setAttribute('data-id', i)
      newCard.addEventListener('click', flipCard)
      gameBoard.appendChild(newCard)
    }
  }

  function checkForMatch() {
    var cards = document.querySelectorAll('img')
    const optionOneID = cardsChosenID[0]
    const optionTwoID = cardsChosenID[1]

    if (cardsChosen[0] === cardsChosen[1]) {
      document.querySelector('.foundMatch').textContent = 'You found a match!'

      cards[optionOneID].setAttribute('src', 'images/empty.png')
      cards[optionTwoID].setAttribute('src', 'images/empty.png')

      cardsWon.push(cardsChosen)
    } else {
      cards[optionOneID].setAttribute('src', 'images/blank.png')
      cards[optionTwoID].setAttribute('src', 'images/blank.png')
    }

    cardsChosen = []
    cardsChosenID = []
    displayResult.textContent = cardsWon.length

    if (cardsWon.length === cardsArray.length / 2) {
      displayResult.textContent = 'You won!'
      button.textContent = "Start"
    }

    setTimeout(
      () => {
        document.querySelector('.foundMatch').textContent = ''
      },
      3000
    )
  }

  function flipCard() {
    button.textContent = "Restart"
    var cardID = this.getAttribute('data-id')
    cardsChosen.push(cardsArray[cardID].name)
    cardsChosenID.push(cardID)
    this.setAttribute('src', cardsArray[cardID].img)

    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 200)
    }
  }

})
