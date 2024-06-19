const Hapi = require('@hapi/hapi');
const albumsRoutes = require('./routes/albums');
const songsRoutes = require('./routes/songs');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

const init = async () => {
  const server = Hapi.server({
    port: process.env.SERVER_PORT,
    host: process.env.SERVER_HOST,
  });

  server.route(albumsRoutes);
  server.route(songsRoutes);

  server.ext('onPreResponse', errorHandler);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();