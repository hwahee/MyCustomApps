class Coor {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
}
class Drawable {
	constructor() {
		this.color = "yellow"
	}
	setColor(c) {
		this.color = c
	}
	draw() { }
}
class Text extends Drawable {
	constructor() {
		super()
		this.font = "30px Comic Sans MS"
	}
	setFont(font) {
		this.font = font
	}
	draw(ctx, text, w, h) {
		ctx.beginPath()
		ctx.font = this.font
		ctx.fillStyle = this.color
		ctx.textAlign = "center"
		ctx.fillText(text, w, h)
		ctx.closePath()
	}
}
class Rect extends Drawable {
	draw(x, y, w, h) {
		ctx.beginPath()
		ctx.rect(x, y, w, h)
		ctx.fillStyle = this.color
		ctx.fill()
		ctx.closePath()
	}
}
class Circle extends Drawable {
	constructor() {
		super()
	}
	draw(ctx, x, y, r, start_deg, end_deg, ccw = false) {
		ctx.beginPath()
		ctx.arc(x, y, r, start_deg, end_deg, ccw)
		ctx.fillStyle = this.color
		ctx.fill()
		ctx.closePath()
	}
}
class Arc extends Circle {
	constructor() {
		super()
	}
	draw(ctx, x, y, or, ir, start_deg, end_deg, ccw = false) {
		const thickness = Math.abs(or - ir)
		const tmp_lineWidth = ctx.lineWidth
		ctx.lineWidth = thickness

		ctx.beginPath()
		ctx.arc(x, y, ir, start_deg, end_deg, ccw)
		ctx.strokeStyle = this.color
		ctx.stroke()
		ctx.closePath()

		ctx.lineWitdh = tmp_lineWidth
	}
}

export default class DrawingTools {
	constructor() {
		this.text= new Text()
		this.rect = new Rect()
		this.circle = new Circle()
		this.arc = new Arc()
	}
}