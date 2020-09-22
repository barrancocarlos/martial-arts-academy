const mongoose = require('mongoose');
const config = require('./config');

// avoid mongoose library warning
mongoose.Promise = global.Promise;

mongoose.connect(config.dbhost, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
      console.log("Database is connected");
});