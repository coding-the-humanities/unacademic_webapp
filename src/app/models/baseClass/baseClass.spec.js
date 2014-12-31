(function(){

  describe("BaseClass", function(){
    var BaseClass;
    var $q;
    var $rootScope;
    var MockDataStore;
    var DataStore;

    before(function(){
      initData = initialize();
      DataStore = fakeDS();
    });

    beforeEach(function(){
      MockDataStore = sinon.mock(DataStore);

      module('unacademic.models.baseClass',  function($provide){
        $provide.value('baseUrl', '');
        $provide.value('DataStore', DataStore);
      });

      inject(function(_BaseClass_, _$rootScope_, _$q_){
        BaseClass = _BaseClass_;
        $rootScope = _$rootScope_;
        $q = _$q_;
      });

      BaseClass.initialize(initData);
    });

    afterEach(function(){
      MockDataStore.verify();
    });

    describe("get", function(){
      var response;

      describe("with an existing id", function(){

        beforeEach(function(){

          MockDataStore.expects('get')
            .withArgs('BaseClass', 'general')
            .once()
            .returns($q.when({title: 'Mock Title'}));

          BaseClass.get('general').then(function(data){
            response = data;
          });

          $rootScope.$apply();
        });


        it("returns an instance of CoverInfo", function(){
          expect(response).to.be.an.instanceOf(BaseClass);
        });

        it("gets the info", function(){
          expect(response.title).to.equal('Mock Title');
        });
      });

      describe("with a new id", function(){

        beforeEach(function(){

          MockDataStore.expects('get')
            .withArgs('BaseClass', 'yeehaa')
            .once()
            .returns($q.when());

          BaseClass.get('yeehaa').then(function(data){
            response = data;
          });

          $rootScope.$apply();
        });


        it("returns an instance of CoverInfo", function(){
          expect(response).to.be.an.instanceOf(BaseClass);
        });

        it("gets the info", function(){
          expect(response.title).to.equal('UnAcademic');
        });
      });
    });

    describe("save", function(){


      it("sets the id and delegates to the DataStore", function(){
        var promise = $q.when();
        var instance = new BaseClass({title: 'Mock Title'});
        var instanceWithCurator = new BaseClass({title: 'Mock Title', curator: '123'});

        MockDataStore.expects('save')
          .withArgs(instanceWithCurator)
          .once()
          .returns(promise);
        instance.save();
        $rootScope.$apply();

      });
    });
  });

  function initialize(){
    return {
      schema: {
        properties: {
          title: {},
          curator: {} 
        }
      },
      initData: {
        title: 'UnAcademic'
      } 
    } 
  }

  function fakeDS(){
    return {
      get: function(){},
        save: function(){}
    }
  }
})();
