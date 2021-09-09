const typeorm = require('typeorm')

const EntitySchema = require('typeorm').EntitySchema;

class Title {
    constructor(id, spineNumber, image, title, director, country, year, price, link) {
        this.id = id
        this.spineNumber = spineNumber
        this.image = image
        this.title = title
        this.director = director
        this.country = country
        this.year = year
        this.price = price
        this.link = link
    }
}

const TitleSchema = new EntitySchema({
    name: "Title",
    target: Title,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        spineNumber: {
            type: "text",
            nullable: true
        },
        image: {
            type: "text"
        },
        title: {
            type: "text",
        },
        director: {
            type: "text",
            nullable: true
        },
        country: {
            type: "text",
            nullable: true
        },
        year: {
            type: "text",
            nullable: true
        },
        price: {
            type: "text"
        }, 
        link: {
            type: "text"
        }
    }
})

class NewTitle {
    constructor(id, image, title, director, price, date, link) {
        this.id = id;
        this.image = image;
        this.title = title;
        this.director = director;
        this.price = price;
        this.date = date;
        this.link = link;
    }
}

const PreorderSchema = new EntitySchema({
    name: 'Preorder',
    target: NewTitle,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        image: {
            type: 'text'
        },
        title: {
            type: 'text'
        },
        director: {
            type: 'text'
        },
        price: {
            type: 'text'
        },
        date: {
            type: 'text'
        },
        link: {
            type: 'text'
        }
    }
})

class NewRelease {
    constructor(id, image, title, director, price, date, link) {
        this.id = id;
        this.image = image;
        this.title = title;
        this.director = director;
        this.price = price;
        this.date = date;
        this.link = link;
    }
}

const NewReleaseSchema = new EntitySchema({
    name: 'NewRelease',
    target: NewRelease,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        image: {
            type: 'text'
        },
        title: {
            type: 'text'
        },
        director: {
            type: 'text'
        },
        price: {
            type: 'text'
        },
        date: {
            type: 'text'
        },
        link: {
            type: 'text'
        }
    }
})

async function getConnection() {
    return await typeorm.createConnection({
        type: "mysql",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT, 
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        synchronize: true,
        logging: false,
        entities: [
            TitleSchema, PreorderSchema, NewReleaseSchema
        ]
    })
}
/* Functions for New Release table */
// update entries and insert to table
async function updateNewReleases(data, connection){
    const releaseRepo = await connection.getRepository(NewRelease)
    await releaseRepo.clear();

    for(let d of data){
        // create
        const title = new NewRelease()
        title.image = d.img
        title.title = d.title
        title.director = d.director
        title.price = d.price
        title.date = d.date
        title.link = d.link

        // save
        await releaseRepo.save(title);        
    }

    // return all items in table
    const allTitles = await releaseRepo.find();
    connection.close();
    return allTitles;
}

// initialize entries to table
async function getNewReleases(connection){
    const releaseRepo = await connection.getRepository(NewRelease)

    // return all items in table
    const allTitles = await releaseRepo.find();
    connection.close();
    return allTitles;
}

/* Functions for Preorder table */
// delete all entries and insert to table
async function updatePreorders(data, connection){
    const preorderRepo = await connection.getRepository(NewTitle)
    await preorderRepo.clear();

    for(let d of data){
        // create
        const title = new NewTitle()
        title.image = d.img
        title.title = d.title
        title.director = d.director
        title.price = d.price
        title.date = d.date
        title.link = d.link

        // save
        await preorderRepo.save(title);        
    }

    // return all items in table
    const allTitles = await preorderRepo.find();
    connection.close();
    return allTitles;
}
async function getPreorders(connection){
    const preorderRepo = await connection.getRepository(NewTitle)

    // return all items in table
    const allTitles = await preorderRepo.find();
    connection.close();
    return allTitles;
}
/* Functions for Title table */
// return all titles 
async function getAllTitles(connection) {
    const titleRepo = await connection.getRepository(Title)
    // sorts the table by length of spine number: therefore empty spine # goes first, then spine #'s go next
    const titles = await titleRepo.createQueryBuilder('title').orderBy('LENGTH(title.spineNumber)', 'ASC').getMany();
    
    connection.close();
    return titles;
}

// update in case of missing titles in database
async function updateTitles(data, connection) {
    const titleRepo = connection.getRepository(Title);
    let tempObject;
    for(let i = 0; i < data.length; i++){
        tempObject = await titleRepo.find({where: {title: data[i].title}})
        if(tempObject.length == 0){
            const title = new Title()
            title.spineNumber = data[i].spineNumber
            title.image = data[i].img
            title.title = data[i].title
            title.director = data[i].director
            title.country = data[i].country
            title.year = data[i].year
            title.price = data[i].price
            title.link = data[i].link
            console.log(title)
            
            // save
            await titleRepo.save(title);      
        }
    }

    // sorts the table by length of spine number: 
    // therefore empty spine # goes first, then spine #'s go next
    // needed for inserting new titles that do & don't have spine # 
    const titles = await titleRepo.createQueryBuilder('title').orderBy('LENGTH(title.spineNumber)', 'ASC').getMany();
    connection.close();
    return titles;
}

// insert titles 
async function insertTitles(data, connection) {
    console.log("INSERT DATABASE FUNCTION")
    
    for(let d of data){
        // create
        const title = new Title()
        title.spineNumber = d.spineNumber
        title.image = d.img
        title.title = d.title
        title.director = d.director
        title.country = d.country
        title.year = d.year
        title.price = d.price
        title.link = d.link
        console.log(title)
        // save
        const titleRepo = connection.getRepository(Title);
        const res = await titleRepo.save(title);        
    }

    // return all items in table
    const titleRepo = connection.getRepository(Title);
    const allTitles = await titleRepo.find();
    connection.close();
    return allTitles;
}

module.exports = {
    getAllTitles, insertTitles, updateTitles, updateNewReleases, updatePreorders, getNewReleases, getPreorders, getConnection
}