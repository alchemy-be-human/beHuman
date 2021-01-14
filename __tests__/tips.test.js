const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');

//pool path may need to be double-checked
const pool = require('../lib/utils/pool');

describe('tests for model 2', () => {
    beforeEach(() => pool.query(fs.readFileSync('.sql/setup.sql', 'utf-8')));

    afterAll(() => pool.end());


    it('test description', async() => {
        //test code
    })



});