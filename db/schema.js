var mongoose = require('mongoose');

if (process.env.MONGODB_URI) {
    console.log(`Connecting to remote mongo`);
    mongoose.connect(process.env.MONGODB_URI);
} else {
    console.log(`Connecting to local mongo`);
    mongoose.connect('mongodb://localhost/students');
}
mongoose.connection.on('error', function (err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});
mongoose.connection.once('open', function () {
    console.log("Mongoose has connected to MongoDB!");
});

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', function (err) {
    console.log(err);
});
db.once('open', function () {
    console.log("database has been connected!");
});

var Schema = mongoose.Schema;
var LocationSchema = new Schema({
    streetAddress: String,
    city: String,
    state: String,
    zip: String,
    scheduledTime: String
});
var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    locations: [LocationSchema]
});

var LocationModel = mongoose.model("Location", LocationSchema);
var UserModel = mongoose.model("User", UserSchema);

module.exports = {
    LocationModel,
    UserModel,
    db
};