class songsHandler {
    async postSong(request, h) {
        const { title, year, genre, performer, duration, albumId } = request.payload;
        
        const response = h.response ({
            status: 'success',
            data: { songId }
        }).code(201);
        return response;
    }

    async getSongs() {
        const response = h.response ({
            status: 'success',
            data: { songs }
        }).code(200);
        return response;
    }

    async getSongById(request, h) {
        const { id } = request.params;

        const response = h.response ({
            status: 'success',
            data: { song }
        }).code(200);
        return response;
    }

    async editSongById(request, h) {
        const { id } = request.params;

        const response = h.response ({
            status: 'success',
            message: 'Berhasil diperbaharui'
        }).code(200);
        return response;
    }

    async deleteSongById(request, h) {
        const { id } = request.params;

        const response = h.response ({
            status: 'success',
            message: 'Berhasil dihapus',
        }).code(200);
        return response;
    }
}

module.exports = songsHandler;