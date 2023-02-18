/**
 * 物体绘制
 */
var canvas = document.getElementById('canvas') as HTMLCanvasElement;//获取画布元素
var ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
import { player } from "./entities/myself"
import { Enemy } from "./entities/enemy"
import { skul } from "./entities/catapult"
import { config, even } from "./config"
import { frame, showDebug } from "./game";

import { Wall } from "./entities/wall";
import { items } from "./entities/Items";
import { Effects } from "./effects";
export var onPressKey = new Set()//处于按下状态的按键
//对象创建

const player1 = new player(ctx, 150, 150)

Wall.init()
Enemy.init()

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
    Wall.drawall()
    Enemy.movement();
    items.loop()
    Effects.loop()
    var weapon = skul //使用武器为skul
    if (catapultspeedcontrol.on == true && frame.c%8 == 0) {
        catapultspeedcontrol.speed = weapon.speed
        player1.shootAllDirections(weapon, catapultspeedcontrol.vx, catapultspeedcontrol.vy)
    }
    player1.shoot(weapon)
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