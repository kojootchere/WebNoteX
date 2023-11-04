// Import the 'path' module which provides utilities for working with file and directory paths
const path = require('path');

// Export a function that takes an Express app object and sets up a route
module.exports = (app) => {
  // Define a GET route for the root ('/') URL
  app.get('/', (req, res) => {
    // Respond to the request by sending the 'index.html' file to the client
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
};
