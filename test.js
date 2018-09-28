const { client } = require('./functions/redisConnection')();
let locks;
client.on('connect', async function () {
    locks = require('./locks/locks')(client);
    await func()
    console.log('done')
})
// func()
//     .then(()=>console.log("done!"));

async function func() {
    let locked = await locks.aquireLock("test");
    console.log('locked: ', locked);
    locked = await locks.aquireLock("test");
    console.log('locked: ', locked);
    let del = await locks.releaseLock("test");
    console.log('del: ', del);
}