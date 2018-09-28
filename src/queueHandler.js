const { client } = require('./redisConnection')();
const sleep = require('system-sleep');

async function queueHandler() {
    let item;
    while (true) {
        await sleep(10);
        item = await client.lpop("queue");
        if(!item){continue;}
        item = JSON.parse(item)
        const {message} = item;
        console.log(message);
    }
}

module.exports = queueHandler;