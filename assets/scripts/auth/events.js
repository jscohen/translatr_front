'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  event.preventDefault()
  console.log('woot')
  const data = getFormFields(this)
  console.log('You clicked the sign up button!')
  console.log(data)
  api.signUp(data).then(ui.signUpSuccess)
  .catch(ui.signUpFailure)
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
}

module.exports = {
  addHandlers
}
