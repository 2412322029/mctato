const config = {
    zoomRatio: 1,//默认缩放比
    displayPosition: false, //显示坐标
    showHPMPtext: true,//显示血条文字
    showdebug: false,
    showHitBox: false,//显示碰撞箱
    showGuardingCircle: false,//显示警戒圈
    showNameAbove: false, //显示名字
    showLink: false, //显示路径连线
    showwanderRange: false, //显示游荡区域
    Stick_offset_affects_speed: true, //摇杆偏移量影响速度

}
const even = {
    showcontroler: false, //显示控件
    userAgent_pc: true,
}

const setting = {
    debug: false, //dat.gui控件
    volumes: 0.2, //音量
    showHPMPtext: true,//显示血条文字
    Stick_offset_affects_speed: true, //摇杆偏移量影响速度
    fps:60,
}

export { config, even, setting }