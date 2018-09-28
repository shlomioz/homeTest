


function locks(connection) {
    return { aquireLock, releaseLock };

    async function aquireLock(id) {
        return await connection.setnx(id, "lock");
    }

    async function releaseLock(id) {
        return await connection.del(id);
    }
}

module.exports = locks;