const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLSchema, GraphQLBoolean, GraphQLInputObjectType } = require('graphql');
const delayed = require("../models/delayed.js");
const codes = require("../models/codes.js");
const tickets = require("../models/tickets.js");


const TicketType = new GraphQLObjectType({
    name: 'Ticket',
    fields: () => ({
        _id: { type: GraphQLString },
        code: { type: GraphQLString },
        trainnumber: { type: GraphQLString },
        traindate: { type: GraphQLString },
    }),
});

const CodeList = new GraphQLObjectType({
    name: 'Codes',
    description: 'Codes',
    fields: () => ({
        Code: {type: GraphQLString},
        Level1Description: {type: GraphQLString},
        Level2Description: {type: GraphQLString},
        Level3Description: {type: GraphQLString},
    })
})

const Location = new GraphQLObjectType({
    name: 'Location',
    fields: () => ({
        LocationName: { type: GraphQLString },
    })
});

const DelayedTrains = new GraphQLObjectType({
    name: 'Train',
    description: 'Trains',
    fields: () => ({
        ActivityId: {type: GraphQLNonNull(GraphQLString)},
        ActivityType: {type: GraphQLNonNull(GraphQLString)},
        Canceled: {type:  GraphQLNonNull(GraphQLBoolean)},
        AdvertisedTimeAtLocation: {type: GraphQLNonNull(GraphQLString)},
        EstimatedTimeAtLocation: {type: GraphQLNonNull(GraphQLString)},
        FromLocation: {type: GraphQLList(Location)},
        LocationSignature: {type: GraphQLNonNull(GraphQLString)},
        AdvertisedTrainIdent: {type: GraphQLString},
        OperationalTrainNumber: {type: GraphQLNonNull(GraphQLString)},
        ToLocation: {type: GraphQLList(Location)},
        TrainOwner: {type: GraphQLString},
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        trains: {
            type: new GraphQLList(DelayedTrains),
            description: "Trains",
            resolve: () => delayed.getDelayedTrains()
        },
        codes: {
            type: new GraphQLList(CodeList),
            description: "Codes",
            resolve: () => codes.getCodes()
        },
        ticket: {
            type: new GraphQLList(TicketType),
            description: "Tickets",
            resolve: () => tickets.getTickets()
        },
    })
});

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        createTicket: {
            type: TicketType, // Assuming TicketType is defined
            args: {
                code: { type: GraphQLNonNull(GraphQLString) },
                trainnumber: { type: GraphQLNonNull(GraphQLString) },
                traindate: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (parent, args) => {
                return tickets.createTicket(args)
            },
        },
    }),
});

module.exports = {RootQueryType, RootMutationType};
