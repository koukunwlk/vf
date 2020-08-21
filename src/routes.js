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

    let user = {...req.body}
    try {
        let {status, data} = await axios.post(`${baseurl}/auth`, user )
        if(status == 200){
            return res.send(data)
        }else{
            return res.send("Usuário invalido")
        }
    } catch (error) {
        console.log(error)
    }
    
})

router.get('/produto',(req, res)=>{
    return res.render('produto.njk')
})


module.exports = router 