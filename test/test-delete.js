var assert = require('assert')
var bcrypt = require('bcrypt')

var username = 'joan'

// stub out db
var db = function() {}
db.store = {}
db.store['autheremin:'+username] = 'somekindacrazyhash#&*$##'
db.del = function(key, cb) {
  delete db.store[key]
  cb()
}

var autheremin = require('../autheremin')(db)

var deleted = false

autheremin.delete(username, function(err) {
  if (err) throw err
  if (db.store['autheremin:'+username] === undefined) deleted = true
})

process.on('exit', function() {
  assert(deleted, 'should have deleted the key at that username')
})
