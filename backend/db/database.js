const { MongoClient } = require('mongodb');
require('dotenv').config()

const database = {
    // Function to open a connection to the MongoDB database
    openDb: async function openDb() {
        const uri = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.cdjwk8t.mongodb.net/?retryWrites=true&w=majority`;

        try {
            // Create a new MongoDB client using the connection URI
            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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
