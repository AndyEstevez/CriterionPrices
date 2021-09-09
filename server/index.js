const express = require('express')
const cors  = require('cors')
const scraper = require('./webscraper')
const db = require('./db');
require('dotenv').config();

const app = express()
app.use(cors());

// get Criterion.com front page info
app.get('/api/getInfo', async(req, res) => {
    const url = 'https://www.criterion.com/'
    const scrapeData = await scraper.scrapeFrontPage(url);
    res.send(scrapeData)
})

// get Criterion new release titles from database
app.get('/api/getNewReleases', async(req, res) => {
    const connection = await db.getConnection();
    const newReleases = await db.getNewReleases(connection);
    res.send(newReleases)
})

// update Criterion new release titles from database
app.post('/api/updateNewReleases', async (req, res) => {
    const connection = await db.getConnection();
    const url = 'https://www.criterion.com/shop/browse?popular=new-releases&direction=asc';
    const scrapeData = await scraper.scrapePreorderOrNewReleases(url);
    const newReleases = await db.updateNewReleases(scrapeData, connection);
    res.send(newReleases)
})

// get Criterion pre order titles from database
app.get('/api/getPreorders', async(req, res) => {
    const connection = await db.getConnection();
    const preorders = await db.getPreorders(connection);
    res.send(preorders)
})

// update Criterion preorder titles from database
app.post('/api/updatePreorders', async(req, res) => {
    const connection = await db.getConnection();
    const url = 'https://www.criterion.com/shop/browse?popular=coming-soon&direction=asc';
    const scrapeData = await scraper.scrapePreorderOrNewReleases(url);
    const preorderTitles = await db.updatePreorders(scrapeData, connection);
    res.send(preorderTitles)
})

// get all the Criterion titles from database
app.get('/api/allTitles', async(req, res) => {
    const connection = await db.getConnection();
    const scrapeData = await db.getAllTitles(connection);
    res.send(scrapeData);
})

// update database for new entries to Criterion or missing titles not entried
app.post('/api/updateTitles', async(req, res) => {
    const connection = await db.getConnection();
    const url = 'https://www.criterion.com/shop/browse/list?popular=coming-soon&direction=asc'
    const scrapeData = await scraper.scrapeAllTitles(url);
    const updatedTitles = await db.updateTitles(scrapeData, connection);
    res.send(updatedTitles)
})

// add titles to database
app.post('/api/allTitles', async(req, res) => {

    try {
        const connection = await db.getConnection();
        const object = JSON.parse(JSON.stringify(await connection.query(`SELECT 1 FROM title LIMIT 1`)))
        if(object.length == 0){
            console.log("NOT CONNECTED")
            const url = 'https://www.criterion.com/shop/browse/list?format=blu-ray&sort=spine_number'
            console.log("IN TRY SECTION")
            const getData =  await scraper.scrapeAllTitles(url); 
            
            const titles = await db.insertTitles(getData, connection)
            res.send(titles)
        }  
        else{
            console.log("IN ELSE STATEMENT")
            const scrapeData = await db.getAllTitles(connection);
            res.send(scrapeData)
        } 
    } catch(err) {
        console.log(err)
    }

})

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`))