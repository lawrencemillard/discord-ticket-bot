const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

module.exports = {
  set: (key, value) => {
    cache.set(key, value);
  },
  get: (key) => {
    return cache.get(key);
  },
  del: (key) => {
    cache.del(key);
  },
  flush: () => {
    cache.flushAll();
  },
};
