module.exports = (esClient) => async () => {
  const records = await esClient.search({ index: 'bank', type: 'account' });
  return `${records}`;
};
