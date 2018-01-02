const es = require('elasticsearch');
const handlers = require('./handlers');

const esClient = new es.Client({ host: 'localhost:9200' });

const { stats, list, count } = handlers(esClient);

module.exports = [
  {
    path: '/bank/accounts/count',
    method: 'GET',
    handler: count
  },
  {
    path: '/bank/accounts/stats',
    method: 'GET',
    handler: stats
  },
  {
    path: '/bank/accounts',
    method: 'GET',
    handler: list
  }
];
