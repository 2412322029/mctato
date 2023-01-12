
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
class Zombie extends baseSquare {
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
        this.HP = Zombie.MaxHP
        this.hitDamage = 10
        this.alive = true
        this.knockDistance = this.w / 2//击退距离
        this.status = 0 //状态 0游荡/1跟随/2仇恨

        this.imgp=Zombie.imgnomal//现在图像位置
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
            if (displayPosition) {
                coordinate = `(${Math.floor(this.x)},${Math.floor(this.y)})`
            }
            var names = Zombie.names + coordinate
            this.checkHP()
            super.drawImg(this.imgp)
            super.showName(names)
            this.showRealTimeHP()
            this.guardingCircle()
        }
        return this
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

        if (showHPMPtext) {//血条文字
            this.ctx.font = "16px none"
            this.ctx.fillStyle = "black";
            this.ctx.fillText(Math.floor(this.HP),
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
        if (this.HP == NaN) {
            this.HP = 0
            this.alive = false
        }

        if (this.HP <= 0) {
            this.HP = 0
            this.alive = false
        } else if (this.HP >= this.MaxHP) {
            this.HP = this.MaxHP
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
                this.imgp = Zombie.imgrage
                // console.log(2);
                super.moveTo(player1.x, player1.y, Zombie.speed * 2)

                break;
            default:
                break;
        }
        if (showGuardingCircle) {
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
}

class Enemy {
    static list = []
    static init() {
        for (let i = 0; i < 5; i++) {
            var d = new Zombie(ctx, Math.floor(Math.random() * renderArea[2]),
                Math.floor(Math.random() * renderArea[3]))
            Enemy.list.push(d)
        }

    }
    static movement() {
        Enemy.list.forEach((e, index) => {
            if (e.alive) {
                e.draw()
            } else {
                Enemy.list.splice(index, 1)
            }

        });
    }
}
