const es = require('elasticsearch');
const R = require('ramda');
const list = require('../lib/bank/handlers/list');
const expect = require('chai').expect;

const esClient = es.Client({ host: 'localhost:9200' });

describe('list handler', () => {
  const lister = list(esClient);

  it('list accounts defaults to 10', async () => {
    const results = await lister();

    expect(results.hits.hits.length).to.equal(10);
  });

  it('list accounts can take specified size', async () => {
    const results = await lister({ query: { size: 20 } });

    expect(results.hits.hits.length).to.equal(20);
  });

  it('repeatedly fetching paginated lists gets all 1000 records', async () => {
    let results = [];
    let cursor = null;
    let size = 10;

    while (size > 9) {
      const recGroup = await lister({ query: { cursor: cursor } });
      results = R.concat(results, R.pluck('_source', recGroup.hits.hits));
      size = recGroup.hits.hits.length;
      cursor = R.propOr(null, 'sort', R.last(recGroup.hits.hits));
    }

    expect(results.length).to.equal(1000);
  });
});