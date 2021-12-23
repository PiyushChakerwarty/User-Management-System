var Userdb = require('../model/model');

//create and save new user
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty" });
        return;
    }
  
    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status:req.body.status
    })

    //save user in the db
    user.save(user)
        .then(data => {
            // res.send(data)
            res.redirect('/')
        })
        .catch((err)=> {
        res.status(500).send({
            message: err.message || "Some error occured"
        });
    })
}

// retrieve and return all users/single user
exports.find = (req, res) => {
    
    if (req.query.id) {
        var id = req.query.id;
        Userdb.findById(id).then(data => {
            if (!data) {
                res.status(404).send({message:`Record not found ID: ${id}`})
            } else {
                res.send(data)
            }
        }).catch(err => {
            res.status(500).send(err.message || "Object not found")
        })
    } else {
        Userdb.find().then(user => {
            res.send(user)
        })
            .catch(err => {
                res.status(500).send(err.message || "Object not found")
            })
    }
}

// update a new identified user by user id
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400)
            .send({
            message:"data to be updated cannot be empty"
            })
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                message:`Cannot update user with ${id}. User not found`
                }) 
            } else {
                res.send(data)
            }
        }).catch(err => {
            res.status(500).send({message:"Error Updating user info"})
        })
}

//Delete a user with specified id
exports.delete = (req, res) => {
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete with id: ${id}. Wrong ID` })
            } else {
                res.send({message:"user was successfully deleted."})
            }
            
        }).catch(err => {
        res.status(500).send({message:`Could not delete user with id: ${id}`})
    })
}