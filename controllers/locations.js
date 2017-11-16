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
    var userId = req.params.userId;
    console.log(`Loading all locations`)
    UserModel.findById(userId)
        .then((user) => {
            console.log(user);
            res.render('show_locations', {user});
        })
        .catch((error) => {
            console.log(error);
        });
});

module.exports = router;