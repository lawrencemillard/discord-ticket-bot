const { MongoClient } = require('mongodb');
const cache = require('./cache');

const uri = 'YOUR_MONGODB_URI';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db('ticketBot');
}

async function getTicket(ticketId) {
  const cachedTicket = cache.get(ticketId);
  if (cachedTicket) {
    return cachedTicket;
  }

  const db = await connect();
  const ticket = await db.collection('tickets').findOne({ ticketId });
  cache.set(ticketId, ticket);
  return ticket;
}

async function createTicket(ticket) {
  const db = await connect();
  const result = await db.collection('tickets').insertOne(ticket);
  cache.set(ticket.ticketId, ticket);
  return result;
}

async function updateTicket(ticketId, update) {
  const db = await connect();
  const result = await db.collection('tickets').updateOne({ ticketId }, { $set: update });
  const updatedTicket = await db.collection('tickets').findOne({ ticketId });
  cache.set(ticketId, updatedTicket);
  return result;
}

async function deleteTicket(ticketId) {
  const db = await connect();
  const result = await db.collection('tickets').deleteOne({ ticketId });
  cache.del(ticketId);
  return result;
}

module.exports = {
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};
