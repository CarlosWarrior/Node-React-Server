require('dotenv').config()
const {readFileSync} = require('fs')
const express = require('express')
const app = express()
app.use(require('helmet')())
app.use(require('cors')({origin:'*'}))
app.use(express.json())
app.use(express.urlencoded( {extended: true} ))
app.use('/', require('./routes'))

async function init(){
  console.log('app running on port '+process.env.port_app)
}

if(process.env.production){
  let ssl = {
    key: readFileSync("./storage/keys/private.key"),
    cert: readFileSync("./storage/keys/public.crt"),
  }
  require('https')
    .createServer(ssl, app)
    .listen(process.env.port_app, init)
}
else  process.env.host? app.listen(process.env.port_app, process.env.host, init) : app.listen(process.env.port_app, 	init)