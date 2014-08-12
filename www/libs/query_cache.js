define(['libs/local_cache'], function(LocalCache) {

  var FilterableCollection = function(filters) {
    var Collection =  function() {} 

    Collection.prototype = new Array;
    Collection.prototype.afilter = Collection.prototype.filter;

    Collection.prototype.filter = function(name) {
      if(!this[name]) {
        var array = this.afilter(filters[name]);
        this[name] = Collection.from(array); 
      }
      return this[name];    
    }

    Collection.prototype.get = function(id) {
      for(i in this) { 
        console.log(this[i]);
        if(this[i] && this[i].id == id)
          return this[i];   
      }
    }

    Collection.from = function() {
      var tmp_collection = new Collection();
      for(a in arguments)
        for(i in arguments[a])
          tmp_collection.push(arguments[a][i]);
      return tmp_collection;   
    }

    return Collection;
  }

  var CollectionsCache = function(Model) {

    var scope   = Model.prototype.className,
        that    = this,
        filters = {},
        Collection  = new FilterableCollection(filters), 
        last_update = null;

    // cache

    this.set = function(name, objects) {
      last_update = new Date().getTime();
      LocalCache.save(scope, name, objects);
      LocalCache.save(scope, name + "-update", last_update);
    }

    this.get = function(name) {
      return LocalCache.get(scope, name) || [];
    }

    this.load = function(name) {
      var collection = new Collection();
      var cache      = this.get(name);
      for(i in cache) collection.push(new Model(cache[i]));
      return Collection.from(cache);
    }

    // filter

    this.apply_filters = function(object, filters) {
      if(object.constructor !== Array) {
        for(f in filters)
          if(this[f] && filters[f].apply(object))
            this[f] = Collection.from([object], this.collection(name));
      } else {
        for(f in filters)
          this[f] = null;
      }
    }

    // interface

    this.collection = function(name) {
      if(!this['all']) this['all'] = this.load('all');
      if(!this[name] ) this[name]  = this.collection('all').filter(name);
      return this[name];
    }

    this.save_collection = function(name, objects) {
      if(objects.constructor !== Array) objects = [objects].concat(this.get(name));
      var last_update = new Date().getTime();
      this.set(name, objects, last_update)
      this[name] = Collection.from(objects);
    }

    this.add_collection = function(name, filter_func) {
      filters[name] = function(item) {
        return filter_func.apply(item);
      }
    }

    this.get_collection = function(name) {
      return function() {
        return that.collection(name);
      }
    }

  }

  var QueryCache = function(Model, queries) {

    var that        = this,
        collections = new CollectionsCache(Model),
        last_update = LocalCache.get(Model.prototype.className, 'all-update');

    // cache

    this.insert = function(objects) {
      collections.save_collection('all', objects);
      collections.apply_filters(objects, queries);
    }

    this.lastUpdate = function() {
      return last_update;
    }

    // default queries

    this.all = function() {
      return collections.collection('all');
    }
  
    this.get = function(id, callback) {
      var item = collections.collection('all').get(id);
      console.log(item);
      callback(item);
    }

    // custom queries

    for(f in queries) {
      collections.add_collection(f, queries[f]);
      this[f] = collections.get_collection(f);
    }

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