import { config } from "./config"
import { baseSquare } from "./entities/base"
import { ctx } from "./world"
var list: any = []
const loop = () => {
    list.forEach((ef: any) => {
        ef.darw()
    })
}
class blast extends baseSquare {
    ctx: CanvasRenderingContext2D
    x: number
    y: number
    t: number
    timer: any
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, t = 100) {
        super(ctx)
        this.ctx = ctx
        this.x = x
        this.y = y
        this.t = t
        this.timer
        this.darw()
        setTimeout(() => {
            list.splice(list.indexOf(this), 1)
            clearInterval(this.timer)
        }, t);
    }
    darw() {
        this.drawImg([9, 7], 100, 100)
        this.timer = setInterval(() => {
            this.x += 0.1
        }, 100)
    }
    drawImg(position: Array<any> = [0, 0], sizex = 100, sizey = 100) {
        //第几排，第几列
        if (!this.isOutOfRange()) {
            this.ctx.drawImage(this.img, position[0] * 100, position[1] * 100, 100, 100,
                Math.floor(this.x - this.w / 2), Math.floor(this.y - this.h / 2), sizex, sizey
            )
        }
        return this
    }
}
class damText {
    ctx: CanvasRenderingContext2D
    x: number
    y: number
    t: number
    text: string
    color: string
    timer: any
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, text = "0", t = 1000, color = "red") {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.t = t
        this.text = text
        this.color = color
        this.timer
        this.darw()
        setTimeout(() => {
            list.splice(list.indexOf(this), 1)
        }, t);
    }
    darw() {
        var c = [this.x, this.y]
        var fontSize = 14
        this.ctx.font = fontSize * 2 + "px magenta";
        this.ctx.fillStyle = this.color
        this.ctx.fillText(this.text, c[0], c[1]);
        this.timer = setInterval(() => {
            this.y -= 0.1
        }, 100)
    }
}
class poisonGas {

}

function linkto<T extends baseSquare, K extends baseSquare>(ob1: T, ob2: K, speed = 15): void {
    ob2.moveTo(ob1.x, ob1.y, speed)
    if (config.showLink) {
        ctx.beginPath()
        ctx.lineWidth = 5
        ctx.moveTo(ob1.x, ob1.y)
        ctx.lineTo(ob2.x, ob2.y)
        ctx.lineWidth = 1
        ctx.strokeStyle = "blue"
        ctx.closePath()
        ctx.stroke()
    }
}


const Effects = {
    blast,
    poisonGas,
    damText,
    loop,
    list,
    linkto
}
export { Effects }