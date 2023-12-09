import app from '../app';
import http from 'http';

const httpServer = http.createServer(app);
const port = process.env.PORT || 3000;

/*
  Starting the listener
 */
httpServer.listen(port, () => {
  console.log('listening on *:' + port);
});