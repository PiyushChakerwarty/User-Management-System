const axios=require('axios')
exports.homeRoutes = (req, res) => {
    axios.get("http://127.0.0.1:5001/api/users/")
        .then(function (response) {
            // console.log(response);
            res.render('index',{ users: response.data })        
        }).catch(err => {
            res.send(err);
    })
}

exports.addUser=(req, res) => {
    res.render('add_user')
}

exports.updateUser = (req, res) => {
    axios.get("http://127.0.0.1:5001/api/users", { params: { id: req.query.id } })
        .then(function (userdata) {
            console.log(userdata);
        res.render("update_user",{user:userdata.data})
    })
        .catch(err => {
        res.send(err )
    })
}