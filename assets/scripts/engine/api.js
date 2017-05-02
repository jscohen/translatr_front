const config = require('../config')

const getAlbum = () => {
  return $.ajax({
    url: config.apiOrigin + '/albums/',
    method: 'GET'
  })
}

const addAlbum = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/albums',
    method: 'POST',
    data
  })
}

const addArtist = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/artists',
    method: 'POST',
    data
  })
}

const getArtists = () => {
  return $.ajax({
    url: config.apiOrigin + '/artists',
    method: 'GET'
  })
}

const addSong = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/songs',
    method: 'POST',
    data
  })
}

const getSongs = () => {
  return $.ajax({
    url: config.apiOrigin + '/songs',
    method: 'GET'
  })
}

const getLyrics = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/lyrics',
    method: 'POST',
    data
  })
}

module.exports = {
  getAlbum, addAlbum, addArtist, getArtists, addSong, getSongs, getLyrics
}
