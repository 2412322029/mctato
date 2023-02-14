import { canvas, ctx } from "./world"
import { config } from "./config"
import { imgload } from "./imgloader"
/**
 * 位置基类
 */
class Position {
    ctx: CanvasRenderingContext2D //canvas2d对象
    x: number //x坐标
    y: number // y坐标
    constructor(ctx: CanvasRenderingContext2D, x?: number, y?: number) {
        this.ctx = ctx
        this.x = x || 0
        this.y = y || 0
    }
}
/**
 * 矩形基类
 */
class baseSquare extends Position {
    declare x: number;// 物体中心点x坐标
    declare y: number;//物体中心点y坐标
    w: number //物体宽度
    h: number //物体高度
    color: string //填充颜色
    img: HTMLImageElement
    alive: boolean
    outOfRange: boolean
    constructor(ctx: CanvasRenderingContext2D, x?: number, y?: number, w?: number, h?: number, color?: string) {
        super(ctx, x, y)
        this.w = w || 100
        this.h = h || 100
        this.color = color || "black"
        this.img = imgload.spirit
        this.alive = true
        this.outOfRange = false
    }
    /**
     * 固有属性
     */
    static names = "基础矩形"

    /**
     * 在物体上方绘制名字
     * @param {String} names
     * @param {Number} fontSize 字体大小
     * @param {String} fontColor 字体颜色
     * @returns self
     */
    showName(names: string, fontSize?: number, fontColor?: string) {
        if (!config.showNameAbove) {
            return
        }
        var coordinate = ""
        if (config.displayPosition) {
            coordinate = `(${Math.floor(this.x)},${Math.floor(this.y)})`
        }
        names = names ?? baseSquare.names + coordinate

        if (!this.isOutOfRange()) {
            fontSize = <number>fontSize | 16
            this.ctx.font = fontSize * 2 + "px none";
            var fontLength = fontSize * names.length
            this.ctx.shadowColor = "black";
            this.ctx.fillStyle = fontColor == undefined ? "black" : fontColor
            this.ctx.fillText(names, this.x - fontLength, this.y - this.w / 2 - fontSize)
        }
        return this
    }
    /**
     * 绘制物体
     * @returns self
     */
    draw() {
        if (!this.isOutOfRange()) {
            this.ctx.fillStyle = this.color as string;
            this.ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2,
                this.w, this.h);
        }
        return this
    }
    /**
     * 
     * @param {Array} position 对应精灵图位置（第几排，第几列）
     * @returns self
     */
    drawImg(position: Array<any> = [0, 0], sizex = 100, sizey = 100) {
        //第几排，第几列
        if (!this.isOutOfRange()) {
            this.ctx.drawImage(this.img, position[0] * 100, position[1] * 100, 100, 100,
                this.x - this.w / 2, this.y - this.h / 2, sizex, sizey
            )
        }
        return this
    }
    /**
     * 测试点是否在图形内
     * @param {Number} tx 测试点x坐标
     * @param {Number} ty 测试点y坐标
     * @returns {boolean} 
     */
    isInMe(tx: number, ty: number): boolean {
        ctx.beginPath();
        this.ctx.rect(this.x - this.w / 2, this.y - this.h / 2,
            this.w, this.h);
        return (this.ctx.isPointInPath(tx, ty))
    }
    /**
     * 显示一个物体相对于自己的碰撞范围（中心的进入这个范围代表产生碰撞）
     * @param {Number} w 要显示物体的宽
     * @param {Number} h 要显示物体的高
     */
    showBox(w: number, h: number) {
        if (config.showHitBox) {
            this.ctx.beginPath();
            this.ctx.rect((this.x - this.w / 2) - w / 2, (this.y - this.h / 2) - h / 2,
                this.w + w, this.h + h);
            this.ctx.stroke()
            this.ctx.closePath()
        }
    }
    /**
     * 以一定速度移动
     * @param {number} vx x速度分量
     * @param {number} vy y速度分量
     */
    move(vx: number, vy: number) {
        this.x += vx
        this.y += vy
        if (this.x - this.w / 2 - 108 <= 0) {
            this.x = this.w / 2 + 108
        }
        if (this.x + this.w / 2 + 108 >= 2000) {
            this.x = 2000 - this.w / 2 - 108
        }
        if (this.y - this.h / 2 - 85 <= 0) {
            this.y = this.h / 2 + 85
        }
        if (this.y + this.h / 2 + 75 >= 1125) {
            this.y = 1125 - this.h / 2 - 70
        }
        this.draw()
    }
    /**
     * 以指定速度移动到指定坐标
     * @param {Number} tox 目标点x坐标
     * @param {Number} toy 目标点y坐标
     * @param {Number} speed 移动速度
     */
    moveTo(tox: number, toy: number, speed: number) {
        if (tox != this.x || toy != this.y) {//如果未到达目标点
            var Lx = tox - this.x //到目标点的x距离
            var Ly = toy - this.y //到目标点的y距离
            var speedX = speed * Lx / Math.sqrt(Lx ** 2 + Ly ** 2)
            var speedY = speed * Ly / Math.sqrt(Lx ** 2 + Ly ** 2)
            this.x += speedX
            this.y += speedY
            if (Math.abs(Lx) <= speed && Math.abs(Ly) <= speed) {
                this.x = tox
                this.y = toy
            }
            if (this.x - this.w / 2 - 108 <= 0) {
                this.x = this.w / 2 + 108
            }
            if (this.x + this.w / 2 + 108 >= 2000) {
                this.x = 2000 - this.w / 2 - 108
            }
            if (this.y - this.h / 2 - 85 <= 0) {
                this.y = this.h / 2 + 85
            }
            if (this.y + this.h / 2 + 75 >= 1125) {
                this.y = 1125 - this.h / 2 - 70
            }
        }
    }
    isAlive() {
        // TODO:什么时候死亡
        return this.alive
    }
    /**
     * 判断中心坐标是否超出渲染区域
     * @returns 
     */
    isOutOfRange() {
        if (this.x + this.w / 2 < 0 ||
            this.y + this.h / 2 < 0 ||
            this.x - this.w / 2 > canvas.width ||
            this.y - this.h / 2 > canvas.height) {
            this.outOfRange = true
        } else {
            this.outOfRange = false
        }
        return this.outOfRange
    }
    /**
     * 返回自己坐标数组
     * @returns [x,y] 
     */
    getPosition() {
        return [this.x, this.y]
    }
    /**
     * 被击退
     * @param {Number} x 击退来源x坐标
     * @param {Number} y 击退来源y坐标
     * @param {Number} distance 击退距离
     * @param {*} direction 击退方向left/right/up/down（默认全方向）
     */
    beenKnockBack(x: number, y: number, distance: number = 20, direction?: 'left' | "right" | "up" | "down") {
        var deltaX = this.x - x
        var deltaY = this.y - y
        var xb = Math.floor(Math.sqrt(deltaX ** 2 + deltaY ** 2))
        if (xb == 0) { this.x -= distance; return }
        var knockX = deltaX * distance / xb
        var knockY = deltaY * distance / xb
        switch (direction) {
            case 'left':
                this.x -= distance
                break;
            case 'right':
                this.x += distance
                break;
            case 'up':
                this.y -= distance
                break;
            case 'down':
                this.y += distance
                break;
            default:
                this.x += knockX
                this.y += knockY
                break;
        }

    }
}

export { baseSquare }
