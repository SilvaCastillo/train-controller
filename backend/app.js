require('dotenv').config()

const express = require('express')
const { graphqlHTTP }  = require("express-graphql")
const { GraphQLSchema } = require("graphql");
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const http = require('http');
const socketIO = require('socket.io');

const {RootQueryType, RootMutationType }= require("./graphql/root.js");
const fetchTrainPositions = require('./models/trains.js')
const config = require('./config.js')[process.env.NODE_ENV] || require('./config.js')['development']; // Load the configuration based on NODE_ENV

const app = express()
const port = process.env.PORT || 1337;
const httpServer = http.createServer(app);

app.use(cors(config.cors));
app.options('*', cors());

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
  // use morgan to log at command line
  app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.disable('x-powered-by');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: process.env.NODE_ENV !== 'production', // Visual är satt till true under utveckling
}));

const origin = process.env.NODE_ENV === 'production'
  ? 'https://www.student.bth.se'
  : '*';

const io = socketIO(httpServer, {
  cors: {
    origin,
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res) => {
  res.json({
      data: 'Hello World!'
  })
})

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
      return next(err);
  }

  res.status(err.status || 500).json({
      "errors": [
          {
              "status": err.status,
              "title":  err.message,
              "detail": err.message
          }
      ]
  });
});

const server =  httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const trainPositions = fetchTrainPositions(io);

module.exports = [ server, trainPositions ];
