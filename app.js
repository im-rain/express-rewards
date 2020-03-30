var express = require('express');
//main router
var router = require('./src/api/controller');
//constants
var constants = require('./src/api/utilities/constants');

const PORT = process.env.PORT || constants.SERVER_PORT;

var app = express();
app.use(router);
app.listen(PORT, ()=> console.log(`Server is started using port ${PORT}.`))

module.exports = app;
