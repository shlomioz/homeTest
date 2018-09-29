const redis = require('promise-redis')();
let client = null;

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