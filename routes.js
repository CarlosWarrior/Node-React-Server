const path = require('path')
const {readFileSync} = require('fs')
const {Router, static} = require('express')
const logRequest = require('./middleware/log')
const src = './storage/build'
module.exports = Router()
	.use(async(req,res,next) => next(res.locals=null))
	.use(logRequest)
	.get('/.well-known/pki-validation/1665A2577611418823BE1544A733CB5D.txt', (req, res) => {
		const ssl = readFileSync("./public_access_files/ssl").toString()
		res.send(ssl)
	})
	.get('/', (req,res) => res.sendFile('index.html', {root:src}) )
	.use(static(src))
