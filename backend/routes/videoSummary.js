const express = require("express");

const {landingFunction, getSummary, postVideo} = require("../controllers/videoSummary");

// import {
//     landingFunction,
//     getSummary,
//     postVideo,
//   } from "../controllers/videoSummary";

  
const router = express.Router();
  
/* READ */
router.get("/", landingFunction);
router.get("/getSummary/:id", getSummary);
  
/* POST */
router.post("/postVideo", postVideo);


module.exports = router
