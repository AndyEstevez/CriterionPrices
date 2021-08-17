const express = require('express')
const app = express()

const port = process.env.PORT || 5000;

const scraper = require('./webscraper')
const db = require('./db');


// get all the Criterion titles from database
app.get('/allTitles', async(req, res) => {
    const connection = await db.getConnection();
    const scrapeData = await db.getAllTitles(connection);
    res.send(scrapeData);
})

// update database for new entries to Criterion or missing titles not entried
app.post('/updateTitles', async(req, res) => {
    const connection = await db.getConnection();
    const url = 'https://www.criterion.com/shop/browse/list?format=blu-ray&sort=spine_number'
    const scrapeData = await scraper.checkLastEntries(url);
    const updatedTitles = await db.updateTitles(scrapeData, connection);
    res.send(updatedTitles)
})

// add titles to database
app.post('/allTitles', async(req, res) => {

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

app.listen(port, () => console.log(`Listening on port ${port}`))