const es = require('elasticsearch');
const list = require('./handlers/list');

const esClient = new es.Client({ host: 'localhost:9200' });

module.exports = [
  {
    path: '/bank/accounts/count',
    method: 'GET',
    handler: async () => {
      const records = await esClient.search({ index: 'bank', type: 'account' });
      return JSON.stringify(records);
    }
  },
  {
    path: '/bank/accounts/stats',
    method: 'GET',
    handler: async () => {
      const acctStats = await esClient.search({
        index: 'bank',
        type: 'account',
        body: {
          aggs: {
            acctStats: {
              stats: {
                field: 'balance'
              }
            }
          }
        }
      });
      return JSON.stringify(acctStats);
    }
  },
  {
    path: '/bank/accounts',
    method: 'GET',
    handler: list(esClient)
  }
];
