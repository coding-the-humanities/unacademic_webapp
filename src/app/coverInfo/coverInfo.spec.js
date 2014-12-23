(function(){

  describe("CoverInfo", function(){
    var CoverInfo;
    var $q;
    var $rootScope;
    var $httpBackend;

    beforeEach(function(){
      module('unacademic.models',  function($provide){
        $provide.value('baseUrl', '');
        $provide.value('currentUser', currentUser);
      });


      inject(function(_CoverInfo_, _$httpBackend_, _$rootScope_, _$q_){
        CoverInfo = _CoverInfo_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $q = _$q_;
      });
    });

    describe("get", function(){
      var coverInfo;
      var id;

      beforeEach(function(){
        id = 'general';
        $httpBackend
          .when('GET', '/coverInfo/' + id + '.json')
          .respond('yeehaa');

        CoverInfo.get(id).then(function(data){
          coverInfo = data;
        });

        $httpBackend.flush();
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it("gets the current user", function(){
        expect(coverInfo).to.equal('yeehaa');
      });
    });

    describe("save", function(){

      beforeEach(function(){
        var id = 'yeehaa';

        $httpBackend
          .when('PUT', '/coverInfo/' + id + '.json')
          .respond('yeehaa');

        CoverInfo.save({}, id).then(function(){});

        $httpBackend.flush();
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });
    });
  });
})();
