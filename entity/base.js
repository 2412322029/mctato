//常量

var visibleArea = [document.body.clientWidth, document.body.clientHeight]
var displayPosition = false //显示坐标
var showHPMPtext = true //显示血条文字
var renderArea = [0, 0, 2400, 1400]//渲染区域大小
var showHitBox = true //显示碰撞箱
var showGuardingCircle = true //显示警戒圈
/**
 * 绘制渲染区域
 */
function drawRenderArea(ctx) {
    ctx.beginPath();
    ctx.rect(renderArea[0], renderArea[1], renderArea[2], renderArea[3]);
    ctx.closePath();
    ctx.stroke();
}
/**
 * 位置基类
 */
class Position {
    /**
     * 
     * @param {canvas2d对象} ctx 
     * @param {*} x x坐标
     * @param {*} y y坐标
     */
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.x = x || 0
        this.y = y || 0
    }
}
/**
 * 圆形基类
 */
class baseCircle extends Position {
    /**
     * 
     * @param {Canvas2d} ctx canvas2d对象
     * @param {Number} x 物体中心点x坐标
     * @param {Number} y 物体中心点y坐标
     * @param {Number} radius 圆形半径
     * @param {String} color 填充颜色
     */
    constructor(ctx, x, y, radius, color) {
        super(ctx, x, y)
        this.radius = radius || 50
        this.color = color || "black"
        this.img = document.getElementById("spirit")

        this.alive = true //对象是否存活
        this.outOfRange = false //是否超出画布区域（决定是否被渲染）

    }
    /**
     * 固有属性
     */
    static names = "基础圆形"

    /**
     * 在物体上方绘制名字
     * @param {String} names
     * @param {Number} fontSize 字体大小
     * @param {String} fontColor 字体颜色
     * @returns self
     */
    showName(names, fontSize, fontColor) {
        var coordinate = ""
        if (displayPosition) {
            coordinate = `(${Math.floor(this.x)},${Math.floor(this.y)})`
        }
        names = names ?? baseCircle.names + coordinate

        if (!this.isOutOfRange()) {
            fontSize = fontSize | 16
            this.ctx.fillStyle = fontColor;
            this.ctx.font = fontSize * 2 + "px none";
            var fontLength = fontSize * names.length
            this.ctx.fillText(names, this.x - fontLength, this.y - this.radius - fontSize)
        }
        return this
    }
    /**
     * 绘制物体
     * @returns self
     */
    draw() {
        if (!this.isOutOfRange()) {
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
        }
        return this
    }
    /**
     * 
     * @param {Array} position 对应精灵图位置（第几排，第几列）
     * @returns self
     */
    drawImg(position = [0, 0]) {
        if (!this.isOutOfRange()) {
            this.ctx.drawImage(this.img, position[0] * 100, position[1] * 100, 100, 100,
                this.x - 50, this.y - 50, 100, 100
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
    isInMe(tx, ty) {
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        return (this.ctx.isPointInPath(tx, ty))
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
        if (this.x + this.radius < renderArea[0] ||
            this.y + this.radius < renderArea[1] ||
            this.x - this.radius > renderArea[2] ||
            this.y - this.radius > renderArea[3]) {
            this.outOfRange = true
        } else {
            this.outOfRange = false
        }
        return this.outOfRange
    }
    getPosition() {
        return [this.x, this.y]
    }
}
/**
 * 矩形基类
 */
class baseSquare extends Position {
    /**
     * 
     * @param {*} ctx canvas2d对象
     * @param {Number} x 物体中心点x坐标
     * @param {Number} y 物体中心点y坐标
     * @param {Number} w 物体宽度
     * @param {Number} h 物体高度
     * @param {String} color 填充颜色
     * @param {String} names 物体名字
     */
    constructor(ctx, x, y, w, h, color) {
        super(ctx, x, y)
        this.w = w || 100
        this.h = h || 100
        this.color = color || "black"
        this.img = document.getElementById("spirit")

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
    showName(names, fontSize, fontColor) {
        var coordinate = ""
        if (displayPosition) {
            coordinate = `(${Math.floor(this.x)},${Math.floor(this.y)})`
        }
        names = names ?? baseSquare.names + coordinate

        if (!this.isOutOfRange()) {
            fontSize = fontSize | 16
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
            this.ctx.fillStyle = this.color;
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
    drawImg(position = [0, 0], sizex = 100, sizey = 100) {
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
    isInMe(tx, ty) {
        ctx.beginPath();
        this.ctx.rect(this.x - this.w / 2, this.y - this.h / 2,
            this.w, this.h);
        return (this.ctx.isPointInPath(tx, ty))
    }
    showBox(w, h) {
        if (showHitBox) {
            this.ctx.beginPath();
            this.ctx.rect((this.x - this.w / 2) - w / 2, (this.y - this.h / 2) - h / 2,
                this.w + w, this.h + h);
            this.ctx.stroke()
            this.ctx.closePath()
        }
    }
    move(vx, vy) {
        this.x += vx
        this.y += vy
        this.draw()
    }
    /**
     * 以指定速度移动到指定坐标
     * @param {Number} tox 目标点x坐标
     * @param {Number} toy 目标点y坐标
     * @param {Number} speed 移动速度
     */
    moveTo(tox, toy, speed) {
        console.log(tox, toy, speed);
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
        if (this.x + this.w / 2 < renderArea[0] ||
            this.y + this.h / 2 < renderArea[1] ||
            this.x - this.w / 2 > renderArea[2] ||
            this.y - this.h / 2 > renderArea[3]) {
            this.outOfRange = true
        } else {
            this.outOfRange = false
        }
        return this.outOfRange
    }
    getPosition() {
        return [this.x, this.y]
    }
    /**
     * 被击退
     * @param {Number} x 击退来源x坐标
     * @param {Number} y 击退来源y坐标
     * @param {Number} distance 击退距离
     * @param {*} direction 击退方向left/right/up/down
     */
    beenKnockBack(x, y, distance = 20, direction) {
        // console.log(x, y, distance, direction);
        var deltaX = this.x - x
        var deltaY = this.y - y
        var xb = Math.floor(Math.sqrt(deltaX ** 2 + deltaY ** 2))
        if (xb==0) {
            xb =1
        }
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

