const assert = require('assert');
const {client} = require('../functions/redisConnection')();
const locks = require('./locks')(client);

describe('Locks Test',()=>{
    it('Lock key "test"',()=>{
        let locked = await locks.aquireLock("test");
        assert.equal(locked,1);
    })

    it('give locked on "test"', () => {
        let locked = await locks.aquireLock("test");
        assert.equal(locked, 0);
    })
})
