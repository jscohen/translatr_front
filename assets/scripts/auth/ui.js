'use strict'

const players = require('./players')

const signUpSuccess = (data) => {
  $('.signUpModal').modal('hide')
  $('.signUpNav').hide()
  if (players.player1 === undefined) {
    players.player1 = data.user
    $('.pl').text('Hello ' + data.user.email + ' you have entered the game as player 1 (X)')
    $('.pl1name').text(players.player1.email)
  } else if (players.player2 === undefined) {
    players.player2 = data.user
    $('.pl').text('Hello ' + data.user.email + ' you have entered the game as player 2 (O)')
    $('.pl2name').text(data.user.email)
  } else {
    $('pl').text('Hello ' + data.user.email + ' ,you are signed up but the game is already full')
  }
  $('.signOutNav').show()
}

const signUpFailure = (error) => {
  console.error(error)
  $('.pl').text('You are already signed up!')
  $('.signUpModal').modal('hide')
}

const signInFailure = (error) => {
  console.error(error)
  $('.pl').text('You are already signed in.')
  $('.signUpModal').modal('hide')
}

const signOutSuccess = () => {
  console.log('sign out success ran with no returns')
  console.log(players.player1.id)
  if (players.player2 !== undefined) {
    players.player2 = undefined
    $('.pl').text('Player 2 has signed out')
  } else if (players.player1.id !== undefined) {
    console.log('woot')
    players.player1 = undefined
    $('.pl').text('Player 1 has signed out')
  }
  if (players.player1 === undefined && players.player2 === undefined) {
    $('.signOutNav').hide()
  }
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInFailure,
  signOutSuccess
}
