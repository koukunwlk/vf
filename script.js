const express = require('express')
const axios = require('axios')
const cors = require('cors')
const nunjucks = require('nunjucks')

const server = express()

server.use(cors())
server.use(express.urlencoded({ extended: true }))
server.set('view engine', 'njk')

nunjucks.configure('./', {
    express: server,
    autoescape: false,
    noCache: true
})

server.get('/', (req, res) => {
    res.render('index.njk')
})




axios.defaults.withCredentials = true

let baseUrl = 'https://supermercadoosarina.varejofacil.com/api'

async function getToken(){
    let user = {username: "11", password: "12091997"}
    let {data} = await axios.post(`${baseUrl}/auth`, user)
    let token = data.accessToken

    return token
}

let token = getToken()



async function getProdInfo(ean){
    token = await token
    let {data} = await axios.get(`${baseUrl}/v1/produto/produtos/consulta/${ean}`,{headers:{ 'Authorization': token}})
    let prod = {id: data.id, desc: data.descricao}
    return prod
}
async function getProdProviders(ean){
    prod = await getProdInfo(ean)
    let providers = []
    let {data} = await axios.get(`${baseUrl}/v1/produto/produtos/${prod.id}/fornecedores`, {headers:{ 'Authorization': token}})
    data.items.map(item => providers.push({id: item.fornecedorId, nivel: item.nivel}))

   for(let i = 0; i < providers.length; i++){
        let {data} = await axios.get(`${baseUrl}/v1/pessoa/fornecedores/${providers[i].id}`,  {headers:{ 'Authorization': token}})
        let name = data.nome
        providers[i].name = name
    } 
    prod = {...prod, providers}
    return prod
}

async function getPrices(ean){
    prod = await getProdProviders(ean)
    let {data} = await axios.get(`${baseUrl}/v1/produto/produtos/${prod.id}/custos`,{headers:{ 'Authorization': token}}) 
    let custo = data[0].custoReposicao.toFixed(2)
    custo = parseFloat(custo)
    prod = {...prod, custo }
    return prod
} 



async function printProd(){
   prod = await getPrices()
    console.log(prod)
}


server.post('/', async(req, res) => {
    let id = Object.values(req.body)
    let prod = await getPrices(id)
    res.send(prod)
})


server.listen(5000, console.log('Server running'))