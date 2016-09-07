const request = require('supertest')
   , should = require('should')
   , express = require('express');

describe('Simple app test', () => {
  let server;
  beforeEach(function () {
      server = require('../app');
  });

  it('should return 200 when get root url', (done) => {  
    request(server)
    .get('/')
    .expect(200)
    .end(function(err, res) {
        if (err) return done(err);
        done();
    });
  });

  it('should return Book! when get /book', (done) => {  
    request(server)
    .get('/book')
    .expect(200)
    .expect('Book!',done);
  });

  it('should assert content-type', (done) => {
    request(server)
    .get('/')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect('Content-Length', '197')
    .end(done);
  });

  it('should handle redirects', (done)=> {
    request(server)
    .get('/toBook')
    .redirects(1)
    .end(function (err, res) {
      should.exist(res);
      res.status.should.be.equal(200);
      res.text.should.be.equal('Book!');
      done();
    });

  });
});