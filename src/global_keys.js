// global_keys.js

const path = require('path');
const { app } = require('electron');

// Define global keys and paths
const GlobalKeys = {
  savedDataPath: path.join(app.getPath('userData'), 'saved_data'),
  nameJsonPath: path.join(app.getPath('userData'), 'saved_data', 'name.json'),

};

// Export the global keys object
module.exports = GlobalKeys;
