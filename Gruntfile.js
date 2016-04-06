module.exports = function(grunt) {
  // Loads each task referenced in the packages.json file
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  require('time-grunt')(grunt);

  // Initiate grunt tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    moment: require('moment'),
    // Tasks
    sass: {
      options: {

      },
      www: {
        files: {
          'build/<%= pkg.name %>.css': 'app/assets/sass/cristin-view.scss'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
        //diff: 'build/config/*.diff'
      },
      prefix: {
        expand: true,
        //flatten: true,
        src: 'build/*.css'
        //dest: 'tmp/css/prefixed/'
      }
    },
    cssmin: {
      main: {
        options: {
          banner: '/*! <%= pkg.name %> v<%= pkg.version %> by <%= pkg.author %>, released: <%= moment().format("HH:mm DD-MM-YYYY") %>, license: <%= pkg.license %> */'
        },
        expand: true,
        cwd: 'build',
        src: ['*.css', '!*.min.css'],
        dest: 'build/',
        ext: '.v<%= pkg.version %>.min.css'
      }
    },
    copy: {
      dist: {
        expand: true,
        cwd: 'build/',
        src: ['**', '!_**', '!<%= pkg.name %>.css', '!templates.js', '!<%= pkg.name %>.v<%= pkg.version %>.min.js', '!<%= pkg.name %>.v<%= pkg.version %>.min.css'],
        dest: 'dist',
        filter: 'isFile'
      }
    },
    clean: {
      options: {
        force: true
      },
      dist: ['dist/**/*'],
      deploy: ['deploy/**/*'],
      build: ['build/**/*']
    },
    eslint: {
      options: {
        //format: require('babel-eslint'),
        quiet: true
        //rulePath: ['node_modules/eslint-rules-es2015/lib/index.js']
      },
      target: ['app/assets/js/**/*.js']
    },
    handlebars: {
      options: {
        namespace: 'Hiof.Templates',
        processName: function(filePath) {
          if (filePath.substring(0, 4) === 'vend') {
            return filePath.replace(/^vendor\/frontend\/app\/templates\//, '').replace(/\.hbs$/, '');
          } else {
            return filePath.replace(/^app\/templates\//, '').replace(/\.hbs$/, '');
          }
        }
      },
      all: {
        files: {
          "build/templates.js": ["app/templates/**/*.hbs", "vendor/frontend/app/templates/**/*.hbs"]
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        comments: false
        //presets: ['es2015']
      },
      dist: {
        files: {
          //'build/_view.js': 'vendor/frontend/app/assets/js/components/_view.js',
          'build/_<%= pkg.name %>-functions.js': 'app/assets/js/_cristin-functions.js',
          'build/_<%= pkg.name %>-interactivity.js': 'app/assets/js/_cristin-interactivity.js'
        }
      }
    },
    concat: {
      scripts: {
        src: [
          'build/templates.js',
          'build/_<%= pkg.name %>-functions.js',
          'build/_<%= pkg.name %>-interactivity.js'
        ],
        dest: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.js'
      },
        scriptsDist: {
          src: [
            'vendor/templates.js',
            'build/templates.js',
            'build/_<%= pkg.name %>-functions.js',
            'build/_<%= pkg.name %>-interactivity.js'
          ],
          dest: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.js'
        }
    },
    uglify: {
      options: {
        mangle: false,
        //compress: true,
        preserveComments: false,
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> by <%= pkg.author %>, released: <%= moment().format("HH:mm DD-MM-YYYY") %>, license: <%= pkg.license %> */'
      },
      main: {
        files: {
          'build/<%= pkg.name %>.v<%= pkg.version %>.min.js': ['build/<%= pkg.name %>.v<%= pkg.version %>.min.js']
        }
      }
    },
    versioning: {
      options: {
        cwd: 'build/',
        outputConfigDir: 'build/',
        namespace: 'hiof'
      },
      build: {
        files: [{
          assets: [{
            src: ['build/<%= pkg.name %>.v<%= pkg.version %>.min.js'],
            dest: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.js'
          }],
          key: 'assets',
          dest: '',
          type: 'js',
          ext: '.min.js'
        }, {
          assets: [{
            src: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.css',
            dest: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.css'
          }],
          key: 'assets',
          dest: '',
          type: 'css',
          ext: '.min.css'
        }]
      },
      deploy: {
        options: {
          output: 'php',
          outputConfigDir: 'build/',
        },
        files: [{
          assets: [{
            src: ['build/<%= pkg.name %>.v<%= pkg.version %>.min.js'],
            dest: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.js'
          }],
          key: 'assets',
          dest: '',
          type: 'js',
          ext: '.min.js'
        },

        {
          assets: [{
            src: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.css',
            dest: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.css'
          }],
          key: 'assets',
          dest: '',
          type: 'css',
          ext: '.min.css'
        }
      ]
    }
  },
  secret: grunt.file.readJSON('secret.json'),
  sftp: {
    stage: {
      files: {
        "./": "dist/**"
      },
      options: {
        path: '<%= secret.stage.path %>',
        srcBasePath: "dist/",
        host: '<%= secret.stage.host %>',
        username: '<%= secret.stage.username %>',
        password: '<%= secret.stage.password %>',
        //privateKey: grunt.file.read('id_rsa'),
        //passphrase: '<%= secret.passphrase %>',
        showProgress: true,
        createDirectories: true,
        directoryPermissions: parseInt(755, 8)
      }
    },
    prod: {
      files: {
        "./": "dist/**"
      },
      options: {
        path: '<%= secret.prod.path %>',
        srcBasePath: "dist/",
        host: '<%= secret.prod.host %>',
        username: '<%= secret.prod.username %>',
        password: '<%= secret.prod.password %>',
        //privateKey: grunt.file.read('id_rsa'),
        //passphrase: '<%= secret.passphrase %>',
        showProgress: true,
        createDirectories: true,
        directoryPermissions: parseInt(755, 8)
      }
    }
  }
  //watch: {
  //  hbs: {
  //    files: ['app/templates/**/*.hbs'],
  //    tasks: ['handlebars', 'copy:jstemplates'],
  //    options: {
  //      livereload: true,
  //    },
  //  },
  //  js: {
  //    files: ['app/assets/js/**/*.js', 'app/assets/js/**/*.json'],
  //    tasks: ['jshint', 'concat:scripts', 'versioning:build'],
  //    options: {
  //      livereload: true,
  //    },
  //  },
  //}

});

grunt.registerTask('subtaskJs', ['eslint', 'handlebars','babel', 'concat:scripts', 'uglify']);
grunt.registerTask('subtaskCss', ['sass', 'autoprefixer', 'cssmin']);

grunt.registerTask('build', ['clean:build', 'clean:dist', 'subtaskJs', 'subtaskCss', 'versioning:build']);
grunt.registerTask('deploy', ['clean:build', 'clean:dist', 'subtaskJs', 'subtaskCss', 'versioning:deploy', 'copy:dist']);
grunt.registerTask('dist', ['clean:build', 'clean:dist', 'subtaskJs', 'subtaskCss', 'versioning:build', 'copy:dist']);


grunt.registerTask('deploy-staging', ['deploy', 'sftp:stage']);
grunt.registerTask('deploy-prod', ['delpoy', 'sftp:prod']);

};
