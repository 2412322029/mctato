/**
 * 物体绘制
 */
var canvas = document.getElementById('canvas');//获取画布元素
var ctx = canvas.getContext('2d');


var mousep = []//记录鼠标点击坐标
var onPressKey = new Set()//处于按下状态的按键

/**
 * 鼠标键盘事件
 */
function keyEvent() {
    $("#canvas").click (function(e){
         mousep = [e.offsetX, e.offsetY]
         console.log(mousep);
    });
    $(document).keydown(function (e) {
        if (!onPressKey.has(e.key.toLowerCase())) {
            onPressKey.add(e.key.toLowerCase())
            $("#onpress").html(Array.from(onPressKey).join("<br>"))
        }
    })
    $(document).keyup(function (e) {
        onPressKey.delete('alt')
        onPressKey.delete(e.key.toLowerCase())
        $("#onpress").html(Array.from(onPressKey).join("<br>"))
    })
}
keyEvent()

//对象创建

// var a = new baseCircle(ctx, 800, 600, 70)
var c = new baseSquare(ctx, 1500, 200)
var b = new player(ctx, 200, 200)
var d = new Creeper(ctx, 600, 600)

//渲染函数
function render() {
    ctx.clearRect(0, 0, 2000, 2000);//清除上一帧画面


    drawRenderArea(ctx)//显示渲染区域边框


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


        
        var sp = player.moveSpeed / Math.sqrt(2)
        if (onPressKey.has("a") && onPressKey.has("w")) {
            b.move(-sp, -sp)
        }else if (onPressKey.has("w") && onPressKey.has("d")) {
            b.move(sp, -sp)
        }else if (onPressKey.has("d") && onPressKey.has("s")) {
            b.move(sp, sp)
        }else if (onPressKey.has("s") && onPressKey.has("a")) {
            b.move(-sp, sp)
        }else if (onPressKey.has("w")) {
            b.move(0, -player.moveSpeed)
        }else if (onPressKey.has("s")) {
            b.move(0, player.moveSpeed)
        }else if (onPressKey.has("a")) {
            b.move(-player.moveSpeed, 0)
        }else if (onPressKey.has("d")) {
            b.move(player.moveSpeed, 0)
        }
        b.draw()
    }




}