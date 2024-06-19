const InvariantError = require('../../exceptions/InvariantError');  
const { albumsSchema } = require('./albumsValidation');

const albumsValidator = {
    validateAlbumPayload: (payload) => {
        const validationResult = albumsSchema.validate(payload);

        if(validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = albumsValidator;