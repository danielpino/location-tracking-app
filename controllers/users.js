var express = require('express')
var router = express.Router({
    mergeParams: true
})
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

const Schema = require("../db/schema.js")
const StudentModel = Schema.StudentModel
const ProjectModel = Schema.ProjectModel

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(methodOverride('_method'));

//get users -> render show_user view

//get add user page -> render add_user view
//post user -> add new user and redirect to get users

//get specific user -> render show_one_user view
//edit specific user -> get user and render edit_user page
//put user -> update existing user and redirect to get users

//delete user -> delete user and redirect to users

module.exports = router;