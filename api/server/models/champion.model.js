const sql = require("./db.js");
var crypto = require('crypto');

// constructor
const Champion = function(champion) {
    this.application_id = crypto.randomBytes(16).toString("hex");
    this.user_id = champion.user_id;
    this.dBirth = champion.dBirth;
    this.gender = champion.gender;
    this.phone_number = champion.phone_number;
    this.citizenship = champion.citizenship;
    this.mailing_address = champion.mailing_address;
    this.city_res = champion.city_res;
    this.contact = champion.contact;
    this.career = champion.career;
    this.regional_nationality = champion.regional_nationality;
    this.race = champion.race;
    this.religion = champion.religion;
    this.linked_in = champion.linked_in;
    this.resume = champion.resume;
    this.degree = champion.degree;
    this.university = champion.university;
    this.major = champion.major;
    this.job = champion.job;
    this.immigrant_q = champion.immigrant_q;
    this.languages = champion.languages;
    this.other_languages = champion.other_languages;
    this.other_regional_nationality = champion.other_regional_nationality;
    this.photo_waiver = champion.photo_waiver;
    this.headshot = champion.headshot;
    //this.role = champion.role;
};
/*
const profileUpdate = function(profileUpdate){
  this.role = profileUpdate.role;
}*/

Champion.create = (newChampion, result) => {
  //console.log(DOB)
  sql.query("INSERT INTO champion SET ?", newChampion, (err, res) => { //insert FK here to conenct with profile
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
    console.log("created Champion: ", { application_id: res.insertId, ...newChampion });
    result(null, { application_id: res.insertId, ...newChampion });
    /*
    sql.query("UPDATE profile SET role = 2 WHERE user_id = ?", user_id, (err, res) => {
      if (err) throw err;
      console.log("updated role : ", role);
    });*/
  });
};

module.exports = Champion;