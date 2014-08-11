define(['libs/local_cache'], function(LocalCache) {

  var CollectionsCache = function(Model) {

    var scope = Model.prototype.className;

    this.load = function(name) {
      window.model = Model;
      var cache      = LocalCache.get(scope, 'all') || [],
          collection = [];
      for(i in cache) collection.push(new Model(cache[i]));
      return collection;
    }

    this.save = function(name, objects, last_update) {
      if(objects.constructor !== Array) this[name] = [objects].concat(this[name]);
      else this[name] = objects;
      LocalCache.save(scope, name, this[name]);
      LocalCache.save(scope, name + "-update", last_update);
    }

    this.filter = function(collection, func) {
      var tmp_collection = [];
      for(i in collection)
        if(func.apply(collection[i]))
          tmp_collection.push(collection[i]);
      return tmp_collection;     
    }

    this.apply_filters = function(objects, filters) {
      if(objects.constructor !== Array) objects = [objects];
      for(i in objects) {
        var object = objects[i];
        for(f in filters)
          if(this[f] && filters[f].apply(object))
            this[f] = [object].concat(this[f]);
      }
    }

  }

  var QueryCache = function(Model, queries) {

    var that        = this,
        collections = new CollectionsCache(Model),
        last_update = LocalCache.get(Model.prototype.className, 'all-update');

    // cache

    this.insert = function(objects) {
      last_update = new Date().getTime();
      collections.save('all', objects, last_update);
      collections.apply_filters(objects, queries);
    }

    this.lastUpdate = function() {
      return last_update;
    }

    // queries

    this.all = function() {
      if(!collections.all)
        collections.all = collections.load('all');
      return collections.all;
    }
  
    this.get = function(id, callback) {
      var collection = this.all();
      for(i in collection)
        if(collection[i].id == id)
          callback(collection[i]);
    }

    // queries builders

    this.collection = function(name, filter_func) {
      return function() {
        if(!collections[name])
          collections[name] = collections.filter(that.all(), filter_func);
        return collections[name];
      }
    }

    for(f in queries) 
      this[f] = this.collection(f, queries[f]);

  }

  QueryCache.wrap = function(Model, fetch_func, filters) {

    var cache = new QueryCache(Model, filters);

    Model.fetch = function(callback) {
      fetch_func(cache.lastUpdate(), function(collection) {
        cache.insert(collection);
        callback(collection);
      });
    }

    Model.cache = cache;

  }

  return QueryCache;

})