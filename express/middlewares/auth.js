import jwt, { JsonWebTokenError } from 'jsonwebtoken';

module.exports = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        req.isAuth = false
        return next()
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY)   
        req.isAuth = true
        req.authUser = decoded
 
        return next()

    } catch (err) {
        if (err instanceof JsonWebTokenError) {
            req.isAuth = false
            return next()
        }
        throw err
    }
}
