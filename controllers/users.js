var express = require('express')
var router = express.Router({
    mergeParams: true
})
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

const Schema = require("../db/schema.js");
const LocationModel = Schema.LocationModel;
const UserModel = Schema.UserModel;

var locationsController = require('../controllers/locations.js');

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(methodOverride('_method'));

router.use('/:userId/locations', locationsController);

//get users -> render show_user view
router.get('/', (req, res) => {
    console.log(`Loading all users`);
    UserModel.find({})
        .then((users) => {
            console.log(users);
            res.render('show_users', {
                users
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

//get add user page -> render add_user view
router.get('/add', (req, res) => {
    const userId = req.params.userId;
    console.log(`Loading add user page`);

    res.render('add_user');
})

//post user -> add new user and redirect to get users
router.post('/', function (req, res) {
    console.log(`Adding a new user`);
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
router.get('/:userId', (req, res) => {
    var userId = req.params.userId;
    console.log(`Loading user page`);
    UserModel.findById(userId)
        .then((user) => {
            res.render('show_locations', {user});
        })
        .catch((error) => {
            console.log(error);
        });
});

//edit specific user -> get user and render edit_user page
router.get('/:userId/edit', (req, res) => {
    const userId = req.params.userId;
    console.log(`Getting user: ${userId}`);

    UserModel.findById(userId)
        .then((user) => {
            res.render('edit_user', {
                user
            });
        });
});

//put user -> update existing user and redirect to get users
router.put('/:userId', (req, res) => {
    const userId = req.params.userId;
    console.log(`Updating user: ${userId}`)
    const updatedUser = req.body;

    UserModel.findByIdAndUpdate(userId, updatedUser, {
            new: true
        })
        .then((user) => {
            res.redirect(`/users`);
        })
        .catch((error) => {
            console.log(error);
        });
});

//delete user -> delete user and redirect to users
router.delete('/:userId', (req, res) => {
    const userId = req.params.userId;
    console.log(`Deleting user: ${userId}`)

    UserModel.findByIdAndRemove(userId)
        .then(() => {
            res.redirect(`/users/`);
        })
        .catch((error) => {
            console.log(error);
        });
});

module.exports = router;