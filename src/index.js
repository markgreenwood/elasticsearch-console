const es = require('elasticsearch');

const esClient = new es.Client({ host: 'localhost:9200' });

esClient.search({ index: 'bank' })
  .then(res => console.log(JSON.stringify(res, null, 2)));