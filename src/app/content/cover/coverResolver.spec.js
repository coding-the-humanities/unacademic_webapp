(function(){

  describe("coverResolver", function(){
    var coverResolver;
    var dispatcher;
    var CoverInfo;
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

      module('unacademic.content.cover',  function($provide){
        $provide.value('dispatcher', dispatcher);
        $provide.value('CoverInfo', CoverInfo);
        $provide.value('Course', Course);
      });

      inject(function(_coverResolver_, _$rootScope_, _$q_){
        coverResolver = _coverResolver_;
        $rootScope = _$rootScope_;
        $q = _$q_;
      });

      var promise = $q.when('123');

      CoverInfo.get = sinon.stub().returns(promise);
      Course.getAll = sinon.stub().returns(promise);
    });

    describe("index resolver", function(){
      var response;

      beforeEach(function(){
        coverResolver().then(function(data){
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
