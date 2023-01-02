const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next)=>{
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.SECRET, async (err, decodedToken)=>{
            if(err){
                res.redirect('/login')
            }else{
                const _id = decodedToken.id
                const user = await User.findOne({_id}) 
                req.user = user
                next()
            }
        })
    } else {
        res.redirect('/login')
    }
}

module.exports = auth