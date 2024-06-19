const routes = (handler) => [
    {
        path: '/songs',
        method: 'POST',
        handler: handler.postSong
    },
    {
        path: '/songs',
        method: 'GET',
        handler: handler.getSongs
    },
    {
        path: '/songs/{id}',
        method: 'GET',
        handler: handler.getSongById
    },
    {
        path: '/songs/{id}',
        method: 'PUT',
        handler: handler.editSongById
    },
    {
        path: '/songs/{id}',
        method: 'DELETE',
        handler: handler.deletSongById
    }
];

module.exports = routes;