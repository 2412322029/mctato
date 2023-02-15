
/**
 * 凋零骷髅
 */
import { baseSquare } from "./base"
import { P2Pdistance, XYtest } from "../math"
import { canvas, player1 } from "../world"
import { ctx } from "../world"
import { config } from "../config"
import { Wall } from "./wall"
import { audio } from "../audio"
import { items } from "./Items"
class WitherSkeleton extends baseSquare {
    imgp: [number, number]
    /**
     * 
     * @param {*} ctx 
     * @param {Number} x 物体中心点x坐标
     * @param {Number} y 物体中心点y坐标
     * @param {Number} w 物体宽度
     * @param {Number} h 物体高度
     */

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
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
        if (config.displayPosition) {
            coordinate = `(${Math.floor(this.x)},${Math.floor(this.y)})`
        }
        var names = WitherSkeleton.names + coordinate
        super.drawImg(this.imgp)
        super.showName(names)
        return this
    }
}
/**
 * 僵尸---基础怪物
 */
class Zombie extends baseSquare {
    HP: number
    hitDamage: number
    knockDistance: number
    status: number
    imgp: number[]
    alanger: boolean
    /**
     * 
     * @param {*} ctx 
     * @param {Number} x 物体中心点x坐标
     * @param {Number} y 物体中心点y坐标
     * @param {Number} w 物体宽度
     * @param {Number} h 物体高度
     */

    constructor(ctx: any, x: number, y: number, w?: number, h?: number) {
        super(ctx, x, y, w, h)
        this.HP = Zombie.MaxHP
        this.hitDamage = 10
        this.alive = true
        this.knockDistance = this.w / 2//击退距离
        this.status = 0 //状态 0游荡/1跟随/2仇恨

        this.imgp = Zombie.imgnomal//现在图像位置
        this.alanger = false //已经发出生气声音
    }
    /**
     * 固有属性
     */
    static imgnomal = [7, 0] //正常
    static imgrage = [7, 1] //狂暴

    static names = "僵尸"
    static MaxHP = 200
    static speed = 5
    static guardingRadius = 300 //警戒半径
    static chasingDistance = 450 //跟随半径
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
            var names = Zombie.names + coordinate
            this.checkHP()
            super.drawImg(this.imgp)
            super.showName(names)
            this.showRealTimeHP()
            this.guardingCircle()
            this.checkWall()
        }
        return this
    }
    checkWall() {
        XYtest(Wall.walllist, this).forEach(e => {
            if ((Math.abs(e.x - this.x) / (e.y - this.y)) >= e.w / e.h) {
                if (this.x > e.x && this.x - this.w / 2 - e.w / 2 < e.x) {
                    this.x = e.x + e.w / 2 + this.w / 2 + 1
                    return
                }
                if (this.x < e.x && this.x + this.w / 2 + e.w / 2 > e.x) {
                    this.x = e.x - e.w / 2 - this.w / 2 - 1
                    return
                }
            } else {

                if (this.y > e.y && this.y - this.h / 2 - e.h / 2 < e.y) {
                    this.y = e.y + e.h / 2 + this.h / 2 + 1
                    return
                }
                if (this.y < e.y && this.y + this.h / 2 + e.h / 2 > e.y) {
                    this.y = e.y - e.h / 2 - this.h / 2 - 1
                    return
                }
            }
        })
    }
    showRealTimeHP() {
        var HPpercent
        if (this.HP < 0) {
            HPpercent = 0
        } else if (this.HP > Zombie.MaxHP) {
            HPpercent = 1
        } else {
            HPpercent = this.HP / Zombie.MaxHP
        }
        if (this.isOutOfRange()) {//超出边界
            return
        }
        this.ctx.fillStyle = "#f71c1c";
        this.ctx.fillRect(this.x - this.w / 2,
            this.y + this.h / 2 + 10, this.w * HPpercent, 15);

        this.ctx.beginPath();//边框
        this.ctx.rect(this.x - this.w / 2, this.y + this.h / 2 + 10, this.w, 15);
        this.ctx.closePath();
        ctx.strokeStyle = "black";
        this.ctx.stroke();

        if (config.showHPMPtext) {//血条文字
            this.ctx.font = "16px none"
            this.ctx.fillStyle = "black";
            this.ctx.fillText(Math.floor(this.HP).toString(),
                this.x - this.w / 2 + 20,
                this.y + this.h / 2 + 24)
            this.ctx.fillText("/ " + Zombie.MaxHP,
                this.x - this.w / 2 + 50,
                this.y + this.h / 2 + 24)
        }

    }
    /**
     * 检查血量并且纠正
     */
    checkHP() {
        if (Number.isNaN(this.HP)) {
            this.HP = 0
            this.alive = false
        }

        if (this.HP <= 0) {
            this.HP = 0
            this.alive = false
        } else if (this.HP >= Zombie.MaxHP) {
            this.HP = Zombie.MaxHP
        }
    }
    /**
     * 警卫圈
     */
    guardingCircle() {
        // 玩家进入警卫圈 怪物 游荡->跟随
        if (this.status != 2 && P2Pdistance(player1.x, player1.y, this.x, this.y) <= Zombie.guardingRadius) {
            this.status = 1//跟随
        }
        // 玩家逃出追击圈 怪物 跟随->游荡
        if (this.status == 1 && P2Pdistance(player1.x, player1.y, this.x, this.y) >= Zombie.chasingDistance) {
            this.status = 0 //游荡
        }
        switch (this.status) {
            case 0:
                // console.log(0);
                //按照预定轨迹游荡
                break;
            case 1:
                // console.log(1);
                super.moveTo(player1.x, player1.y, Zombie.speed)
                break;
            case 2:
                if (!this.alanger) { audio.anger.play() }
                this.alanger = true
                this.imgp = Zombie.imgrage
                // console.log(2);
                super.moveTo(player1.x, player1.y, Zombie.speed * 2)

                break;
            default:
                break;
        }
        if (config.showGuardingCircle) {
            this.ctx.beginPath();//警戒圈
            this.ctx.strokeStyle = 'red';
            this.ctx.arc(this.x, this.y, Zombie.guardingRadius, 0, Math.PI * 2);
            this.ctx.stroke();

            this.ctx.beginPath();//追击圈
            this.ctx.strokeStyle = 'orange';
            this.ctx.arc(this.x, this.y, Zombie.chasingDistance, 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.strokeStyle = 'black';
        }
    }
    dei() {
        audio.die.play()
        items.list.push(new items.heal(this.x + Math.random() * 20, this.y - 25))
        items.list.push(new items.supply(this.x - Math.random() * 20, this.y + 25))
    }
}

class Enemy {
    static list: Zombie[] = []
    static init() {
        for (let i = 0; i < 5; i++) {
            let d: Zombie = new Zombie(ctx, 500 + Math.floor(Math.random() * (canvas.width - 300)),
                500 + Math.floor(Math.random() * (canvas.height - 300)))
            Enemy.list.push(d)
        }

    }
    static movement() {
        Enemy.list.forEach((e, index) => {
            if (e.alive) {
                e.draw()
            } else {
                e.dei()
                Enemy.list.splice(index, 1)
            }

        });
    }
}

export { Enemy, Zombie }
