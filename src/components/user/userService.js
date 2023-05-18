const userRepository = require('./useRepository');

exports.getAll = async () => {
    return await userRepository.getAll()
}

