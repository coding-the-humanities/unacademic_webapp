(function(){

  describe("Index", function(){
    var index;

    beforeEach(function () {

      module('unacademic.paths.controllers.index');

      inject(function ($rootScope, $controller) {
        $scope = $rootScope.$new();
        index = $controller('Index', {
          paths: [],
          coverInfo: {
            title: 'UnAcademic',
            summary: 'Learning By Dwelling'
          }
        });
      });
    });

    it("sets the cover info", function(){
      expect(index.info).to.be.defined;
    });

    it("sets the exportable actions", function(){
      expect(index.actions).to.contain.keys("Save", "Add New Path");
    });

    xdescribe("save", function(){
      it("delegates to coverInfo", function(){
      });
    });

  });
})();
