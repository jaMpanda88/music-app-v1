const albumsHandler = require('./handler');
const routes = require('./route');

module.exports = {
    name: 'albums',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const albumHandler = new albumsHandler(service, validator);
        server.route(routes(albumHandler));
    },
};