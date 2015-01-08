(function(){

  describe("Sidebar", function(){
    var sidebar;
    var $scope;
    var dispatcher;

    beforeEach(function () {
      module('unacademic.sidebar.controller');

      dispatcher = {};
      dispatcher.getState = sinon.stub().returns({mode: 'browsing'});
      dispatcher.setState = sinon.stub();

      dispatcher.registerObserverCallback = sinon.stub();

      inject(function ($rootScope, $controller, _$q_) {
        $scope = $rootScope.$new();
        $q = _$q_;
        sidebar = $controller('Sidebar', {
          $scope: $scope,
          dispatcher: dispatcher
        });
      });
    });

    describe("initialize",function(){
      it("sets the results", function(){
        expect(dispatcher.registerObserverCallback).called;
        expect(sidebar.user).to.be.undefined;
        expect(sidebar.mode).to.equal('browsing')
      });
    });

    describe("observer callback triggered", function(){

      describe("state switching", function(){
        it("gets the currentState", function(){
          dispatcher.getState = sinon.stub().returns({mode: 'learning'});
          dispatcher.registerObserverCallback.callArg(0);
          expect(sidebar.mode).to.equal('learning')
        });
      });

      describe("if mode is browsing", function(){
        it("attempts to set the mode to learning", function(){

          sidebar.mode = 'browsing';
          var newState = {
            user: 'yeehaa',
            mode: 'learning'
          }

          sidebar.changeMode();

          expect(dispatcher.setState).calledWith(newState);
        });
      });

      describe("if mode is browsing", function(){
        it("attempts to set the mode to curation", function(){

          sidebar.mode = 'learning';
          var newState = {
            mode: 'curation'
          }

          sidebar.changeMode();
          expect(dispatcher.setState).calledWith(newState);
        });
      });

      describe("if mode is curation", function(){
        it("attempts to set the mode to curation", function(){

          sidebar.mode = 'curation';
          var newState = {
            mode: 'learning'
          }

          sidebar.changeMode();
          expect(dispatcher.setState).calledWith(newState);
        });
      });
    });
  });
})();
