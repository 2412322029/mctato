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
     * @param {Number} range 射程
     */
    constructor(ctx, x, y, w, h, range) {
        super(ctx, x, y, w, h)
        this.imgp = [8, 0]
        this.range = range | 1000//射程
        this.goneRenge = 0 //已经走的距离

        this.speedx = 0 //具有的速度
        this.speedy = 0 //具有的速度

        this.initvx = 0 //惯性速度（带有发射者的瞬时速度）
        this.initvy = 0 //惯性速度（带有发射者的瞬时速度）

        this.damage = 10 //上海
        this.alive = true
    }
    /**
     * 固有属性
     */
    static names = "凋零骷髅头"
    static speed = 40 //初始弹道速度
    static modify = 2 //攻速倍率
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
        this.goneRenge += Math.abs(vx) + Math.abs(vy)
        this.x += vx
        this.y += vy
        this.draw()
        this.aim()
    }
    aim() {
        if (this.alive) {
            Enemy.list.forEach(e => {
                if (e.alive & e.boxisInMe(this.x, this.y, this.w, this.h)) {
                    e.HP -=this.damage  
                    this.alive = false
                }
            })
        };
    }
}