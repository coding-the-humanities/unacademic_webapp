var app = angular.module('unacademic');

app.factory('Path', function(ActiveResource) {

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
    this.waypoints = data.waypoints;
    this.learners = data.learners;

    this.isFork = !!data.forked_from;


    this.validates({
      title: { presence: true },
      curator: { presence: true },
      version: { presence: true },
    });
  };

  Path.inherits(ActiveResource.Base);
  Path.api.set('https://cth-curriculum.firebaseio.com/.json').format('json')

  window.Path = Path;

  return Path;
});
