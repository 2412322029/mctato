<template>
    <div id="cover">
        <div id="start" @click="start()">
            开始</div>
        <div id="menu">
            <div id="menu_left">
                <div v-for="name, index in tabname" @click="id = index" :class="{ active: id == index }">{{ name }}
                </div>
            </div>
            <div id="menu_content">
                <div v-show="id == 0" :name="tabname[0]">
                    <h2>{{ tabname[0] }}</h2>
                    <hr>
                    <div>
                        <button onclick="document.documentElement.webkitRequestFullScreen();">
                            全屏</button>
                        <button onclick="document.exitFullscreen();">
                            退出全屏</button>
                        <br>
                        操作方式：<br>
                        移动： a w s d<br>
                        射击： ↑ ↓ ← →<br>
                        加速： shift<br>
                        菜单： ESC<br>
                    </div>
                </div>
                <div v-show="id == 1" :name="tabname[1]">
                    <h2>{{ tabname[1] }}</h2>
                    <hr>
                    <div>
                        子弹： 凋零骷髅头 [8,0]
                        <div style="background: -800px 0px no-repeat;width: 100px; height: 100px;"
                            :style="{ backgroundImage: 'url(' + imgload.spirit.src + ')' }" alt="">
                        </div>
                        血包 [9,8]
                        <div style="background: -900px -800px no-repeat;width: 100px; height: 100px;"
                            :style="{ backgroundImage: 'url(' + imgload.spirit.src + ')' }" alt="">
                        </div>
                        map[10x10]
                        <div style="background: no-repeat;width: 100%; height: 1000px;zoom: 0.5;"
                            :style="{ backgroundImage: 'url(' + imgload.spirit.src + ')' }" alt="">
                        </div>
                    </div>
                </div>
                <div v-show="id == 2" :name="tabname[2]">
                    <h2>{{ tabname[2] }}</h2>
                    <hr>
                    <div>
                        HP: {{ player.MaxHP }}<br>
                        MP: {{ player.MaxMP }}<br>
                        体力上限: {{ player.Maxstamina }} <br>
                        体力恢复速度:{{ player.staminaRecoveryRate }} <br>
                        吸附距离:{{ player.adsorbentPosition }} <br>
                        吸附速度:{{ player.adsorbentSpeed }} <br>
                        基础移速: {{ player.baseSpeed }}<br>
                        实时移速: {{ player.moveSpeed }}<br>
                        移速加成: {{ player.speedAdd }}<br>
                        体力消耗速度: {{ player.staminaBurnRate }}点每30帧<br>
                        体力恢复速度: {{ player.staminaRecoveryRate }}点每30帧<br>
                        最大弹幕数: {{ player.Maxshot }}<br>
                        射击间隔: {{ player.ShootInterval }} ms<br>
                        弹幕初速度损失: {{ player.ShootspeedLose }}<br>
                    </div>
                </div>
                <div v-show="id == 3" :name="tabname[3]">
                    <h2>{{ tabname[3] }}</h2>
                    <hr>
                    <div>
                        <div style="margin: 10px 20px 10px 0;">
                            帧率限制:
                            <select name="" id="" v-model.number="settings.fps">
                                <option value="30">30</option>
                                <option value="60">60</option>
                                <option value="90">90</option>
                                <option value="144">144</option>
                            </select>
                        </div>

                        <h4>轮盘设置</h4>
                        <p>左轮盘</p>
                        左 0<input type="range" min="0" max="50" v-model="wz.L.left">{{ wz.L.left }}%
                        底 0<input type="range" min="0" max="100" v-model="wz.L.bottom">{{ wz.L.bottom }}%
                        <button @click="wz.L.left = 15; wz.L.bottom = 20">重置</button>
                        <p>右轮盘</p>
                        右 0<input type="range" min="0" max="50" v-model="wz.R.right">{{ wz.R.right }}%
                        底 0<input type="range" min="0" max="100" v-model="wz.R.bottom">{{ wz.R.bottom }}%
                        <button @click="wz.R.right = 15; wz.R.bottom = 20">重置</button>
                        <br>
                        音量:0<input type="range" min="0" max="1" step="0.01" v-model="settings.volumes">{{ settings.volumes
                        }}
                        <br>
                        <button @click="$(gui.domElement).toggle()">打开调试面板</button>
                        <br>
                        <br>
                        <button @click="Stage.restage(stageMaps.maplist[0])">换关1</button>
                        <button @click="Stage.restage(stageMaps.maplist[1])">换关2</button>
                        <br>
                        <br>

                    </div>
                </div>
                <div v-show="id == 4" :name="tabname[4]">
                    <h2>{{ tabname[4] }}</h2>
                    <hr>
                    <div>
                        <a href="https://github.com/2412322029/mctato" target="_blank">
                            https://github.com/2412322029/mctato</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import $ from "jquery"
import { reactive, ref, watch } from "vue";
import { config, setting } from "../core/config";
import { toggleRun } from "../core/game";
import { gui } from "../core/utils/gui";
import { player } from "../core/entities/myself";
import { imgload } from "../core/utils/imgloader";
import { Enemy } from "../core/entities/enemy";
import { Howler } from "../core/utils/audio";
import { Stage } from "../core/stage";
import { stageMaps } from "../core/utils/stageloader";
$(document).on("keydown", (e) => {
    if (e.key == "Escape") {
        start()
    }
})
function start() {
    $("#cover").fadeToggle({ duration: 300, })
    toggleRun()
}
var tabname = ["home", "背包", "人物", "设置", "关于"]
var id = ref(0)
var settings = reactive(setting)
watch(settings, (e) => {
    Howler.volume(e.volumes)
}, { deep: true })

var wz = reactive({
    L: {
        bottom: 20,
        left: 15
    },
    R: {
        bottom: 20,
        right: 15
    }
})
watch(wz, (e) => {
    $("#leftControler>div").css({ bottom: e.L.bottom + "%" })
    $("#leftControler>div").css({ left: e.L.left + "%" })
    $("#rightControler>div").css({ bottom: e.R.bottom + "%" })
    $("#rightControler>div").css({ right: e.R.right + "%" })

}, { deep: true })

</script>
<style scoped>
#cover {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #00000079;
    backdrop-filter: blur(10px);
    z-index: 1000;
    font-style: italic;
}

#menu {
    display: flex;
    margin: 1em;
}

#menu_left {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: 100vh;
    width: 150px;
    overflow-y: auto;
    overflow-x: hidden;
    border-right: rgba(224, 223, 223, 0.661) solid 1px;
}

#menu_left>div {
    border-left: rgba(224, 223, 223, 0) solid 2px;

    cursor: pointer;
    padding: 20px 0px 20px;
    width: 100%;
    text-align: center;
}

.active {
    border-left: rgba(1, 183, 255) solid 2px !important;
    color: rgb(1, 183, 255);
    transition-duration: color, border 0.5s;
}

#menu_content {
    /* margin: 5px; */
    height: 100%;
    width: 100%;
    font-style: normal;

}

#menu_content>div>div {
    margin-left: 20px;
    height: 80vh;
    overflow-y: auto;
}

hr {
    border-width: 0.5px;
    margin: 0;
}

h2 {
    margin: 0;
    text-align: center;
}

select {
    height: 40px;
    -webkit-appearance: none;
    appearance: none;
    border: none;
    font-size: 18px;
    padding: 0px 10px;
    min-width: 100px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #1a1a1a;
    color: #fffefe;
    border-radius: 5px;

}
</style>