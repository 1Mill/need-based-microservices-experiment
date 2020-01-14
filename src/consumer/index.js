const { Kafka } = require('kafkajs');

const kafka = new Kafka({
        brokers: [ 'http://rapids:9092' ],
        clientId: 'my-producer-app-name',
});

const producer = kafka.producer();

const run = async () => {
        // Producing
        await producer.connect()
        await producer.send({
                topic: 'test-topic',
                messages: [
                        { value: 'Hello KafkaJS user!' },
                ],
        });
}

run().catch(err => console.error(err));