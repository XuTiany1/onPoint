const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


// Mongoose models
const videoSummary = require("../models/videoSummary");


// Constants
const mongodatabaseURL = "mongodb://localhost:27017/testerDB";


// Variable to be sent to Frontend with Database status
var databaseConnection = "Waiting for Database response...";


// ========== CONNECTION PROCESS TO MONGODB ===========
// // Connecting to MongoDB
// mongoose.connect("mongodb://localhost:27017/testerDB");
// // If there is a connection error send an error message
// mongoose.connection.on("error", error => {
//     console.log("Database connection error:", error);
//     databaseConnection = "Error connecting to Database";
// });
// // If connected to MongoDB send a success message
// mongoose.connection.once("open", () => {
//     console.log("Connected to Database!");
//     databaseConnection = "Connected to Database";
// });



// Routing to database defined here:

// Default path that sends current database status when database is loading
router.get("/", function(req, res, next) {

    // Connect to database
    mongoose.connect(mongodatabaseURL, { useNewUrlParser: true})
    .then(() => {
        console.log("DATABASEE connected");
        databaseConnection = "Connected to Database";
    })
    .catch((err) => {
        console.log(err);
        databaseConnection = "Error connecting to Database";
    });

    res.send(databaseConnection);

});


router.post("/getVideoSummary", async (req, res, next) => {

    console.log("I am in the POST function");
	
    // ============ Connect to database START ================
    mongoose.connect(mongodatabaseURL, { useNewUrlParser: true})
    .then(() => {
        console.log("DATABASEE connected --- POST EDITION");
        databaseConnection = "Connected to Database";
    })
    .catch((err) => {
        console.log(err);
        databaseConnection = "Error connecting to Database -- post edition";
    });
    // ============ Connect to database END ================



    // ============ POST MATERIAL START ================
    const newVideoSummary = new videoSummary({
        title: "hello world",
	    content: "new content is inserted here",
    });

    await newVideoSummary.save()
        .then(() => console.log('new video summary created'))
        .catch((err) => console.log(err));
    // // ============ POST MATERIAL END ================


    res.send("okkk" + newVideoSummary);

    }

)

module.exports = router






// router.post("/testPost", async (req, res) => {
//     console.log(' I AM IN ');
//     const info = " infomation "
//     res.send("hello");
    
//   });





