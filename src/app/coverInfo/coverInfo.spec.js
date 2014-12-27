(function(){

  describe("CoverInfo", function(){
    var CoverInfo;
    var $q;
    var $rootScope;
    var MockDS;
    var modelName;

    beforeEach(function(){

      modelName = 'CoverInfo';

      var appState = {
        get: function(){
          return {
            user: '123'
          }
        }
      }

      var DS = {
        get: function(){},
        save: function(){}
      }

      MockDS = sinon.mock(DS);

      module('unacademic.models',  function($provide){
        $provide.value('baseUrl', '');
        $provide.value('appState', appState);
        $provide.value('DS', DS);
      });


      inject(function(_CoverInfo_, _$rootScope_, _$q_){
        CoverInfo = _CoverInfo_;
        $rootScope = _$rootScope_;
        $q = _$q_;
      });
    });

    afterEach(function(){
      MockDS.verify();
    });

    describe("get", function(){
      var coverInfo;

      describe("with an existing id", function(){

        beforeEach(function(){
          var id = 'general';
          var promise = $q.when({title: 'Mock Title'});

          MockDS.expects('get').withArgs(modelName, id).once().returns(promise);

          CoverInfo.get(id).then(function(data){
            coverInfo = data;
          });

          $rootScope.$apply();
        });


        it("returns an instance of CoverInfo", function(){
          expect(coverInfo).to.be.an.instanceOf(CoverInfo);
        });

        it("gets the info", function(){
          expect(coverInfo.title).to.equal('Mock Title');
        });
      });

      describe("with a new id", function(){

        beforeEach(function(){
          var id = 'smartie123';
          var promise = $q.when();

          MockDS.expects('get').withArgs(modelName, id).once().returns(promise);

          CoverInfo.get(id).then(function(data){
            coverInfo = data;
          });

          $rootScope.$apply();
        });


        it("returns an instance of CoverInfo", function(){
          expect(coverInfo).to.be.an.instanceOf(CoverInfo);
        });

        it("gets the info", function(){
          expect(coverInfo.title).to.equal('ReAcademic');
        });
      });
    });

    describe("save", function(){

      it("delegates to the DS", function(){
        var promise = $q.when();
        var coverInfo = new CoverInfo({title: 'Mock Title'});

        MockDS.expects('save').once().returns(promise);
        coverInfo.save();
        $rootScope.$apply();

      });
    });
  });
})();
