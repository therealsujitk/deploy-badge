const app = require('../app');
const http = require('http').createServer(app);
const port = process.env.PORT || 3000;

/*
    Starting the listener
 */
http.listen(port, () => {
    console.log('listening on *:' + port);
});
