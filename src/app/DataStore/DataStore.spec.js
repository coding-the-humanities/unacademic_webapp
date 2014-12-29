(function(){

  describe("DataStore", function(){
    var DataStore;
    var $httpBackend;
    var userId;
    var url;

    beforeEach(function(){
      module('unacademic.DataStore',  function($provide){
        $provide.value('baseUrl', '');
      });

      var resourceName = 'coverInfo';

      userId = 'general'

      url = '/' + resourceName + '/' + userId + '.json';

      inject(function(_DataStore_, _$httpBackend_, _$q_){
        DataStore = _DataStore_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
      });
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });


    describe("get", function(){

      beforeEach(function(){
        var data = { user: userId };
        $httpBackend.when('GET', url).respond(data);
      });

      it("gets the info", function(){
        DataStore.get('CoverInfo', userId).then(function(data){
          expect(data.user).to.equal(userId);
        });

        $httpBackend.flush();
      });
    });

    describe("save", function(){

      beforeEach(function(){
        $httpBackend.when('PUT', url).respond(200);
      });

      it("saves the info", function(){
        var instance = new CoverInfo(userId);

        DataStore.save(instance).then(function(data){
          expect(data.status).to.equal(200);
        });

        $httpBackend.flush();
      });

      CoverInfo = function CoverInfo(userId){
        this.curator = userId;
      }
    });
  })
})();
