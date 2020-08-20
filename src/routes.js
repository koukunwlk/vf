const express = require('express')
const router = express.Router()
const axios = require('axios')
const cors = require('cors')
const server = express()

server.use(cors())
let baseurl = "https://supermercadoosarina.varejofacil.com/api"

router.get('/', (req, res)=>{
    res.render('login.njk')
})

router.post('/', async(req, res)=> {
    axios.defaults.withCredentials = true

    let user = JSON.stringify({...req.body})
    try {
        let response = await axios.post(`${baseurl}/auth`,user )
        res.send(response.status)
    } catch (error) {
        console.log(error)
    }
    
})


module.exports = router 