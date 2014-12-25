(function(){

  describe("CoverInfo", function(){
    var CoverInfo;
    var $q;
    var $rootScope;
    var $httpBackend;
    var appState;

    beforeEach(function(){
      appState = {
        get: function(){
          return {
            user: '123'
          }
        }
      }

      module('unacademic.models',  function($provide){
        $provide.value('baseUrl', '');
        $provide.value('appState', appState);
      });


      inject(function(_CoverInfo_, _$httpBackend_, _$q_){
        CoverInfo = _CoverInfo_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
      });
    });

    describe("get", function(){
      var coverInfo;
      var id;

      var data = {
        title: 'yeehaa'
      }

      beforeEach(function(){
        id = 'general';
        $httpBackend
          .when('GET', '/coverInfo/' + id + '.json')
          .respond(data);

        CoverInfo.get(id).then(function(data){
          coverInfo = data;
        });

        $httpBackend.flush();
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it("returns an instance of CoverInfo", function(){
        expect(coverInfo).to.be.an.instanceOf(CoverInfo);
      });

      it("gets the info", function(){
        expect(coverInfo.title).to.equal('yeehaa');
      });
    });

    xdescribe("save", function(){

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
