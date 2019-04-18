const amqp = require('amqplib');
const WebSocket = require('ws');

const connect = (url = 'amqp://localhost') => {
    return new Promise((resolve, reject) => {
        amqp.connect(url)
            .then(conn => resolve(conn))
            .catch(err => reject(err))
    })
};

const createChannel = conn => {
    return new Promise((resolve, reject) => {
        conn.createChannel()
            .then(channel => resolve(channel))
            .catch(err => reject(err))
    })
};

const channelAssertQueue = (channel, queueName, options) => {
    return new Promise((resolve, reject) => {
        channel.assertQueue(queueName, options)
            .then(asserted => resolve(channel))
            .catch(err => reject(err))
    })
};

const sendToQueue = (channel, queueName, buffer) => {
    channel.sendToQueue(queueName, buffer)
};

const consume = (channel, queueName) => {
    channel.consume(queueName, function(msg) {
        sendThruSocket(msg.content.toString());
    }, {noAck: false});
};

const closeConnection = (conn) => {
    conn.close();
    process.exit(0);
};

const sendThruSocket = (msg) => {
    const ws = new WebSocket("ws://localhost:3001");
    ws.on('open', () => {
        ws.send(msg);
    });
};

module.exports = { connect, createChannel, channelAssertQueue,
    sendToQueue, closeConnection, consume };
