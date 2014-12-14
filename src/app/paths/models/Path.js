(function(){
  var app = angular.module('unacademic.paths');

  app.factory('Path', Path);

  function Path(ActiveResource, baseUrl) {

    function Path(data) {
      this.string('id');
      this.string('curator');
      this.string('title');
      this.string('description');
      this.string('summary');
      this.string('image_url');
      this.number('forked_from');
      this.string('version');
      this.forks = data.forks;
      this.points = data.waypoints;
      this.learners = data.learners;

      this.isFork = !!data.forked_from;

      this.validates({
        title: { presence: true },
        curator: { presence: true },
        version: { presence: true },
      });
    };

    Path.inherits(ActiveResource.Base);
    Path.api.set(baseUrl).format('json');

    if(/mock/.test(baseUrl)) {
      Path.api.set(baseUrl);
    }

    return Path;
  };
})();
