const mongoose = require("mongoose");
const uuid = require('uuid');
const fs = require('fs');
const axios = require('axios');
const ytdl = require('ytdl-core');

// Mongoose model
const videoSummary = require("../models/videoSummary");

// Constants
const mongodatabaseURL = "mongodb://localhost:27017/testerDB";
const baseUrl = 'https://api.assemblyai.com/v2';
const uploadUrl = 'https://api.assemblyai.com/v2/upload';
const transcriptUrl = 'https://api.assemblyai.com/v2/transcript';

// API Key
const headers = {
    authorization: 'be7c217f9fa74716bc17362e124f0df7'
  };


// Variable to be sent to Frontend with Database status
var databaseConnection = "Waiting for Database response...";


/* DEFAULT */
const landingFunction = async(req, res, next) => {
    try{
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

    } catch (err){
        res.send("error!")
    }
}


/* READ */
const getSummary = async(req, res, next) => {

    mongoose.connect(mongodatabaseURL, { useNewUrlParser: true})
    .then(() => {
        console.log("DATABASEE connected");
    })
    .catch((err) => {
        console.log(err);
    });

    // let query = {_id: ObjectId(req.params.id)};
    // let result = await collection.findOne(query);

    let transactionIDFound = req.params.id.slice(1) // Removing the first unecessary character to get the transaction Id
    let query = {
        transactionId: transactionIDFound
    }
    let result = await videoSummary.findOne(query);

    console.log(query);
    console.log(result);

    if (!result) res.send("Not found").status(404);
    else res.send(result.summary).status(200);


}


/* POST */
const postVideo = async(req, res, next) => {

    const youtubeURL = req.body.youtube_url;

    console.log(youtubeURL);


// Step 1: Convert youtube link into an audio file using 'ytdl'

        // Create a randome ID 
    const transactionId = uuid.v1();

        // With the youtube link and the youtube downloader, convert it into an audio file called: 'audio.mp4'
    downloadStream = ytdl(youtubeURL, {
        quality: '140',
    }).pipe(fs.createWriteStream('audio.mp4'))

    

// Step 2: Convert the audio file into a large piece of string data

    // function that first wait until the previous operation is completed
    downloadStream.on('finish', async() =>{

        // I have an async function that keeps running in the background while the bottom code is also running (very very bottom of the function)

        // Read the audio file that was downloaded previously into a long list of bytes
        const audioData = fs.readFileSync('audio.mp4');

        console.log(audioData);

// Step 3: Send the URL onto Assembly AI to receive a pollingEndpoint, this endpoint will help us achieve other functions with assembly AI
    
        // First, we need to wait for this function below to complete
            // This will POST our audio data onto the uploadUrl of assembly AI with our API key
            // The value it will return to the 'uploadResponse' will be a json object
        const uploadResponse = await axios.post(uploadUrl, audioData, {
            headers
        });

        // Now, I am extracting the URL for this audio file that is given by assembly AI
        // This will be the URL from which we will access other services from assembly AI
        const audioUrl = uploadResponse.data.upload_url;

        console.log(audioUrl);
    

// Step 4: Feed Assembly AI with our request

        // First, we define the type of data we are providing as well as the type of summary response we want to get back
        const data = {
            audio_url: audioUrl,
            summarization: true,
            summary_model: 'informative',
            summary_type: 'bullets'
        }

        // Now, we POST (WITH THE DATA DEFINED ABOVE) to Assembly AI in order to get a JSON object that contains the transcript of our audio file IN the format that we specified in 'data
        const response = await axios.post(transcriptUrl, data, {
            headers: headers // here, we are just giving our Assembly AI key
        })

        // Transcript ID will be the 'key' with which we can then put at the end of another URL to retrieve the final values from Assembly AI
        const transcriptId = response.data.id;

        // Remove the no longer needed audio file 
        await fs.unlink('audio.mp4', (err) => {

            if (err) throw err;

            console.log('path/file.txt was deleted');

        });

        console.log(transcriptId);

// Step 5: Getting our final response from Assembly AI

        // First, in order to get our final response from Assembly AI, we will need to know where to get it from this API
        // This will need to use the 'transcriptId' that was given in the previous step
        const pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${transcriptId}`;

        console.log(pollingEndpoint);

        // Now, I will keep on polling from Assembly AI UNTIL I get my response back!
        while(true){

            // Send a FETCH request to the polling endpoint to retrieve the status of the transcript
            const pollingResponse = await fetch(pollingEndpoint, { 
                headers 
            });
            const transcriptionResult = await pollingResponse.json();

            // If the transcription process is complete by Assembly AI, I will store that object into mongoDB
            if(transcriptionResult.status === "completed"){
                console.log(transcriptionResult);


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

                // Create new videoSummary object to be stored into database
                const newVideoSummary = new videoSummary({
                    transactionId: transactionId,
                    summary: transcriptionResult.summary
                });

                // We can only save a summary once we have created it!
                // Hence, we have an 'await' at the start here
                await newVideoSummary.save()
                .then(() => console.log('new Summary created'))
                .catch((err) => console.log(err));

                return;
            }else if(transcriptionResult.status === "error"){
                // If the transaction result ever fails, I will throw an error
                throw new Error(`Transcription failed: ${transcriptionResult.error}`);
            }else{

                // This will be the most probable case => TRANSACTION IS STILL IN PROGRESS
                // in this case, we will wait for a few seconds before attempting to poll again
                console.log("Transaction in progress");
                await new Promise((resolve) => setTimeout(resolve, 3000));

            }

        }

    })

    res.send(
        {
             responseTransactionId: transactionId
        }
        );

}


// Exporting the functions from controller to the router
module.exports = {landingFunction, getSummary, postVideo}


