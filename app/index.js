const Koa = require('koa');
const serve = require('koa-static');
const WebSocket = require('ws');
const app = new Koa();

const wss = new WebSocket.Server({port: 3001});
let messages = [];

wss.on('connection', ws => {
    ws.on('message', message => {
        messages.push(message);
    });
    messages.map((msg, key) => {
        ws.send(`${key+1}:${msg}`);
    });

});

app.use(serve(__dirname +'/client'));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
