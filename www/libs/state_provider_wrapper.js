define(['underscore', 'underscoreString'], function(_) {

  return function() {

    var states = {};

    this.state = function(state, options) {
      states[state] = options;
      return this;
    }

    this.require_controllers = function(require) {
      for(s in states) {
        if(states[s]['controller'] !== undefined) {
          var ctrl = this.controller_name(states[s]['controller'])
          require([ctrl]);
        }
      }
    }

    this.controller_name = function(name) {
      return '../controllers/' + _.str.underscored(name).split('_')[0] + '_controller';
    }


    this.setup = function($stateProvider) {
      for(s in states) {
        $stateProvider.state(s, states[s]);
      }
    }

  }

});