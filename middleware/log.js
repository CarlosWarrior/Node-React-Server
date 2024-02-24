function Log(req, res, next) {
	console.log(`${req.ip} ${req.ips} ->\t ${req.method}@${req.get('host')} ${req.originalUrl}\t\tat ${(new Date()).toISOString()}`)
	return next()
}
module.exports = Log