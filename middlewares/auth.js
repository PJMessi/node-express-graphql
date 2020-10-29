import jwt from 'jsonwebtoken';

module.exports = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        req.isAuth = false
        return next()
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        if (decoded) {
            req.isAuth = true
            req.authUser = decoded
            
        } else {
            req.isAuth = false
        }
        return next()

    } catch (err) {
        throw err
    }
}
