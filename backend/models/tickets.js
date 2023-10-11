const { MongoClient } = require('mongodb');
const { mongoDBUri } = require('./utils');

const tickets = {
    // Function to get tickets from the database
    // Output: An array of ticket objects
    getTickets: async function getTickets(req, res) {
        try {
            const client = new MongoClient(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();

            const db = client.db('test'); // Replace with your actual database name
            const collection = db.collection('tickets');

            const allTickets = await collection.find().sort({ _id: -1 }).toArray();

            await client.close();

            return res.json({
                data: allTickets,
            });
        } catch (error) {
            console.error('Error getting tickets:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Function to create tickets and save them in the database
    // Input: Request body with code, trainnumber, and traindate
    // Output: The newly created ticket object
    createTicket: async function createTicket(req, res) {
        try {
            const client = new MongoClient(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();

            const db = client.db('test'); // Replace with your actual database name
            const collection = db.collection('tickets');

            const result = await collection.insertOne({
                code: req.body.code,
                trainnumber: req.body.trainnumber,
                traindate: req.body.traindate,
            });

            await client.close();

            return res.json({
                data: {
                    id: result.insertedId,
                    code: req.body.code,
                    trainnumber: req.body.trainnumber,
                    traindate: req.body.traindate,
                },
            });
        } catch (error) {
            console.error('Error creating ticket:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = tickets;
