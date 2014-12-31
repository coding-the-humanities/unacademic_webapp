(function(){

  describe("BaseClass", function(){
    var BaseClass;
    var $q;
    var $rootScope;
    var MockDataStore;
    var DataStore;
    var getStateStub;
    // add getAppState stub on dispatcher

    before(function(){
      initData = initialize();
      DataStore = fakeDS();
    });

    beforeEach(function(){
      MockDataStore = sinon.mock(DataStore);

      var dispatcher = {
        getState: function(){}
      };

      getStateStub = sinon.stub(dispatcher, 'getState').returns({user: '123'});

      module('unacademic.models.baseClass',  function($provide){
        $provide.value('baseUrl', '');
        $provide.value('dispatcher', dispatcher);
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

    describe("getAll", function(){
      var response;


      beforeEach(function(){

        MockDataStore.expects('get')
        .withArgs('BaseClass', 'general')
        .once()
        .returns($q.when({
          "123": {
            curator: 'yeehaa'
          }
        }));

      BaseClass.getAll('general').then(function(data){
        response = data;
      });

      $rootScope.$apply();
      });

      it("returns an array of objects", function(){
        expect(response.length).to.equal(1);
      });

      it("returns an instance of CoverInfo", function(){
        expect(response[0]).to.be.an.instanceOf(BaseClass);
      });

      it("gets the info", function(){
        expect(response[0].curator).to.equal('yeehaa');
      });
    });


    describe("save", function(){
      var instanceWithCurator;
      var promise;
      var instance;

      beforeEach(function(){
        promise = $q.when();
        instanceWithCurator = new BaseClass({title: 'Mock Title', curator: '123'});
      });

      afterEach(function(){
        instance.save();
        $rootScope.$apply();
      });


      it("calls the dispatcher to get the curator", function(){
        instance = new BaseClass({title: 'Mock Title'});
        expect(getStateStub).to.be.called;
      });

      it("calls the datastore if required fields are missing", function(){
        instance = new BaseClass({});
        MockDataStore.expects('save')
          .never()
      });

      it("calls the datastore to save the model", function(){
        instance = new BaseClass({title: 'Mock Title'});
        MockDataStore.expects('save')
        .withArgs(instanceWithCurator)
        .once()
        .returns(promise);
      });
    });
  });

  function initialize(){
    return {
      schema: {
        properties: {
          title: {
            required: true
          },
          curator: {
            required: true
          }
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
