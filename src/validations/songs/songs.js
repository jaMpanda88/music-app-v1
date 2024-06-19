const InvariantError = require('../../exceptions/InvariantError');
const { songsSchema } = require('./songsValidation');

const songValidatior = {
    validateSongPayload: (payload) => {
        const validationResult = songsSchema.validate(payload);

        if(validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = songValidatior;