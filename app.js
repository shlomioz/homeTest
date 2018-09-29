const express = require("express");
const bodyParser = require("body-parser");
const asyncHandler = require('express-async-handler');
const echoAtTime = require('./src/echoAtTime');
const app = express();
app.use(bodyParser.json());

/**
 * should get time as UTC ISOString and message as string. 
 */
app.post('/echoAtTime', asyncHandler(async (req,res, next) => {
    const {time,message} = req.body;
    try{
        const id = await echoAtTime(time, message);
        res.status(200).send({ "status": "Success","item":{id,time,message}});
    }
    catch(err){
        console.log('err: ',err);
        res.status(400).send({"status":"Error","error":err});
    }
}));

module.exports = {app};