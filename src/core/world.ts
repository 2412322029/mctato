/**
 * 物体绘制
 */
var canvas = document.getElementById('canvas') as HTMLCanvasElement;//获取画布元素
var ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
import { player } from "./entities/myself"
import { config, even } from "./config"
import { frame, showDebug } from "./game";
import { Stage } from "./stage";
export var onPressKey = new Set()//处于按下状态的按键

var player1 = Stage.init()//场景初始化

var playerspeedcontrol = {
    vx: 0,
    vy: 0,
    set(vx: number, vy: number) {
        playerspeedcontrol.vx = vx
        playerspeedcontrol.vy = vy
    }
}
var catapultspeedcontrol = {
    vx: 0,
    vy: 0,
    on: false,
    speed: 0,
    set(vx: number, vy: number) {
        catapultspeedcontrol.vx = vx
        catapultspeedcontrol.vy = vy
    }
}

//渲染函数
function render() {
    ctx.clearRect(0, 0, 2000, 2000);//清除上一帧画面

    Stage.run()//场景开始

    if (catapultspeedcontrol.on == true && frame.c % 8 == 0) {
        catapultspeedcontrol.speed = player1.weapon.speed
        player1.shootAllDirections(player1.weapon, catapultspeedcontrol.vx, catapultspeedcontrol.vy)
    }
    player1.move(playerspeedcontrol.vx, playerspeedcontrol.vy)
    if (!even.showcontroler
        && !onPressKey.has("a")
        && !onPressKey.has("w")
        && !onPressKey.has("s")
        && !onPressKey.has("d")) {
        playerspeedcontrol.set(0, 0)
        player.imgp = player.imgcenter
    }

    if (config.showdebug) {
        showDebug(ctx)
    }
}

export { render, canvas, ctx, player1, playerspeedcontrol, catapultspeedcontrol };