const Hapi = require('hapi');
const Inert = require('inert');
const pkg = require('./package.json');
const bankRoutes = require('./lib/bank/routes');
const server = Hapi.server({ host: 'localhost', port: 3000 });

server.route({
  path: '/healthcheck',
  method: 'GET',
  handler: () => ({
    status: 'ok',
    service: 'elasticsearch-console',
    version: pkg.version
  })
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

server.route(bankRoutes);

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