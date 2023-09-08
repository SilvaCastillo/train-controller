require('dotenv').config()

const database = {
    openDb: async function openDb() {
        const uri = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.hkfbt.mongodb.net/folinodocs?retryWrites=true&w=majority`;

        try {
            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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
