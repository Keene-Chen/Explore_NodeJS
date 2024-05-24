import { MongoClient } from 'mongodb';

// Connection URL
const url: string = 'mongodb://127.0.0.1:27017';
const client: MongoClient = new MongoClient(url);

// Database Name
const dbName: string = 'test';

client.connect();
console.log('Connected successfully to server');

const db = client.db(dbName);
const coll = db.collection('documents');

export { client, coll };
