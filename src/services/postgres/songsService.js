const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class songsService {
    constructor() {
        this._pool = new Pool();
    }

    async postSong({ name, year }) {
        const id = `album-${nanoid(16)}`;

        const query = {
            text: 'INSERT INTO notes VALUES($1, $2, $3) RETURNING id',
            values: [ id, title, year, genre, performer, duration, albumId ]
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Gagal ditambahkan');
        }
    
        return result.rows[0].id;
    }

    async getSongs() {
        const res = await this._pool.query('SELECT * FROM songs');
        return res.rows;
    }

    async getSongById() {
        const query = {
            text: 'SELECT * FROM albums WHERE id = $1',
            values: [ id ]
        };

        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('Tidak ditemukan');
        }

        return result.rows[0];
    }

    async editSongById(id, { title, year, genre, performer, duration, albumId }) {
        const query = {
            text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, album_id = $6 WHERE id = $7 RETURNING id',
            values: [ title, year, genre, performer, duration, albumId ]
        };
    
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui. Id tidak ditemukan');
        }
    }

    async deleteSongById(id) {
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

module.exports = songsService;