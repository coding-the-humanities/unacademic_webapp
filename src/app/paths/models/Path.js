var app = angular.module('unacademic');

app.factory('Path', function(ActiveResource) {

  function Path(data) {
    this.number('id');
    this.string('curator');
    this.string('title');
    this.string('description');
    this.string('summary');
    this.number('forked_from');
    this.string('version');
    this.forks = data.forks;
    this.places = data.places;
    this.learners = data.learners;
    this.isFork = !!data.forked_from;


    this.validates({
      title: { presence: true },
      curator: { presence: true },
      version: { presence: true },
    });
  };

  Path.inherits(ActiveResource.Base);
  Path.api.set('http://private-7c8dd-unacademic.apiary-mock.com');

  window.Path = Path;

  return Path;
});
