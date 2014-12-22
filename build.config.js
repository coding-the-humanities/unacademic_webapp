module.exports = {

  build_dir: 'build',

  app_files: {
    es6:    [ 'src/app/**/*.es6'],
    js:     [ 'src/app/**/*.js', '!src/app/**/*.spec.js' ],
    atpl:   [ 'src/app/**/*.html', '!src/app/index.html'],
    html:   [ 'src/index.html' ],
    fonts:  [ 'src/assets/fonts/**/*'],
    css:    [ 'src/assets/css/famous-angular.css'],
    images: [ '**/*']
  },

  test_files: {
    polyfills: [
      'karma/famous-phantomjs-polyfills.js'
    ],
    js: [
      'vendor/angular-mocks/angular-mocks.js'
    ]
  },

  vendor_files: {
    js: [
      'vendor/lodash/dist/lodash.js',
      'vendor/angular/angular.js',
      'vendor/restangular/dist/restangular.js',
      'vendor/angular-ui-router/release/angular-ui-router.js',
      'vendor/famous/dist/famous-global.js',
      'vendor/famous-angular/dist/famous-angular.js',
      'vendor/angular-contenteditable/angular-contenteditable.js'
    ]
  }
};
