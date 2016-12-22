var expect = chai.expect;

var httpStore = {  
  signup: function() {
    $.ajax({
      url: 'http://localhost:8000/signup',
      data: {
				username: 'user1',
				password: 'user1',
				isAdmin: true
			},
      success: function(data) {
        console.log(data);
      }
    });
  },
  signin: function(num) {
    $.ajax({
      method: 'POST',
			url: 'http://localhost:8000/signin',
			data: {
				username: $scope.user.username,
				password: $scope.user.password
			},
      success: function(data) {
        console.log(data);
      }
    });
  }
};

describe('AuthTest', function() {  
  describe('signup', function() {

    beforeEach(function() {
      sinon.spy($, 'ajax');
    });

    afterEach(function() { 
      $.ajax.restore();
    })

    it('should make an ajax call', function(done) {
      httpStore.signup();
      expect($.ajax.calledOnce).to.be.true; 
      done(); // let Mocha know we're done async testing
    });
  });
});