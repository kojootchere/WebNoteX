// Include the Express.js module for web server functionality
const express = require('express');
// Include the 'path' module for working with file and directory paths
const path = require('path');

// Create an instance of an Express application
const app = express();
// Define the port the server will listen on; default to 3000 if not specified in the environment
const PORT = process.env.PORT || 3000;

// Serve static files from the 'dist' directory of the 'client' folder
app.use(express.static(path.join(__dirname, '../client/dist')));
// Middleware to parse URL-encoded data with the querystring library when true
app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON data
app.use(express.json());

// Include external route definitions and pass the Express app to it for setup
require('./routes/htmlRoutes')(app);

// Start the server and listen on the defined PORT, log to console when successful
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
