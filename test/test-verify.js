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

var verified
autheremin.verify(username, password, function(err) {
  if (err) throw err
  verified = true
})

process.on('exit', function() {
  assert(verified, 'should verify correct username/password')
})
