const puppeteer = require('puppeteer');

async function scrapeAllTitles(url) {
    // start browser and create 2 pages
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(url);
    const page2 = await browser.newPage();

    const title_details = await page.evaluate(() => {
        // get the table
        let table = document.querySelector('#gridview > tbody')
        let panels = Array.from(table.children);

        // iterates through each table row for Criterion title
        // gets all basic info for each title
        let title_info = panels.map(panel => {
            let spineNumber = panel.querySelector('.g-spine').innerText;
            let img = panel.querySelector('.g-img').querySelector('img').src;
            let title = panel.querySelector('.g-title').innerText;
            let director = panel.querySelector('.g-director').innerText;
            let country = panel.querySelector('.g-country').innerText;
            let year = panel.querySelector('.g-year').innerText;
            let link = panel.getAttribute('data-href');

            return { spineNumber, img, title, director, country, year, link };
        })

        return title_info;

    })

    // iterate through each link from the array 
    // because don't have price on all collection page on criterion.com
    let price2 = 0;
    for(let i = 0; i < title_details.length; i++){
        let link2 = title_details[i].link
        await page2.goto(link2)
        price2 = await page2.$eval('body > div.page-contain > main > article.product__details > div.content-container.product-primary-content-container > div > div.right > div > div > section.purchase-options.pk-c-purchase-options > form > fieldset.purchase-buttons > div:nth-child(1) > label > span.meta-prices > span.item-price', 
                                        el => el.innerText)
        title_details[i]['price'] = price2
    }

    await page2.close();
    await page.close();

    // console.log(title_details)

    return title_details;
}

async function scrapePreorderOrNewReleases(url){
    try {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        const page2 = await browser.newPage();
        await page.goto(url);
        
        const filmWraps = await page.$$('.filmWrap')
        const films = [];
        for(const ele of filmWraps) {
            const date = await ele.$eval('dt', dt => dt.innerText)
            const title = await ele.$eval('figure > img', figure => figure.getAttribute('alt'))
            const director = await ele.$eval('dd', dd => dd.innerText)
            const img = await ele.$eval('img', img => img.getAttribute('src'))
            const link = await ele.$eval('a', a => a.getAttribute('href'))
            
            films.push({date, title, director, img, link});
        }

        for(let film of films) {
            let link = film.link
            await page2.goto(link)
            const price = await page2.$eval('body > div.page-contain > main > article > div.content-container.product-primary-content-container > div > div.right > div > div > section.purchase-options.pk-c-purchase-options > form > fieldset.purchase-buttons > div:nth-child(1) > label > span.meta-prices > span.item-price', 
                                            el => el.innerText)
            film['price'] = price
        }

        await page2.close();        
        await page.close();
        return films
    } catch (err) {
        console.log("Error: ", err);
    }
}

async function scrapeFrontPage(url) {
    try {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.goto(url);
        
        const buttonText = await page.$eval('.button__secondary', el => el.textContent) 
        const hrefs = await Promise.all((await page.$x('/html/body/div[2]/main/div/article[1]/a')).map(async item => await (await item.getProperty('href')).jsonValue()))

        // case 1: grab element by <div> class name = 'header', then grab <p> and <h1> innerText
        const pLabel = await page.$eval('.label', el => el.innerText)
        const header = await page.evaluate(() => {
            let h1 = document.querySelector('h1').innerText
            return h1
        })
        // case 2: grab element by <div> class name = 'image', then grab <img> src
        const image = await page.$eval('.image', el => el.querySelector('img').src)

        // use if statement to check length of h1 in article 1 to see if it exists
        // if it does exist then use case 1
        // else use case 2
        const h1 = await page.$x('/html/body/div[2]/main/div/article[1]/a/div/div[1]/h1')
        const [backgroundImage] = await page.$x('/html/body/div[2]/main/div/article[1]')
        const banner = await page.evaluate(url => url.getAttribute('data-mobile-background-image'), backgroundImage)

        await page.close();
        browser.close();
        if(h1.length > 0) {
            const imageUrl = await page.evaluate(() => document
                                    .querySelector('body > div.page-contain > main > div > article.home-article.home-article-type-default.in.is-in')
                                    .getAttribute('data-mobile-background-image'))
            return { pLabel, header, imageUrl, buttonText, hrefs }
        }
        else {
            return { image, banner, buttonText, hrefs }
        }
        
    } catch (err) {
        console.log("Error: ", err);
    }
}

// using temp url for testing
// scrapePage('https://www.criterion.com/shop/browse/list?format=blu-ray&decade=2000s&country=United%20States')

module.exports = {
    scrapeAllTitles, 
    scrapePreorderOrNewReleases,
    scrapeFrontPage
}