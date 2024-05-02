const bcryptjs = require('bcryptjs');
const UserModel = require('../Models/User.model');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {

    /* step1 : search if user with the same email already exist  */
    UserModel.findOne({ email: req.body.email })
        .then((exist) => {

            if (exist) {
                res.status(406).send({ 'message': 'User already exist' })
            } else {
                var user = new UserModel(req.body);

                /* step2 generate private key for password creating */
                bcryptjs.genSalt()
                    .then((key) => {

                        /* step 3 : generate hashed password with the private key  */
                        bcryptjs.hash(user.password, key)
                            .then((new_password) => {
                                user.password = new_password
                                user.save()
                                    .then((data) => {
                                        res.send(data)
                                    })
                            })
                    })

            }
        })
}

exports.login = (req, res) => {
    UserModel.findOne({ email: req.body.email })
        .then((userData) => {

            if (!userData) {
                res.status(406).send({ 'message': 'User not found' })
            } else {

                bcryptjs.compare(req.body.password, userData.password)
                    .then((valid) => {
                        if (!valid) {
                            res.status(406).send({ 'message': 'Invalid password' })
                        } else {
                            token = jwt.sign({ _id: userData._id, first_name: userData.first_name, email: userData.email }, process.env.SECRET_TOKEN);
                            res.send({ token })
                        }
                    })

            }
        })
}


exports.updateAvatar = (req, res) => {

    if (req.files?.avatar) {
        UserModel.updateOne({ _id: req.user._id }, { avatar: req.files.avatar.path })
            .then((data) => {
                res.send(data)
            })
            .catch(err => res.status(501).send(err))
    } else {
        res.status(410).send({ 'error': 'No file selected' })
    }

}

exports.users_list = (req, res) => {

    UserModel.find()
        .then((data) => {
            res.send(data)
        })
}

exports.delete_user = (req, res) => {
    UserModel.deleteOne({ _id: req.params._id })
        .then((data) => {
            res.send(data)
        })
        .catch(err => res.status(501).send(err))
}


exports.update_user = (req, res) => {

    UserModel.updateOne({ _id: req.params._id }, req.body)
        .then((data) => {
            res.send(data)
        })
        .catch(err => res.status(501).send(err))
}