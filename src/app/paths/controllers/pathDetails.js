var app = angular.module('unacademic');

app.controller('PathDetails', function(path, appMode, $famous) {
  path = path.data;

  var pathDetails = this;
  pathDetails.mode = appMode;

  function makeDirFromTitle(title){
    return title.toLowerCase().split(' ').join('_');
  }

  pathDetails.info = {
    title: path.title,
    type: 'cover',
    curator: path.curator,
    image_url: 'assets/img/cth_logo.svg',
    description: path.description,
    summary: path.summary,
    version: path.version,
    placesCount: path.places.length,
    learnersCount: path.learners.length
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
