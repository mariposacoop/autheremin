var assert = require('assert')

// stub out db
var db = function() {}
db.store = {}
db.del = function(key, cb) {
  db.store[key] = undefined
  cb()
}

var autheremin = require('../autheremin')(db)

var deleted = false

autheremin.delete('nonUser', function(err) {
  if (err) throw err
  deleted = true
})

process.on('exit', function() {
  assert(deleted, 'should not error on delete of nonexistent user')
})
