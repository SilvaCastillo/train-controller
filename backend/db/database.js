const { MongoClient } = require('mongodb');
const { mongoDBUri } = require('../models/utils');

const database = {
    // Function to open a connection to the MongoDB database
    openDb: async function openDb() {
        try {
            // Create a new MongoDB client using the connection URI
            const client = new MongoClient(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true });

            // Connect to the MongoDB server
            await client.connect();
            console.log('Connected to MongoDB');

            // You can return the MongoDB client or any other relevant MongoDB-related object here.
            return client;
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    },
};

module.exports = database;
