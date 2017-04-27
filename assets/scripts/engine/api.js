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
  console.log(config.apiOrigin)
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

module.exports = {
  getAlbum, addAlbum, addArtist, getArtists
}
