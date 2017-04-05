'use strict'

const players = require('./players')

const signUpSuccess = (data) => {
  $('.signUpModal').modal('hide')
  $('.signUpNav').hide()
  if (players.player1 === undefined) {
    players.player1 = data.user
    $('.pl').text('Hello ' + data.user.email + ' you have entered the game as player 1 (X)')
    $('.pl1name').text(data.user.email)
  } else if (players.player2 === undefined) {
    players.player2 = data.user
    $('.pl').text('Hello ' + data.user.email + ' you have entered the game as player 2 (O)')
    $('.pl2name').text(data.user.email)
  } else {
    $('pl').text('Hello ' + data.user.email + ' ,you are signed up but the game is already full')
  }
}

const signUpFailure = (error) => {
  console.error(error)
  $('.pl').text('You are already signed up!')
  $('.signUpModal').modal('hide')
}

module.exports = {
  signUpSuccess,
  signUpFailure
}
