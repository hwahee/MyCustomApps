import DrawingTools from "../class/DrawingTools.js"
import SoundModule from "../class/SoundModule.js"

$(document).ready(function () {

	const canvas = document.getElementById('myCanvas')
	const ctx = canvas.getContext("2d")

	const W = canvas.width
	const H = canvas.height

	const DT = new DrawingTools()
	const SM = new SoundModule()

	class Chime {
		constructor(dt, sm) {
			this.dt = dt
			this.sm = sm

			this.baseTime = 0
			this.targetTime = 0
			this.isProcOn = false

			this.notation = "ms"
		}
		changeBaseTime(ms) {
			this.baseTime = ms
		}
		startChime() {
			this.targetTime = Date.now() + this.baseTime
			this.isProcOn = true
		}
		stopChime() {
			this.isProcOn = false
		}
		ringChime() {
			//if time reached, ring the sound and return true so that other functions can recognize whether ringed or not
			if (this.isProcOn && this.targetTime <= Date.now()) {
				this.sm.play()

				this.targetTime += this.baseTime

				return true
			}
			else {
				return false
			}
		}
		timeString(ms) {
			//determines how to show the time
			if (this.notation == "ms") {
				return String(ms)
			}
			else if (this.notation == "s.ss") {
				return String((ms / 1000).toFixed(2))
			}
			else if (this.notation == "mm:ss.ss") {
				let mm = parseInt(ms / 60000)
				mm = (10 <= mm) ? String(mm) : ((0 < mm) ? "0" + String(mm) : "00")
				ms = (ms % 60000 / 1000).toFixed(2)
				return mm + ":" + String((10<=ms)?ms:"0"+ms)
			}
			else {
				/*	ERROR	*/
			}

		}
		update() {
			this.ringChime()
		}
		draw(ctx) {
			if (this.isProcOn) {
				const progressPercent = (this.targetTime - Date.now()) / this.baseTime

				this.dt.arc.setColor("white")
				this.dt.arc.draw(ctx
					, W / 2, H / 2
					, H / 4, 7 * H / 32
					, 3 / 4 * 2 * Math.PI, (progressPercent + 3 / 4) * 2 * Math.PI)

				this.dt.text.setFont("20px Comic Sans MS")
				this.dt.text.setColor("black")
				this.dt.text.draw(ctx, this.timeString(this.targetTime - Date.now()), W / 2, H / 2)
			}
			else {
				this.dt.arc.setColor("white")
				this.dt.arc.draw(ctx
					, W / 2, H / 2
					, H / 4, 7 * H / 32
					, 3 / 4 * 2 * Math.PI, (7 / 4) * 2 * Math.PI)

				this.dt.text.setFont("20px Comic Sans MS")
				this.dt.text.setColor("black")
				this.dt.text.draw(ctx, this.timeString(this.baseTime), W / 2, H / 2)
			}

		}
	}
	const chime = new Chime(DT, SM)
	chime.changeBaseTime(4000)

	//update & draw the whole functions and setinterval
	function update() {
		chime.update()
	}
	function draw() {
		update()

		ctx.clearRect(0, 0, W, H)

		chime.draw(ctx)
	}
	setInterval(draw, 40)

	//event listener
	const startStop= function () {
		if (chime.isProcOn) {
			chime.stopChime()
		}
		else {
			chime.startChime()
		}
	}
	const timeSet = function () {
		let t = parseInt($(this).val())

		t = t < 1000 ? 1000 : t

		chime.changeBaseTime(t)
		chime.stopChime()
	}
	const notationSet = function () {
		chime.notation = $(this).val()
	}

	$("#start-stop").click(startStop)
	$("#time-set").change(timeSet)
	$("#notation-set").change(notationSet)

})