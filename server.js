const path = require('path');
const express = require('express');
const app = express();

// Serve static files
app.use(express.static(__dirname + '/dist/iframex'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/iframex/index.html'));
});

// default Heroku port
const PORT = process.env.PORT || 4200;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Iframex app is running on port ${ PORT }`);
});