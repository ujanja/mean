// config should be imported before importing any other file
const config = require('./config/config');
const app = require('./config/express');
require('./config/mongoose');

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  app.listen(config.port/*'80','192.168.1.5'*/, () => {
    console.info(`server started on port ${config.port} (${config.env})`);
  });
}

module.exports = app;
