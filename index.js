const express = require('express')
const app = express()

const port = process.env.PORT || 5000;

const scraper = require('./webscraper')