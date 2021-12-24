const axios=require('axios')
exports.homeRoutes = (req, res) => {
    axios.get("https://user-mngmt-system.herokuapp.com/api/users/")
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
    axios.get("https://user-mngmt-system.herokuapp.com/api/users", { params: { id: req.query.id } })
        .then(function (userdata) {
            console.log(userdata);
        res.render("update_user",{user:userdata.data})
    })
        .catch(err => {
        res.send(err )
    })
}