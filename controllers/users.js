var express = require('express')
var router = express.Router({
    mergeParams: true
})
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

const Schema = require("../db/schema.js");
const LocationModel = Schema.LocationModel;
const UserModel = Schema.UserModel;

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(methodOverride('_method'));

//get users -> render show_user view
router.get('/', (req, res) => {
    console.log(`Loading all users`)
    UserModel.find({})
        .then((users) => {
            res.send(users);
        })
        .catch((error) => {
            console.log(error)
        })
})

//get add user page -> render add_user view
//post user -> add new user and redirect to get users
router.post('/', function (req, res) {
    console.log(`Adding a new student`);
    var newUser = req.body;
    var user = new UserModel({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
    });
    user.save(function (err, user) {
        if (err) console.log(err);
        console.log(user);
        res.redirect('/users');
    });
});

//get specific user -> render show_one_user view
//edit specific user -> get user and render edit_user page
//put user -> update existing user and redirect to get users

//delete user -> delete user and redirect to users

module.exports = router;