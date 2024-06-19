const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFound');
 
class albumsService {
    constructor() {
        this._pool = new Pool();
    }

    async postAlbum({ name, year }) {
        const id = `album-${nanoid(16)}`;

        const query = {
            text: 'INSERT INTO notes VALUES($1, $2, $3) RETURNING id',
            values: [ id, name, year ]
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Gagal ditambahkan');
        }
    
        return result.rows[0].id;
    }

    async getAlbumById() {
        const query = {
            text: 'SELECT * FROM albums WHERE id = $1',
            values: [ id ]
        };

        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('Tidak ditemukan');
        }

        const album = result.rows[0];

        const querySong = {
            text: 'SELECT id, title, performer FROM songs WHERE album_id = $1',
            values: [ album.id ]
        };

        const songResult = await this._pool.query(querySong);
        album.songs = songResult.rows;

        return album;
    }

    async editAlbumById(id, { name, year }) {
        const query = {
            text: 'UPDATE albums SET name = $1, year = $2, WHERE id = $3 RETURNING id',
            values: [ album, id ]
        };
    
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui. Id tidak ditemukan');
        }
    }

    async deleteAlbumById(id) {
        const query = {
            text: 'DELETE FROM notes WHERE id = $1 RETURNING id',
            values: [ id ]
        };
    
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Gagal dihapus. Id tidak ditemukan');
        }
    }
}

module.exports = albumsService;