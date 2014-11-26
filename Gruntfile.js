module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-browserify');

  var userConfig = require('./build.config.js');

  var taskConfig = {
    pkg: grunt.file.readJSON('package.json'),

    clean: [
      '<%= build_dir %>'
    ],

    copy: {
      appjs: {
        src: [ '<%= app_files.js %>' ],
        dest: '<%= build_dir %>/',
        cwd: '.',
        expand: true
      },
      vendorjs: {
        files: [
          {
            src: [ '<%= vendor_files.js %>' ],
            dest: '<%= build_dir %>/',
            cwd: '.',
            expand: true
          }
        ]
      }
    },

    index: {
      build: {
        dir: '<%= build_dir %>',
        src: [
          '<%= vendor_files.js %>',
          '<%= build_dir %>/src/**/*.js',
          '<%= html2js.app.dest %>',
          '<%= build_dir %>/bundle.js',
          '<%= build_dir %>/assets/**/*.css'
        ]
      }
    },
    karmaconfig: {
      unit: {
        dir: '<%= build_dir %>',
        src: [
          '<%= vendor_files.js %>',
          '<%= html2js.app.dest %>',
          '<%= test_files.js %>'
        ]
      }
    },
    watch: {
      jssrc: {
        files: [
          '<%= app_files.js %>'
        ],
        tasks: ['copy', 'index']
      },

      html: {
        files: [ '<%= app_files.html %>' ],
        tasks: [ 'index:build' ]
      },

      templates: {
        files: [ '<%= app_files.atpl %>' ],
        tasks: [ 'html2js' ]
      },

      sass: {
        files: ['src/sass/**/*.scss'],
        tasks: [ 'sass:build']
      },

      gruntfile: {
        files: 'Gruntfile.js',
        tasks: [],
        options: {
          livereload: false
        }
      },
      modules: {
        files: 'src/modules/**/*.js',
        tasks: ['browserify']
      }
    },

    nodemon: {
      dev: {
        options: {
          file: 'server/server.js',
          watchedFolders: ['server']
        }
      }
    },

    concurrent: {
      dev: {
        tasks: ['nodemon:dev', 'watch'],

        options: {
          logConcurrentOutput: true
        }
      }
    },

    html2js: {
      /**
       * These are the templates from `src/app`.
       */
      app: {
        options: {
          base: 'src/app'
        },
        src: [ '<%= app_files.atpl %>' ],
        dest: '<%= build_dir %>/templates-app.js'
      }
    },

    browserify: {
      build: {
        src: ['src/modules/modules.js'],
        dest: '<%= build_dir %>/bundle.js',
        options: {
          debug: true
        },
        aliasMappings: [
          {
            cwd: 'src/modules/',
            src: ['**/*.js', '!**/*.spec.js'],
            dest: 'modules/'
          }
        ]
      }
    },

    sass: {
      options: {
        includePaths: require('node-neat').includePaths
      },
      build: {
        files: {
          '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css': 'src/sass/main.scss'
        }
      }
    },

  };

  grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

  grunt.registerTask('default', ['build', 'concurrent']);

  grunt.registerTask('build', [
    'clean', 'copy', 'html2js', 'browserify', 'sass', 'index'
  ]);

  function filterForExtension(extension, files) {
    var regex = new RegExp('\\.' + extension + '$'),
      dirRE = new RegExp('^(' + grunt.config('build_dir') + ')\/', 'g');;
    return files.filter(function (file) {
      return file.match(regex);
    }).map(function (file) {
      return file.replace(dirRE, '');
    });
  }

  grunt.registerMultiTask('index', 'Process index.html template', function () {
    var jsFiles = filterForExtension('js', this.filesSrc),
      cssFiles = filterForExtension('css', this.filesSrc);

    grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
      process: function (contents, path) {
        return grunt.template.process(contents, {
          data: {
            scripts: jsFiles,
            styles: cssFiles,
            version: grunt.config('pkg.version')
          }
        });
      }
    });
  });

  grunt.registerMultiTask('karmaconfig', 'Process karma config templates', function () {
    var jsFiles = this.filesSrc.filter(function (file) {
      return file.match(/\.js$/);
    });

    grunt.file.copy('karma/karma.conf.tpl.js', grunt.config('build_dir') + '/karma.conf.js', {
      process: function (contents, path) {
        return grunt.template.process(contents, {
          data: {
            scripts: jsFiles
          }
        });
      }
    });
  });
};
