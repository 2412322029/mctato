<template>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import "../js/world.js"
import "../js/game.js"
import {config} from "../js/config.js"
import {canvas } from '../js/world.js'
import { onrun,animloop } from '../js/game'
import * as dat from "dat.gui";
const gui = new dat.GUI();
gui.add(config, "zoomRatio", 0.3,1.5).onChange((value:number)=>{
    var c=canvas as HTMLCanvasElement;
    c.style.transform = `scale(${value})`
})
gui.add(config, "displayPosition")
gui.add(config, "showHPMPtext")
gui.add(config, "showHitBox")
gui.add(config, "showGuardingCircle")
gui.add(config, "showdebug")
gui.add(onrun,"c").name("开始").onChange((value:boolean)=>{
    animloop()
})

onMounted:()=>{
    
}
</script>

<style scoped>

</style>
