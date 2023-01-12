/**
 * 鼠标键盘事件
 */
var mousep = []//记录鼠标点击坐标
var onPressKey = new Set()//处于按下状态的按键
function keyEvent() {
    $("#canvas").click(function (e) {
        mousep = [e.offsetX, e.offsetY]
        console.log(mousep);
    });
    $(document).keydown(function (e) {
        if (!onPressKey.has(e.key.toLowerCase())) {
            onPressKey.add(e.key.toLowerCase())
           
        }
    })
    $(document).keyup(function (e) {
        onPressKey.delete('alt')
        onPressKey.delete(e.key.toLowerCase())
    })
}
keyEvent()