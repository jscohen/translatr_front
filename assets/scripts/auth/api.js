'use strict'

// const store = require('../store.js')

const config = require('../config')

const signUp = (data) => {
  console.log(data)
  console.log('BOO!')
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}

module.exports = {
  signUp
}
