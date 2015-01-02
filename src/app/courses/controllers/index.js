(function(){
  'use strict';

  angular.module('unacademic.courses.controllers.index', [])
         .controller('Index', Index);

  function Index(CoverInfo, Course, $q, dispatcher, data) {

    var vm = this;

    vm.props = {
      schema: CoverInfo.schema,
      learning: [
        'summary', 
        'description'
      ],
      curation: [
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
          onClick: function(){
            addNewCourse();
          }
        }
      ]
    };

    vm.info = data.coverInfo;
    vm.courses = data.courses;

    vm.goTo = goTo;


    dispatcher.registerObserverCallback(updateInfo);

    function goTo(course){
      var id;

      if(course){
        id = course.id;
      } else {
        id = 'new';
      }

      dispatcher.setState({
        mode: 'curation', 
        name: 'courses.details', 
        resource: id 
      });

    }

    function addNewCourse(){
      goTo();
    }

    function updateInfo(){
      var userId = dispatcher.getState().user;
      var promises = [
        CoverInfo.get(userId, 'info'),
        Course.getAll(userId)
      ]

      $q.all(promises).then(function(data){
        vm.info = data[0];
        vm.courses = data[1];
      })
    }
  };
})();
