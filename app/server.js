const Hapi = require('hapi');
const Inert = require('inert');
const es = require('elasticsearch')

const esClient = new es.Client({ host: 'localhost:9200' });

const server = Hapi.server({ host: 'localhost', port: 3000 });

server.route({
  path: '/healthcheck',
  method: 'GET',
  handler: (request, h) => {
    return 'Hello, World!';
  }
});

server.route({
  method: 'GET',
  path: '/{path*}',
  handler: (request, h) => {
    if (request.params.path && request.params.path.endsWith('main.js')) {
      return h.file('public/main.js');
    }

    return h.file('public/index.html');
  }
});

server.route({
  path: '/bank/accounts/count',
  method: 'GET',
  handler: async (request, h) => {
    const records = await esClient.search({ index: 'bank', type: 'account' });
    return JSON.stringify(records);
  }
});

server.route({
  path: '/bank/accounts/stats',
  method: 'GET',
  handler: async (request, h) => {
    const avgBalance = await esClient.search({
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
    return JSON.stringify(avgBalance);
  }
})

async function startServer(theServer) {
  try {
    await theServer.register(Inert);
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