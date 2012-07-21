var assert = require('assert')
var autheremin = require('../autheremin')
var bcrypt = require('bcrypt')

var username = 'joan'
var password = 'non34Aro'

// stub out db
var db = function() {}
db.store = {}
db.store['autheremin:'+username] = bcrypt.hashSync(password, 8)
db.get = function(key, cb) {
  cb(null, db.store[key])
}

var autheremin = require('../autheremin')(db)

var badPass
autheremin.verify(username, 'badPass', function(err) {
  if (err) badPass = true
})

process.on('exit', function() {
  assert(badPass, 'should error on bad password')
})
