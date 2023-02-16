<template>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount } from "vue"
import $ from "jquery"
import { imgload } from '../core/imgloader'
import { config } from "../core/config"
import { canvas, player1 } from '../core/world'
import { onrun, animloop } from '../core/game'

import * as dat from "dat.gui";
import { Howler } from "../core/audio"
import { dijkstra, lineIntersect } from "../core/math"
import { Wall } from "../core/entities/wall"
const gui = new dat.GUI({ closed: true });
gui.add(config, "zoomRatio", 0.3, 1.5).name("缩放比").onChange((value: number) => {
    var c = <HTMLCanvasElement>canvas;
    c.style.transform = `scale(${value})`;
    var b = <HTMLElement>document.getElementById("backg");
    b.style.transform = `scale(${value})`
})
gui.add(config, "showdebug").name("调试信息")
gui.add(config, "displayPosition").name("显示坐标")
gui.add(config, "showNameAbove").name("显示名字")
gui.add(config, "showHPMPtext").name("显示血条文字")
gui.add(config, "showHitBox").name("显示碰撞箱")
gui.add(config, "showGuardingCircle").name("显示警戒圈")
gui.add(config, "showLink").name("显示路径连线")
gui.add(config, "showwanderRange").name("显示游荡区域")
gui.add(onrun, "c").name("开始").onChange((value: boolean) => {
    animloop()
})
var vv = {
    v: 0.2
}
gui.add(vv, "v", 0, 1, 0.1,).name("音量").onChange((newv: any) => {
    Howler.volume(newv)
})

onBeforeMount(() => {
    imgload.init()
})

onMounted(() => {
    $("#backg").attr("src", imgload.bg.src);
    animloop()
})

console.log(dijkstra(Wall.adjMatrix, 0, 4))
// console.log(Wall.whoclosed({"x":1000,"y":200}))
// console.log(lineIntersect([0, 1, 1, 0], [0, 0, 1, 1]))
console.log(Wall.reachableNode({ "x": 0, "y": 500 }));







</script>

<style scoped>

</style>
