module.exports = app => {
    const Profile = require("../controllers/profile.controller.js");
  
    // Create a new Profile
    app.post("/profile", Profile.createApplication);

    // Retrieve all Profiles
    app.get("/profile", Profile.findAll);

    // Retrieve a single Profile with ProfileId
    app.get("/profile/:profileId", Profile.findOne);
    
  
    // Update a Profile with ProfileId
    app.put("/profile/:profileId", Profile.update);
  
    // Delete a Profile with ProfileId
    app.delete("/profile/:profileId", Profile.delete);
  
    // Create a new Profile
    app.delete("/profile", Profile.deleteAll); 
  };