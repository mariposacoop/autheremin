autheremin
==========

Sets up user authentication in a database in a pretty safe way. Now with bcrypt!

Usage
-----
I'm thinking usage along these lines:

```javascript
// db must provide get, set, and del methods
var db = require('./db')
var autheremin = require('autheremin')(db)

var username = 'antigone'
var password = '7xqJ3b8n'

autheremin.save(username, password, function(err) {
  if (err) throw err
  // username/password combination was saved successfully
})

autheremin.verify(username, password, function(err) {
  if (err) throw err
  // username/password combination was verified against the database
})

autheremin.remove(username, function(err) {
  if(err) throw err
  // all records with that username removed from the database
})
```
