const es = require('elasticsearch');
const assert = require('assert');
const eb = require('elastic-builder');

describe('elasticsearch', () => {
  const esClient = new es.Client({ host: 'localhost:9200' });

  it('bank index exists', () => esClient.indices.exists({ index: 'bank' })
    .then((res) => assert.ok(res))
  );

  const numRecs = 1000;

  it('queries data', () => esClient.search({ index: 'bank', type: 'account', body: { size: 1000 } })
    .then((res) => assert.equal(res.hits.total, numRecs, `Should be ${numRecs} records`))
  );
});