const request = require('supertest')
   , should = require('should')
   , express = require('express');

describe('first test', () => {
  it('should pass with simple test', (done) => {
    let server;
    beforeEach(function () {
        server = require('../app');
    });
    
    it('should save cookies', function(done){
        request(server)
        .get('/')
        .expect('set-cookie', 'cookie=hey; Path=/', done);
    });
  });
});