var app = angular.module('unacademic');

app.controller('PathsIndex', function(paths, $state, $famous, tracker) {
  var description = "Welcome to UnAcademic. We understand that learning is personal. Therefore everything in our interface is fully customizable. Including this landing page. Start your journey by sliding the curation button below.";

  var pathsIndex = this;
  var EventHandler = $famous['famous/core/EventHandler'];

  pathsIndex.mode = tracker.mode;

  pathsIndex.info = {
    title: 'UnAcademic',
    summary: 'Learning By Dwelling',
    description: description
  };

  pathsIndex.actions = {
    save: save,
    addNewPath: addNewPath
  };

  pathsIndex.info.displayProperties = ['summary', 'description'];

  pathsIndex.paths = paths;

  pathsIndex.myEventHandler = new EventHandler();

  function save(){
    pathsIndex.mode = 'learning';
  }

  function addNewPath(){
    $state.go('paths.new');
  }

});
