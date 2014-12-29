(function(){

  describe("Sidebar", function(){
    var sidebar;
    var $scope;
    var dispatcherMock;

    beforeEach(function () {
      module('unacademic.sidebar.controller');

      var dispatcher = {
        getState: function(){},
        setState: function(){},
        registerObserverCallback: function(){}
      };

      dispatcherMock= sinon.mock(dispatcher);

      var state = {
        user: undefined,
        mode: 'browsing'
      }

      dispatcherMock.expects('getState').once().returns(state);
      dispatcherMock.expects('registerObserverCallback').once();

      inject(function ($rootScope, $controller, _$q_) {
        $scope = $rootScope.$new();
        $q = _$q_;
        sidebar = $controller('Sidebar', {
          $scope: $scope,
          dispatcher: dispatcher
        });
      });
    });

    afterEach(function(){
      dispatcherMock.verify();
    });

    describe("initial state",function(){
      it("sets the results", function(){
        expect(sidebar.user).to.be.undefined;
        expect(sidebar.mode).to.equal('browsing')
      });
    });

    describe("signIn", function(){
      it("sets the current user id on mode", function(){
      dispatcherMock.expects('setState').once();
        sidebar.signIn();
      });
    });

    describe("changeMode", function(){

      afterEach(function(){
        sidebar.changeMode();
      });

      describe("if mode is learning", function(){
        it("attempts to set the mode to curation", function(){
          sidebar.mode = 'learning';
          dispatcherMock.expects('setState')
            .withArgs({mode: 'curation'})
            .once();
        });
      });

      describe("if mode is curation", function(){
        it("attempts to set the mode to curation", function(){
          sidebar.mode = 'curation';
          dispatcherMock.expects('setState')
            .withArgs({mode: 'learning'})
            .once();
        });
      });
    });

    describe("watch the model", function(){
      var saveModelSpy;
      var setPristineSpy;
      var form;

      beforeEach(function(){
        var model = {
          save: function(){
            return $q.when();
          }
        };

        form = {
          $setPristine: function(){}
        };

        setPristineSpy = sinon.spy(form, '$setPristine');
        saveModelSpy = sinon.spy(model, 'save');
        sidebar.form = form;

        $scope.sidebar = {};
        $scope.sidebar.model = model;
      });

      describe("when the form is dirty and invalid", function(){

        beforeEach(function(){
          dispatcherMock.expects('setState').never();
          form.$dirty = false;
          form.$valid = false;
          $scope.$digest();
        });

        it("does not call the save function on the model", function(){
          expect(saveModelSpy).not.to.be.called;
        });

        it("does not set the form to not dirty", function(){
          expect(setPristineSpy).not.to.be.called;
        });
      });

      describe("when the form is dirty and invalid", function(){

        beforeEach(function(){
          form.$dirty = true;
          form.$valid = false;
          dispatcherMock.expects('setState').withArgs({lock: 'closed'}).once();
          dispatcherMock.expects('setState').withArgs({lock: 'open'}).never();
          $scope.$digest();
        });

        it("does not call the save function on the model", function(){
          expect(saveModelSpy).not.to.be.called;
        });

        it("does not set the form to not dirty", function(){
          expect(setPristineSpy).not.to.be.called;
        });

      });

      describe("when the form is dirty and valid", function(){

        beforeEach(function(){
          form.$dirty = true;
          form.$valid = true;
          dispatcherMock.expects('setState').withArgs({lock: 'closed'}).once();
          dispatcherMock.expects('setState').withArgs({lock: 'open'}).once();
          $scope.$digest();
        });

        it("calls the save function on the model", function(){
          expect(saveModelSpy).to.be.calledOnce;
        });

        it("sets the form to not dirty", function(){
          expect(setPristineSpy).to.be.calledOnce;
        });
      });
    });
  });
})();
