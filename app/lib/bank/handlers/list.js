const R = require('ramda');
const eb = require('elastic-builder');

module.exports = (esClient) => async (request) => {
  const cursor = R.pathOr([ '-1' ], ['query', 'cursor'], request);
  const size = R.pathOr(10, ['query', 'size'], request);

  // console.log(`cursor=${cursor}, size=${size}`);
  const body = eb.requestBodySearch()
    .sort(eb.sort('_id', 'asc'))
    .searchAfter(cursor)
    .size(size);

  // console.log(`body=${eb.prettyPrint(body)}`);
  return await esClient.search({
    index: 'bank',
    type: 'account',
    body
  });
};
