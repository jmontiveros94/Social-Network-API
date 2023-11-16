// Imports mognoose and connect/connection
const { connect, connection } = require('mongoose');

// connection string to send to the server to run the database
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1';

// connects the databse using the string
connect(connectionString);

module.exports = connection;