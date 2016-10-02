// CSS files to inject in order
var cssFilesToInject = [
  'bower_components/bootstrap/dist/css/bootstrap.css',
  'bower_components/font-awesome/css/font-awesome.css',
  'bower_components/angular-toastr/dist/angular-toastr.css',
  'styles/**/*.css'
];

// Client-side javascript files to inject in order
var jsFilesToInject = [
  'js/dependencies/sails.io.js',
  'bower_components/angular/angular.js',
  'bower_components/angular-ui-router/release/angular-ui-router.js',
  'bower_components/angular-animate/angular-animate.js',
  'bower_components/angular-toastr/dist/angular-toastr.tpls.js',
  'bower_components/checklist-model/checklist-model.js',
  'bower_components/ng-file-upload/ng-file-upload.js',
  'bower_components/bootstrap/dist/js/boostrap.js',
  'js/dependencies/**/*.js',
  'app/**/*.module.js',
  'app/**/*.service.js',
  'app/**/*.directive.js',
  'app/**/*.controller.js',
  'app/**/*.component.js',
  'app/**/*.js',
  'js/**/*.js'
];

var templateFilesToInject = [
  'templates/**/*.html'
];

module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});
