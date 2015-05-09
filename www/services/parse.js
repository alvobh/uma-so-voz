define(['libs/parse.min'], function() {

  var PARSE = {
  	production: {
  		app: "JuTXu4vUYxwo9zJOzjG6AD9myBgoCpj4TM4MQPJE",
  		js:  "pvgvd3WD9daQrngmkAfAoSUKPHVLb06xZXHuqXtU"
  	},

  	development: {
  		app: "6FhngfCGge0eHAvbhV1EiIQRNehI4rEwhoR27Pgi",
  		js: "tBW6FmXmqBD5rK8h8Mbsy80u6I7W614DAPmer4C8"
  	}
  }

  // TODO pegar automatico
  var env = 'development';
  Parse.initialize(PARSE[env].app, PARSE[env].js);

})