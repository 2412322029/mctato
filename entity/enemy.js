
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
        this.HP = Creeper.MaxHP
        this.hitDamage = 10
        this.alive = true
    }
    /**
     * 固有属性
     */
    static names = "苦力怕"
    static MaxHP = 200
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
            var names = Creeper.names + coordinate
            this.checkHP()
            super.drawImg(this.imgp)
            super.showName(names)
            this.showRealTimeHP()
        }


        return this
    }
    showRealTimeHP() {
        var HPpercent
        if (this.HP < 0) {
            HPpercent = 0
        } else if (this.HP > Creeper.MaxHP) {
            HPpercent = 1
        } else {
            HPpercent = this.HP / Creeper.MaxHP
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
            this.ctx.fillText("/ " + Creeper.MaxHP,
                this.x - this.w / 2 + 50,
                this.y + this.h / 2 + 24)
        }

    }
    /**
     * 检查血量并且纠正
     */
    checkHP() {
        if(this.HP == NaN){
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
}

class Enemy {
    static list = []
    static init() {
        for (let i = 0; i < 10; i++) {
            var d = new Creeper(ctx, Math.floor(Math.random() * 2000),
                Math.floor(Math.random() * 2000))
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
