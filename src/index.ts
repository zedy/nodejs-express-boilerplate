// libs
import WebSocket from 'ws';
import http from 'http';
import 'dotenv/config';

// models
import createServer from './server';

// Initialize Express
const app = createServer();

// PORT
const PORT = process.env.PORT || 5000;

// Start WebSocket
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: '/socket' });

function heartbeat() {
  this.isAlive = true;
}

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', heartbeat);
});

const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) return ws.terminate();

    ws.isAlive = false;
    ws.ping();
    ws.send(JSON.stringify({ type: 'pong' }));
  });
}, 5000);

wss.on('close', () => {
  clearInterval(interval);
});

// Start the server
server.listen(PORT, () => console.log(`Server started and listening on ${PORT}`));

export default wss;
