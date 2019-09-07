const fetch = require('node-fetch');

const client = require('redis').createClient(process.env.REDIS_URL || 6379);

// const { promisify } = require('util');
//const getAsync = promisify(client.get).bind(client);
// await client.hgetall('sports', function(err, reply) {
//   if (err) console.log(err);
//   obj = JSON.parse(reply.mlb);
//   console.log(obj);
// });

client.on('error', function(err) {
  console.log('Error ' + err);
});

async function getMLBInialData() {
  try {
    const mlbResponse = await fetch(
      'https://chumley.barstoolsports.com/dev/data/games/eed38457-db28-4658-ae4f-4d4d38e9e212.json'
    );
    const data = await mlbResponse.json();
    dataString = JSON.stringify(data);
    client.hset('sports', 'mlb', dataString, function(err) {
      if (err) console.log(err);
      console.log(`API for MLB stored in cache at ${Date.now()}`);
    });
  } catch (err) {
    console.log(err);
  }
}
async function getNBAInialData() {
  try {
    const nbaResponse = await fetch(
      'https://chumley.barstoolsports.com/dev/data/games/6c974274-4bfc-4af8-a9c4-8b926637ba74.json'
    );
    const data = await nbaResponse.json();
    dataString = JSON.stringify(data);
    client.hset('sports', 'nba', dataString, function(err) {
      if (err) console.log(err);
      console.log(`API for NBA stored in cache at ${Date.now()}`);
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = function fetchData() {
  console.log('fetching data ...');
  getMLBInialData();
  getNBAInialData();
};
