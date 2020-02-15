const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {NODE_ENV} = require('./config')

const app = express()

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common'
app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use(function errorHandler(error, req, res, next){
    let response
    if(NODE_ENV === 'production'){
        response = { error: { message: 'server error' } }
    } else {
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

module.exports = app