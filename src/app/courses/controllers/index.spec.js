(function(){

  describe("Index", function(){
    var vm;
    var $scope;
    var dispatcher;
    var formHelpers;

    beforeEach(function () {

      module('unacademic.courses.controllers.index');

      dispatcher = {
        setState: function(){},
        registerObserverCallback: function(){ return; }
      }

      dispatcher.setState = sinon.spy();
      dispatcher.registerObserverCallback = sinon.spy();

      formHelpers = {
        submit: function(){},
        checkForm: function(){}
      }

      formHelpers.submit = sinon.spy();
      formHelpers.checkForm = sinon.spy();

      var data = {
        coverInfo: '',
        courses: '',
        schema: ''
      }

      inject(function ($rootScope, $controller, _$q_) {
        $scope = $rootScope.$new();
        $q = _$q_;
        vm = $controller('Index', {
          $scope: $scope,
          resolvers: {},
          dispatcher: dispatcher,
          formHelpers: formHelpers,
          data: data
        });
      });
    });

    describe("general", function(){

      it("sets all the necessary props on the vm", function(){
        expect(vm.info).not.to.be.undefined;
        expect(vm.form).not.to.be.undefined;
        expect(vm.cards).not.to.be.undefined;
        expect(vm.schema).not.to.be.undefined;
      });

      it("sets all the necessary actions on the vm", function(){
        expect(vm.learn).not.to.be.undefined;
        expect(vm.curate).not.to.be.undefined;
        expect(vm.goToCourse).not.to.be.undefined;
        expect(vm.submit).not.to.be.undefined;
      });

      it("registers the dispatcher observer callback", function(){
        expect(dispatcher.registerObserverCallback).to.have.been.calledOnce;
      });
    });

    describe("submiting the coverInfo data", function(){
      it("calls form helpers submit with the right arguments", function(){
        vm.form = '123';
        vm.info = '456';
        vm.submit()
        expect(formHelpers.submit).calledWith('123', '456');
      });
    });

    describe("watching the model for changes", function(){
      it("calls form helpers checkForm with the right arguments", function(){
        vm.form = '123';
        vm.info = {id: '456'};
        $scope.$digest();
        expect(formHelpers.checkForm).calledWith('123', '456');
      });

    });

    describe("move to an existing course", function(){
      var addNewCourse;

      beforeEach(function(){
        vm.goToCourse('123');
      });

      it("sets the app to the correct state", function(){
        expect(dispatcher.setState).calledWith({
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
        expect(dispatcher.setState).calledWith({
          name: 'courses.detail', 
          resource: 'new'
        });
      });
    });
  });
})();
