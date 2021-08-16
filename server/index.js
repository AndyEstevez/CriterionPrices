const express = require('express')
const app = express()

const port = process.env.PORT || 5000;

const scraper = require('./webscraper')


app.get('/allTitles', async(req, res) => {
    const url = 'https://www.criterion.com/shop/browse/list?format=blu-ray&decade=2000s&country=United%20States'
    const scrapeData = await scraper.scrapeAllTitles(url);

    res.send(scrapeData);
})

app.listen(port, () => console.log(`Listening on port ${port}`))