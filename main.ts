import express from 'express';
import Websocket from 'ws';
import * as http from 'http';

const main = async () => {
    const app = express();
    const server = http.createServer(app);
    app.use(express.json());
    const port = 4000;

    const wss = new Websocket.Server({ server: server })

    wss.on('connection', (ws: Websocket) => {
        console.log('Client connected');

        ws.on('message', (message: string) => {
            console.log('Server received message:', message.toString());
        })

        ws.on('close', () => {
            console.log('Client disconnected');
        })
    })
    server.listen(port, ()=> {
        console.log('App listening on port: ',port)
    })
}

main().catch(err => {
    console.log(err)
})