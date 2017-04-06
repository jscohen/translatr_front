'use strict'
const api = require('./api.js')
const ui = require('./ui.js')
const games = require('./games.js')
const players = require('../auth/players.js')

const startNewGame = function () {
  event.preventDefault()
  $('.gamecell').empty()
  $('.gamecell').css('background-color', 'white')
  api.newGame().then(ui.newGameSuccess)
  .catch(ui.newGameFailure)
}

const getGame = function () {
  event.preventDefault()
  api.getGame().then(ui.getGameSuccess)
  .catch(ui.getGameFailure)
}

const killGames = function () {
  event.preventDefault()
  api.killGames().then(ui.destroyGamesSuccess)
  .catch(ui.destroyGamesFailure)
}

let turn = 1

const playTurn = function () {
  if (players.player2 === undefined) {
    $('.pl').text('You need two players to play')
    return false
  }
  const X = 'X'
  const O = 'O'
  const p1Color = '#eeceff'
  const p2Color = '#aabbcc'
  let cell = $(this).attr('id')
  cell = '#' + cell
  const gameArr = games.game.game.cells
  console.log(turn)
  if (games.gameStarted && turn % 2 === 1) {
    doTurn(cell, '<h1>X</h1>', gameArr, turn, X)
    $('.pl').text(players.player1.email + ' played an X in ' + cell)
    console.log(turn)
    didYouWin(gameArr, X, p1Color)
  } else if (games.gameStarted && turn % 2 === 0) {
    console.log(turn)
    doTurn(cell, '<h1>O</h1>', gameArr, turn, O)
    $('.pl').text(players.player2.email + ' played an O in ' + cell)
    didYouWin(gameArr, O, p2Color)
  }
  turn = whoseTurn(turn)
}

const whoseTurn = function (counter) {
  counter = counter + 1
  return counter
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
    $('.pl').text('You need to start a game first!')
    return false
  }
  api.joinGame().then(ui.joinGameSuccess)
  .catch(ui.joinGameFailure)
}

const didYouWin = function (gameArr, letter, style) {
  if (gameArr[0] === letter && gameArr[0] === gameArr[1] && gameArr[1] === gameArr[2]) {
    gameover(letter, style)
  } else if (gameArr[1] === letter && gameArr[4] === letter && gameArr[7] === letter) {
    gameover(letter, style)
  } else if (gameArr[0] === letter && gameArr[3] === letter && gameArr[6] === letter) {
    gameover(letter, style)
  } else if (gameArr[2] === letter && gameArr[5] === letter && gameArr[8] === letter) {
    gameover(letter, style)
  } else if (gameArr[3] === letter && gameArr[4] === letter && gameArr[5] === letter) {
    gameover(letter, style)
  } else if (gameArr[6] === letter && gameArr[7] === letter && gameArr[8] === letter) {
    gameover(letter, style)
  } else if (gameArr[0] === letter && gameArr[4] === letter && gameArr[8] === letter) {
    gameover(letter, style)
  } else if (gameArr[2] === letter && gameArr[4] === letter && gameArr[6] === letter) {
    gameover(letter, style)
  }
}

const gameover = function (letter, style) {
  if (letter === 'X') {
    $('.pl').text(players.player1.email + ' is the winner!')
    $('.gamecell').css('background-color', style)
  } else {
    $('.pl').text(players.player2.email + ' is the winner!')
    $('.gamecell').css('background-color', style)
  }
}

const addHandlers = () => {
  $('#newgame').on('submit', startNewGame)
  $('#gamestatus').on('submit', getGame)
  $('#kill-games').on('submit', killGames)
  $('.gamecell').on('click', playTurn)
  $('#join-game').on('submit', p2joinGame)
}

module.exports = {
  addHandlers
}
