const DB = require("oracledb")

const ServerLog = require("./static/class/ServerLog")
const Log = new ServerLog()

class DB_adapter {
	constructor() {
		this.conn = undefined
		this.initiateConnection()
	}
	async initiateConnection() {
		let dbconfig = {
			user: "c##hwaheecrosswalk",
			password: "4321",
			connectString: "localhost/orcl",
		}
		try {
			this.conn = await DB.getConnection(dbconfig)

			let sql_test_str = `select addr_dong, lat, lng from crosswalk_list`
			this.conn.execute(sql_test_str, function (err, result) {
				if (err) {
					throw err
				}
				Log.tell("Database connected", false)
			})
		}
		catch (err) {
			Log.tell(err)
			return
		}
	}

	getMarkerListCore() {
		return new Promise((resolve, reject) => {
			let query = `select lat, lng from crosswalk_list`
			this.conn.execute(query, [], (err, result) => {
				if (err) {
					Log.tell(`DB error: ${err}`)
					return reject(err)
				}

				return resolve(result)
			})
		})
	}
	async getMarkerList() {
		await this.getMarkerListCore().then((result) => {
			Log.tell(result.rows, false)
		})
	}

}

module.exports = DB_adapter


