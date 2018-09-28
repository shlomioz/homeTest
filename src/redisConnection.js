const redis = require('promise-redis')();
let client = null;

//TODO: need to create connection to redis here and export.
function init(){
    if(!client){
        client = redis.createClient();       
        client.on('ready', function () {
            console.log('Redis Is Connected.');
        })      
    }

    return {client}
}

module.exports = init;