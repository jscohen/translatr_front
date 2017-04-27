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

module.exports = {
  getAlbum
}
