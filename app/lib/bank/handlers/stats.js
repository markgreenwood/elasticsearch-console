module.exports = (esClient) => async () => {
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

  return acctStats;
};
