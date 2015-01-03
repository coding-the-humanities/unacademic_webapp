(function(){

  describe("Index", function(){
    var vm;
    var $scope;

    var setAppStateSpy;
    var updateQueueSpy;
    var dispatcherObserverSpy;

    beforeEach(function () {
      module('unacademic.courses.controllers.index');

      var dispatcher = {
        setState: function(){},
        queue: function(){}, 
        registerObserverCallback: function(){ return; }
      }

      setAppStateSpy = sinon.spy(dispatcher, 'setState');
      updateQueueSpy = sinon.spy(dispatcher, 'queue');
      dispatcherObserverSpy = sinon.spy(dispatcher, 'registerObserverCallback');

      inject(function ($rootScope, $controller, _$q_) {
        $scope = $rootScope.$new();
        $q = _$q_;
        vm = $controller('Index', {
          $scope: $scope,
          resolvers: {},
          dispatcher: dispatcher,
          data: {}
        });
      });
    });

    describe("general", function(){
      it("registers the dispatcher observer callback", function(){
        expect(dispatcherObserverSpy).to.have.been.calledOnce;
      });
    });

    describe("submiting the coverInfo data", function(){
      var saveModelStub;

      describe("info is valid and pristine", function(){

        beforeEach(function(){
          submitForm({valid: false, dirty: false, resolve: true});
        });

        it("calls save on the model", function(){
          expect(saveModelStub).to.not.be.called;
        });

        it("neither adds or removesthe model from the queue", function(){
          expect(updateQueueSpy).not.to.be.called;
        });
      })

      describe("info is invalid and dirty", function(){

        beforeEach(function(){
          submitForm({valid: false, dirty: true, resolve: true});
        });


        it("calls save on the model", function(){
          expect(saveModelStub).to.not.be.called;
        });

        it("adds the model from the queue", function(){
          expect(updateQueueSpy).to.be.calledWith({add: '123'});
        });

        it("does not remove the model from the queue", function(){
          expect(updateQueueSpy).not.to.be.calledWith({remove: '123'});
        });
      })

      describe("info is valid and dirty", function(){

        describe("successful save", function(){

          beforeEach(function(){
            submitForm({valid: true, dirty: true, resolve: true});
          });

          it("calls save on the model", function(){
            expect(saveModelStub).called;
          });


          it("removes the model from the queue", function(){
            expect(updateQueueSpy).to.be.calledWith({remove: '123'});
          });

          it("does not add the model to the queue", function(){
            expect(updateQueueSpy).not.to.be.calledWith({add: '123'});
          });

          it("removes the dirty flag from the form", function(){
            expect(vm.form.$dirty).to.false;
          });
        });

        describe("unsuccessful save", function(){

          beforeEach(function(){
            submitForm({valid: true, dirty: true, resolve: false});
          });

          it("does not remove the model from the queue", function(){
            expect(updateQueueSpy).not.to.be.calledWith({remove: '123'});
          });

          it("adds the model to the queue", function(){
            expect(updateQueueSpy).to.be.calledWith({add: '123'});
          });

          it("add the dirty flag from the form", function(){
            expect(vm.form.$dirty).to.true;
          });
        });
      });

      function submitForm(options){

        vm.info = {
          id: '123',
          save: function(){}
        }

        vm.form.$valid = options.valid;
        vm.form.$dirty = options.dirty;
        vm.form.$setPristine = function(){
          vm.form.$dirty = false;
        }

        vm.form.$setDirty = function(){
          vm.form.$dirty = true;
        }

        var promise = $q(function(resolve, reject){
          if(options.resolve){
            resolve();
          } else {
            reject();
          }
        });

        saveModelStub = sinon.stub(vm.info, 'save').returns(promise);

        vm.submit();
        $scope.$digest();
      }
    });

    describe("move to an existing course", function(){
      var addNewCourse;

      beforeEach(function(){
        vm.goToCourse('123');
      });

      it("sets the app to the correct state", function(){
        expect(setAppStateSpy).calledWith({
          name: 'courses.detail', 
          resource: '123'
        });
      });
    });

    describe("add new course", function(){
      var addNewCourse;

      beforeEach(function(){
        addNewCourse = vm.curate[3].onClick;
        addNewCourse();
      });

      it("can create new courses", function(){
        expect(setAppStateSpy).calledWith({
          name: 'courses.detail', 
          resource: 'new'
        });
      });
    });
  });
})();
