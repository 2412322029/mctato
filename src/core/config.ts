var config = {
    zoomRatio: 1,//默认缩放比
    displayPosition: false, //显示坐标
    showHPMPtext: true,//显示血条文字
    showdebug: false,
    showHitBox: false,//显示碰撞箱
    showGuardingCircle: false,//显示警戒圈
    showNameAbove: false, //显示名字
    showLink: true, //显示路径连线
    showwanderRange: true, //显示游荡区域
    showcontroler: true, //显示控件
    Stick_offset_affects_speed: true, //摇杆偏移量影响速度

}

var strconfig = localStorage.getItem("config")
if (strconfig != undefined) {
    config = JSON.parse(strconfig)
} else {
    localStorage.setItem("config", JSON.stringify(config))
}

Object.keys(config).forEach(function (key) {
    // @ts-ignore
    var value = config[key];
    Object.defineProperty(config, key, {
        get: function () {
            return value;
        },
        set: function (newValue) {
            value = newValue;
            localStorage.setItem("config", JSON.stringify(config))
        }
    });
});


export { config }