class albumsHandler {
    async postAlbum(request, h) {
        const { name, year } = request.payload;

        const response = h.response ({
            status: 'success',
            data: { albumID }
        }).code(201);
        return response;
    }

    async getAlbumById(request, h) {
        const { id } = request.params;

        const response = h.response ({
            status: 'success',
            data: { album }
        }).code(200);
        return response;
    }

    async editAlbumById(request, h) {
        const { id } = request.params;

        const response = h.response ({
            status: 'success',
            message: 'Berhasil diperbaharui',
        }).code(200);
        return response;
    }

    async deleteAlbumById(request, h) {
        const { id } = request.params;

        const response = h.response ({
            status: 'success',
            message: 'Berhasil dihapus',
        }).code(200);
        return response;
    }
}

module.exports = albumsHandler;