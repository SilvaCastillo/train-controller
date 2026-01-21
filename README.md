# Train-controller

Display delayed trains in Sweden and it's current position.


## About
Train-controller is an application that shows delayed trains in Sweden and visualizes their live position to make it easier to track disruptions and delays.


## Features
- Show delayed trains in Sweden
- Display train details (delay time, destination, etc.)
- Show train's current postion on a map


## Tech used

- Language: JavaScript(Node.js)
- Fronted: React
- Backend: Express
- API: GraphQL (express-graphql)
- Realtime: Socket.IO
- Database: -
- Testing: Chai, Supertest
- Other tools: ESlint, dotenv, morgan, CORS


## Installation

### Requirements
- Node.js v24.11.1
- npm v11.6.2

### Steps

```bash
# Clone repo

git clone https://github.com/SilvaCastillo/train-controller/tree/main

# Enter repo

cd train-controller

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

```
## Configuration (Environment Variables)
```bash
cd backend

touch .env
```
Add TRAFIKVERKET_API_KEY=your_api_key_here

## How to Use
You need two terminals
### Terminal 1 - Start backend
```bash
cd backend

npm run dev
```
### Terminal 2 - Start backend
```bash
cd fronted

npm run dev
```
## Testing
```bash
cd backend

npm test
```

## API Reference

### GraphQL Endpoint
- `POST /graphql`


#### `delayedTrains: [DelayedTrains]`
Returns delayed trains.

Example:
```graphql
query {
  delayedTrains {
    OperationalTrainNumber
    AdvertisedTimeAtLocation
    EstimatedTimeAtLocation
    FromLocation
    ToLocation
  }
}

query {
  codes {
    Level1Description
    Level2Description
  }
}
```