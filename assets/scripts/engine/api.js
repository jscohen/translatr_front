const config = require('../config')

// AJAX Call to API to get all albums
const getAlbum = () => {
  return $.ajax({
    url: config.apiOrigin + '/albums/',
    method: 'GET'
  })
}

// AJAX Call to API to add a new album
const addAlbum = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/albums',
    method: 'POST',
    data
  })
}

// AJAX Call to add a new artist
const addArtist = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/artists',
    method: 'POST',
    data
  })
}

// AJAX Call to get all artists
const getArtists = () => {
  return $.ajax({
    url: config.apiOrigin + '/artists',
    method: 'GET'
  })
}

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
const updateAlbum = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/albums/' + data.album.id,
    method: 'PATCH',
    data
  })
}

const deleteAlbum = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/albums/' + data.album.id,
    method: 'DELETE',
    data
  })
}

module.exports = {
  getAlbum, addAlbum, addArtist, getArtists, addSong, getSongs, getLyrics, updateAlbum, deleteAlbum
}
