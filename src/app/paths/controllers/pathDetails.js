var app = angular.module('unacademic');

app.controller('PathDetails', function(path) {
  var pathDetails = this;

  pathDetails.info = path;
  pathDetails.places = path.places;

  pathDetails.actions = pathActions();

  function pathActions(organizing){

    function add(){
      console.log("add new place...")
    }

    function organize(){
      console.log("add new place...")
    }

    function done(){
      console.log("add new place...")
    }

    function clear(){
      console.log("add new place...")
    }

    return {
      view: {
        add: add,
        organize: organize,
        clear: clear
      },
      organize: {
        add: add,
        done: done,
        clear: clear
      }
    }
  };
});
