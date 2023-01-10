
/**
 * 凋零骷髅
 */
class WitherSkeleton extends baseSquare {
    /**
     * 
     * @param {*} ctx 
     * @param {Number} x 物体中心点x坐标
     * @param {Number} y 物体中心点y坐标
     * @param {Number} w 物体宽度
     * @param {Number} h 物体高度
     */

    constructor(ctx, x, y, w, h) {
        super(ctx, x, y, w, h)
        this.imgp = [8, 0]
    }
    /**
     * 固有属性
     */
    static names = "凋零骷髅"

    /**
     * 同时绘制名字
     * @returns self
     */
    draw() {
        var coordinate = ""
        if (displayPosition) {
            coordinate = `(${Math.floor(this.x)},${Math.floor(this.y)})`
        }
        var names = WitherSkeleton.names + coordinate
        super.drawImg(this.imgp)
        super.showName(names)
        return this
    }
}
/**
 * 苦力怕
 */
class Creeper extends baseSquare {
    /**
     * 
     * @param {*} ctx 
     * @param {Number} x 物体中心点x坐标
     * @param {Number} y 物体中心点y坐标
     * @param {Number} w 物体宽度
     * @param {Number} h 物体高度
     */

    constructor(ctx, x, y, w, h) {
        super(ctx, x, y, w, h)
        this.imgp = [3, 0]
    }
    /**
     * 固有属性
     */
    static names = "苦力怕"

    /**
    * 同时绘制名字
    * @returns self
    */
    draw() {
        var coordinate = ""
        if (displayPosition) {
            coordinate = `(${Math.floor(this.x)},${Math.floor(this.y)})`
        }
        var names = Creeper.names + coordinate
        super.drawImg(this.imgp)
        super.showName(names)
        return this
    }
}