const sleep = require('system-sleep');
const {client} = require('./redisConnection')();
const locks = require('../locks/locks')(client);
const moment = require('moment');

async function delayedZsetHandler(){
    let item;
    while(true){
        time = await client.zrange('delayed:', 0, 0,'withscores');
        if (!item || item.length === 0 || item[1] > Number(moment.utc().format('x'))){
            await sleep(10);
            continue;
        }
        item = item[0];
        item = JSON.parse(item);
        const {id,message} = item;
        let locked = await locks.aquireLock(id);
        if(!locked){
            continue;
        }
        if(await client.zrem('delayed:',JSON.stringify(item))){
            await client.rpush('queue', JSON.stringify(item));
        }
        await locks.releaseLock(id);
    }
}


module.exports = delayedZsetHandler;