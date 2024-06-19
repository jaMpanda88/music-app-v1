require('dotenv').config();

const Hapi = require('@hapi/hapi');
const ClientError = require('./exceptions/ClientError');

const albums = require('./api/albums');
const albumsService = require('./services/postgres/albumsService');
const albumsValidator = require ('./validations/albums/albumsValidation');

const songs = require('./api/songs');
const songsService = require('./services/postgres/songsService');
const songsValidator = require ('./validations/songs/songsValidation');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
        cors: {
          origin: ['*'],
        },
      },
  });

  await server.register([
    {
        plugin: songs,
        options: {
            service: songsService,
            validator: songsValidator
        }
    },
    {
        plugin: albums,
        options: {
            service: albumsService,
            validator: albumsValidator
        }
    }
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }

      if (!response.isServer) {
        return h.continue;
      }

      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server',
      });
      newResponse.code(500);
      return newResponse;
    }
    return h.continue;
  });

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();