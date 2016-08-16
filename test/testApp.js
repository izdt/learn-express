const request = require('supertest')
   , should = require('should')
   , express = require('express');

describe('first test', () => {
  it('should pass with simple test', (done) => {
     const app = express();
     const agent = request.agent(app);
    
    it('should save cookies', function(done){
        agent
        .get('/')
        .expect('set-cookie', 'cookie=hey; Path=/', done);
    });



  });
});