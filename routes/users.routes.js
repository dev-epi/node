const { register, login, updateAvatar, users_list, delete_user, update_user } = require("../Controllers/users.controller")
const { verifyToken } = require("../middlewares/auth")

const multipart = require('connect-multiparty')
const upload = multipart({uploadDir : './uploads'})

module.exports = (app)=>{
    app.post('/register' , register)
    app.post('/login' , login)
    app.put('/update_avatar' , [upload , verifyToken]  , updateAvatar)
    app.get('/users' , users_list)
    app.delete('/user/delete/:_id',verifyToken , delete_user )
    app.put('/user/update/:_id',verifyToken , update_user)
}