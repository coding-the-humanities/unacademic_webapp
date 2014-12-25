(function(){

  describe("CoverInfo", function(){
    var CoverInfo;
    var $q;
    var $rootScope;
    var $httpBackend;
    var appState;
    var CoverInfoModel;

    beforeEach(function(){
      module('unacademic.models',  function($provide){
        $provide.value('baseUrl', '');
        $provide.value('currentUser', currentUser);
        $provide.value('appState', currentUser);
      });


      inject(function(_CoverInfo_, _$httpBackend_, _$q_, _CoverInfoModel_){
        CoverInfo = _CoverInfo_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        CoverInfoModel = _CoverInfoModel_;
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
        console.log(CoverInfoModel);
        expect(coverInfo).to.be.an.instanceOf(CoverInfoModel);
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
