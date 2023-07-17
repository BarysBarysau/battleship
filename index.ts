import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import router from './src/http_server/routes/index';
import { WebSocketServer, WebSocket } from 'ws';

const ws1 = new WebSocket(`ws://localhost:8181/`);
const ws2 = new WebSocket(`ws://localhost:8181/`);

const httpServer = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    router(req, res);
  } else {
    const __dirname: string = path.resolve(path.dirname(''));
    const file_path =
      __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
    fs.readFile(file_path, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  }
});
const wss = new WebSocketServer({ noServer: true });

ws1.addEventListener('open', (event) => {
  ws1.send('Hello Server!');
});

ws2.addEventListener('open', (event) => {
  ws2.send('Hello Server!');
});

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data: Buffer) {
    console.log(data.toString('utf8'));
  });
});

httpServer.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, function done(ws: any) {
    wss.emit('connection', ws, request);
  });
});

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);

httpServer.listen(HTTP_PORT);
