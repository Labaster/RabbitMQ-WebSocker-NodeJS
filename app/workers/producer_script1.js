const faker = require('faker');
const { connect, createChannel, channelAssertQueue,
    sendToQueue, closeConnection } = require ('./amqplibHelper.js');

const prodConn = async (queueName = "Queue") => {
    const messages = {};
    const options = {durable: false};
    for(let i =1; i <= 10; i++) {
        messages["msg"+i] = faker.lorem.sentences();
    }

    const conn = await connect();
    const channel = await createChannel(conn);
    await channelAssertQueue(channel, queueName, options);
    const send = await Object.values(messages).map(  msg => {
         return  sendToQueue(channel, queueName,  Buffer.from(msg));
    });

    setTimeout(() => {
        closeConnection(conn);
    }, 500);
};

// prodConn();

module.exports = { prodConn };
