const config = require('../config')
const users = require('../auth/users')

const getAlbum = () => {
  console.log('test')
  return $.ajax({
    url: config.apiOrigin + '/albums/',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + users.user.token
    }
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
  console.log(config.apiOrigin)
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
  console.log(data)
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

module.exports = {
  getAlbum, addAlbum, addArtist, getArtists, addSong, getSongs
}
