define([], function() {

	var Storage = function(){

		var _key = function(scope, action) {
			return scope + '-' + action;
		}

		return {

			get: function(scope, action) {
				var key  = _key(scope, action);
				var json = localStorage.getItem(key);
				return JSON.parse(json);
			},

			save: function(scope, action, valor) {
				var key  = _key(scope, action);
				var json = JSON.stringify(valor)
				localStorage.setItem(key, json);
			},

			clear: function() {
				localStorage.clear();
			}

		}

	}();


	var Cache  = function(){

		var cache = {};

		return {

			get: function(scope, name) {
				if(cache[scope] !== undefined && typeof cache[scope][name] === 'object')
					return cache[scope][name];
			},

			save: function(scope, name, object) {
				if(cache[scope] === undefined) cache[scope] = {};
				cache[scope][name] = object;
			},

			clear: function() {
				cache = {};
			}
		}

	}();


	var LocalCache = function(){

		return {

			get: function(scope, action, callback) {
				var dado = Cache.get(scope, action);
				if(dado === undefined) {
					dado = Storage.get(scope, action);
					Cache.save(scope, action, dado);
				}
				if(callback) callback(dado);
				else return dado;
			},

			save: function(scope, action, object) {
				Storage.save(scope, action, object);
				Cache.save(scope, action, object);
			},

			version: function(number) {
				if(Storage.get('cache', 'version') !== number) {
					Storage.clear();
					Cache.clear();
					Storage.save('cache', 'version', number);
				}				
			}

		}

	}();

	return LocalCache;

});