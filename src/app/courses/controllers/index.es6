(function(){
  'use strict';


  angular.module('unacademic.courses.controllers.index', [])
         .controller('Index', Index)

  function Index(resolvers, $scope, dispatcher, data, formHelpers) {

    let vm = this;
    initialize();

    function initialize(){
      vm.info = data.coverInfo;
      vm.cards = data.courses;
      vm.form = {};
      vm.schema = data.schema;

      vm.learn = viewProps().learn;
      vm.curate = viewProps().curate;
      vm.goToCourse = goToCourse;
      vm.submit = ()=> formHelpers.submit(vm.form, vm.info);

      let checkForm = ()=> formHelpers.checkForm(vm.form, vm.info.id);
      $scope.$watch('vm.info', checkForm, true);

      dispatcher.registerObserverCallback(updateInfo);
    }

    function goToCourse(id){
      if(!id){
        id = 'new';
      }

      dispatcher.setState({
        name: 'courses.detail', 
        resource: id 
      });
    }

    function updateInfo(){
      resolvers.index()
        .then(({coverInfo, courses}) => {
          vm.info = coverInfo;
          vm.cards = courses;
        })
    }

    function viewProps(){
      return  {
        learn: [
          'summary', 
          'description'
        ],
        curate: [
          {
            key: 'title',
          },
          {
            key: 'summary',
          },
          {
            key: 'description',
            type: 'textarea',
          },
          { 
            type: 'button',
            title: 'Add New Course',
            onClick: () => goToCourse()
          },
          { 
            type: 'submit',
            title: 'Save',
          }
        ]
      }
    }
  };
})();
