import jwt from 'jsonwebtoken'

import { TOKEN_SECRET } from '../config.js'

export const authRequired = (req,res,next) => {
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized')
    }

    const token = req.headers.authorization.split(' ')[1]

    try {
        const decoded = jwt.verify(token, TOKEN_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).send('Unauthorized')
    }
}