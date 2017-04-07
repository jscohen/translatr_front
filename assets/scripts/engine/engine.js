'use strict'
const api = require('./api.js')
const ui = require('./ui.js')
const games = require('./games.js')
const players = require('../auth/players.js')
const watcher = require('../watch/gameWatcher')
const getFormFields = require(`../../../lib/get-form-fields`)

// Start a new game function
// Called when the start new game button is clicked
const startNewGame = function () {
  event.preventDefault()
  // Clear the board
  $('.gamecell').empty()
  $('.gamecell').css('background-color', 'white')

  // If a game has already existed (i.e. a second game), reassign the click handlers
  if (games.gameStarted === true) {
    $('.gamecell').on('click', playTurn)
  }
  // API call to start a new game
  api.newGame().then(ui.newGameSuccess)
  .catch(ui.newGameFailure)
}

// Function to get game stats.  This is used to get all of the players games
// To show how many wins they have
const getGame = function () {
  // Perform the API call based on who is signed in
  if (players.player2 !== undefined) {
    event.preventDefault()
    api.getGame(players.player2.token).then(ui.getGameSuccess)
    .catch(ui.getGameFailure)
  } else if (players.player1 !== undefined) {
    event.preventDefault()
    api.getGame(players.player1.token).then(ui.getGameSuccess)
    .catch(ui.getGameFailure)
  } else {
    // If no one is signed in, abort
    $('.game-log').text('You must sign in to get your stats')
    return false
  }
}

// This function contains the logic to get a player's total wins
const getWins = function (data) {
  // Assign local variables.  X and O make it easy to ID player
  // obj is used for temporary storage
  // winCount is the total number of wins
  const games = data.games
  const obj = {}
  const X = 'X'
  const O = 'O'
  let win = false
  let winCount = 0

  // Iterate over all games in the array (i.e. all of a players games)
  // Assign the game ID and game board (cells array) to local object
  games.forEach(function (item) {
    obj.game = item.id
    obj.cells = item.cells
    if (item.player_x.email === players.player1.email) {
      // Call the win logic function used in the main game to see if this particular game
      // Was won by player one.  If so, increment win count
      win = didYouWin(item.cells, X)
      if (win) { winCount += 1 }
    } else if (item.player_o.email === players.player2.email) {
      win = didYouWin(item.cells, O)
      if (win) { winCount += 1 }
    }
  })

  // Determine who is active and log the win results in the game log
  if (players.player2 !== undefined) {
    $('.game-log').text(players.player2.email + ' has ' + winCount + ' wins')
  } else {
    $('.game-log').text(players.player1.email + ' has ' + winCount + ' wins')
  }
}

let turn = 1

// Main game logic function.  It is invoked on clicks to the game board
const playTurn = function () {
  // Abort if a game hasn't been started or there is only one player
  if (players.player2 === undefined) {
    $('.game-log').text('You need two players to play')
    return false
  } else if (games.gameStarted !== true) {
    $('.game-log').text('Please click the start game button to play')
    return false
  }

  // Set the game watcher to communicate across browsers - FEATURE IN PROGRESS
  const gameWatcher = watcher.resourceWatcher('http://localhost:7165/:id/watch', {
    Authorization: 'Token token=' + players.player1.token,
    timeout: 120
  })

  gameWatcher.on('change', test)

  const test = function () {
    console.log('testing testing')
  }

  // Assing local variables to help ID players
  const X = 'X'
  const O = 'O'
  const p1Color = '#eeceff'
  const p2Color = '#aabbcc'

  // Get the cell in question and manipulate it
  let cell = $(this).attr('id')
  cell = '#' + cell

  // Get the current array and check if cheat mode is ojn
  const gameArr = games.game.game.cells
  const cheatMode = $('.cheatMode').text()

  // If the game has been started and the turn number is odd, it's player 1's turn
  if (games.gameStarted && turn % 2 === 1) {
    // Invoke do turn function to set an X to the correct cell on the game board
    doTurn(cell, '<h1>X</h1>', gameArr, turn, X)

    // Put the move on the game log
    $('.game-log').text(players.player1.email + ' played an X in ' + cell)

    // Check if Cheat Mode is on, if it is use it to look for a winning cell
    if (cheatMode === 'Cheater!!') {
      checkCheatMode(gameArr, X)
    }

    // Run the win function with the game array and color.  Set the variable to see if it is true
    const win = didYouWin(gameArr, X, p1Color)
    didYouWin(gameArr, X, p1Color)

    // Call the API to update the game with the current move
    updateGame(cell, X, win)

    // Same logic for player o
  } else if (games.gameStarted && turn % 2 === 0) {
    doTurn(cell, '<h1>O</h1>', gameArr, turn, O)
    $('.game-log').text(players.player2.email + ' played an O in ' + cell)
    if (cheatMode === 'Cheater!!') {
      checkCheatMode(gameArr, O)
    }
    const win = didYouWin(gameArr, O, p2Color)
    didYouWin(gameArr, X, p1Color)
    updateGame(cell, O, win)
  }

  // Increase the turn variable by one
  turn = whoseTurn(turn)

  // Remove the click handler from the clicked cell so it can't be changed
  $(this).off('click', playTurn)
}

// This function increments the counter by one
// It is used to determine whose turn it is
// Odd numbers are player x, even are player o
const whoseTurn = function (counter) {
  counter = counter + 1
  return counter
}

// Update Game function/API Call
// Ran once a move in playTurn is complete
const updateGame = function (cell, letter, win) {
  // Turn the cell into a single integer
  cell = cell.substring(5) / 1

  // Create local game object to be passed to the API
  // Set index to the current cell, value to the player's letter
  // And over to true or false to see if there is a win
  const gameUpdate = {
    'game': {
      'cell': {
        'index': cell,
        'value': letter
      },
      'over': win
    }
  }

  // API call for updating games. See documentation in API and UI
  api.updateGame(gameUpdate).then(ui.updateGameSuccess)
  .catch(ui.updateGameFail)
}

// This function is called from the playTurn function and does the mechanics of a turn
const doTurn = function (cell, value, gameArr, turn, letter) {
  // Call the style function to add CSS to the cell based on who played it
  styleCell(cell, letter)

  // Get the simple number of the cell
  cell = getCellNum(cell)

  // Call the addCell function to add the cell to the game array
  const array = addCell(cell, gameArr, letter)

  // Get the global game object's array set to this array for the API call
  games.game.game.cells = array
  return whoseTurn(turn)
}

// Function to get the number of a cell from a string id (i.e. in HTML id="#cell1")
const getCellNum = function (cell) {
  cell = cell.substring(5)
  cell = cell / 1
  return cell
}

// Function to add the letter played to the cell played in the array
const addCell = function (cellNum, array, letter) {
  array[cellNum] = letter
  return array
}

// Styles the played cell according to the letter
const styleCell = function (cell, letter) {
  if (letter === 'X') {
    $(cell).css('background-color', '#eeceff')
  } else {
    $(cell).css('background-color', '#aabbcc')
  }
}

// Main game logic function for determining winners
// This is basically a list of conditions called from the playTurn function
// Each winning condition is checked every turn
// If one is met, a gameover function finishes the gameArr
// I know there's probably a better way to do this
const didYouWin = function (gameArr, letter, style) {
  if (gameArr[0] === letter && gameArr[0] === gameArr[1] && gameArr[1] === gameArr[2]) {
    return gameover(letter, style)
  } else if (gameArr[1] === letter && gameArr[4] === letter && gameArr[7] === letter) {
    return gameover(letter, style)
  } else if (gameArr[0] === letter && gameArr[3] === letter && gameArr[6] === letter) {
    return gameover(letter, style)
  } else if (gameArr[2] === letter && gameArr[5] === letter && gameArr[8] === letter) {
    return gameover(letter, style)
  } else if (gameArr[3] === letter && gameArr[4] === letter && gameArr[5] === letter) {
    return gameover(letter, style)
  } else if (gameArr[6] === letter && gameArr[7] === letter && gameArr[8] === letter) {
    return gameover(letter, style)
  } else if (gameArr[0] === letter && gameArr[4] === letter && gameArr[8] === letter) {
    return gameover(letter, style)
  } else if (gameArr[2] === letter && gameArr[4] === letter && gameArr[6] === letter) {
    return gameover(letter, style)
  } else {
    checkForCatsGame(letter, style, gameArr)
  }
  return false
}

// Checks for a draw
const checkForCatsGame = function (letter, style, gameArr) {
  // If all cells are filled and there is no winner, the game is a draw
  for (let i = 0; i < gameArr.length; i++) {
    if (gameArr[i] === '') {
      return false
    }
  }
  $('.game-log').text('Its a cats game!  Try again!')
}

// This function is run from the didYouWin function if a win condition is method
// Based on which player one, the game board is updated
const gameover = function (letter, style) {
  if (letter === 'X') {
    // Log the winner, change cells to their color, clear contents of the game cells
    // And remove the click handlers
    $('.game-log').text(players.player1.email + ' is the winner!')
    $('.gamecell').css('background-color', style)
    $('.gamecell').empty()
    $('.gamecell').off('click', playTurn)
    return true
  } else {
    $('.game-log').text(players.player2.email + ' is the winner!')
    $('.gamecell').css('background-color', style)
    $('.gamecell').empty()
    $('.gamecell').off('click', playTurn)
    return true
  }
}

// Activating Cheat Mode function.  Logs a silly message
const activateCheatMode = function (event) {
  event.preventDefault()
  $('.game-log').text('Hmmm....some shenanigans may be going on here...')
  $('.cheatMode').text('Cheater!!')
  return true
}

// Every time playTurn is run with cheat mode on, this functiom is called to highlight
// Any winning cells.  Again, I'm sure there is a better way to do this.
const checkCheatMode = function (gameArr, letter) {
  if (gameArr[0] === letter && gameArr[1] === letter && gameArr[2] === '') {
    $('#cell2').css('background-color', 'green')
    $('#cell2').text('Click me to win!!!<')
  } else if (gameArr[0] === letter && gameArr[2] === letter && gameArr[1] === '') {
    $('#cell1').css('background-color', 'green')
    $('#cell1').text('Click me to win!!!')
  } else if (gameArr[0] === '' && gameArr[1] === letter && gameArr[2] === letter) {
    $('#cell0').css('background-color', 'green')
    $('#cell0').text('Click me to win!!!')
  } else if (gameArr[0] === letter && gameArr[3] === letter && gameArr[6] === '') {
    $('#cell6').css('background-color', 'green')
    $('#cell6').text('Click me to win!!!')
  } else if (gameArr[0] === letter && gameArr[6] === letter && gameArr[3] === '') {
    $('#cell3').css('background-color', 'green')
    $('#cell3').text('Click me to win!!!')
  } else if (gameArr[3] === letter && gameArr[6] === letter && gameArr[0] === '') {
    $('#cell0').css('background-color', 'green')
    $('#cell0').text('Click me to win!!!')
  } else if (gameArr[0] === letter && gameArr[4] === letter && gameArr[8] === '') {
    $('#cell8').css('background-color', 'green')
    $('#cell8').text('Click me to win!!!')
  } else if (gameArr[1] === letter && gameArr[4] === letter && gameArr[7] === '') {
    $('#cell7').css('background-color', 'green')
    $('#cell7').text('Click me to win!!!')
  } else if (gameArr[4] === letter && gameArr[7] === letter && gameArr[1] === '') {
    $('#cell1').css('background-color', 'green')
    $('#cell1').text('Click me to win!!!')
  } else if (gameArr[1] === letter && gameArr[7] === letter && gameArr[4] === '') {
    $('#cell4').css('background-color', 'green')
    $('#cell4').text('Click me to win!!!')
  } else if (gameArr[2] === letter && gameArr[5] === letter && gameArr[8] === '') {
    $('#cell8').css('background-color', 'green')
    $('#cell8').text('Click me to win!!!')
  } else if (gameArr[5] === letter && gameArr[8] === letter && gameArr[2] === '') {
    $('#cell2').css('background-color', 'green')
    $('#cell2').text('Click me to win!!!')
  } else if (gameArr[2] === letter && gameArr[8] === letter && gameArr[5] === '') {
    $('#cell5').css('background-color', 'green')
    $('#cell5').text('Click me to win!!!')
  } else if (gameArr[3] === letter && gameArr[4] === letter && gameArr[5] === '') {
    $('#cell5').css('background-color', 'green')
    $('#cell5').text('Click me to win!!!')
  } else if (gameArr[5] === letter && gameArr[4] === letter && gameArr[3] === '') {
    $('#cell3').css('background-color', 'green')
    $('#cell3').text('Click me to win!!!')
  } else if (gameArr[3] === letter && gameArr[3] === letter && gameArr[4] === '') {
    $('#cell4').css('background-color', 'green')
    $('#cell4').text('Click me to win!!!')
  } else if (gameArr[6] === letter && gameArr[7] === letter && gameArr[8] === '') {
    $('#cell8').css('background-color', 'green')
    $('#cell8').text('Click me to win!!!')
  } else if (gameArr[7] === letter && gameArr[8] === letter && gameArr[6] === '') {
    $('#cell6').css('background-color', 'green')
    $('#cell6').text('Click me to win!!!')
  } else if (gameArr[8] === letter && gameArr[6] === letter && gameArr[7] === '') {
    $('#cell7').css('background-color', 'green')
    $('#cell7').text('Click me to win!!!')
  } else if (gameArr[2] === letter && gameArr[4] === letter && gameArr[6] === '') {
    $('#cell6').css('background-color', 'green')
    $('#cell6').text('Click me to win!!!')
  } else if (gameArr[6] === letter && gameArr[4] === letter && gameArr[2] === '') {
    $('#cell2').css('background-color', 'green')
    $('#cell2').text('Click me to win!!!')
  } else if (gameArr[2] === letter && gameArr[6] === letter && gameArr[4] === '') {
    $('#cell4').css('background-color', 'green')
    $('#cell4').text('Click me to win!!!')
  } else {
    $('.game-log').text('No dice yet, cheater')
    return false
  }
}

// Function for API call to get the results of an individual game
const getAGame = function () {
  event.preventDefault()

  // If no one is signed in, abort
  if (players.player1 === undefined) {
    $('.game-log').text('You must sign in to get game results')
    return false
  }

  // Get the ID from the form fields and call the API
  const data = getFormFields(this)
  const gameID = data.gameid.id
  api.getAGame(gameID).then(ui.gameIDSuccess)
  .catch(ui.gameIDFailure)
}

// When the show a game button is clicked, this functions logs the results
const showAGame = function (arr, id, player1, player2) {
  // Reuse the game logic to see if the game has a winner
  const xWinner = didYouWin(arr, 'X')
  const oWinner = didYouWin(arr, 'O')

  // Log the results
  if (xWinner) {
    $('.game-log').text('Game #' + id + ' was between ' + player1 + ' and ' + player2 + '.  ' + player1 + ' was victorious')
  } else if (oWinner) {
    $('.game-log').text('Game #' + id + ' was between ' + player1 + ' and ' + player2 + '.  ' + player2 + ' was victorious')
  } else {
    $('.game-log').text('Game #' + id + ' was between ' + player1 + ' and ' + player2 + '.  The game was a draw')
  }
}

// Event handlers stored and called on document ready in index.js
const addHandlers = () => {
  $('#newgame').on('submit', startNewGame)
  $('#gamestatus').on('submit', getGame)
  $('.gamecell').on('click', playTurn)
  $('#cheat').on('submit', activateCheatMode)
  $('.updateGame').on('submit', updateGame)
  $('#get-a-game').on('submit', getAGame)
}

module.exports = {
  addHandlers,
  getWins,
  showAGame
}
