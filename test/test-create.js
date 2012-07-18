var assert = require('assert')
var bcrypt = require('bcrypt')

// stub out db
var db = function() {}
db.store = {}
db.set = function(key, value, cb) {
  this.store[key] = value
  cb()
}

var autheremin = require('../autheremin')(db)

var username = 'joan'
var password = 'non34Aro'

var hashed = false

autheremin.create(username, password, function(err) {
  assert.ifError(err)
  bcrypt.compare(password, db.store.joan, function(err, res) {
    assert.ifError(err)
    hashed = res
  })
})

process.on('exit', function() {
  assert(hashed)
})
