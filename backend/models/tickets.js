const database = require('../db/database.js');
const { MongoClient } = require('mongodb');
require('dotenv').config()

// const tickets = {
//     getTickets: async function getTickets(req, res){
//         var db = await database.openDb();

//         var allTickets = await db.all(`SELECT *, ROWID as id FROM tickets ORDER BY ROWID DESC`);

//         await db.close();

//         return res.json({
//             data: allTickets
//         });
//     },

//     createTicket: async function createTicket(req, res){
//         var db = await database.openDb();

//         const result = await db.run(
//             'INSERT INTO tickets (code, trainnumber, traindate) VALUES (?, ?, ?)',
//             req.body.code,
//             req.body.trainnumber,
//             req.body.traindate,
//         );

//         await db.close();

//         return res.json({
//             data: {
//                 id: result.lastID,
//                 code: req.body.code,
//                 trainnumber: req.body.trainnumber,
//                 traindate: req.body.traindate,
//             }
//         });
//     }
// };


// const { MongoClient } = require('mongodb');

// Replace with your MongoDB connection string
const uri = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.cdjwk8t.mongodb.net/?retryWrites=true&w=majority`;

const tickets = {
    getTickets: async function getTickets(req, res) {
        try {
            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
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

    createTicket: async function createTicket(req, res) {
        try {
            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
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
