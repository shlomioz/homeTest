const {app} = require("./app");
const {client} = require("./src/redisConnection")();
const delayedZsetHandler = require('./src/delayedZsetHandler');
const queueHandler = require('./src/queueHandler');
const defaultPort = 1234;
const port = process.env.PORT_ENV || defaultPort;

app.listen(port, () => {
    console.log(`Server Is Running On Port ${port}`);
    client.on('ready',()=>{
        delayedZsetHandler();
        queueHandler();
    })
});
