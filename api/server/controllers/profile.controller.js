const Profile = require("../models/profile.model.js");

// Create and Save a new Profile
exports.createApplication = (req, res, next) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Profile
  const profile = new Profile({
    user_id: req.body.userid,
    username: req.body.profileInformation.uname,
    password: req.body.profileInformation.passWord,
    role: req.body.profileInformation.role, // this is coming from the front end
    first_name: req.body.profileInformation.fname,
    last_name: req.body.profileInformation.lname,
    email: req.body.profileInformation.email,
    application_status: req.body.profileInformation.application_status, //front end would push the application status 
    hear_about_us: req.body.personalProfProfessional.hearAboutus,
    // if_Not_Hear_About_Us: req.body.personalProfProfessional.ifnothearAboutus // Doesn't need to be blank at all. Front end will get this once the request is pushed
  });
  
// user_id & application_id needs to be not auto increment


  // Save Profile in the database (This would access the profile.model)
  Profile.create(profile, (err, result) => {
    if (err)
      return res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Profile."
      });
    console.log(result.user_id);// we are recieving id here.
    
    //res.locals.user_id == result.user_id;// its not asiging here
    req.user_id = result.user_id;
    req.role = result.role;
    console.log('userId',result.user_id);
    console.log('locals',res.locals.user_id);
    next();// does it have to be res.locals.result.user_id?NO
  });

};

// Check to see if the username exists
exports.checkIfUsernameExists = (req, res) => {
  Profile.checkIfUsernameExists(req.params.username, (err, data) => {
    //console.log(data)
    if (data){
      res.status(200).send({
        user_exists: true, 
        message: "User already exists"
      })
    }
    else if (err) {
      if (err.kind === "not_found") {
        res.status(200).send({ //passing in wrong username
          message: `Not found Profile with username ${req.params.username}.`,
          user_exists: false
        });
      } else {
        res.status(500).send({ //500 means unknown queries
          message: "Error retrieving Profile with username " + req.params.username,
        });
      }
      //console.log(data)
    }
  });
};


// Retrieve all Profiles from the database.
exports.findAll = (req, res) => {
  Profile.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Profiles."
      });
    else res.send(data);
  });
};

// UUID
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
