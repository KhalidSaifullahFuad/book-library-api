// Dependencies
const {MongoClient, ObjectId} = require('mongodb');
require('dotenv').config();


// MongoDB Connection
const url = process.env.MONGODB_URI;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// MongoDB Database
const db = client.db('book_library_db');

module.exports = {db, ObjectId};