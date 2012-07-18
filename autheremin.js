var bcrypt = require('bcrypt')

module.exports = function(db) {
  var autheremin = {}
  autheremin.create = function(username, password, cb) {
    bcrypt.hash(password, 8, function(err, hash) {
      if (err) return cb(err)
      db.set(username, hash, function(err) {
        if (err) return cb(err)
        cb()
      })
    })
  }
  return autheremin
}
