define(['../services/parse'], function() {

  var QueryWrapper = function(dao, getters) {

    var that = this;

    var callback = function(arguments) {
      return arguments[arguments.length-1];
    }

    var has_callback = function(arguments) {
      return arguments.length && typeof callback(arguments) == 'function';
    }

    // wrappers

    var dao_wrapper = function(getter) {
      return function() {
        that.query = new Parse.Query(dao);
        return query_wrapper(getter).apply(that, arguments);
      }     
    }

    var query_wrapper = function(getter) {
      return function() {
        getters[getter].apply(that.query, arguments);
        if(has_callback(arguments)) that.query.find({ success: callback(arguments) });
        else return that;
      }
    }

    for(var getter in getters) {
      dao[getter]  = dao_wrapper(getter);
      this[getter] = query_wrapper(getter);
    }

    // high level

    this.get = function(id, callback) {
      this.query.get(id, { success: callback });
    }

  }

  return QueryWrapper;

});
