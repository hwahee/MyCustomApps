const fs = require("fs")

const DB = require("./DB")
const DB_adapter=new DB()

const ServerLog = require("./static/class/ServerLog")
const Log = new ServerLog()

module.exports = (app, partials) => {
	app.get(routes.index, (req, res) => {
		Log.tell(`Index page requested from ${req.ip}`)
		res.render("index", { routes })
	})

	app.get(routes.chime, (req, res) => {
		res.render("chime", { routes })
	})

	app.get(routes.map, async (req, res) => {
		if (req.query.request === undefined) {
			res.render("map", { routes })
		}
		else if (req.query.request == "markers") {
			await DB_adapter.getMarkerList().then((param1, param2) => { })
			res.send([{ lat: 37.596459, lng: 127.0603274, },
			{ lat: 37.5901515, lng: 127.0560362, }])
		}
		else {
			//ERROR
		}
	})
}

const routes = {
	index: "/",
	chime: "/chime",
	map: "/map",
}

export default routes
