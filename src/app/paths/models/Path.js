(function(){
  var app = angular.module('unacademic.paths');

  app.factory('Path', function(ActiveResource) {

    var fireBaseUrl = 'https://cth-curriculum.firebaseio.com/.json'
    var apiaryUrl = 'http://private-7c8dd-unacademic.apiary-mock.com'
    var baseUrl = fireBaseUrl;

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
      this.points = data.points;
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

    window.Path = Path;

    return Path;
  });
})();
