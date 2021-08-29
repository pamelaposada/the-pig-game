'use strict';

//SECTION 1: Game Instructions
const btnInstruction = document.querySelector('.show-modal')
const closeModal = document.querySelector('.close-modal')
const overlay = document.querySelector('.overlay')
const modal = document.querySelector('.modal')

btnInstruction.onclick = function(){
    modal.style.display = "block"
    overlay.style.display = "block"

}
closeModal.onclick = function(){
    modal.style.display ="none"
    overlay.style.display = "none"
}
overlay.onclick =function(){
    modal.style.display ="none"
    overlay.style.display = "none"
}

//SECTION 2: The Game

//DOM variables
let scoreOne = document.querySelector('#score--1')
let scoreTwo = document.querySelector('#score--2')
let currentValueOne = document.querySelector('#current--0')
let currentValueTwo = document.querySelector('#current--1')
let btnRoll = document.querySelector('.btn--roll')
let btnNewGame = document.querySelector('.btn--new')
let btnHold = document.querySelector('.btn--hold')
let dice = document.querySelector('.dice')
let backgrPlayer1 = document.querySelector('.player-0')
let backgrPlayer2 = document.querySelector('.player-1')
let winnerOne = document.querySelector('.winner1')
let winnerTwo = document.querySelector('.winner2')

//Other variables
let numbersOfPlayers = []
let currentScores = 0
let listscoresOne = []
let listscoresTwo = []

//Active player will be switch later with a conditional (Ternary) operator statement
let activePlayer = 0

//Start the game with both scores on 0
scoreOne.textContent= 0
scoreTwo.textContent= 0

//The game will start with the dice hidden
dice.classList.add('hidden')

//1. The player will call the rollButton function each time he press the ROLE DICE button
btnRoll.addEventListener('click', rollButton)

function rollButton(){
    dice.classList.remove('hidden')
    let randomDice = randomNumber()
    //The dice src will be the dice + random number
    dice.src = `dice-${randomDice}.png` 
    console.log(`random number: ${randomDice}`)
    // If the dice number is equal to 1 switch player
    if (randomDice == 1){       
        numbersOfPlayers = []      
        currentValueOne.textContent = 0
        currentValueTwo.textContent = 0
        backgrPlayer1.classList.toggle('player--active')
        backgrPlayer2.classList.toggle('player--active')
        activePlayer = activePlayer === 0 ? 1 : 0   
        currentScores = 0    
    }
    // If the dice number is != to 1, sum the dice numbers
    else{
        numbersOfPlayers.push(randomDice)   
        console.log(`Numbers chosen: ${numbersOfPlayers}`)
        currentScores += randomDice
        console.log(currentScores)
        document.getElementById(`current--${activePlayer}`).textContent = currentScores
    }          
}


// 2. Each time the player click the HOLD button, call the holdButton function
btnHold.addEventListener('click', holdButton)

function holdButton(){
    numbersOfPlayers=[]
    dice.classList.add('hidden')
    // If active player is 0 (player 1) when clicking HOLD button, then the current numbers will be saved on listscoresOne and printed on the html score element (scoreOne). Also, the button will swith to player 2.
    if (activePlayer == 0){ 
        currentValueOne.textContent = 0
        backgrPlayer1.classList.remove('player--active')
        backgrPlayer2.classList.add('player--active')
        listscoresOne.push(currentScores)
        scoreOne.textContent = sumNumbers(listscoresOne)
        activePlayer = 1
    }
    // If active player is 1 (player 2) when clicking HOLD button, then the current numbers will be saved on listscoresTwo and printed on the html score element (scoreTwo). Also, the button will swith to player 1.
    else{
        backgrPlayer2.classList.remove('player--active')
        backgrPlayer1.classList.add('player--active')
        listscoresTwo.push(currentScores)
        scoreTwo.textContent = sumNumbers(listscoresTwo)
        activePlayer = 0    
        currentValueTwo.textContent = 0
    }
    currentScores = 0

    //Decide who wins
    // If player 1 has 100 or more points, then he wins
    if (sumNumbers(listscoresOne) >= 100){
        backgrPlayer1.classList.add('player--winner')
        backgrPlayer2.classList.remove('player--active')
        winnerOne.textContent = 'WINNER'
        currentValueOne.textContent = '🎉 🎊'
        btnRoll.removeEventListener('click', rollButton)
        btnHold.removeEventListener('click', holdButton)
        dice.classList.add('hidden')
        console.log("Player 1 wins")
    }
    // If player 2 has 100 or more points, then he wins
    else if(sumNumbers(listscoresTwo) >= 100){
        backgrPlayer2.classList.add('player--winner')
        backgrPlayer1.classList.remove('player--active')
        winnerTwo.textContent = 'WINNER'
        currentValueTwo.textContent = '🎉 🎊'
        btnRoll.removeEventListener('click', rollButton)
        btnHold.removeEventListener('click', holdButton)
        dice.classList.add('hidden')
        console.log("Player2 wins")
    }  
    //Test scores
    console.log(`player1 scores: ${listscoresOne}`)
    console.log(`player2 scores: ${listscoresTwo}`)
    console.log(`sum of scores player1: ${sumNumbers(listscoresOne)}`)
    console.log(`sum of scores player2: ${sumNumbers(listscoresTwo)}`)      
}
// Reload the game each time the player clicks the NEW GAME button
btnNewGame.addEventListener('click', function(){
    location.reload()
})

// Create a function that returns 6 random numbers
function randomNumber(){
    return(Math.floor(Math.random() * 6) +1)
}

//Create a function that returns the sum of numbers inside an array (scores)
function sumNumbers(x){
    let sum = 0
    for (let i = 0; i< x.length; i++){
        sum += x[i]    
    }
    return Number(sum)
}

