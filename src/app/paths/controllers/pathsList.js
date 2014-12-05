var app = angular.module('unacademic');

app.value('appMode', 'curation')

app.controller('PathsList', function(paths, $state, appMode) {
  var pathsList = this;

  pathsList.all = paths;

  pathsList.appMode = appMode;

  pathsList.remove= remove;
  pathsList.save = save;

  pathsList.actions = pathActions();

  function pathActions(organizing){

    function add(){
      $state.go('newPath');
    }

    function organize(){
      pathsList.all.map(function(path){
        pathsList.organizing = true;
        path.organizing = true;
        return path;
      });
    }

    function done(){
      pathsList.all.map(function(path){
        pathsList.organizing = false;
        path.organizing = false;
        return path;
      });
    }

    function clear(){
      pathsList.all.forEach(function(path){
        path.$delete();
        pathsList.all = [];
      });
    }

    return {
      view: {
        organize: organize,
      },
      organize: {
        add: add,
        done: done,
        clear: clear
      }
    }
  };

  function save(path){
    path.$save().then(function(){
      path.creating = false;
    });
  };

  function remove(path){
    path.$delete().then(function(){
      _.remove(pathsList.all, path);
    });
  };
});
