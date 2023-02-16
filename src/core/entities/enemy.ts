
/**
 * 凋零骷髅
 */
import { baseSquare } from "./base"
import { dijkstra, lineIntersect, P2Pdistance, XYtest } from "../math"
import { canvas, player1 } from "../world"
import { ctx } from "../world"
import { config } from "../config"
import { Wall } from "./wall"
import { audio } from "../audio"
import { items } from "./Items"
import { frame } from "../game"
import { Effects } from "../effects"
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
    staticPosition: Array<number>
    randomPosition: Array<number>
    randomCount: number
    wanderRange: number[]
    angreTimer: number
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
        this.staticPosition = JSON.parse(JSON.stringify([this.x, this.y])) //生成时的固定位置
        this.wanderRange = [200, 100]//游荡范围矩形
        this.randomPosition = [0, 0] //随机产生的目标点
        this.randomCount = 0 //随机次数
        this.angreTimer = 0
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
    static angreTime = 50 //仇恨时间s
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
    wander() {
        if (frame.c == 0) {
            setTimeout(() => {
                this.randomCount++
                if (this.randomCount == 1) {
                    this.randomPosition[0] = 2 * this.wanderRange[0] * Math.random() - this.wanderRange[0]
                    this.randomPosition[1] = 2 * this.wanderRange[1] * Math.random() - this.wanderRange[1]
                    this.randomCount = 0
                }
            }, 2000 * Math.random());//错开运动
        }
        var x = this.staticPosition[0] + this.randomPosition[0]
        var y = this.staticPosition[1] + this.randomPosition[1]
        this.moveTo(x, y, 1)
        Effects.linkto({ x, y }, this, 0, "yellow")

    }
    /**
     * 警卫圈
     */
    guardingCircle() {
        // 玩家进入警卫圈  游荡/回家->跟随
        if ((this.status == 0 || this.status == 3) && P2Pdistance(player1.x, player1.y, this.x, this.y)
            <= Zombie.guardingRadius) {
            this.status = 1//跟随
        }
        // 玩家逃出追击圈  跟随->回家
        if (this.status == 1 && P2Pdistance(player1.x, player1.y, this.x, this.y)
            >= Zombie.chasingDistance) {
            this.status = 3 //回家
        }
        // 仇恨->回家
        if (this.status == 2 && this.angreTimer == Zombie.angreTime) {
            this.status = 3//脱离仇恨 回家
            this.alanger = false
            this.imgp = Zombie.imgnomal
        }
        //接近出生点时 回家->游荡
        if (this.status == 3 && P2Pdistance(this.x, this.y, this.staticPosition[0],
            this.staticPosition[1]) < Math.sqrt(this.wanderRange[0] ** 2 + this.wanderRange[1] ** 2)) {
            this.status = 0
        }
        switch (this.status) {
            case 0://游荡
                this.wander()
                break;
            case 1://跟随
                super.moveTo(player1.x, player1.y, Zombie.speed)
                if (config.showLink) { Effects.linkto({ x: player1.x, y: player1.y }, this, 0, "blue") }
                break;
            case 2://仇恨  //寻路
                if (!this.alanger) { audio.anger.play() }
                this.alanger = true// 发声音flag
                if (frame.c == 0) { this.angreTimer++ }//仇恨计时
                this.imgp = Zombie.imgrage
                // super.moveTo(player1.x, player1.y, Zombie.speed * 1.5)
                this.findWay(player1)
                // if (config.showLink) { Effects.linkto({ x: player1.x, y: player1.y }, this, 0, "red") }
                break;
            case 3://回家 //寻路
                var x = this.staticPosition[0]
                var y = this.staticPosition[1]
                this.moveTo(x, y, 1)
                Effects.linkto({ x, y }, this, 0, "green")
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
            this.ctx.strokeStyle = 'blue';
            this.ctx.arc(this.x, this.y, Zombie.chasingDistance, 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.strokeStyle = 'black';
        }
        if (config.showwanderRange) {
            this.ctx.beginPath();//游荡圈
            this.ctx.fillStyle = 'rgba(200,200,100,0.2)';
            this.ctx.rect(this.staticPosition[0] - this.wanderRange[0],
                this.staticPosition[1] - this.wanderRange[1],
                this.wanderRange[0] * 2, 2 * this.wanderRange[1]);
            this.ctx.fill();

            // this.ctx.font = "20px none"//仇恨倒计时 
            // this.ctx.fillStyle = "black"
            // this.ctx.fillText("仇恨计时" + this.angreTimer + "/" + Zombie.angreTime, this.x + this.w / 1.5, this.y)
        }
    }
    findWay(obj: any) {//寻路 到达obj
        var canreach = 0
        Wall.walllist.forEach((e: any) => {
            if (!lineIntersect(e.p, [obj.x, obj.y, this.x, this.y])) {
                canreach += 1
            }
        })
        if (Wall.walllist.length == canreach) {
            // super.moveTo(player1.x, player1.y, Zombie.speed)
            Effects.linkto(player1, this, 0)
            return
        }
        var A: any = Wall.reachableNode(this)//怪物可达节点
        var B: any = Wall.reachableNode(obj)//玩家可达节点
        var min = 10000
        var path: any = []
        // console.log(A, B);

        for (let i = 0; i < A.length; i++) {
            for (let j = 0; j < B.length; j++) {
                var result = dijkstra(Wall.adjMatrix, A[i].key, B[j].key)
                var disnode = result[1]//两个节点距离
                var alldist = disnode + A[i].distence + B[j].distence
                if (alldist < min) {
                    min = alldist
                    path = result[0]
                }
            }
        }
        console.log(path, min);

        for (let i = 0; i < path.length - 1; i++) {
            Effects.linkto({
                x: Wall.nodeCoords[path[i]][0],
                y: Wall.nodeCoords[path[i]][1]
            }, {
                x: Wall.nodeCoords[path[i + 1]][0],
                y: Wall.nodeCoords[path[i + 1]][1]
            }, 0)
        }
        Effects.linkto(this, {
            x: Wall.nodeCoords[path[0]][0],
            y: Wall.nodeCoords[path[0]][1]
        }, 0)
        Effects.linkto(player1, {
            x: Wall.nodeCoords[path[path.length - 1]][0],
            y: Wall.nodeCoords[path[path.length - 1]][1]
        }, 0)

    }
    hurt(damage: number, knockDistance?: number, direction?: "left" | "right" | "up" | "down") {//伤害值，击退距离
        this.HP -= damage
        audio.behit.play()
        this.status = 2 //产生仇恨
        this.angreTimer = 0 //刷新仇恨计时
        this.beenKnockBack(this.x, this.y, knockDistance, direction)//击退
        Effects.list.push(new Effects.blast(this.ctx, this.x, this.y))
        Effects.list.push(new Effects.damText(this.ctx, this.x, this.y, "- " + damage, 1000))
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
            let d: Zombie = new Zombie(ctx, 100 + Math.floor(Math.random() * (canvas.width - 300)),
                100 + Math.floor(Math.random() * (canvas.height - 300)))
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
        if (Enemy.list.length == 0) {
            Enemy.init()
        }
    }
}

export { Enemy, Zombie }
