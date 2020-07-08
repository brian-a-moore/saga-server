const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const expTime = process.env.EXP_TIME || '1d';
const { messages } = require('../utils');

exports.createToken = input => (
    token = jwt.sign(
        { user: input },
        secret,
        { expiresIn: expTime }
    )
);

exports.verifyToken = (token, callback) => (
    jwt.verify(token, secret, (err, res) => {
        if(err) callback(errorIntercept(err), null);
        else callback(null, res.user);
    })
);

exports.verifyTokenPromise = token => jwt.verify(token, secret);

exports.isValidToken = token => (
    jwt.verify(token, secret, (err, res) => {
        if(err) return { err: errorIntercept(err), isValid: false };
        return { err: null, isValid: true };
    })
);

const errorIntercept = err => {
    let error = new Error();
    error.name = 'Token Validation Error';
 
    if(err.name === 'TokenExpiredError') error.message = messages.token.expired;
    else error.message = messages.token.error;

    return error;
};