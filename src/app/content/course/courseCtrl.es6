(function(){

  'use strict';

  angular.module('unacademic.content.course', [])
         .controller('CourseCtrl', CourseCtrl);

  function CourseCtrl(courseResolver, $scope, dispatcher, data, navHelpers, formHelpers) {

    let vm = this;
    initialize();

    function initialize(){
      vm.info = data.course;
      vm.cards = data.waypoints;
      vm.form = {};
      vm.schema = data.schema;

      vm.learn = viewProps().learn;
      vm.curate = viewProps().curate;
      vm.goTo = _.bind(navHelpers.goTo, null, 'waypoints.detail');
      vm.submit = ()=> formHelpers.submit(vm.form, vm.info);

      let checkForm = ()=> formHelpers.checkForm(vm.form, vm.info.id);
      $scope.$watch('vm.info', checkForm, true);

      dispatcher.registerObserverCallback(updateInfo);
    }

    function updateInfo(){
      courseResolver()
        .then(({course, waypoints}) => {
          vm.info = course;
          vm.cards = waypoints;
        })
    }

    function viewProps(){
      return  {
        learn: [
          'curator',
          'summary',
          'description',
          'keywords',
          'learners',
          'waypoints'
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
            key: 'keywords',
          },
          {
            type: 'button',
            title: 'Add New Course',
            onClick: () => goTo()
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
