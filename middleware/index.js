// Cache middleware
const redis = require('redis');
const client = redis.createClient();
// FOR ASYNC FUNC
// const { promisify } = require('util');
// const getAsync = promisify(client.get).bind(client);
// await client.hgetall('sports', function(err, reply) {
//   if (err) console.log(err);
//   obj = JSON.parse(reply.mlb);
//   console.log(obj);
// });

module.exports = function cache(req, res, next) {
  const sportType = req.url === '/nba' ? 'nba' : 'mlb';

  client.hget('sports', sportType, (err, data) => {
    if (err) throw err;
    if (data !== null) {
      console.log(`cache is sending ${sportType}`);
      res.send(data);
    } else {
      next();
    }
  });
};
