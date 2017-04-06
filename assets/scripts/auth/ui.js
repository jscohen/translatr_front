'use strict'

const players = require('./players')

const signUpSuccess = (data) => {
  $('.signUpModal').modal('hide')
  $('.signUpNav').hide()
  if (players.player1 === undefined) {
    players.player1 = data.user
    $('.pl').text('Hello ' + players.player1.email)
    console.log(players.player1)
  } else if (players.player2 === undefined) {
    players.player2 = data.user
    $('.pl').text('Hello ' + players.player2.email)
    console.log(players.player2)
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
  $('.pl').text(players.player.email + ' has signed out')
  players.player = undefined
}

const changePWSuccess = (data) => {
  $('#changePWModal').modal('hide')
  $('.pl').text('Your password has successfully been changed')
}

const changePWFailure = (error) => {
  $('#changePWModal').modal('hide')
  console.error(error)
  $('.pl').text('There was an error - please try again')
  $('.changePWNav').modal('hide')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInFailure,
  signOutSuccess,
  changePWSuccess,
  changePWFailure
}
