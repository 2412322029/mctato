<template>
</template>

<script setup lang="ts">

import { imgload } from '../core/imgloader'
import "../core/world"
import "../core/game"
import { config } from "../core/config"
import { canvas } from '../core/world'
import { onrun, animloop } from '../core/game'

import * as dat from "dat.gui";
const gui = new dat.GUI();
gui.add(config, "zoomRatio", 0.3, 1.5).onChange((value: number) => {
    var c = canvas as HTMLCanvasElement;
    c.style.transform = `scale(${value})`
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









</script>

<style scoped>

</style>
