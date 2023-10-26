import { gql } from "@apollo/client";

export const GET_DELAYED_TRAINS  = gql`
    {
        trains {
            AdvertisedTimeAtLocation
            EstimatedTimeAtLocation
            FromLocation {
                LocationName
            }
            LocationSignature
            OperationalTrainNumber
            ToLocation {
                LocationName
            }
            
        }
    }
    `;


export const GET_TICKETS  = gql`
    {
        ticket {
            _id
            code
            trainnumber
            traindate
        }
    }
    `;


export const GET_CODES  = gql`
    {
        codes {
            Code
            Level1Description
            Level2Description
            Level3Description
        }
    }
    `;


export const CREATE_TICKET = gql`
    mutation CreateTicket($code: String!, $trainnumber: String!, $traindate: String!) {
        createTicket(code: $code, trainnumber: $trainnumber, traindate: $traindate) {
            code
            trainnumber
            traindate
        }
    }
`;