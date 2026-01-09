import { MongoClient } from 'mongodb';
import utils from './utils.js';

const { mongoDBUri } = utils;

const tickets = {
    // Function to get tickets from the database
    // Output: An array of ticket objects
    getTickets: async function () {

        if (process.env.NODE_ENV === "test") {
            return [];
        }

        try {
            const client = new MongoClient(mongoDBUri);
            await client.connect();

            const db = client.db('test'); // Replace with your actual database name
            const collection = db.collection('tickets');

            const allTickets = await collection.find().sort({ _id: -1 }).toArray();

            await client.close();

            return allTickets; // Return the actual data
        } catch (error) {
            console.error('Error getting tickets:', error);
            throw new Error('Internal Server Error'); // Throw an error for GraphQL to handle
        }
    },

    // Function to create tickets and save them in the database
    // Input: Request body with code, trainnumber, and traindate
    // Output: The newly created ticket object
    createTicket: async function (args) { // Args contain the input data
        if (process.env.NODE_ENV === "test") {
            return [];
        }

        try {
            const client = new MongoClient(mongoDBUri);
            await client.connect();

            const db = client.db('test'); // Replace with your actual database name
            const collection = db.collection('tickets');
            const result = await collection.insertOne({
                code: args.code,
                trainnumber: args.trainnumber,
                traindate: args.traindate,
            });

            await client.close();

            return {
                id: result.insertedId,
                code: args.code,
                trainnumber: args.trainnumber,
                traindate: args.traindate,
            };
        } catch (error) {
            console.error('Error creating ticket:', error);
            throw new Error('Internal Server Error', + error.message);
        }
    },
};

export default {tickets};
