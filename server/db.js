const typeorm = require('typeorm')
// database name: allTitles
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

const EntitySchema = require('typeorm').EntitySchema;

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
            type: "int",
        },
        image: {
            type: "text"
        },
        title: {
            type: "text"
        },
        director: {
            type: "text"
        },
        country: {
            type: "text"
        },
        year: {
            type: "text"
        },
        price: {
            type: "text"
        }, 
        link: {
            type: "text"
        }
    }
})


async function getConnection() {
    return await typeorm.createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306, 
        username: "root",
        password: "password",
        database: "allTitles",
        synchronize: true,
        logging: false,
        entities: [
            TitleSchema
        ]
    })
}

