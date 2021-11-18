const Champion = require("../models/champion.model.js");
const Profile = require("../models/profile.model.js");

/*
application_id: req.body.application_id,
user_id: req.body.user_id,
DOB: req.body.dob,
gender: req.body.gender,
phone_number: req.body.phone_number,
citizenship: req.body.citizenship,
mailing_address: req.body.mailing_address,
city_res: req.body.city_res,
contact: req.body.contract,
career: req.body.career,
regional_nationality: req.body.regional_nationality,
race: req.body.race,
religion: req.body.religion,
linked_in: req.body.linked_in,
resume: req.body.resume,
degree: req.body.degree,
university: req.body.university,
major: req.body.major,
job: req.body.job,
immigrant_q: req.body.immigrant_q,
languages: req.body.languages,
other_languages: req.body.other_languages,
other_regional_nationality: req.body.other_regional_nationality,
photo_waiver: req.body.photo_waiver,
headshot: req.body.headshot
*/

// Create and Save a new Profile
exports.createApplication = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
// let me check something hold on nvm

    // Create a Profile
    const champion = new Champion({
        application_id: req.application_id,
        user_id: req.user_id, //debug here save
        dBirth: req.body.profileInformation.dBirth,
        gender: req.body.profileInformation.gender,
        phone_number: req.body.profileInformation.pNumber,
        citizenship: req.body.profileInformation.citizenship,
        mailing_address: req.body.personalProfProfessional.mailingAddress, //ask Hetal
        city_res: req.body.personalProfProfessional.cityOfResident,
        //contact: req.body.contact,
        career: req.body.personalProfProfessional.careerField,
        // company: req.body.personalProfProfessional.companyName,
        race: req.body.demographicInformation.raceEthnicity,
        religion: req.body.profileInformation.religion,
        // ifnotreligion: req.body.profileInformation.ifnotreligion,
        linked_in: req.body.personalProfProfessional.linkedlnURL,
        resume: req.body.personalProfProfessional.resume,
        degree: req.body.personalProfProfessional.highestDegreeAchieved,
        university: req.body.personalProfProfessional.university,
        major: req.body.personalProfProfessional.major,
        job: req.body.personalProfProfessional.jobTitle,
        immigrant_q: req.body.demographicInformation.immigrant,
        languages: req.body.demographicInformation.languages,
        other_languages: req.body.other_languages,
        regional_nationality: req.body.demographicInformation.region,
        other_regional_nationality: req.body.demographicInformation.otherregion,
        photo_waiver: req.body.photo_waiver,
        headshot: req.body.headshot
    }); 
    /*
    const profileUpdate = new Champion({
      role: 2
    });*/
  
    // Save Profile in the database
    Champion.create(champion, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Champion."
        });
      else res.send(data);
    });
};

// Retrieve all Profiles from the database.
exports.findAll = (req, res) => {
    Champion.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Champion."
        });
      else res.send(data);
    });
  };

/*
// Find a single Profile with a ProfileId
exports.findOne = (req, res) => {
    Profile.findById(req.params.profileId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Profile with id ${req.params.profileId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Profile with id " + req.params.profileId
            });
          }
        } else res.send(data);
    });
};

// Update a Profile identified by the ProfileId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Profile.updateById(
      req.params.profileId,
      new Profile(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Profile with id ${req.params.profileId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Profile with id " + req.params.profileId
            });
          }
        } else res.send(data);
      }
    );
};
// Delete a Profile with the specified ProfileId in the request
exports.delete = (req, res) => {
    Profile.remove(req.params.ProfileId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Profile with id ${req.params.profileId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Profile with id " + req.params.profileId
          });
        }
      } else res.send({ message: `Profile was deleted successfully!` });
    });
};

// Delete all Profiles from the database.
exports.deleteAll = (req, res) => {
    Profile.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Profiles."
        });
      else res.send({ message: `All Profiles were deleted successfully!` });
    });
  };


  */