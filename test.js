const { client } = require('./src/redisConnection')();
let locks;


//Test for locks
client.on('ready', async  () => {
    locks = require('./locks/locks')(client);
    await func()
    console.log('done')
});

async function func() {
    let locked = await locks.aquireLock("test");
    console.log('locked: ', locked);
    locked = await locks.aquireLock("test");
    console.log('locked: ', locked);
    let del = await locks.releaseLock("test");
    console.log('del: ', del);
}