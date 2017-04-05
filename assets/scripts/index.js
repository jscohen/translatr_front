'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const players = require('./auth/players')

$(() => {
  setAPIOrigin(location, config)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled

const authEvents = require('./auth/events.js')

// On Document Ready
$(() => {
  authEvents.addHandlers()
  $('.signOutNav').hide()
})
require('./example')
