/**
* Test for train-controller.
*/

"use strict";
require('dotenv').config()

process.env.NODE_ENV = 'test';

const request = require('supertest');

const { expect } = require('chai');
const app = require("../app.js");
const codes = require('../models/codes.js');

describe('Reports', () => {
    describe('GraphQL queries', () => {
        it('returns ticket codes', async () => {
            const query = ` 
            query {
                ticket {
                    code 
                    }
                }
            `;

            const res = await request(app)
                .post('/graphql')
                .send({query});

            expect(res.status).to.equal(200);
            expect(res.body.data).to.be.an('object');
        });
        it('returns Codes', async () => {
            const query = ` 
            query {
                codes {
                    Code 
                    }
                }
            `;

            const res = await request(app)
                .post('/graphql')
                .send({query});

            expect(res.status).to.equal(200);
            expect(res.body.data).to.be.an('object');
        });
        it('returns trains', async () => {
            const query = ` 
            query {
                trains {
                    OperationalTrainNumber 
                    }
                }
            `;

            const res = await request(app)
                .post('/graphql')
                .send({query});

            expect(res.status).to.equal(200);
            expect(res.body.data).to.be.an('object');
        });
    });

    describe('codes model', () => {
        it('returns error when api fetch fails', async () => {
            const fakeFetch = async () => ({
                ok: false
            });
            
            const res = await codes.getCodes(fakeFetch);
            expect(res.error).to.be.equal('Failed to fetch data');  
        });
    });
});
