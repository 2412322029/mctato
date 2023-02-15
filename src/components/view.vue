<template>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import $ from "jquery"
import { imgload } from '../core/imgloader'
// import "../core/world"
// import "../core/game"
import { config } from "../core/config"
import { canvas } from '../core/world'
import { canvas2,Effects,ctx2 } from "../core/effects"
import { onrun, animloop } from '../core/game'

import * as dat from "dat.gui";
const gui = new dat.GUI();
gui.add(config, "zoomRatio", 0.3, 1.5).onChange((value: number) => {
    var c = <HTMLCanvasElement>canvas;
    c.style.transform = `scale(${value})`;
    var c2 = <HTMLCanvasElement>canvas2;
    c2.style.transform = `scale(${value})`;
    var b = <HTMLElement>document.getElementById("backg");
    b.style.transform = `scale(${value})`
})
gui.add(config, "displayPosition")
gui.add(config, "showHPMPtext")
gui.add(config, "showHitBox")
gui.add(config, "showGuardingCircle")
gui.add(config, "showdebug")
gui.add(config, "showNameAbove")
gui.add(onrun, "c").name("开始").onChange((value: boolean) => {
    animloop()
})

imgload.init()
animloop()

onMounted(() => {
    $("#backg").attr("src",imgload.bg.src);
})







</script>

<style scoped>

</style>
