define(['libs/local_cache'], function(LocalCache) {

  var CacheWrapper = function() {

  }

  CacheWrapper.wrap = function(Object, scope, filters) {

    var collections = { };

    Object.cache = {};

    Object.cache.all = function() {
      if(!collections.all)
        collections.all = load_collection(scope, 'all');
      return collections.all;
    }

    Object.cache.insert = function(objects) {
      var collection = Object.cache.all().concat(objects);
      update_collection(collection, 'all');
      // apply_filters(objects, filters);
    }

    Object.cache.get = function() {
      return null;
    }

    // cache

    var load_collection = function(scope, key) {
      var cache      = LocalCache.get(scope, 'all') || [];
      var collection = [];
      for(i in cache) collection.push(new Object(cache[i]));
      return collection;
    }

    var update_collection = function(collection, key) {
      LocalCache.save(scope, key, collection);
    }

    // filters

    var apply_filters = function(object, filters) {
      for(f in filters)
        if(collections[f] && filters[f].apply(object))
          collections[f].push(object);
    }


    var filter_collection = function(collection, func) {
      var tmp_collection = [];
      for(i in collection)
        if(func.apply(collection[i]))
          tmp_collection.push(collection[i]);
      return tmp_collection;
    }

    var filter_wrapper = function(filter, filter_func) {
      return function() {
        if(!collections[filter])
          collections[filter] = filter_collection(Object.cache.all(), filter_func);
        return collections[filter];        
      }
    }

    for(f in filters)
      Object.cache[f] = filter_wrapper(f, filters[f]);

  }

  return CacheWrapper;

})