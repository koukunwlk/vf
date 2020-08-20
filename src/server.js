const express = require('express')
const nunjucks = require('nunjucks')
const methodOverride = require('method-override')
const cors = require('cors')
const routes = require('./routes')

const server = express()
server.use(cors())
server.use(express.urlencoded({extended: false}))
server.use(express.static('public'))
server.set('view engine', 'njk')
server.use(methodOverride("_method"))
server.use(routes)


nunjucks.configure('src/views',{
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(5000, console.log("Server running"))