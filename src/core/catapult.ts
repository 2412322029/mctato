/**
 * 发射物
 */
import { baseSquare } from "./base.js"
import { XYtest } from "./math.js"
import { Enemy, Zombie } from "./enemy.js"
import { config } from "./config.js"
import { Wall } from "./wall.js"
class skul extends baseSquare {
    imgp: number[]
    goneRenge: number
    speedx: number
    speedy: number
    initvx: number
    initvy: number
    damage: number
    direction?: 'left' | "right" | "up" | "down"
    knockDistance: number
    /**
     * 
     * @param {*} ctx 
     * @param {Number} x 物体中心点x坐标
     * @param {Number} y 物体中心点y坐标
     * @param {Number} w 物体宽度
     * @param {Number} h 物体高度
     * @param {String} direction 方向
     */
    constructor(ctx: any, x: number, y: number, w: number, h: number, direction?: 'left' | "right" | "up" | "down") {
        super(ctx, x, y, w, h)
        this.imgp = [8, 0]
        this.goneRenge = 0 //已经走的距离

        this.speedx = 0 //具有的速度
        this.speedy = 0 //具有的速度

        this.initvx = 0 //惯性速度（带有发射者的瞬时速度）
        this.initvy = 0 //惯性速度（带有发射者的瞬时速度）

        this.damage = 10 //伤害
        this.alive = true
        this.direction = direction
        this.knockDistance = 20//击退距离
    }
    /**
     * 固有属性
     */
    static names = "凋零骷髅头"
    static speed = 40 //初始弹道速度
    static modify = 2 //攻速倍率
    static range = 1000//射程
    /**
    * 同时绘制名字
    * @returns self
    */
    draw() {
        if (this.alive) {
            var coordinate = ""
            if (config.displayPosition) {
                coordinate = `(${Math.floor(this.x)},${Math.floor(this.y)})`
            }
            var names = coordinate
            super.drawImg(this.imgp, this.w, this.h)
            // super.showName(names)
            this.checkWall()

        }
        return this
    }
    checkWall() {
        XYtest(Wall.walllist, this).forEach(e => {
           this.alive=false
        })
    }
    move(vx: number, vy: number) {
        this.goneRenge += Math.abs(vx) + Math.abs(vy)
        this.x += vx
        this.y += vy
        this.draw()
        this.aim()
    }
    aim() {
        if (this.alive) {
            XYtest(<Array<Zombie>>Enemy.list, this).forEach(e => {
                if (e.alive && this.alive) {
                    e.HP -= this.damage
                    e.status = 2
                    e.beenKnockBack(this.x, this.y, this.knockDistance, this.direction)
                    this.alive = false
                }
            })
        };
    }
}


export { skul }

