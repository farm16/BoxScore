// Cache middleware
const client = require('redis').createClient(
  process.env.REDISCLOUD_URL || 6379
);

module.exports = function cache(req, res, next) {
  const sportType = req.url === '/nba' ? 'nba' : 'mlb';

  client.hget('sports', sportType, (err, data) => {
    if (err) throw err;
    if (data !== null) {
      console.log(`cache is sending ${sportType}`);
      res.send(JSON.parse(data));
    } else {
      next();
    }
  });
};
