define(['../services/parse'], function() {

  var QueryWrapper = function(dao) {

    this.query = new Parse.Query(dao);

    this.get = function(id, callback) {
      this.query.get(id, { success: callback });
    }

    this.all = function(callback) {
      this.query.find({ success: callback });
    }
    
  }

  QueryWrapper.wrap = function(dao, getters) {

    var dao_wrapper = function(getter) {
      return function() {
        var query = new QueryWrapper(dao);
        wrap(query, query_wrapper, getters);
        return query[getter].apply(query, arguments);
      }     
    }

    var query_wrapper = function(getter) {
      return function() {
        var cb = callback(arguments);
        getters[getter].apply(this.query, arguments);
        if(getter != 'all') {
          if(cb) this.all.apply(this, arguments);
          else return this;
        }
      }   
    }

    var wrap = function(object, wrapper, source) {
      for(var getter in source)
        object[getter] = wrapper(getter);
    }

    wrap(dao, dao_wrapper, getters);
    wrap(dao, dao_wrapper, new QueryWrapper(dao))

    // callback identification

    var callback = function(arguments) {
      if(arguments.length && typeof arguments[arguments.length-1] == 'function')
        return arguments[arguments.length-1];
    }

  }

  return QueryWrapper;

});
