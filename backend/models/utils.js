require('dotenv').config();

// Retrieve the MongoDB Atlas username and password from environment variables
const { ATLAS_USERNAME, ATLAS_PASSWORD } = process.env;

// Export a configuration object with the MongoDB connection URI
module.exports = {
  // Construct the MongoDB connection URI using the retrieved credentials
  mongoDBUri: `mongodb+srv://${ATLAS_USERNAME}:${ATLAS_PASSWORD}@cluster0.cdjwk8t.mongodb.net/?retryWrites=true&w=majority`,
};
