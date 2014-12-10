var app = angular.module('unacademic');

app.controller('newPoint', function(Point, tracker, $famous) {
  var newPoint = this;
  var EventHandler = $famous['famous/core/EventHandler'];


  newPoint.tracker = tracker;
  newPoint.tracker.mode = 'curation';
  newPoint.info = Point.new({});
  console.log(tracker.path);
  if(tracker.path){
    newPoint.info.paths = [tracker.path];
  }

  // newPoint.decks = [];
  // newPoint.actions = pathActions();

  // newPoint.myEventHandler = new EventHandler();

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
  //   newPoint.decks.push(new Deck(place));
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
