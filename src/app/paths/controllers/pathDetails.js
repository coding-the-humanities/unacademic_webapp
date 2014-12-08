var app = angular.module('unacademic');

app.controller('PathDetails', function(path, appMode, $famous, $stateParams) {
  console.log($stateParams);

  var pathDetails = this;
  pathDetails.mode = appMode;
  pathDetails.info = path;

  function makeDirFromTitle(title){
    return title.toLowerCase().split(' ').join('_');
  }

  function coverCard(card){
    return {
      title: card.title,
      type: 'normal',
      image_url: 'assets/img/objectives/' + makeDirFromTitle(card.title) + '/logo.svg',
      description: card.description,
      summary: card.summary,
      version: card.version,
      objectivesCount: card.objectives.length,
      learnersCount: card.learners.length
    }
  }

  function Deck(place){
    var deck = [];
    deck.push(new coverCard(place));
    _.each(place.objectives, function(objective){
      deck.push({title: objective.title});
    })
    return deck;
  }
  pathDetails.decks = [];

  _.each(path.places, function(place){
    pathDetails.decks.push(new Deck(place));
  });

  // pathDetails.places = path.places;

  var EventHandler = $famous['famous/core/EventHandler'];
  pathDetails.myEventHandler = new EventHandler();

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
