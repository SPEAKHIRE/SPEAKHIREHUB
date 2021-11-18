module.exports = app => {
    const Profile = require("../controllers/profile.controller.js");
    const Champion = require("../controllers/champion.controller.js");
  
    // Create a new Champion
    app.post("/application/2", Profile.createApplication, Champion.createApplication, (req,res,next) => {
        res.status(200).send(res.locals.user_id);
    });
/* let me fix something
    // Create a new Intern
    app.post("/application/1", Profile.create, Intern.create , (req,res,next) => {
        // get id from profile and use that id for champion. > insert a role = 2, howdidyou
    }); //jwt

    // Retrieve all Profiles
    app.get("/appplication/1", Champion.findAll, Champion.findAll, (req,res) => {

    });

    // Retrieve a single Profile with ProfileId
    app.get("/profile/:profileId", Profile.findOne);
    
  
    // Update a Profile with ProfileId
    app.put("/profile/:profileId", Profile.update);
  
    // Delete a Profile with ProfileId
    app.delete("/profile/:profileId", Profile.delete);
  
    // Create a new Profile
    app.delete("/profile", Profile.deleteAll); 
*/
};
