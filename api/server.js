const Hapi = require('hapi');
const es = require('elasticsearch')

const esClient = new es.Client({ host: 'localhost:9200' });

const server = Hapi.server({ host: 'localhost', port: 3000 });

server.route({
  path: '/',
  method: 'GET',
  handler: (request, h) => {
    return 'Hello, World!';
  }
});

server.route({
  path: '/bank/accounts',
  method: 'GET',
  handler: async (request, h) => {
    const records = await esClient.search({ index: 'bank', type: 'account' });
    return records.hits.total;
  }
});

async function startServer(theServer) {
  try {
    await theServer.start();
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server running at ${theServer.info.uri}`);
  return theServer;
}

startServer(server);