
export const canvas2 = <HTMLCanvasElement>document.getElementById("canvas2")
export const ctx2 = <CanvasRenderingContext2D>canvas2.getContext('2d')

class blast {
    ctx: CanvasRenderingContext2D
    x: number
    y: number
    t: number
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, t = 100) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.t = t
        this.darw()
    }
    darw() {
        var r = 30
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, r, 0, 2 * Math.PI);
        this.ctx.closePath()
        this.ctx.fillStyle = "red"
        this.ctx.fill()
        setTimeout(() => {
            r++
            this.ctx.clearRect(this.x - r, this.y - r, 2 * r, 2 * r);
        }, this.t);
    }
}
class damText {
    ctx: CanvasRenderingContext2D
    x: number
    y: number
    t: number
    text: string
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, text = "0", t = 1000) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.t = t
        this.text = text
        this.darw()
    }
    darw() {
        var fontSize = 20
        this.ctx.font = fontSize * 2 + "px magenta";
        this.ctx.fillStyle = "red"
        this.ctx.fillText("-" + this.text, this.x, this.y);
        setTimeout(() => {
            this.ctx.clearRect(this.x, this.y-fontSize*2, 100, fontSize*2);
        }, this.t);
    }
}
class poisonGas {

}

const Effects = {
    blast,
    poisonGas,
    damText
}
export { Effects }