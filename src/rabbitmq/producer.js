const amqp = require('amqplib/callback_api');

function sendToRabbitMQ(queue, message, method) {
  const amqpUrl = process.env.AMQPURL

  amqp.connect(amqpUrl, (error0, connection) => {
    if (error0) throw error0;

    connection.createChannel((error1, channel) => {
      if (error1) throw error1;

      channel.assertQueue(queue, { durable: false });
      const properties = { contentType: method };

      channel.sendToQueue(queue, Buffer.from(message), properties);
      console.log('Mensaje enviado:', message);
    });

    setTimeout(() => {
      connection.close();
    }, 500);
  });
}

module.exports = { sendToRabbitMQ };
