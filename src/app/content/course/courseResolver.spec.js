(function(){

  describe("courseResolver", function(){
    var courseResolver;
    var dispatcher;
    var CoverInfo;
    var Course;
    var $rootScope;
    var $q;

    beforeEach(function(){
      dispatcher = {};
      dispatcher.getState = sinon.stub().returns({user: '123', resource: '456'});

      Course = function(){};
      Course.schema = '123';

      module('unacademic.content.course',  function($provide){
        $provide.value('dispatcher', dispatcher);
        $provide.value('Course', Course);
      });

      inject(function(_courseResolver_, _$rootScope_, _$q_){
        courseResolver = _courseResolver_;
        $rootScope = _$rootScope_;
        $q = _$q_;
      });

      var promise = $q.when('123');
      Course.getAll = sinon.stub().returns(promise);
      Course.get = sinon.stub().returns(promise);

    });

    describe("details resolver", function(){
      var response;

      describe("without a user and with a regular id", function(){

        beforeEach(function(){
          dispatcher.getState = sinon.stub().returns({resource: '456'});
          courseResolver().then(function(data){
            response = data;
          });
          $rootScope.$apply();
        });

        it("calls the dispatcher to get the current user", function(){
          expect(dispatcher.getState).to.be.calledTwice;
        });

        it("calls the Course service with the right arguments", function(){
          expect(Course.get).not.to.be.called;
        });

        it("returns all the necessary data for the detail page", function(){
          expect(response).to.be.undefined;
        });
      });

      describe("with a user and regular id", function(){

        beforeEach(function(){
          var resource = {
            id: '456',
            curator: 'yeehaa'
          }
          dispatcher.getState = sinon.stub().returns({user: '123', resource: resource});
          courseResolver().then(function(data){
            response = data;
          });
          $rootScope.$apply();
        });

        it("calls the dispatcher to get the current user", function(){
          expect(dispatcher.getState).to.be.calledTwice;
        });

        it("calls the Course service with the right arguments", function(){
          expect(Course.get).to.be.calledWithExactly('yeehaa', '456');
        });

        it("returns all the necessary data for the detail page", function(){
          expect(response.course).not.to.be.undefined;
          expect(response.schema).not.to.be.undefined;
        });
      });

      describe("with a user and new as id", function(){

        beforeEach(function(){
          dispatcher.getState = sinon.stub().returns({user: '123', resource: 'new'});
          courseResolver().then(function(data){
            response = data;
          });
          $rootScope.$apply();
        });

        it("calls the dispatcher to get the current user", function(){
          expect(dispatcher.getState).to.be.calledTwice;
        });

        it("calls the Course service with the right arguments", function(){
          expect(Course.get).not.to.be.called;
        });

        it("returns all the necessary data for the detail page", function(){
          expect(response.course).not.to.be.undefined;
          expect(response.schema).not.to.be.undefined;
        });
      });
    });
  });
})();