var sqlite3 = require('sqlite3').verbose();
 
module.exports.init = function (file) {
  return new sqlite3.Database(file);
};