import { config } from "./config";
import { Effects } from "./effects";
import { Enemy } from "./entities/enemy";
import { items } from "./entities/Items";
import { player } from "./entities/myself";
import { Wall } from "./entities/wall";
import { animloop } from "./game";
import { stageMap, stageMaps } from "./utils/stageloader";
import { ctx, player1 } from "./world";
// TODO: Implement the connectNodes function
function connectNodes(stage: stageMap, color: string = "green"): void {
  if (config.showpath) {
    
    const { node, adj } = stage.wallinfo;
    // 遍历所有节点
    for (const nodeId in adj) {
      const nodePos = node[nodeId]; // 当前节点的坐标
      const connections = adj[nodeId]; // 当前节点连接的所有节点
      // 遍历当前节点的所有连接
      for (const connectedNodeId of connections) {
        const connectedNodePos = node[connectedNodeId.toString()]; // 连接节点的坐标
        ctx.lineWidth = 5
        ctx.beginPath()
        ctx.moveTo(nodePos[0], nodePos[1])
        ctx.lineTo(connectedNodePos[0], connectedNodePos[1])
        ctx.strokeStyle = color
        ctx.closePath()
        ctx.stroke()
        ctx.lineWidth = 1
        ctx.strokeStyle = "black" 
      }
    }
  }
}
//当前关卡
// 复制不是引用
var cmp = JSON.parse(JSON.stringify(stageMaps.maplist[0]));
function init() {
  let mp = cmp;
  const player1 = new player(ctx, mp.playerPos[0], mp.playerPos[1]);
  if (mp.enemyinfo.type == "fixed") {
    Enemy.craet(mp.enemyinfo.list);
  } else if (mp.enemyinfo.type == "random") {
    Enemy.random(<number>mp.enemyinfo.number);
  }
  Wall.creat(mp.wallinfo);
  return player1;
}
function restage(mp:any) {
    cmp = JSON.parse(JSON.stringify(stageMaps.maplist[0]));
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
  Wall.drawall();
  Enemy.movement();
  items.loop();
  Effects.loop();
  connectNodes(cmp);
}

export const Stage = {
  init,
  run,
  restage,
};
