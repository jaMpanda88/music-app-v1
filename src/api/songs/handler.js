class songsHandler {
    constructor(service, validator) {
      this._service = service;
      this._validator = validator;
  
      this.postSongHandler = this.postSongHandler.bind(this);
      this.getSongsHandler = this.getSongsHandler.bind(this);
      this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
      this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
      this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
    }
  
    async postSongHandler(request, h) {
      this._validator.validateSongPayload(request.payload);
      const { title, year, performer, genre,  duration, albumId } = request.payload;
      const songId = await this._service.addSong({
        title, year, genre, performer, duration, albumId,
      });
      const response = h.response({
        status: 'success',
        data: { songId }
      }).code(201);
      return response;
    }
  
    async getSongsHandler(request) {
      const { title, performer } = request.query;
      const songs = await this._service.getSongs({ title, performer });
      
      return {
        status: 'success',
        data: { songs }
      }.code(200);
    }
  
    async getSongByIdHandler(request) {
      const { id } = request.params;
      const song = await this._service.getSongById(id);
      return {
        status: 'success',
        data: { song }
      }.code(200);
    }
  
    async putSongByIdHandler(request) {
      this._validator.validateSongPayload(request.payload);
      const { id } = request.params; 
      await this._service.editSongById(id, request.payload);
  
      return {
        status: 'success',
        message: 'Berhasil diperbarui',
      }.code(200);
  }
  
    async deleteSongByIdHandler(request) {
      const { id } = request.params;
      await this._service.deleteSongById(id);
      return {
        status: 'success',
        message: 'Berhasil dihapus',
      }.code(200);
    }
  }
  
  module.exports = songsHandler;