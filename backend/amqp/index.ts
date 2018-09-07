import amqp from "amqplib/callback_api";

class RabbitMQ {
    connection: any;

    createConnection() {
        amqp.connect(
            "amqp://root:root@localhost:5672",
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
}

export default new RabbitMQ();
