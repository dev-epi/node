const FeedbackModel = require("../Models/Feedback.model")

exports.getAll = (req , res)=>{
   FeedbackModel.find() 
   .then((data)=>{


    res.send(data)

   })


}

exports.getAll2 = (req , res)=>{
    FeedbackModel.find((err , result)=>{
        res.send(result)
    }) 
}

exports.getAll3 = async(req , res)=>{
    var result = await FeedbackModel.find()
    res.send(result)
}



exports.create = async(req , res)=>{

    var new_feed = new FeedbackModel(req.body)
    // new_feed.text = req.body.text
    // new_feed.rating = req.body.rating
   new_feed.save()
   .then((result)=>res.send(result))
   .catch(err=>res.status(407).send(err))
}

exports.update = (req , res)=>{
    FeedbackModel.updateOne({_id : req.params._id} , req.body)
    .then((result)=>res.send(result))
    .catch((err)=>res.status(450).send(err))
}

exports.delete = (req,res)=>{
    FeedbackModel.deleteOne({_id : req.params._id})
    .then((result)=>res.send(result))
    .catch((err)=>res.status(450).send(err))
}

exports.remove = async(req,res)=>{
    let item = await FeedbackModel.findOne({_id : req.params._id})
    /* test if authenticated user is owner */
    if(item && item.user_id == req.user._id){
        await item.delete()
    }else{
        res.status(403).send({'error' : 'Unauthorized'})
    }
}
