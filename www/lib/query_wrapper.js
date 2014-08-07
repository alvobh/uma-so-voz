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
        wrap(query, query_wrapper);
        return query[getter].apply(query, arguments);
      }     
    }

    var query_wrapper = function(getter) {
      return function() {
        var cb = callback(arguments);
        getters[getter].apply(this.query, arguments);
        if(cb) this.all(cb);
        else return this;
      }
    }

    var wrap = function(object, wrapper) {
      for(var getter in getters)
        object[getter] = wrapper(getter);
    }

    wrap(dao, dao_wrapper);


    // callback identification

    var callback = function(arguments) {
      if(arguments.length && typeof arguments[arguments.length-1] == 'function')
        return arguments[arguments.length-1];
    }

  }

  return QueryWrapper;

});
