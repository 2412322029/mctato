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
        this.HP = player.MaxHP
        this.MP = player.MaxMP
        this.stamina = player.Maxstamina //现在的体力
        this.isOnShooting = false
        this.alive = true
    }
    /**
     * 固有属性
     */
    static names = "我自己"

    static imgp = player.imgcenter//现在图像位置

    static imgcenter = [9, 0] //正常
    static imgflash = [9, 1] //变白
    static imgup = [9, 2] //朝上
    static imgleft = [9, 3] //朝左
    static imgright = [9, 4] //朝右
    static imgdown = [9, 5] //朝下

    static moveSpeed = 10 //实时移速
    static baseSpeed = 10 //基础移速
    static speedAdd = 5 //移速加成
    static MaxHP = 200 //基础血量
    static MaxMP = 100 //基础蓝量
    static Maxstamina = 40//体力上限(度数)(最高90)
    static staminaBurnRate = 8 //体力消耗速度（每0.5秒（30帧）减少这么多）
    static staminaRecoveryRate = 4 //体力恢复速度（每0.5秒（30帧）增加这么多）
    static canSpeedUp = true //能够加速

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

            super.drawImg(player.imgflash)


            this.showName(player.names)
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
            super.drawImg(player.imgp)
            super.showName(player.names)
            this.beenHit()
            this.checkHP()
            this.showRealTimeHP()
            this.showRealTimeMP()
            this.speedUp()
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
    /**
     * 显示实时血量
     */
    showRealTimeHP() {
        var HPpercent = this.HP / player.MaxHP
        this.ctx.fillStyle = "#1dcd26";
        this.ctx.fillRect(90, 40, player.MaxHP * HPpercent, 30);

        this.ctx.beginPath();
        this.ctx.rect(90, 40, player.MaxHP, 30);
        this.ctx.closePath();
        ctx.strokeStyle = "black";
        this.ctx.stroke();

        this.ctx.font = "30px none"
        this.ctx.fillStyle = "black";
        this.ctx.fillText("HP :", 20, 65)

        this.ctx.font = "20px none"
        this.ctx.fillStyle = "black";
        if (showHPMPtext) {
            this.ctx.fillText(this.HP + "/" + player.MaxHP, 100, 60)
        }


    }
    /**
     * 显示实时蓝量
     */
    showRealTimeMP() {
        var MPpercent = this.MP / player.MaxMP
        this.ctx.fillStyle = "#20c9ed";
        this.ctx.fillRect(90, 80, player.MaxMP * MPpercent, 30);

        this.ctx.beginPath();
        this.ctx.rect(90, 80, player.MaxMP, 30);
        this.ctx.closePath();
        ctx.strokeStyle = "black";
        this.ctx.stroke();

        this.ctx.font = "30px none"
        this.ctx.fillStyle = "black";
        this.ctx.fillText("MP :", 20, 105)
        if (showHPMPtext) {
            this.ctx.font = "20px none"
            this.ctx.fillStyle = "black";
            this.ctx.fillText(this.MP + "/" + player.MaxMP, 100, 100)
        }
    }
    /**
     * 显示实时体力
     */
    showRealTimeStamina() {
        var r = this.w + 30
        var per = player.Maxstamina * 2 / 360

        if (this.stamina <= player.Maxstamina / 4) {//1/4体力告警
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = "red";
            this.ctx.fillStyle = "red";
        } else {
            this.ctx.fillStyle = "orange";
        }

        this.ctx.beginPath();//绘制实时体力条
        this.ctx.arc(this.x,
            this.y, r, 0.25 * Math.PI, (0.25 - this.stamina * 2 / 360) * Math.PI, true)
        this.ctx.arc(this.x, this.y, r - 15,
            (0.25 - this.stamina * 2 / 360) * Math.PI, 0.25 * Math.PI, false)
        this.ctx.closePath();
        this.ctx.fill()


        this.ctx.beginPath();//根据体力上限绘制边框
        this.ctx.arc(this.x,
            this.y, r, 0.25 * Math.PI, (0.25 - per) * Math.PI, true)
        this.ctx.arc(this.x, this.y, r - 15,
            (0.25 - per) * Math.PI, 0.25 * Math.PI, false)
        this.ctx.closePath();
        this.ctx.shadowBlur = 0;//恢复样式

        this.ctx.strokeStyle = "black";//显示文字
        this.ctx.stroke();
        if (showHPMPtext) {
            this.ctx.font = "20px none"
            this.ctx.fillStyle = "black";
            this.ctx.fillText(this.stamina + "/" + player.Maxstamina,
                this.x + r + 25, this.y)
        }

    }
    move(vx, vy) {
        this.vx = vx
        this.vy = vy
        this.x += vx
        this.y += vy
        vy += 10
        this.draw()
    }
    shoot(weapon) {//武器
        player.throttle(() => {
            if (onPressKey.has("arrowright")) {
                var s = new weapon(this.ctx, this.x, this.y, 20, 20,'right')
                s.initvx = this.vx * player.ShootspeedLose
                s.initvy = this.vy * player.ShootspeedLose
                s.speedx = weapon.speed
                player.shootingList.push(s)
            } else if (onPressKey.has("arrowleft")) {
                var s = new weapon(this.ctx, this.x, this.y, 20, 20,'left')
                s.initvx = this.vx * player.ShootspeedLose
                s.initvy = this.vy * player.ShootspeedLose
                s.speedx = -weapon.speed
                player.shootingList.push(s)
            } else if (onPressKey.has("arrowup")) {
                var s = new weapon(this.ctx, this.x, this.y, 20, 20,'up')
                s.initvx = this.vx * player.ShootspeedLose
                s.initvy = this.vy * player.ShootspeedLose
                s.speedy = -weapon.speed
                player.shootingList.push(s)
            } else if (onPressKey.has("arrowdown")) {
                var s = new weapon(this.ctx, this.x, this.y, 20, 20,'down')
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
            if (sk.goneRenge > skul.range) {
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
            XYtest(Enemy.list, this).forEach(e => {
                if (e.alive) {
                    this.HP -= e.hitDamage
                    super.beenKnockBack(e.x, e.y, e.knockDistance)
                    player.isInvincible = true
                    setTimeout(() => {
                        player.isInvincible = false
                    }, player.invincibleTime)
                }
            })
        };
    }
    speedUp() {
        if (player.canSpeedUp && this.stamina >= 0) {//能够加速并且体力>=0
            this.showRealTimeStamina()//显示体力条
            if (onPressKey.has("shift")) { //按住了shift
                if (this.stamina >= player.Maxstamina / 4) {//最低加速体力阈值
                    player.moveSpeed = player.baseSpeed + player.speedAdd //基础移速+移速加成
                } else {
                    player.moveSpeed = player.baseSpeed //恢复基础移速
                }
                if (this.stamina != 0 & frameX4 % 2 < 1) {//每30帧减少
                    this.stamina--
                }
            } else {//没有按住shift（恢复体力状态）
                player.moveSpeed = player.baseSpeed //恢复基础移速
                if (this.stamina < player.Maxstamina) {
                    if (frameX4 % 2 < 1) {//每30帧恢复
                        this.stamina++
                    }
                }

            }
        }
    }
}
