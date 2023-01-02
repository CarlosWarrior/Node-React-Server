const path = require('path')
const fs = require('fs')
const {readFileSync, existsSync} = require('fs')
const {Router, static} = require('express')
const logRequest = require('./middleware/log')
const src = './storage/build/'
module.exports = Router()
	.use(async(req,res,next) => next(res.locals=null))
	.use(logRequest)
	.get('/.well-known/pki-validation/B254154C2857A6F6F9B6A3E748047FF7.txt', (req, res) => {
		const ssl = readFileSync("./public_access_files/ssl").toString()
		res.send(ssl)
	})
	.get('/app/storage/images/:scope/:name', async function handleFile(req, res){
		const scope = req.params.scope
		const name = req.params.name
		const source = `storage/images/${scope}/${name}`
		console.log(source, existsSync(source))
		if(existsSync(source)){
			res.sendFile(source, { root: './' })
		}
		else res.status(404).send()
	})
	.get('/*', (req, res)=>{
		if(req.originalUrl != "/" && req.originalUrl.indexOf(".") >= 0){
			const root = path.join(src, req.originalUrl)
			console.log(root, fs.existsSync(root))
			if(fs.existsSync(root))
				res.sendFile(root, {root:"."})
			else
				res.status(404).send()
		}
		else res.sendFile("index.html", {root:src})
	})