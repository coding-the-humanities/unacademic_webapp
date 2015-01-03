(function(){

  describe("formHelpers", function(){
    var formHelpers;
    var dispatcher;
    var $rootScope;
    var $q;

    beforeEach(function(){
      dispatcher = {}
      dispatcher.queue = sinon.stub();
      dispatcher.setState = sinon.stub();

      module('unacademic.courses.controllers',  function($provide){
        $provide.value('dispatcher', dispatcher);
      });

      inject(function(_formHelpers_, _$rootScope_, _$q_){
        formHelpers = _formHelpers_;
        $rootScope = _$rootScope_;
        $q = _$q_;
      });
    });

    describe("generateUrl", function(){
      var form;
      var model;

      describe("submit", function(){

        beforeEach(function(){
          model = {
            id: '123'
          };

          form = {
            $setPristine: function(){},
            $setDirty: function(){}
          }
        });

        describe("if form is clean and invalid", function(){

          it("does not call save on the model", function(){

            form.$dirty = false;
            form.$valid = false;

            model.save = sinon.stub();
            formHelpers.submit(form, model);
            expect(model.save).not.called;
          });
        });

        describe("if form is clean and valid", function(){

          it("does not call save on the model", function(){

            form.$dirty = false;
            form.$valid = true;

            model.save = sinon.stub();
            formHelpers.submit(form, model);
            expect(model.save).not.called;
          });
        });

        describe("if form is dirty and valid", function(){

          beforeEach(function(){
            form.$dirty = true;
            form.$valid = true;
          });

          describe("successful save", function(){
            beforeEach(function(){
              var promise = $q(function(resolve, reject){
                resolve();
              });

              model.save = sinon.stub().returns(promise);
              formHelpers.submit(form, model);

              $rootScope.$apply();
            });

            it("calls save on the model", function(){
              expect(model.save).called;
            });

            it("removes the model from the queue", function(){
              expect(dispatcher.queue).calledWith({remove: '123'});
            });

            it("set the correct resource id", function(){
              expect(dispatcher.setState).calledWith({resource: '123'});
            });
          });

          describe("failed save", function(){
            beforeEach(function(){
              var promise = $q(function(resolve, reject){
                reject();
              });

              model.save = sinon.stub().returns(promise);
              formHelpers.submit(form, model);

              $rootScope.$apply();
            });

            it("calls save on the model", function(){
              expect(model.save).called;
            });

            it("adds the model to the queue", function(){
              expect(dispatcher.queue).calledWith({add: '123'});
            });
          });
        });
      });

      describe("checkForm", function(){
        var id;
        var form;

        beforeEach(function(){
          id = '123';
          form = {};
        });

        describe("if form is clean", function(){
          it("does not add the model to the queue", function(){
            form.$dirty = false;
            formHelpers.checkForm(form, id, dispatcher);
            expect(dispatcher.queue).not.called;
          });
        });

        describe("if form is dirty", function(){
          it("adds the model to the queue", function(){
            form.$dirty = true;
            formHelpers.checkForm(form, id, dispatcher);
            expect(dispatcher.queue).calledWith({add: id});
          });
        });

      });
    });
  });
})();
