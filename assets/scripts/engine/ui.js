const albums = require('./albums')

const getAlbumSuccess = (data) => {
  console.log('success!!')
  albums.album = data
}

const getAlbumFailure = (data) => {
  console.log('failed!')
}

module.exports = {
  getAlbumSuccess, getAlbumFailure
}
