/**
 * 发射物
 */
class skul extends baseSquare {
    /**
     * 
     * @param {*} ctx 
     * @param {Number} x 物体中心点x坐标
     * @param {Number} y 物体中心点y坐标
     * @param {Number} w 物体宽度
     * @param {Number} h 物体高度
     */

    constructor(ctx, x, y, w, h, range, goneRenge) {
        super(ctx, x, y, w, h)
        this.imgp = [8, 0]
        this.range = range | 1000//射程
        this.goneRenge = goneRenge | 0 //已经走的距离

        this.speedx = 0
        this.speedy = 0
        this.alive = true
    }
    /**
     * 固有属性
     */
    static names = "凋零骷髅头"
    static speed = 20
    /**
    * 同时绘制名字
    * @returns self
    */
    draw() {
        if (this.alive) {
            var coordinate = ""
            if (displayPosition) {
                coordinate = `(${Math.floor(this.x)},${Math.floor(this.y)})`
            }
            var names = coordinate
            super.drawImg(this.imgp, this.w, this.h)
            // super.showName(names)
        }
        return this
    }
    move(vx, vy) {
        // setTimeout(() => {
        //     if (this.w>0 *this.h>0) {
        //         this.w -= 1
        //     this.h -= 1
        //     }
            
        // }, this.range*0.6/this.speed);

        this.goneRenge += Math.abs(vx) + Math.abs(vy)
        this.x += vx
        this.y += vy
        this.draw()
    }
}