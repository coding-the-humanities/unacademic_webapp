(function(){
  var app = angular.module('unacademic.points');

  app.factory('Point', Point);

  function Point(ActiveResource, baseUrl) {

    function Point(data) {
      this.string('id');
      this.string('curator');
      this.string('title');
      this.string('description');
      this.string('summary');
      this.string('image_url');
      this.number('forked_from');
      this.string('version');
      this.forks = data.forks;
      this.tasks = data.tasks;
      this.learners = data.learners;
      this.paths = data.paths;

      this.isFork = !!data.forked_from;

      this.validates({
        title: { presence: true },
        curator: { presence: true },
        version: { presence: true },
      });
    };

    Point.inherits(ActiveResource.Base);
    Point.api.set(baseUrl).format('json')

    if(/mock/.test(baseUrl)) {
      Path.api.set(baseUrl);
    }

    return Point;
  };
})();
