'use strict'
const api = require('./api.js')
const ui = require('./ui.js')
const games = require('./games.js')
const players = require('../auth/players.js')
const watcher = require('../watch/gameWatcher')

const startNewGame = function () {
  event.preventDefault()
  $('.gamecell').empty()
  $('.gamecell').css('background-color', 'white')
  if (games.gameStarted === true) {
    $('.gamecell').on('click', playTurn)
  }
  api.newGame().then(ui.newGameSuccess)
  .catch(ui.newGameFailure)
}

const getGame = function () {
  if (players.player2 !== undefined) {
    event.preventDefault()
    api.getGame(players.player2.token).then(ui.getGameSuccess)
    .catch(ui.getGameFailure)
  } else if (players.player1 !== undefined) {
    event.preventDefault()
    api.getGame(players.player1.token).then(ui.getGameSuccess)
    .catch(ui.getGameFailure)
  } else {
    $('.game-log').text('You must sign in to get your stats')
    return false
  }
}

const getWins = function (data) {
  console.log('got wins?')
  const games = data.games
  const obj = {}
  const X = 'X'
  const O = 'O'
  let win = false
  let winCount = 0
  games.forEach(function (item) {
    obj.game = item.id
    obj.cells = item.cells
    console.log(item)
    if (item.player_x.email === players.player1.email) {
      win = didYouWin(item.cells, X)
      if (win) { winCount += 1 }
    } else if (item.player_o.email === players.player2.email) {
      win = didYouWin(item.cells, O)
      if (win) { winCount += 1 }
    }
  })
  console.log(winCount)
  if (players.player2 !== undefined) {
    $('.game-log').text(players.player2.email + ' has ' + winCount + ' wins')
  } else {
    $('.game-log').text(players.player1.email + ' has ' + winCount + ' wins')
  }
}

let turn = 1

const playTurn = function () {
  if (players.player2 === undefined) {
    $('.game-log').text('You need two players to play')
    return false
  } else if (games.gameStarted !== true) {
    $('.game-log').text('Please click the start game button to play')
    return false
  }
  const gameWatcher = watcher.resourceWatcher('http://localhost:7165/:id/watch', {
    Authorization: 'Token token=' + players.player1.token,
    timeout: 120
  })

  gameWatcher.on('change', test)

  const test = function () {
    console.log('testing testing')
  }
  const X = 'X'
  const O = 'O'
  const p1Color = '#eeceff'
  const p2Color = '#aabbcc'
  let cell = $(this).attr('id')
  cell = '#' + cell
  const gameArr = games.game.game.cells
  const cheatMode = $('.cheatMode').text()
  console.log(turn)
  if (games.gameStarted && turn % 2 === 1) {
    doTurn(cell, '<h1>X</h1>', gameArr, turn, X)
    $('.game-log').text(players.player1.email + ' played an X in ' + cell)
    console.log(turn)
    if (cheatMode === 'Cheater!!') {
      checkCheatMode(gameArr, X)
    }
    const win = didYouWin(gameArr, X, p1Color)
    didYouWin(gameArr, X, p1Color)
    updateGame(cell, X, win)
  } else if (games.gameStarted && turn % 2 === 0) {
    console.log(turn)
    doTurn(cell, '<h1>O</h1>', gameArr, turn, O)
    $('.game-log').text(players.player2.email + ' played an O in ' + cell)
    if (cheatMode === 'Cheater!!') {
      checkCheatMode(gameArr, O)
    }
    const win = didYouWin(gameArr, O, p2Color)
    didYouWin(gameArr, X, p1Color)
    updateGame(cell, O, win)
  }
  turn = whoseTurn(turn)
  $(this).off('click', playTurn)
}

const whoseTurn = function (counter) {
  counter = counter + 1
  return counter
}

const updateGame = function (cell, letter, win) {
  cell = cell.substring(5) / 1
  const gameUpdate = {
    'game': {
      'cell': {
        'index': cell,
        'value': letter
      },
      'over': win
    }
  }
  console.log(gameUpdate)
  api.updateGame(gameUpdate).then(ui.updateGameSuccess)
  .catch(ui.updateGameFail)
}

const doTurn = function (cell, value, gameArr, turn, letter) {
  $(cell).html(value)
  styleCell(cell, letter)
  cell = getCellNum(cell)
  const array = addCell(cell, gameArr, letter)
  games.game.game.cells = array
  return whoseTurn(turn)
}

const getCellNum = function (cell) {
  cell = cell.substring(5)
  cell = cell / 1
  return cell
}

const addCell = function (cellNum, array, letter) {
  array[cellNum] = letter
  return array
}

const styleCell = function (cell, letter) {
  if (letter === 'X') {
    $(cell).css('background-color', '#eeceff')
  } else {
    $(cell).css('background-color', '#aabbcc')
  }
}

const p2joinGame = function () {
  event.preventDefault()
  console.log('Join Game Started')
  if (games.game.game === undefined) {
    $('.game-log').text('You need to start a game first!')
    return false
  }
  api.joinGame().then(ui.joinGameSuccess)
  .catch(ui.joinGameFailure)
}

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

const checkForCatsGame = function (letter, style, gameArr) {
  for (let i = 0; i < gameArr.length; i++) {
    if (gameArr[i] === '') {
      return false
    }
  }
  $('.game-log').text('Its a cats game!  Try again!')
}

const gameover = function (letter, style) {
  if (letter === 'X') {
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

const activateCheatMode = function (event) {
  console.log('test')
  event.preventDefault()
  $('.game-log').text('Hmmm....some shenanigans may be going on here...')
  $('.cheatMode').text('Cheater!!')
  return true
}

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

const addHandlers = () => {
  $('#newgame').on('submit', startNewGame)
  $('#gamestatus').on('submit', getGame)
  $('.gamecell').on('click', playTurn)
  $('#join-game').on('submit', p2joinGame)
  $('#cheat').on('submit', activateCheatMode)
  $('.updateGame').on('submit', updateGame)
}

module.exports = {
  addHandlers,
  getWins
}
