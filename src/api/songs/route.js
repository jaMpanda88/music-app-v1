const routes = (handler) => [
    {
        path: '/songs',
        method: 'POST',
    },
    {
        path: '/songs',
        method: 'GET',
    },
    {
        path: '/songs/{id}',
        method: 'GET',
    },
    {
        path: '/songs/{id}',
        method: 'PUT',
    },
    {
        path: '/songs/{id}',
        method: 'DELETE',
    }
];