import 'dotenv/config';

import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema } from 'graphql';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import http from 'http';
import { Server as socketIO } from 'socket.io';
import trains from './models/trains.js';

const { fetchTrainPositions } = trains;
import { RootQueryType, RootMutationType } from './graphql/root.js';
import configFile from './config.js';


const env = process.env.NODE_ENV || 'development';
const config = configFile[env];


const app = express()
const port = process.env.PORT || 1337;
const httpServer = http.createServer(app);

app.use(cors(config.cors));
app.options('*', cors(config.cors));

if (process.env.NODE_ENV !== 'test') {
  // use morgan to log at command line
  app.use(morgan('combined'));
}

console.log("NODE_ENV:", process.env.NODE_ENV);

app.disable('x-powered-by');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: process.env.NODE_ENV !== 'production',
}));

const io = new socketIO(httpServer, {
  cors: config.cors,
});

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});


if (process.env.NODE_ENV !== 'test') {
  fetchTrainPositions(io);
}

app.get('/', (req, res) => {
  res.json({
      data: 'Hello World!'
  })
})


// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
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


if (process.env.NODE_ENV !== 'test') {
  httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });
}

export default app;
