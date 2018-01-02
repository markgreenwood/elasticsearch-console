const list = require('./list');
const stats = require('./stats');
const count = require('./count');

module.exports = (esClient) => {
  return {
    list: list(esClient),
    stats: stats(esClient),
    count: count(esClient)
  };
};
