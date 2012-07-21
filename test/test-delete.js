var assert = require('assert')

var username = 'joan'

// stub out db
var db = function() {}
db.store = {}
db.store['autheremin:'+username] = 'somekindacrazyhash#&*$##'
db.del = function(key, cb) {
  db.store[key] = undefined
  cb()
}

var autheremin = require('../autheremin')(db)

var deleted = false

autheremin.delete(username, function(err) {
  if (err) throw err
  if (db.store['autheremin:'+username] === undefined) deleted = true
})

process.on('exit', function() {
  assert(deleted, 'should delete the key at that username')
})
