import amqp from "amqplib/callback_api";

class RabbitMQ {
    connection: any;

    createConnection() {
        amqp.connect(
            "" + process.env.AMQP_HOST,
            (err, conn) => {
                this.connection = conn;
            }
        );
    }

    sendMessage(queue: string, msg: string) {
        this.connection.createChannel((err: any, ch: any) => {
            ch.assertQueue(queue, { durable: false });
            ch.sendToQueue(queue, Buffer.from(msg));
            ch.close();
        });
    }

    sendMessageAdv(msg: string, exchange: string, routingKey: string) {
        this.connection.createChannel((err: any, ch: any) => {
            ch.assertExchange(exchange, 'topic')
            ch.publish(exchange, routingKey, Buffer.from(msg))
            ch.close()
        });
    }
}

export default new RabbitMQ();
