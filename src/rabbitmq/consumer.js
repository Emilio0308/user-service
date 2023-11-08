const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (error0, connection) => {
  if (error0) throw error0;

  connection.createChannel((error1, channel) => {
    if (error1) throw error1;

    const queue = 'nombre_de_tu_cola';

    channel.assertQueue(queue, { durable: false });
    console.log("Esperando mensajes en la cola 'nombre_de_tu_cola'");

    channel.consume(
      queue,
      (msg) => {
        console.log('Mensaje recibido:', msg.content.toString());
        // Aquí puedes procesar la información recibida como desees
      },
      {
        noAck: true, // Confirmación automática de mensajes recibidos
      }
    );
  });
});
