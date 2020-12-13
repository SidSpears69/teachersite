module.exports = function (grunt) {
  require("load-grunt-tasks")(grunt);
  grunt.initConfig({
    less: {
      style: {
        files: {
          "source/css/style.css": ["source/less/style.less"],
          "build/css/style.css": ["source/less/style.less"]
        }
      }
    },
    postcss: {
      options: {
        processors: [
          require("autoprefixer")({
            browsers: [
              "last 1 version",
              "last 2 Chrome versions",
              "last 2 Firefox versions",
              "last 2 Opera versions",
              "last 2 Edge versions"
            ]
          }),
        ]
      },
      style: {
        src: "build/css/*.css",
      }
    },
    watch: {
      html: {
        files: ["source/*.html"],
        tasks: [
          "copy:html"
        ]
      },
      style: {
        files: ["source/less/**/*.less"],
        tasks: ["less", "postcss", "csso"]
      }
    },
    browserSync: {
      server: {
        bsFiles: {
          src: ["build/*.html",
            "build/css/*.css"
          ]
        },
        options: {
          server: "build",
          watchTask: true
        }
      }
    },
    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "build/css/style.min.css": ["build/css/style.css"],
          "source/css/style.min.css": ["source/css/style.css"],
        }
      }
    },
    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif}"]
        }]
      }
    },
    svgstore: {
      options: {
        svg: {
          style: "display: none"
        }
      },
      symbols: {
        files: {
          "source/img/symbols.svg": ["source/img/icons/*.svg"],
          "source/img/symbols.svg": ["source/img/*.svg"],
        }
      }
    },
    svgmin: {
      symbols: {
        files: [{
          expand: true,
          src: ["source/img/icons/*.svg"]
        }]
      }
    },
    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source/",
          src: [
            "fonts/**/*",
            "img/**",
            "js/**",
            "plugins/**",
            "*.html"
          ],
          dest: "build"
        }]
      },
      html: {
        files: [{
          expand: true,
          cwd: "source/",
          src: ["*.html"],
          dest: "build"
        }]
      }
    },
    clean: {
      build: ["build"]
    }
  });
  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask("symbols", ["svgmin", "svgstore"]);
  grunt.registerTask("build", ["clean", "copy", "less", "postcss", "csso", "symbols", "imagemin"]);
};
