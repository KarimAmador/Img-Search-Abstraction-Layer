const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectDB = require('./db/connect.js');
const apiRoutes = require('./routes/api.js');
require('dotenv').config();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/views/index.html');
});

apiRoutes(app);

app.use(function(req, res, next) {
    res.status(404)
      .type('text')
      .send('Not Found');
});

const start = async () => {
    try {
        await connectDB();

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Listening on port ${port}.`);
        });
    } catch (err) {
        console.log(err);
    }
}

start();
