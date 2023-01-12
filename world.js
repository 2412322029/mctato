/**
 * 物体绘制
 */
var canvas = document.getElementById('canvas');//获取画布元素
var ctx = canvas.getContext('2d');
var frameX4 = 0;


//对象创建

var player1 = new player(ctx, 200, 200)

Enemy.init()
for (let i = 0; i < 2; i++) {
    Enemy.init()
    
}

// var sk = new skul(ctx, 100, 100, 10, 10)

//渲染函数
function render() {
    frameX4++
    if (frameX4 == fps * 4) {
        frameX4 = 0
    }


    ctx.clearRect(0, 0, 2000, 2000);//清除上一帧画面

    drawRenderArea(ctx)//显示渲染区域边框



    player1.shoot(skul)
    Enemy.movement()


    //键盘按键触发事件,多按键放在单按键前面 ，控制按键放最前
    {
        if (onPressKey.has("shift")) {
            player.moveSpeed = 20
        } else {
            player.moveSpeed = 10
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
            player1.draw()
        }
        player1.move(vx, vy)
        //



    }

    showDebug(ctx)
}