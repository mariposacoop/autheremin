var assert = require('assert')
var autheremin = require('../autheremin')

// stub out db
var db = function() {}
db.store = {}
db.get = function(key, cb) {
  cb(null, db.store[key])
}

var autheremin = require('../autheremin')(db)

var nonUser
autheremin.verify('someNonUser', 'passDontMatter', function(err) {
  if (err) nonUser = true
})

process.on('exit', function() {
  assert(nonUser, 'should error on nonexistent user')
})
