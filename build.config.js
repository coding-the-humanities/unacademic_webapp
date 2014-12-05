module.exports = {

  build_dir: 'build',

  app_files: {
    // source, but NO specs
    js: [ 'src/app/**/*.js', '!src/app/**/*.spec.js' ],
    // our partial templates
    atpl: [ 'src/app/**/*.html', '!src/app/index.html'],
    // the index.html
    html: [ 'src/index.html' ],
    fonts: ['src/fonts/**/*']
  },

  test_files: {
    js: [
      'vendor/angular-mocks/angular-mocks.js'
    ]
  },

  vendor_files: {
    js: [
      'vendor/lodash/dist/lodash.js',
      'vendor/angular/angular.js',
      'vendor/active-support/lib/active-support.js',
      'vendor/async//lib/async.js',
      'vendor/ngActiveResource/dist/ng-active-resource.js',
      'vendor/angular-ui-router/release/angular-ui-router.js',
      'vendor/famous/dist/famous-global.js',
      'vendor/famous-angular/dist/famous-angular.js'
    ]
  }
};
