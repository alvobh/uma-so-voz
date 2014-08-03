require.config({

  paths: {
    angular:          '../vendor/angular/angular',
    angularAnimate:   '../vendor/angular-animate/angular-animate',
    angularTouch:     '../vendor/angular-touch/angular-touch',
    angularSanitize:  '../vendor/angular-sanitize/angular-sanitize',
    uiRouter:         '../vendor/angular-ui-router/release/angular-ui-router',
    ionic:            '../vendor/ionic/js/ionic',
    angularIonic:     '../vendor/ionic/js/ionic-angular',
    text:             '../vendor/require-text/text',
    underscore:       '../vendor/underscore/underscore',
    underscoreString: '../vendor/underscore.string/lib/underscore.string'
  },

  shim: {
    angular:          { exports: 'angular'},
    angularAnimate:   ['angular'],
    angularSanitize:  ['angular'],
    uiRouter:         ['angular'],
    ionic:            { deps: ['angular'], exports : 'ionic'},
    angularIonic:     ['angular', 'ionic','uiRouter', 'angularAnimate', 'angularSanitize']
  },

  priority: [
    "angular",
    "ionic"
  ],

  deps: [
    'bootstrap'
  ]

});
