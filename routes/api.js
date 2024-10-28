const Query = require('../models/query.js');
const cse = 'https://customsearch.googleapis.com/customsearch/v1';

module.exports = function(app) {
    app.get('/query/:search', async (req, res) => {
        try {
            const search = encodeURI(req.params.search);
            const page = (Number(req.query.page) * 10) + 1;
            const size = req.query.size ? '&imgSize=' + req.query.size : '';

            const results = await fetch(`${cse}?cx=${process.env.CX}&key=${process.env.API_KEY}&searchType=image&q=${search}&start=${page}${size}`)
                                .then(res => res.json());
    
            if (results.searchInformation?.totalResults == 0) {
                return res.type('text').send(`No results for '${req.params.search}'`);
            }
        
            if (results.error) {
                return res.status(400).json(results.error);
            }
            
            const query = new Query({ searchQuery: req.params.search });
            await query.save();
    
            res.json(results.items);
        } catch (err) {
            return res.json(err);
        }
    });
    
    app.get('/recent', async (req, res) => {
        try {
            const recent = await Query.find({}).select({ __v: 0 }).exec();
            res.json(recent);
        } catch (err) {
            console.log(err);
        }
    });
}