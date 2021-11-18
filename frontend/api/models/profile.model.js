const sql = require("./db.js");
'use strict';
var crypto = require('crypto');

// constructor
const Profile = function(profile) {
  this.user_id = crypto.randomBytes(16).toString("hex");
  this.username = profile.username;
  this.password = saltHashPassword(profile.password);
  this.role = roleIfNull(profile.role); //put this as a default value
  this.first_name = profile.first_name;
  this.last_name = profile.last_name;
  this.email = profile.email;
  this.application_status = statusIfNull(profile.application_status);
  this.hear_about_us = profile.hear_about_us;
};


// HASHING
/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha256.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
// use 256 and unhashing
var sha256 = function(password, salt){
    var hash = crypto.createHmac('sha256', salt); /** Hashing algorithm sha256 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        // salt:salt,
        passwordHash:value //maybe change this from json
    };
};

function saltHashPassword(userpassword) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha256(userpassword, salt);
    console.log('UserPassword = '+userpassword);
    console.log('Passwordhash = '+passwordData.passwordHash);
    console.log('nSalt = '+passwordData.salt);
    return passwordData
}
/*
function unsaltHashPassword(userpassword){
    var 
  
} */

// Setting default for application status and role if Null
function statusIfNull(status) {
  if (status === "") {
    return (status = 0);
  }
  return status;
}
function roleIfNull(rollNull) {
  if (rollNull === "") {
    return (rollNull = 0);
  }
  return rollNull;
}

Profile.create = (newProfile, result) => {
  sql.query("INSERT INTO profile SET ?", newProfile, (err, res) => {
    if (err) throw err; 
    var profileJson = { user_id: res.insertId, ...newProfile };
    console.log("created Profile: ", profileJson);
    result(null, profileJson);
    user_id = profileJson.user_id;
    //const myJSON = JSON.stringify(result);
  });
};

Profile.getAll = result => {
    sql.query("SELECT * FROM profile", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Profiles: ", res);
      result(null, res);
    });
  };


Profile.findById = (profileId, result) => {
  sql.query(`SELECT * FROM profile WHERE user_id = ${profileId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Profile: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Profile with the id
    result({ kind: "not_found" }, null);
  });
};

Profile.updateById = (id, Profile, result) => {
  sql.query(
    "UPDATE profile SET username = ?, password = ?, role = ?, first_name = ?, last_name = ?, email = ?, application_status = ?, hear_about_us = ?,  WHERE user_id = ?",
    [Profile.username, Profile.password, Profile.role, user_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Profile with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Profile: ", { user_id: user_id, ...profile });
      result(null, { id: id, ...profile });
    }
  );
};

Profile.remove = (user_id, result) => {
  sql.query("DELETE FROM profile WHERE user_id = ?", user_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Profile with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted profile with id: ", user_id);
    result(null, res);
  });
};

Profile.removeAll = result => {
  sql.query("DELETE FROM profile", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} profiles`);
    result(null, res);
  });
};

module.exports = Profile;