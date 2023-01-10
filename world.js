/**
 * 物体绘制
 */
var canvas = document.getElementById('canvas');//获取画布元素
var ctx = canvas.getContext('2d');



//对象创建

// var a = new baseCircle(ctx, 800, 600, 70)
var c = new baseSquare(ctx, 1500, 200)
var b = new player(ctx, 200, 200)


var d = new Creeper(ctx, 600, 600)

// var sk = new skul(ctx, 100, 100, 10, 10)

//渲染函数
function render() {
    ctx.clearRect(0, 0, 2000, 2000);//清除上一帧画面



    drawRenderArea(ctx)//显示渲染区域边框
    b.shootSk()
    // sk.move()

    // a.draw().showName()
    c.draw()
    d.draw()

    // b.moveTo(mousep[0] * 2, mousep[1] * 2, 10)
    // if (b.isInMe(mousep[0] * 2, mousep[1] * 2)) {
    //     console.log("点击了b");

    // mousep = []
    // }
    // console.log(b.getPosition())


    //键盘按键触发事件,多按键放在单按键前面 ，控制按键放最前
    {
        if (onPressKey.has("shift")) {
            player.moveSpeed = 20
            $("#playerspeed").text("速度:" + player.moveSpeed)
        } else {
            player.moveSpeed = 10
            $("#playerspeed").text("速度:" + player.moveSpeed)
        }


        //TODO 先计算速度矢量，最后move 
        var vx = 0
        var vy = 0
        var sp = player.moveSpeed / Math.sqrt(2)
        if (onPressKey.has("a") && onPressKey.has("w") && onPressKey.has("d")) {
            vy = -player.moveSpeed
        } else if (onPressKey.has("a") && onPressKey.has("s") && onPressKey.has("d")) {
            vy = player.moveSpeed
        } else if (onPressKey.has("a") && onPressKey.has("w")) {
            vx = -sp
            vy = -sp
        } else if (onPressKey.has("w") && onPressKey.has("d")) {
            vx = sp
            vy = -sp
        } else if (onPressKey.has("d") && onPressKey.has("s")) {
            vx = sp
            vy = sp
        } else if (onPressKey.has("s") && onPressKey.has("a")) {
            vx = -sp
            vy = sp
        } else if (onPressKey.has("s") && onPressKey.has("w")) {
            vy = 0
        } else if (onPressKey.has("a") && onPressKey.has("d")) {
            vx = 0
        } else if (onPressKey.has("w")) {
            vy = -player.moveSpeed
        } else if (onPressKey.has("s")) {
            vy = player.moveSpeed
        } else if (onPressKey.has("a")) {
            vx = -player.moveSpeed
        } else if (onPressKey.has("d")) {
            vx = player.moveSpeed
        } else {
            b.draw()
        }
        b.move(vx, vy)
        //



    }

}