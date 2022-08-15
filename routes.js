const {readFileSync} = require('fs')
const {Router, static} = require('express')
const auth = require('./auth')

module.exports = Router()
	.use(async(req,res,next) => next(res.locals=null))
	.use(logRequest)
	.get('/.well-known/pki-validation/1665A2577611418823BE1544A733CB5D.txt', (req, res) => {
		const ssl = readFileSync("./public_access_files/ssl").toString()
		res.send(ssl)
	})
	.use(express.static(path.join(__dirname, '/storage/app')))
