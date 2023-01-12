/**
 * 世界循环
 */

var onrun = false//是否在运行
var fps = 100//帧率
var realTimefps = 0//实际fps
var lastCalledTime //上一帧时间

var fpsInterval = 1000 / fps
var last = new Date().getTime()
function animloop() {

    rafId = requestAnimationFrame(animloop);
    var now = new Date().getTime()
    var elapsed = now - last;
    if (elapsed > fpsInterval) {
        last = now - (elapsed % fpsInterval);
        render();//world.js中的渲染函数
        if(!lastCalledTime) {//计算实时帧率
            lastCalledTime = Date.now();
            realTimefps = 0;
            return;
         }
        var delta =1000 / (Date.now() - lastCalledTime);
        lastCalledTime = Date.now();
        realTimefps =Math.floor(delta);
        controlframeload = false

        if (!onrun) {
            cancelAnimationFrame(rafId)
        }
    }


        


   
   


}
animloop();//开始

function showDebug(ctx) {
    var fontSize = 25
    ctx.font = fontSize + "px Arial";
    ctx.shadowColor = "black";
    ctx.fillStyle = "black";
    eachmsg = [
        "fps: " + realTimefps,
        "速度：" + player.moveSpeed,
        "按键：" + Array.from(onPressKey).join(","),
        "玩家信息------------",
        "   名称: " + player.names,
        "   移动速度: " + player.moveSpeed,
        "   血量上限: " + player.MaxHP,
        "   MaxMP: " + player.MaxMP,
        "   最大弹幕数: " + player.Maxshot,
        "   显示弹幕数：" + player.shootingList.length,
        "   射击间隔: " + player.ShootInterval + " ms",
        "   弹幕初速度损失: " + player.ShootspeedLose,
        "   是否无敌: "+ player.isInvincible,
        "世界信息------------",
        "   怪物数量: "+ Enemy.list.length,
    ]
    eachmsg.forEach((msg, index) => {
        ctx.fillText(msg, 10, 40 + fontSize * index + 5)
    });

}

// Popup.msg()


//更新界面数值显示1s一次
// setInterval(() => {
    

// }, 1000);

