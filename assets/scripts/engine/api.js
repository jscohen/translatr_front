const config = require('../config')

// AJAX call to add a song
const addSong = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/songs',
    method: 'POST',
    data
  })
}

// AJAX Call to get all songs
const getSongs = () => {
  return $.ajax({
    url: config.apiOrigin + '/songs',
    method: 'GET'
  })
}

// AJAX Call to get all song lyrics
const getLyrics = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/lyrics',
    method: 'POST',
    data
  })
}

// AJAX Call to get all song lyrics
const updateSong = (data) => {
  console.log(data)
  return $.ajax({
    url: config.apiOrigin + '/songs/' + data.song.id,
    method: 'PATCH',
    data
  })
}

// AJAX Call to delete songs
const deleteSong = (id, data) => {
  return $.ajax({
    url: config.apiOrigin + '/songs/' + id,
    method: 'DELETE',
    data
  })
}

module.exports = {
  addSong, getSongs, getLyrics, updateSong, deleteSong
}
