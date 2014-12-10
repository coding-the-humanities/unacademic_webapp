var app = angular.module('unacademic');

app.controller('PointDetails', function(tracker, $famous) {
  var pathDetails = this;
  var EventHandler = $famous['famous/core/EventHandler'];


  pathDetails.tracker = tracker;
  pathDetails.info = {title: 'Hello'};
  // pathDetails.decks = [];
  // pathDetails.actions = pathActions();

  // pathDetails.myEventHandler = new EventHandler();

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
  //   pathDetails.decks.push(new Deck(place));
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
