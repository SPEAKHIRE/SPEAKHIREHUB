module.exports = app => {
    const Profile = require("../controllers/profile.controller.js");
    const Champion = require("../controllers/champion.controller.js");
  
    // Create a new Champion
    app.post("/application/2", Profile.createApplication, Champion.createApplication, (req,res,next) => {
        res.status(200).send(res.locals.user_id);
    });

    app.get("/application/2/:username", Profile.checkIfUsernameExists);


};
