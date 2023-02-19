<template>
    <div id="start" @click="$('#cover').fadeToggle({ duration: 300, }); toggleRun()">暂停</div>
    <div id="phone" v-show="phone.showcontroler">
        <div id="leftControler"></div>
        <div id="rightControler"></div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from "vue";
import nipplejs from 'nipplejs';
import { config } from '../core/config'
import { onPressKey, playerspeedcontrol, catapultspeedcontrol } from "../core/world";
import { Direction, player } from "../core/entities/myself";
import $ from 'jquery'
import { toggleRun } from "../core/game";


const phone: any = reactive({ config })
const showPhoneControlers = () => {
    var rightControler: nipplejs.JoystickManager = nipplejs.create({
        zone: <HTMLElement>document.getElementById('rightControler'),
        dynamicPage: true,
        mode: 'static',
        position: { right: '15%', bottom: '20%' },
    });
    rightControler.on("move", (evt, nipple) => {
        // console.log(nipple);
        var vx = Math.floor(Math.cos(nipple.angle.radian) * catapultspeedcontrol.speed);
        var vy = -Math.floor(Math.sin(nipple.angle.radian) * catapultspeedcontrol.speed);
        catapultspeedcontrol.on = true
        catapultspeedcontrol.set(vx, vy)
    })
    rightControler.on("end", (evt, nipple) => {
        catapultspeedcontrol.on = false
    })

    var leftControler: nipplejs.JoystickManager = nipplejs.create({
        zone: <HTMLElement>document.getElementById('leftControler'),
        dynamicPage: true,
        mode: 'static',
        position: { left: '15%', bottom: '20%' },
    });
    leftControler.on("move", (evt, nipple) => {
        var forc = 1
        if (config.Stick_offset_affects_speed) {
            forc = nipple.distance / 50
        }
        var vx = Math.floor(Math.cos(nipple.angle.radian) * player.moveSpeed * forc);
        var vy = -Math.floor(Math.sin(nipple.angle.radian) * player.moveSpeed * forc);
        playerspeedcontrol.set(vx, vy)
        if (nipple.direction) { player.showimgdirection(<Direction>nipple.direction.angle) }

    })
    leftControler.on("end", (evt, nipple) => {
        playerspeedcontrol.set(0, 0)
        player.showimgdirection(Direction.C)
    })
}
const showPCcontrolers = () => {
    $(document).on("keydown", function (e: { key: string; }) {
        if (!onPressKey.has(e.key.toLowerCase())) {
            onPressKey.add(e.key.toLowerCase())
        }
    })
    $(document).on("keyup", function (e: { key: string; }) {
        onPressKey.delete('alt')
        onPressKey.delete(e.key.toLowerCase())
    })
    $(document).on("keydown", () => {
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
        }
        playerspeedcontrol.set(vx, vy)
    })
}
onMounted(() => {
    showPhoneControlers()
    showPCcontrolers()

})


</script>
<style scoped>
#phone {
    position: fixed;
    width: 100%;
    height: 100%;
}
</style>