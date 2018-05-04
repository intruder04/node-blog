import jwt from 'jsonwebtoken'
import config from '../config'

export default async (req, res, next) => {
    const token = req.headers['authorization']    

    if (!token) {
        // return res
        //         .status(403)
        //         .json({ message: "Forbidden! No token!"})
        return next({
            status: 403,
            message: "Forbidden! No token!"
        })
    }
    try {
        var tokenObj = jwt.verify(token, config.secret);
    } catch ({ message }) {
        return next({
            status: 400,
            message
        })
    }

    req.token = tokenObj
    next()
}