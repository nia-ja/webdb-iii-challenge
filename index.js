const server = require('./server.js');

const PORT = process.env.PORT || 3300;

server.listen(PORT, function() {
  console.log(`Listening on port http://localhost:${PORT} `);
});