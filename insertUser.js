var records = [
    { firstName: "Mahesh", email: "manish@gmail.com", lastName: "Sharma", password: "abc@123", dob: "01-02-2019", Mobile_no: "9792814621" },
    { firstName: "Tom", email: "tom@gmail.com", lastName: "Moody", password: "abc@123", dob: "05-05-2018", Mobile_no: "8787097827" },
    { firstName: "Zahira", email: "zahir@gmail.com", lastName: "Wasim", password: "abc@123", dob: "09-12-2019", Mobile_no: "9876543210" },
    { firstName: "Juck", email: "juck@gmail.com", lastName: "Ross", password: "abc@123", dob: "12-09-2017", Mobile_no: "7896541230" },
    { firstName: "Json", email: "json@gmail.com", lastName: "Roy", password: "abc@123", dob: "31-01-2000", Mobile_no: "9632587410" }
];
ObjectID = require('mongodb').ObjectID,

    insertUsers(records);

function insertUsers(records) {
    var uid;
    var mongoose = require('mongoose');
    var conn = mongoose.createConnection('mongodb://127.0.0.1/users');
    var user_schema = mongoose.Schema({}, {
        strict: false,
        collection: 'users'
    });
    var user = conn.model('users', user_schema);
    var userProfile_schema = mongoose.Schema({}, {
        strict: false,
        collection: 'UsersProfile'
    });
    var userProfile = conn.model('UsersProfile', userProfile_schema);
    var async = require('async');
    const crypto = require('crypto');
    async.eachLimit(records, 5, function(userrow, callback) {
        var new_user = new user({
            firstName: userrow.firstName,
            email: userrow.email,
            lastName: userrow.lastName,
            password: crypto.createHash('md5').update(userrow.password).digest("hex")
        });
        new_user.save(function(err, insertrow) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                console.log("Data Inserted in users")
                uid = insertrow._id;
                var new_userProfile = new userProfile({
                    user_id: uid.toString(),
                    dob: userrow.dob,
                    Mobile_no: userrow.Mobile_no,
                });
                new_userProfile.save(function(err, rows) {
                    if (err) {
                        console.log(err);
                        callback(err);
                    } else {
                        callback();
                        console.log("Data Inserted in UsersProfile");
                    }
                });
            }
        });
    });
}