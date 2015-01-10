(function(){
  'use strict';


  angular.module('unacademic.content.cover')
         .controller('CoverCtrl', CoverCtrl)

  function CoverCtrl(coverResolver, $scope, dispatcher, data, navHelpers, formHelpers) {

    let vm = this;
    initialize();

    function initialize(){
      vm.info = data.coverInfo;
      vm.cards = data.courses;
      vm.form = {};
      vm.schema = data.schema;

      vm.learn = viewProps().learn;
      vm.curate = viewProps().curate;
      vm.goTo = _.bind(navHelpers.goTo, null, 'course');
      vm.submit = ()=> formHelpers.submit(vm.form, vm.info);

      let checkForm = ()=> formHelpers.checkForm(vm.form, vm.info.id);
      $scope.$watch('vm.info', checkForm, true);

      dispatcher.registerObserverCallback(updateInfo);
    }

    function updateInfo(){
      coverResolver()
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
            onClick: () => vm.goTo()
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
