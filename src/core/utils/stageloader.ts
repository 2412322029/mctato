import map1 from "../../map/1.json"
import map2 from '../../map/2.json'


interface stageMap {
    id: number,
    name: string,//关卡名称
    playerPos: number[]//玩家位置
    enemyinfo: {//怪物信息
        type: "random" | "fixed",//随机生成or固定位置
        number: number //若随机填个数
        list: Array<{    //否则填坐标列表
            names: "Zombie",//暂时一种怪
            x: number,
            y: number
        }>
    }
    wallinfo: {//墙信息
        list: Array<{//墙位置
            x: number,
            y: number,
            L: number,
            v?: boolean
        }>
        node: Record<string, [number, number]>,//每个节点对应坐标
        adj: Record<string, number[]> //邻接矩阵
    }
}
//@ts-ignore
var maplist: Array<stageMap> = [map1, map2]

export const stageMaps = {
    maplist
}

export type { stageMap }