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

        this.HP = player.MaxHP
        this.MP = player.MaxMP
        this.isOnShooting = false
    }
    /**
     * 固有属性
     */
    static names = "我自己"
    static moveSpeed = 10
    static MaxHP = 200
    static MaxMP = 100
    static Maxshot = 100 //最大弹幕数量
    static shootingList = [] //弹幕队列

    static lasttime = new Date().getTime()
    /**
    * 同时绘制名字
    * @returns self
    */
    draw() {
        var coordinate = ""
        if (displayPosition) {
            coordinate = `(${Math.floor(this.x)},${Math.floor(this.y)})`
        }
        var names = player.names + coordinate
        super.drawImg(this.imgp)
        super.showName(names)
        this.showRealTimeHP()
        this.showRealTimeMP()
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
    shootSk() {
        

            if (onPressKey.has("arrowright")) {
                var s = new skul(this.ctx, this.x, this.y, 20, 20)
                s.speedx = skul.speed
                player.shootingList.push(s)
            } else
                if (onPressKey.has("arrowleft")) {
                    var s = new skul(this.ctx, this.x, this.y, 20, 20)
                    s.speedx = -skul.speed
                    player.shootingList.push(s)
                } else
                    if (onPressKey.has("arrowup")) {
                        var s = new skul(this.ctx, this.x, this.y, 20, 20)
                        s.speedy = -skul.speed
                        player.shootingList.push(s)
                    } else
                        if (onPressKey.has("arrowdown")) {
                            var s = new skul(this.ctx, this.x, this.y, 20, 20)
                            s.speedy = skul.speed
                            player.shootingList.push(s)
                        } else
                            if (player.shootingList.length >= player.Maxshot) {
                                player.shootingList.shift()
                            }
            player.shootingList.forEach(sk => {
                if (sk.goneRenge > sk.range) {
                    sk.alive = false
                } else {
                    sk.move(sk.speedx, sk.speedy)
                }
            });
        
    }
}
