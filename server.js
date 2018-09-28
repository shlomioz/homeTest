const {app} = require("./app");
const {client} = require("./functions/redisConnection")();
const delayedZsetHandler = require('./functions/delayedZsetHandler');
const queueHandler = require('./functions/queueHandler');
const defaultPort = 1234;
const port = process.env.PORT_ENV || defaultPort;

app.listen(port, () => {
    console.log(`Server Is Running On Port ${port}`);
    client.on('ready',()=>{
        delayedZsetHandler();
        queueHandler();
    })
});
