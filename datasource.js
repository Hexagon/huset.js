var sqlite3 = require("sqlite3"),
  config = require('./config.json'),
  fs = require('fs'),
  path = require('path');

module.exports = {
  Init: function () {

    // Initiate sqlite3 database
    var db_file = path.join(__dirname, config.database.file);
    var exists = fs.existsSync(db_file);
    db = new sqlite3.Database(db_file);

    // Create
    if (!exists) {
      console.info('\tCreating database. This may take a while...');
      fs.readFile(config.database.script, 'utf8', function (err, data) {
        if (err) throw err;
        db.exec(data, function (err) {
          if (err) throw err;
          console.info('Done.');
        });
      });
    }

    this.db = db;
  }
}
