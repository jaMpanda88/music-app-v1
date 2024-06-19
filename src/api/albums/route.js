const routes = (handler) => [
    {
        path: '/albums',
        method: 'POST',
    },
    {
        path: '/albums/{id}',
        method: 'GET',
    },
    {
        path: '/albums/{id}',
        method: 'PUT',
    },
    {
        path: '/albums/{id}',
        method: 'DELETE',
    }
];