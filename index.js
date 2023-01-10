/**
 * 游戏界面控制
 */


function gameStart() {
    if (!onrun) {
        onrun = true
        animloop()
    }
}
function gamePause() {
    onrun = false
}

/**
 * 鼠标事件
 */
$("#gamestart").click(function (e) {
    $("#gamestart").animate({ opacity: "0.5" });
    $("#gamepause").animate({ opacity: "1" });
    gameStart()
})

$("#gamepause").click(function (e) {
    $("#gamepause").animate({ opacity: "0.5" });
    $("#gamestart").animate({ opacity: "1" });
    gamePause()
})


