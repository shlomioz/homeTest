const { client } = require('./redisConnection')();
const uniqid = require('uniqid');
const moment = require('moment');

//get an UTC ISOString as Time.
async function echoAtTime(time, message) {   
        if (!moment(time, moment.ISO_8601, true).isValid()) {
            throw new Error("echoAtTime got time no as ISO_8601");
        }
        if (!message || typeof (message) !== 'string') {
            throw new Error("echoAtTime didn't got message or message is not a string.");
        }
        const id = uniqid();
        const item = { id, message };
        const timeInNumbers = moment.utc(time).format('x');
        if (Number(timeInNumbers) <= Number(moment.utc().format('x'))) {
            await client.rpush(`queue`, JSON.stringify(item));
        } else {
            await client.ZADD('delayed:', Number(timeInNumbers), JSON.stringify(item));
        }
        
        return id;
}

module.exports = echoAtTime;