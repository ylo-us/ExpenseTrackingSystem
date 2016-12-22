var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

var auth = require('../../server/auth/auth.js');
var router = require('../../server/router/router.js');
var db = require('../../server/database/db.js');

// The rest of the file remains the same

describe('Auth', function() {
  it('should have "hashPwAsync" method', function() {
  	expect(auth.hashPwAsync).to.be.a('function');
  });
});

describe('Router', function() {
  it('should have "GET" function at /expense', function() {
  	expect(router.route('/expense').get).to.be.a('function');
  });
  it('should have "POST" function at /expense', function() {
  	expect(router.route('/expense').post).to.be.a('function');
  });
  it('should have "PUT" function at /expense', function() {
  	expect(router.route('/expense').put).to.be.a('function');
  });
  it('should have "DELETE" function at /expense', function() {
  	expect(router.route('/expense').delete).to.be.a('function');
  });
  it('should have "get" function at /report', function() {
  	expect(router.route('/report').get).to.be.a('function');
  });
});

describe('Database', function() {
  it('should have user table', function() {
  	expect(db.user).to.be.a('object');
  });
  it('should have expense table', function() {
  	expect(db.expense).to.be.a('object');
  });
});