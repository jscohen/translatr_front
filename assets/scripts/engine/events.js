const api = require('./api')
const ui = require('./ui')
const users = require('../auth/users')
const getFormFields = require(`../../../lib/get-form-fields`)
const lyrics = require('./lyrics')

// This function is run when the add song button is pushed
// It makes an API call to add the songs
const onAddSong = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  data.song.user_id = users.user.user.id
  api.addSong(data).then(ui.addSongSuccess).catch(ui.addSongFailure)
}

// This function is run when the get song button is pushed
// It makes an API call to get the songs
const onGetSongs = function (event) {
  event.preventDefault()
  api.getSongs().then(ui.getSongsSuccess).catch(ui.getSongsFailure)
}

// This function is run when the get song button is pushed
// It makes an API call to get the songs
const onGetSongsNew = function () {
  console.log('test')
  api.getSongs().then(ui.getSongsSuccess).catch(ui.getSongsFailure)
}

// This function is run when the get lyrics button is pushed
// It makes an API call to get the lyrics by song id
const onGetLyrics = function (data) {
  api.getLyrics(data).then(ui.getLyricsSuccess).catch(ui.getLyricsFailure)
}

// This function is run when the translate button is pushed
// It places the translation of the song lyrics into HTML
const translate = function (event) {
  event.preventDefault()
  console.log(lyrics.lyric)
  let wordCount = 0
  // Empty the element so we don't add lyrics on top of each other
  $('.add_translation').empty()
  // Iterate through the translation
  for (let i = 0; i < lyrics.lyric.translation.length; i++) {
    // There are no line breaks in the translation, so add line breaks
    // Every five words
    // Otherwise append the translation to HTML
    if (wordCount === 5) {
      $('.add_translation').append('<br />' + '<span>' + lyrics.lyric.translation[i] + '</span>')
      wordCount = 0
    // If you see a space, we know there is a word, so count the word
    } else if (lyrics.lyric.translation[i] === ' ') {
      wordCount += 1
      $('.add_translation').append('<span>' + lyrics.lyric.translation[i] + '</span>')
    // Stop printing the translation once we hit the * character
    // To get rid of junk text
    } else if (lyrics.lyric[i] === '*') {
      break
    } else {
      $('.add_translation').append('<span>' + lyrics.lyric.translation[i] + '</span>')
    }
  }
}

// When updating song, make the API call with passed data
const updateSong = function (data) {
  api.updateSong(data).then(ui.updateSongSuccess).catch(ui.updateSongFailure)
}

// When deleting song, make the API call with passed data
const deleteSong = function (id, data) {
  api.deleteSong(id, data).then(ui.deleteSongSuccess).catch(ui.deleteSongFailure)
}

// Click handlers get input from the html elements when they are clicked
const addHandlers = () => {
  $('#add-song').on('submit', onAddSong)
  $('#get-songs').on('submit', onGetSongs)
  $('.everything').hide()
  $('#get-lyrics').on('submit', onGetLyrics)
  $('#translate').on('submit', translate)
  $('#update-song').on('submit', updateSong)
  $('#delete-song').on('submit', deleteSong)
}

// Exports for use in main index file
module.exports = {
  addHandlers, updateSong, deleteSong, onGetSongsNew, onGetLyrics
}
