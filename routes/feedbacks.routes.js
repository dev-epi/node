const { getAll } = require("../Controllers/feedbacks.controller")

const feedbackCtrl = require('../Controllers/feedbacks.controller')
const { verifyToken } = require("../middlewares/auth")
module.exports = (app)=>{

   
    app.get('/feedbacks' , getAll)
    app.get('/feedbacks2' , feedbackCtrl.getAll2)
    app.post('/create_feedback2' , feedbackCtrl.create)
    app.put('/update_feedback/:_id' , feedbackCtrl.update)
    app.delete('/delete_feedback/:_id' , feedbackCtrl.delete)
    app.delete('/remove_feedback/:_id' , verifyToken , feedbackCtrl.remove)

}


