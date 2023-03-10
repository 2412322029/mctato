import { config, even } from "../config"
import { canvas } from '../world'
import * as dat from "dat.gui";
import $ from 'jquery'

const reloadconfig = () => {
    var c = <HTMLCanvasElement>canvas;
    c.style.transform = `scale(${config.zoomRatio})`;
    var b = <HTMLElement>document.getElementById("backg");
    b.style.transform = `scale(${config.zoomRatio})`
    if (!even.showcontroler) {
        $("#phone").hide()
    } else {
        $("#phone").show()
    }
}
window.onload = () => {
    var userAgent = window.navigator.userAgent;
    if (userAgent.match(/Android|iPhone|iPad|iPod/i)) {
        // 移动端
        even.userAgent_pc = false
        even.showcontroler = true
    } else {
        // PC 端
        even.userAgent_pc = true
        even.showcontroler = false
    }
    config.zoomRatio = document.body.offsetHeight / 675 //大小适配
    reloadconfig() //载入配置
    window.addEventListener("resize", () => {
        config.zoomRatio = document.body.offsetHeight / 675
        reloadconfig()
    })


}

const gui = new dat.GUI({ closed: true });
gui.hide()
gui.add(config, "zoomRatio", 0.3, 1.5).name("缩放比").onChange(() => { reloadconfig() })
gui.add(config, "showdebug").name("调试信息")
gui.add(config, "displayPosition").name("显示坐标")
gui.add(config, "showNameAbove").name("显示名字")
gui.add(config, "showHPMPtext").name("显示血条文字")
gui.add(config, "showHitBox").name("显示碰撞箱")
gui.add(config, "showGuardingCircle").name("显示警戒圈")
gui.add(config, "showLink").name("显示路径连线")
gui.add(config, "showwanderRange").name("显示游荡区域")
gui.add(config, "Stick_offset_affects_speed").name("摇杆偏移量影响速度")
gui.add(even, "showcontroler").name("显示遥杆").onChange(() => { reloadconfig() })


var ccc = {
    full: () => {
        //@ts-ignore
        document.documentElement.webkitRequestFullScreen();
        console.log(1);
    }
}
gui.add(ccc, "full",).name("全屏")

function syntaxHighlight(json:any) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 4);
    }
    json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match:any) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

export { gui, reloadconfig,syntaxHighlight }