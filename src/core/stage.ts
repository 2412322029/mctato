import { Effects } from "./effects";
import { Enemy } from "./entities/enemy";
import { items } from "./entities/Items";
import { player } from "./entities/myself";
import { Wall, wallInfo } from "./entities/wall";
import { animloop } from "./game";
import { stageMaps } from "./utils/stageloader";
import { ctx, player1 } from "./world";


function init() {
    var mp = stageMaps.maplist[0]
    const player1 = new player(ctx, mp.playerPos[0], mp.playerPos[1])
    if (mp.enemyinfo.type == "fixed") {
        Enemy.craet(mp.enemyinfo.list)
    } else if (mp.enemyinfo.type == "random") {
        Enemy.random(<number>mp.enemyinfo.number)
    }
    Wall.creat(mp.wallinfo)
    return player1
}
function restage(mp:any) {
    player1.x = mp.playerPos[0]
    player1.y = mp.playerPos[1]
    Enemy.list = []
    Wall.walllist = []
    if (mp.enemyinfo.type == "fixed") {
        Enemy.craet(mp.enemyinfo.list)
    } else if (mp.enemyinfo.type == "random") {
        Enemy.random(<number>mp.enemyinfo.number)
    }
    Wall.creat(mp.wallinfo)
    animloop()
}
function run() {
    Wall.drawall()
    Enemy.movement();
    items.loop()
    Effects.loop()
}


export const Stage = {
    init,
    run,
    restage
}