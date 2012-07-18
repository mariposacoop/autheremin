var bcrypt = require('bcrypt')

module.exports = function(db) {
  var autheremin = {}

  autheremin.create = function(username, password, cb) {
    bcrypt.hash(password, 8, function(err, hash) {
      if (err) return cb(err)
      db.set('autheremin:'+username, hash, function(err) {
        if (err) return cb(err)
        cb()
      })
    })
  }
  
  autheremin.verify = function(username, password, cb) {
    db.get('autheremin:'+username, function(err, hash) {
      if (err) return cb(err)
      if (!hash) return cb(new Error('No match'))
      bcrypt.compare(password, hash, function(err, res) {
        if (err) return cb(err)
        if (!res) return cb(new Error('No match'))
        cb()
      })
    })
  }

  return autheremin
}
