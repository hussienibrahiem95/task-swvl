const express = require('express');
require('dotenv').config();

const NotficationRouter = require('./routes/notifications.routes');

const port = process.env.PORT || 3000;

const app = express()


app.use("/notifications",NotficationRouter);
app.listen(port, () => { console.log('server is listen on port ' + port); });

module.exports = app
