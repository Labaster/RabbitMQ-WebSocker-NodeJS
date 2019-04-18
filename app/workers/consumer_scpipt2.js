const { connect, createChannel, channelAssertQueue,
     closeConnection, consume } = require ('./amqplibHelper.js');

const consumeConn = async (queueName = "Queue") => {
    const options = {durable: false};
    const conn = await connect();
    const channel = await createChannel(conn);
    await channelAssertQueue(channel, queueName, options);
    await consume(channel, queueName);

    setTimeout(() => {
        closeConnection(conn);
    }, 1000);
};

// consumeConn();

module.exports = { consumeConn };
