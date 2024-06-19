class albumsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
  
        this.postAlbumHandler = this.postAlbumHandler.bind(this);
        this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
        this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
        this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
    }

    async postAlbumHandler(request, h) {
        this._validator.validateAlbumPayload(request.payload);
        const { name = 'untitled', year } = request.payload;
   
        const albumId = await this._service.postAlbum({ name, year });
   
        const response = h.response({
          status: 'success',
          data: {
            albumId,
          },
        });
        response.code(201);
        return response;
    }

    async getAlbumByIdHandler() {
        const { id } = request.params;
        const album = await this._service.getAlbumById(id);
        return {
          status: 'success',
          data: {
            album,
          },
        };
    }

    async putNoteByIdHandler(request) {
        this._validator.validateAlbumPayload(request.payload);
        const { id } = request.params;
   
        await this._service.editNoteById(id, request.payload);
   
        return {
          status: 'success',
          message: 'Berhasil diperbarui',
        };
    }

    async deleteAlbumByIdHandler(request) {
        const { id } = request.params;
        await this._service.deleteAlbumById(id);
    
        return {
          status: 'success',
          message: 'Berhasil dihapus',
        };
    }
}

module.exports = albumsHandler;