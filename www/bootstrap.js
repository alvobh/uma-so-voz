require.config({

  paths: {
    application:      'config/application',
    ionic:            'vendor/ionic/js/ionic.bundle',
    underscore:       'vendor/underscore/underscore',
    underscoreString: 'vendor/underscore.string/lib/underscore.string'
  },

  priority: [
    "ionic"
  ]

});

require(['cordova','config/angular']);
