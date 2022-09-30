require('dotenv').config()
const {readFileSync} = require('fs')
const express = require('express')
const app = express()
app.use(require('helmet')({
  contentSecurityPolicy:{
    directives: {
      defaultSrc: ["'self'", 'data:', 'blob:',],
  
      fontSrc: ["'self'", 'https:', 'data:', "'unsafe-inline'"],
  
      scriptSrc: ["'self'",'https:', "'unsafe-inline'"],
  
      scriptSrcElem: ["'self'",'https:','https:', "'unsafe-inline'"],
  
      styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
  
      connectSrc: ["'self'", 'data','https:']
    },
  }
}))
app.use(require('cors')({origin:'*'}))
app.use(express.json())
app.use(express.urlencoded( {extended: true} ))
app.use('/', require('./routes'))

async function init(){
  console.log('app running on port '+process.env.port_app)
}

if(process.env.production){
  let ssl = {
    key: readFileSync("./storage/local-private.key"),
    cert: readFileSync("./storage/local-public.crt"),
  }
  require('https')
    .createServer(ssl, app)
    .listen(process.env.port_app, init)
}
else  process.env.host? app.listen(process.env.port_app, process.env.host, init) : app.listen(process.env.port_app, 	init)