var app = angular.module('unacademic');

app.controller('Paths', function(allPaths) {
  var paths = this;

  paths.all = allPaths;

  paths.viewActions = pathActions();
  paths.organizeActions = pathActions(true);

  paths.remove= remove;
  paths.save = save;

  function pathActions(organizing){

    function add(){
      var path = Path.new({name: "new path", curator: "yeehaa", version: "0.0.0"});
      path.creating = true;
      paths.all.push(path);
    }

    function organize(){
      paths.all.map(function(path){
        paths.organizing = true;
        path.organizing = true;
        return path;
      });
    }

    function done(){
      paths.all.map(function(path){
        paths.organizing = false;
        path.organizing = false;
        return path;
      });
    }

    function clear(){
      paths.all.forEach(function(path){
        path.$delete();
        paths.all = [];
      });
    }

    if(!organizing){
      return {
        add: add,
        organize: organize,
        clear: clear
      }
    } else {

      return {
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
      _.remove(paths.all, path);
    });
  };
});
