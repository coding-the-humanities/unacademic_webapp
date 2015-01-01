(function(){
  'use strict';

  angular.module('unacademic.courses.controllers.index', [])
         .controller('Index', Index);

  function Index(CoverInfo, Course, $q, dispatcher, coverInfo, courses) {

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

    vm.info = coverInfo;
    vm.courses = courses;

    vm.goTo = goTo;


    dispatcher.registerObserverCallback(updateInfo);

    function goTo(course){
      var id = course.id;
      dispatcher.setState({name: 'courses.details', params: id});
    }

    function addNewCourse(){
      var course = new Course({id: '123'});
      dispatcher.setState({mode: 'curation', name: 'courses.details', params: course.id});
    }

    function updateInfo(){
      var id = dispatcher.getState().user;
      var promises = [
        CoverInfo.get(id),
        Course.getAll(id)
      ]

      $q.all(promises).then(function(data){
        vm.info = data[0];
        vm.courses = data[1];
      })
    }
  };
})();
