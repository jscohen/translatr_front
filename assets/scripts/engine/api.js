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

// const getLyrics = () => {
//   return $.ajax({
//     url: 'https://api.musixmatch.com/ws/1.1/track.search?apikey=ddaaba14dee2f996db5626c25b66564b&q_artist=laura%20pausini&q_track=la%20solitudine&f_has_lyrics=1&page_size=1',
//     method: 'GET'
//   })
// }

const getSongs = () => {
  return $.ajax({
    url: config.apiOrigin + '/songs',
    method: 'GET'
  })
}

module.exports = {
  getAlbum, addAlbum, addArtist, getArtists, addSong, getSongs
}
