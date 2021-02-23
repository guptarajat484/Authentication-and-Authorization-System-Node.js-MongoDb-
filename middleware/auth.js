const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('x-auth')
    if (!token) {
        return res.send('Accesses Denied')
    }
    try {
        const decoded = jwt.verify(token, 'thisssssssssssssssssssssssssssss')
        req.user = decoded
        next()
    }
    catch (err) {
        return res.send('err' + err)
    }

}

module.exports = auth