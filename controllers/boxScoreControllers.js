const fetch = require('node-fetch');
const redis = require('redis');
const client = redis.createClient();
const expireAt = 15;
module.exports = {
  getNba: async function getRepos(req, res, next) {
    try {
      console.log('Fetching NBA Data...');
      const response = await fetch(
        'https://chumley.barstoolsports.com/dev/data/games/6c974274-4bfc-4af8-a9c4-8b926637ba74.json'
      );
      const data = await response.json();
      // Set data to Redis
      client.hset('sports', 'nba', JSON.stringify(data), function(err) {
        if (err) console.log(err);
        console.log(
          `API data for NBA is now stored in cache. \n time : ${Date.now()}`
        );
      });
      client.expire('sports', expireAt, function(err) {
        if (err) console.log(err);
        console.log(`cache will expire in ${expireAt} seconds`);
      });

      res.send(data);
    } catch (err) {
      console.error(err);
      res.status(500);
    }
  },
  getMlb: async function getRepos(req, res, next) {
    try {
      console.log('Fetching MLB Data...');
      const response = await fetch(
        'https://chumley.barstoolsports.com/dev/data/games/eed38457-db28-4658-ae4f-4d4d38e9e212.json'
      );
      const data = await response.json();
      // Set data to Redis
      client.hset('sports', 'mlb', JSON.stringify(data), function(err) {
        if (err) console.log(err);
        console.log(
          `API data for MLB is now stored in cache. \n time : ${Date.now()}`
        );
      });
      client.expire('sports', expireAt, function(err) {
        if (err) console.log(err);
        console.log(`cache will expire in ${expireAt} seconds`);
      });
      res.send(data);
    } catch (err) {
      console.error(err);
      res.status(500);
    }
  }
};
