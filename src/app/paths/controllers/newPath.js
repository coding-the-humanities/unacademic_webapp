var app = angular.module('unacademic');

app.controller('NewPath', function(Path, tracker, $famous) {
  var newPath = this;
  var EventHandler = $famous['famous/core/EventHandler'];


  newPath.tracker = tracker;
  newPath.tracker.mode = 'curation';
  newPath.info = Path.new({});

  // newPath.decks = [];
  // newPath.actions = pathActions();

  // newPath.myEventHandler = new EventHandler();

  // function makeDirFromTitle(title){
  //   return title.toLowerCase().split(' ').join('_');
  // }

  // function coverCard(card){
  //   return {
  //     title: card.title,
  //     type: 'normal',
  //     image_url: 'assets/img/objectives/' + makeDirFromTitle(card.title) + '/logo.svg',
  //     description: card.description,
  //     summary: card.summary,
  //     version: card.version,
  //     objectivesCount: card.objectives.length,
  //     learnersCount: card.learners.length
  //   }
  // }

  // function Deck(place){
  //   var deck = [];
  //   deck.push(new coverCard(place));
  //   _.each(place.objectives, function(objective){
  //     deck.push({title: objective.title});
  //   })
  //   return deck;
  // }

  // _.each(path.waypoints, function(place){
  //   newPath.decks.push(new Deck(place));
  // });

  // function pathActions(organizing){

  //   function add(){
  //     console.log("add new place...")
  //   }

  //   function organize(){
  //     console.log("add new place...")
  //   }

  //   function done(){
  //     console.log("add new place...")
  //   }

  //   function clear(){
  //     console.log("add new place...")
  //   }

  //   return {
  //     view: {
  //       add: add,
  //       organize: organize,
  //       clear: clear
  //     },
  //     organize: {
  //       add: add,
  //       done: done,
  //       clear: clear
  //     }
  //   }
  // };
});
