const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const http = require('http');
const server = http.Server(app);
const { setupWebsocket } = require('./websocket');

setupWebsocket(server);

mongoose.connect(
    'mongodb://localhost:27017/omnistack',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);