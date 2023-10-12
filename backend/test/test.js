/**
* Test for train-controller.
*/

"use strict";
require('dotenv').config()

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const fetchTrainPositions = require("../models/trains.js");
const app = require("../app.js");
const codes = require('../routes/codes.js');

const server = app[0];
const io = app[1];

chai.should();

chai.use(chaiHttp);

var assert = require("assert");

describe('Reports', () => {
    describe('GET responses', () => {
        it('/ 200 STATUS', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("string");
                    res.body.data.length.should.be.above(0);

                    done();
                });
        });
        it('/codes 200 STATUS', (done) => {
            chai.request(server)
                .get("/codes")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");

                    done();
                });
        });
        it('/delayed 200 STATUS', (done) => {
            chai.request(server)
                .get("/codes")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");

                    done();
                });
        });
        it('/tickets 200 STATUS', (done) => {
            chai.request(server)
                .get("/codes")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });
    describe('GET API response trains', () => {
        it("Creates promise", () => {
            chai.expect(fetchTrainPositions(io)).to.be.an('promise');
        });
    });
});
