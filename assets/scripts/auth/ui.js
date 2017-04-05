'use strict'

// const store = require('../store')

const signUpSuccess = (data) => {
  console.log("WAT")
  console.log(data.user.email + ' is now signed up!')
  $('.pl').text('Hello ' + data.user.email)
  $('.signUpModal').modal('hide')
}

const signUpFailure = (error) => {
  console.error(error)
  $('.pl').text('You are already signed in!')
  $('.signUpModal').modal('hide')
}

module.exports = {
  signUpSuccess,
  signUpFailure
}
