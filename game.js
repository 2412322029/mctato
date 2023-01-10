/**
 * 世界循环
 */

var onrun = false//是否在运行
var fps = 100//帧率


var fpsInterval = 1000 / fps
var last = new Date().getTime()
function animloop() {

    rafId = requestAnimationFrame(animloop);
    var now = new Date().getTime()
    var elapsed = now - last;
    if (elapsed > fpsInterval) {
        last = now - (elapsed % fpsInterval);
        render();//world.js中的渲染函数
        if (!onrun) {
            cancelAnimationFrame(rafId)
        }
    }


}
animloop();//开始

Popup.msg()


//更新界面数值显示1s一次
// setInterval(() => {
    

// }, 1000);

