var express = require('express')
var router = express.Router({
    mergeParams: true
})
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const Schema = require("../db/schema.js");
const LocationModel = Schema.LocationModel;
const UserModel = Schema.UserModel;

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(methodOverride('_method'));

//get locations -> render show_locations view
router.get('/', (req, res) => {
    var userId = req.params.userId;
    console.log(`Loading all locations for user ${userId}`);
    UserModel.findById(userId)
        .then((user) => {
            console.log(user);
            res.render('show_locations', {
                user,
                locations: user.locations
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

//get add location page -> render add_location view
router.get('/add', (req, res) => {
    const userId = req.params.userId;
    console.log(`Loading add location page`);

    UserModel.findById(userId)
        .then((user) => {
            console.log(user);
            res.render('add_location', {
                user
            });
        })
        .catch((error) => {
            console.log(error);
        });
})

//post location -> add new location and redirect to get locations
router.post('/', function (req, res) {
    const userId = req.params.userId;
    console.log(`Adding a new location for user ${userId}`);
    var location = req.body;
    var newLocation = new LocationModel({
        streetAddress: location.streetAddress,
        city: location.city,
        state: location.state,
        zip: location.zip,
        scheduled: location.scheduled
    });
    UserModel.findByIdAndUpdate(userId, {
        $push: {
            locations: newLocation
        }
    }).exec(function (err, item) {
        if (err) console.log(err);
        console.log(item)
        res.redirect(`/users/${userId}/locations`);
    })
});

//get specific location -> render edit_location view
router.get('/:locationId', (req, res) => {
    var userId = req.params.userId;
    var locationId = req.params.locationId;
    console.log(`Loading location ${locationId} for user ${userId}`);
    UserModel.findById(userId)
        .then((user) => {
            res.render('edit_location', {
                user,
                location: user.locations.id(locationId)
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

//put user -> update existing user and redirect to get users
router.put('/:locationId', (req, res) => {
    const userId = req.params.userId;
    const locationId = req.params.locationId;
    console.log(`Editing location ${locationId} for user ${userId}`)

    var updatedLocation = req.body;
    console.log(updatedLocation);
    UserModel.findById(userId)
        .then((user) => {
            var oldLocation = user.locations.id(locationId);
            oldLocation.streetAddress = updatedLocation.streetAddress;
            oldLocation.city = updatedLocation.city;
            oldLocation.state = updatedLocation.state;
            oldLocation.zip = updatedLocation.zip;
            oldLocation.scheduled = updatedLocation.titscheduledle;
            
            UserModel.findByIdAndUpdate(userId, user, {
                    new: true
                })
                .then((user) => {
                    console.log(`${user.name} updated!`);
                    res.redirect(`/users/${userId}/locations`);
                })
                .catch((error) => {
                    console.log(error)
                })
        })
})

//delete location -> delete location and redirect to locations
router.delete('/:locationId', (req, res) => {
    const userId = req.params.userId;
    const locationId = req.params.locationId;
    console.log(`Deleting location ${locationId} for user ${userId}`)

    UserModel.findByIdAndUpdate(userId, {
        $pull: {
            locations: {
                _id: locationId
            }
        }
    }).exec(function (err, item) {
        if (err) console.log(err);
        res.redirect(`/users/${userId}/locations`);
    })
});

module.exports = router;