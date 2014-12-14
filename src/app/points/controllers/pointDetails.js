(function(){
  var app = angular.module('unacademic.points');

  app.controller('PointDetails', PointDetails);

  function PointDetails(tracker, $famous) {
    var pathDetails = this;
    var EventHandler = $famous['famous/core/EventHandler'];


    pathDetails.tracker = tracker;
    pathDetails.info = {title: 'Hello'};
  };
})();
