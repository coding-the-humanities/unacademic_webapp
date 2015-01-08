(function(){

  describe("resolvers", function(){
    var resolvers;
    var dispatcher;
    var CoverInfo;
    var Course;
    var $rootScope;
    var $q;

    beforeEach(function(){
      dispatcher = {};
      dispatcher.getState = sinon.stub().returns({user: '123', resource: '456'});

      CoverInfo = {
        schema: '123'
      };


      Course = function(){};
      Course.schema = '123';

      module('unacademic.courses.services.resolvers',  function($provide){
        $provide.value('dispatcher', dispatcher);
        $provide.value('CoverInfo', CoverInfo);
        $provide.value('Course', Course);
      });

      inject(function(_resolvers_, _$rootScope_, _$q_){
        resolvers = _resolvers_;
        $rootScope = _$rootScope_;
        $q = _$q_;
      });

      var promise = $q.when('123');
      CoverInfo.get = sinon.stub().returns(promise);
      Course.getAll = sinon.stub().returns(promise);
      Course.get = sinon.stub().returns(promise);

    });

    describe("details resolver", function(){
      var response;

      describe("without a user and with a regular id", function(){

        beforeEach(function(){
          dispatcher.getState = sinon.stub().returns({resource: '456'});
          resolvers.detail().then(function(data){
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
          resolvers.detail().then(function(data){
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
          resolvers.detail().then(function(data){
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

    describe("index resolver", function(){
      var response;

      beforeEach(function(){
        resolvers.index().then(function(data){
          response = data;
        });

        $rootScope.$apply();
      });

      it("calls the dispatcher to get the current user", function(){
        expect(dispatcher.getState).to.be.called;
      });

      it("calls the CoverInfo service with the right arguments", function(){
        expect(CoverInfo.get).to.be.calledWith('123', 'info');
      });

      it("calls the Course service with the right arguments", function(){
        expect(Course.getAll).to.be.calledWith('123');
      });

      it("returns all the necessary data for the detail page", function(){
        expect(response.coverInfo).not.to.be.undefined;
        expect(response.courses).not.to.be.undefined;
        expect(response.schema).not.to.be.undefined;
      });
    });
  });
})();
