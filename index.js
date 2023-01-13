/**
 * 游戏界面控制
 */


function gameStart() {
    if (!onrun) {
        onrun = true
        animloop()
        $("#manu").animate({ right: '-300px' });
        $("#cover").fadeOut()
    }
}
function gamePause() {
    onrun = false
    $("#manu").animate({ right: '0px' });
    $("#cover").fadeIn()
}

/**
 * 鼠标事件
 */
$("#gamestart").click(function (e) {
    gameStart()
})

var backpackopen = false //背包界面状态
var maunopen = true //菜单界面状态
$(document).keydown(function (e) {
    //关闭界面
    if (e.key == "Escape" && maunopen == true) {
        gameStart()
        maunopen = false
        return
    }
    //打开界面
    if (e.key == "Escape" && maunopen == false) {
        gamePause()
        maunopen = true
        return
    }
})
$(document).keydown(function (e) {
    //关闭界面-菜单界面必须关闭
    if (e.key == "b" && backpackopen == true && maunopen == false) {
        $("#backpack").fadeOut()
        onrun = true
        animloop()
        backpackopen = false
        return
    }
    //打开界面-菜单界面必须关闭
    if (e.key == "b" && backpackopen == false && maunopen == false) {
        $("#backpack").fadeIn()
        onrun = false
        backpackopen = true
        return
    }

})

const vm = new Vue({
    el: "#setting",
    data: {
        zoomRatio,
        showdebug,
        showHPMPtext,
        displayPosition,
        showHitBox,
        showGuardingCircle,
    },
    watch: {
        zoomRatio() {
            zoomRatio = this.zoomRatio
            localStorage.setItem("zoomRatio", zoomRatio);
            let w = zoomRatio * canvas.width + "px"
            let h = zoomRatio * canvas.height + "px"
            canvas.style.width = w
            canvas.style.height = h
            $("#hidemsg").text(w + " X " + h.slice(0, 9))
        },
        showdebug() {
            showdebug = this.showdebug
            localStorage.setItem("showdebug", showdebug);
        },
        showHPMPtext() {
            showHPMPtext = this.showHPMPtext
            localStorage.setItem("showHPMPtext", showHPMPtext);
        },
        displayPosition() {
            displayPosition = this.displayPosition
            localStorage.setItem("displayPosition", displayPosition);
        },
        showHitBox() {
            showHitBox = this.showHitBox
            localStorage.setItem("showHitBox", showHitBox);
        },
        showGuardingCircle() {
            showGuardingCircle = this.showGuardingCircle
            localStorage.setItem("showGuardingCircle", showGuardingCircle);
        },

    },
    methods: {
        xxxx1() {
            $("#manu").css({ "opacity": 0.5 })
        },
        xxxx2() {
            $("#manu").css({ "opacity": 1 })
        },
        readset() {
            this.zoomRatio = JSON.parse(localStorage.getItem("zoomRatio")) ?? 0.5;
            this.showdebug = JSON.parse(localStorage.getItem("showdebug")) ?? false;
            this.showHPMPtext = JSON.parse(localStorage.getItem("showHPMPtext")) ?? false;
            this.displayPosition = JSON.parse(localStorage.getItem("displayPosition")) ?? false;
            this.showHitBox = JSON.parse(localStorage.getItem("showHitBox")) ?? false;
            this.showGuardingCircle = JSON.parse(localStorage.getItem("showGuardingCircle")) ?? false;
        }
    },
    created() {
        this.readset()
    }

})


