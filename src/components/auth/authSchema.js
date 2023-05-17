
exports.logInSchema = {
    type: 'object',
    properties:
    {
        email: { type: 'string', 'minLength': 20 },
        password: { type: 'string', 'minLength': 8 }
    },
    required: ['email', 'password'],
    additionalProperties: false
}

exports.signUpSchema = {
    type: 'object',
    properties:
    {
        userName: { type: 'string' },
        userEmail: { type: 'string', 'minLength': 10 },
        userPassword: { type: 'string', 'minLength': 6 },
    },
    required: ['userName', 'userEmail', 'userPassword'],
    additionalProperties: false
}