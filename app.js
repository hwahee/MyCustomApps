const express = require("express")
const bodyParser = require('body-parser')
const localsMiddleware = require("./middleware")

const ServerLog = require("./static/class/ServerLog")
const Log = new ServerLog()

const app = express()
const PORT = 8181

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(localsMiddleware.localsMiddleware)
app.set("view engine", "pug")
app.use("/static", express.static("static"))

const partials = {
	header: 'partials/header',
	footer: 'partials/footer'
};
require('./routes')(app, partials)

app.listen(PORT, () => {
	Log.tell(`SERVER RUNNING...\thttp://127.0.0.1:${PORT}`)
})