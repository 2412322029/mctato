/**
 * 物体绘制
 */
var canvas = document.getElementById('canvas') as HTMLCanvasElement;//获取画布元素
var ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
import { player } from "./myself"
import { Enemy } from "./enemy"
import { skul } from "./catapult"
import { config } from "./config"
import { showDebug } from "./game";
import $ from 'jquery'
import { imgload } from './imgloader'
import { Wall } from "./wall";
//对象创建

const player1 = new player(ctx, 150, 150)

Wall.init()
Enemy.init()

var onPressKey = new Set()//处于按下状态的按键
function keyEvents() {
    $(document).on("keydown", function (e: { key: string; }) {
        if (!onPressKey.has(e.key.toLowerCase())) {
            onPressKey.add(e.key.toLowerCase())
        }
    })
    $(document).on("keyup", function (e: { key: string; }) {
        onPressKey.delete('alt')
        onPressKey.delete(e.key.toLowerCase())
    })
}
keyEvents()

//渲染函数
function render() {
    ctx.clearRect(0, 0, 2000, 2000);//清除上一帧画面
    ctx.drawImage(imgload.bg, 0, 0, 2000, 1125, 0, 0, 2000, 1125)
    Wall.drawall()
    Enemy.movement();
    
    //键盘按键触发事件,多按键放在单按键前面 ，控制按键放最前
    {
        player1.shoot(skul)//人物行为切换
        //人物移动
        var vx = 0
        var vy = 0
        var sp = player.moveSpeed / Math.sqrt(2)
        if (onPressKey.has("a") && onPressKey.has("w") && onPressKey.has("d")) {
            vy = -player.moveSpeed
        } else if (onPressKey.has("a") && onPressKey.has("s") && onPressKey.has("d")) {
            vy = player.moveSpeed
        } else if (onPressKey.has("a") && onPressKey.has("w")) {
            vx = -sp
            vy = -sp
        } else if (onPressKey.has("w") && onPressKey.has("d")) {
            vx = sp
            vy = -sp
        } else if (onPressKey.has("d") && onPressKey.has("s")) {
            vx = sp
            vy = sp
        } else if (onPressKey.has("s") && onPressKey.has("a")) {
            vx = -sp
            vy = sp
        } else if (onPressKey.has("s") && onPressKey.has("w")) {
            vy = 0
        } else if (onPressKey.has("a") && onPressKey.has("d")) {
            vx = 0
        } else if (onPressKey.has("w")) {
            player.imgp = player.imgup
            vy = -player.moveSpeed
        } else if (onPressKey.has("s")) {
            player.imgp = player.imgdown
            vy = player.moveSpeed
        } else if (onPressKey.has("a")) {
            player.imgp = player.imgleft
            vx = -player.moveSpeed
        } else if (onPressKey.has("d")) {
            player.imgp = player.imgright
            vx = player.moveSpeed
        } else {
            player.imgp = player.imgcenter
            player1.draw()
        }
        player1.move(vx, vy)
        //

    }
    if (config.showdebug) {
        showDebug(ctx)
    }
}

export { render, canvas, ctx, player1, onPressKey };