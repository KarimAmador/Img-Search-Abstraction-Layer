const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

const cse = 'https://customsearch.googleapis.com/customsearch/v1';

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

app.get('/query/:search', async (req, res) => {
    console.log(req.params);
    console.log(req.query);
    
    try {
        const results = await fetch(`${cse}?cx=${process.env.CX}&q=${encodeURI(req.params.search)}&start=${(Number(req.query.page) * 10) + 1}${req.query.size ? '&imgSize=' + req.query.size : ''}&searchType=image&key=${process.env.API_KEY}`)
                            .then(res => res.json());

        if (results.searchInformation?.totalResults == 0) {
            return res.type('text').send(`No results for '${req.params.search}'`);
        }
    
        if (results.error) {
            return res.status(400).json(results.error);
        }
        
        res.json(results.items);
    } catch (err) {
        return res.json(err);
    }
});

app.use(function(req, res, next) {
    res.status(404)
      .type('text')
      .send('Not Found');
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT || 3000}.`);
});
