const Hapi = require('hapi');

const server = Hapi.server({ host: 'localhost', port: 3000 });

server.route({
  path: '/',
  method: 'GET',
  handler: (request, h) => {
    return 'Hello, World!';
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