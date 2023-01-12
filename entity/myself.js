/**
 * 玩家
 */
class player extends baseSquare {
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
        this.imgp = [9, 0]
        this.imgflash = [9, 1]

        this.HP = player.MaxHP
        this.MP = player.MaxMP
        this.isOnShooting = false
        this.alive = true
    }
    /**
     * 固有属性
     */
    static names = "我自己"
    static moveSpeed = 10
    static MaxHP = 200
    static MaxMP = 100
    static Maxshot = 30 //最大弹幕数量
    static shootingList = [] //弹幕队列
    static atShootInterval = false //是否处于射击间隔
    static ShootInterval = 100 //射击间隔(ms)
    static ShootspeedLose = 0.6 //弹幕初速度损失（带有n%的玩家速度）
    static invincibleTime = 1000 //无敌
    static isInvincible = false //处于无敌状态
    /**
    * 同时绘制名字
    * @returns self
    */
    draw() {
        if (player.isInvincible && frameX4 % 30 > 15) {

            super.drawImg(this.imgflash)


            super.showName(names)
            this.beenHit()
            this.checkHP()
            this.showRealTimeHP()
            this.showRealTimeMP()
            return
        }
        if (this.alive) {//如果没死
            var coordinate = ""
            if (displayPosition) {
                coordinate = `(${Math.floor(this.x)},${Math.floor(this.y)})`
            }
            var names = player.names + coordinate
            super.drawImg(this.imgp)
            super.showName(names)
            this.beenHit()
            this.checkHP()
            this.showRealTimeHP()
            this.showRealTimeMP()
        } else {
            // onrun = false
            if (confirm("死了，复活or重开")) {
                player1.HP = player.MaxHP
                player1.alive = true
                onPressKey = new Set()
                // onrun=true
            } else {
                alert(1)
            }
            //todo 重生选择界面
        }
        // if (condition) {

        // }

        return this
    }
    showRealTimeHP() {
        if (showHPMPtext) {
            this.ctx.font = "20px none"
            this.ctx.fillStyle = "black";
            this.ctx.fillText("HP: " + this.HP + "/" + player.MaxHP,
                this.x + this.w / 2 + 5, this.y + this.h / 2 + 25)
        }

        var HPpercent = this.HP / player.MaxHP
        this.ctx.fillStyle = "#1dcd26";
        this.ctx.fillRect(this.x - this.w / 2,
            this.y + this.h / 2 + 10, this.w * HPpercent, 15);

        this.ctx.beginPath();
        this.ctx.rect(this.x - this.w / 2, this.y + this.h / 2 + 10, this.w, 15);
        this.ctx.closePath();
        ctx.strokeStyle = "black";
        this.ctx.stroke();

    }
    showRealTimeMP() {
        if (showHPMPtext) {
            this.ctx.font = "20px none"
            this.ctx.fillStyle = "black";
            this.ctx.fillText("MP: " + this.MP + "/" + player.MaxMP,
                this.x + this.w / 2 + 5, this.y + this.h / 2 + 48)
        }

        var MPpercent = this.MP / player.MaxMP
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(this.x - this.w / 2,
            this.y + this.h / 2 + 30, this.w * MPpercent, 15);

        this.ctx.beginPath();
        this.ctx.rect(this.x - this.w / 2, this.y + this.h / 2 + 30, this.w, 15);
        this.ctx.closePath();
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
    }
    move(vx, vy) {
        this.vx = vx
        this.vy = vy
        this.x += vx
        this.y += vy
        vy+=10
        this.draw()
    }
    shoot(weapon) {
        player.throttle(() => {
            if (onPressKey.has("arrowright")) {
                var s = new weapon(this.ctx, this.x, this.y, 20, 20)
                s.initvx = this.vx * player.ShootspeedLose
                s.initvy = this.vy * player.ShootspeedLose
                s.speedx = weapon.speed
                player.shootingList.push(s)
            } else if (onPressKey.has("arrowleft")) {
                var s = new weapon(this.ctx, this.x, this.y, 20, 20)
                s.initvx = this.vx * player.ShootspeedLose
                s.initvy = this.vy * player.ShootspeedLose
                s.speedx = -weapon.speed
                player.shootingList.push(s)
            } else if (onPressKey.has("arrowup")) {
                var s = new weapon(this.ctx, this.x, this.y, 20, 20)
                s.initvx = this.vx * player.ShootspeedLose
                s.initvy = this.vy * player.ShootspeedLose
                s.speedy = -weapon.speed
                player.shootingList.push(s)
            } else if (onPressKey.has("arrowdown")) {
                var s = new weapon(this.ctx, this.x, this.y, 20, 20)
                s.initvx = this.vx * player.ShootspeedLose
                s.initvy = this.vy * player.ShootspeedLose
                s.speedy = weapon.speed
                player.shootingList.push(s)
            }
        }, player.ShootInterval / weapon.modify)

        if (player.shootingList.length >= player.Maxshot) {
            player.shootingList.shift()
        }
        player.shootingList.forEach(sk => {
            if (sk.goneRenge > sk.range) {
                sk.alive = false
            } else {
                sk.move(sk.speedx + sk.initvx, sk.speedy + sk.initvy)
            }
        });

    }
    // 函数节流（固定时间内无论触发几次，仅执行一次）
    static throttle(func, interval) {
        if (player.atShootInterval) {// 终止后续代码的执行
            return
        }
        player.atShootInterval = true
        setTimeout(async () => {
            func()
            player.atShootInterval = false
        }, interval)
    }
    /**
     * 检查血量并且纠正,判断死活
     */
    checkHP() {
        if (this.HP <= 0) {
            this.alive = false
            this.HP = 0
        } else if (this.HP >= this.MaxHP) {
            this.HP = this.MaxHP
        }
    }
    beenHit() {//
        if (this.alive) {
            if (player.isInvincible) {
                return
            }
            Enemy.list.forEach(e => {
                if (e.boxisInMe(this.x, this.y, this.w, this.h)) {
                    if (e.alive) {
                        this.HP -= e.hitDamage
                        player.isInvincible = true
                        setTimeout(() => {
                            player.isInvincible = false
                        }, player.invincibleTime)
                    }

                }
            })
        };
    }
}
