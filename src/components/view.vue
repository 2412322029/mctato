<template>
    <div id="shupin">
        <div>请横屏显示</div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount } from "vue"
import $ from "jquery"
import { imgload } from '../core/utils/imgloader'
import { animloop } from '../core/game'
import '../core/utils/gui'
import { reloadconfig } from "../core/utils/gui"

onBeforeMount(() => {
    imgload.init()

})

onMounted(() => {
    $("#backg").attr("src", imgload.bg.src);
    reloadconfig()
})







</script>

<style scoped>
#shupin {
    z-index: 10000;
    background-color: black;
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
}


@media screen and (orientation: portrait) {

    /*竖屏 css*/
    #shupin {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

@media screen and (orientation: landscape) {

    /*横屏 css*/
    #shupin {
        display: none;
    }


}
</style>
