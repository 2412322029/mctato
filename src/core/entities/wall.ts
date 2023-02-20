import { baseSquare } from "./base";
import { ctx } from '../world'
import { lineIntersect, P2Pdistance, XYtest } from "../math";

interface awall {
    x: number,
    y: number,
    L: number,
    v?: boolean
}
export interface wallInfo {
    list: Array<awall>
    node: Record<string, [number, number]>,
    adj: Record<string, number[]>
}
class Wall extends baseSquare {
    v: boolean;
    p: number[];
    L: number;
    static adjMatrix: any;
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, L: number, v = true) {//垂直
        super(ctx, x, y);
        this.v = v
        this.L = L
        if (v) {
            this.w = 10
            this.h = L
            this.p = [this.x, this.y + L / 2 + 55, this.x, this.y - L / 2 - 55]
        } else {
            this.h = 10
            this.w = L
            this.p = [this.x - L / 2 - 55, this.y, this.x + L / 2 + 55, this.y]
        }

    }
    static creat(wallInfoList: wallInfo) {
        Wall.nodeCoords = wallInfoList.node
        Wall.adjList = wallInfoList.adj
        Wall.adjMatrix = Wall.adjListToMatrix(Wall.adjList, Wall.nodeCoords)
        wallInfoList.list.forEach(e => {
            Wall.walllist.push(new Wall(ctx, e.x, e.y, e.L, e.v))
        });

    }
    static walllist: Array<baseSquare> = []
    // static init() {
    //     Wall.walllist.push(// 170<x<1830 , 150<y<1000
    //         new Wall(ctx, 600, 550, 550),
    //         new Wall(ctx, 1400, 550, 300),
    //         new Wall(ctx, 1000, 550, 800, false),

    //     )
    // }
    static drawall() {
        Wall.walllist.forEach((e) => {
            e.draw()
        })
    }
    static checkWall<T extends baseSquare>(obj: T) {
        XYtest(Wall.walllist, obj).forEach(e => {
            //@ts-ignore
            if (e.v) {
                if (obj.x > e.x && obj.x - obj.w / 2 - e.w / 2 < e.x) {
                    obj.x = e.x + e.w / 2 + obj.w / 2 + 1//右
                    return
                }
                if (obj.x < e.x && obj.x + obj.w / 2 + e.w / 2 > e.x) {
                    obj.x = e.x - e.w / 2 - obj.w / 2 - 1//左
                    return
                }
            } else {
                if (obj.y > e.y && obj.y - obj.h / 2 - e.h / 2 < e.y) {
                    obj.y = e.y + e.h / 2 + obj.h / 2 + 1//下
                    return
                }
                if (obj.y < e.y && obj.y + obj.h / 2 + e.h / 2 > e.y) {
                    obj.y = e.y - e.h / 2 - obj.h / 2 - 1//上
                    return
                }
            }



        })
    }
    /**
     *   1---2
     *  | \6/ \
     *  0     3
     *  \    |
     *   5--4
    */
    //节点坐标
    static nodeCoords: Record<string, [number, number]>
    //邻接表
    static adjList: Record<string, number[]>

    //计算邻接矩阵
    static adjListToMatrix(adjList: any, nodeCoords: any) {
        let adjMatrix: any = [];
        let n = Object.keys(adjList).length; // 顶点个数
        for (let i = 0; i < n; i++) {// 初始化
            adjMatrix[i] = [];
            for (let j = 0; j < n; j++) {
                adjMatrix[i][j] = 0;
            }
        }
        for (let u in adjList) { // 遍历邻接表中的每个顶点
            for (let v of adjList[u]) {
                let dx = nodeCoords[u][0] - nodeCoords[v][0]
                let dy = nodeCoords[u][1] - nodeCoords[v][1]
                adjMatrix[u][v] = Math.floor(Math.sqrt(dx ** 2 + dy ** 2));
            }
        }
        return adjMatrix;
    }
    //可达节点
    static reachableNode(obj: any): { key: number; distence: number; }[] {
        var reachableNodelist: { key: number; distence: number; }[] = []
        for (const key in Wall.nodeCoords) {
            var node = Wall.nodeCoords[key]
            var canreach = 0
            Wall.walllist.forEach((e: any) => {
                if (!lineIntersect(e.p, [obj.x, obj.y, node[0], node[1]])) {
                    canreach += 1
                }
            })
            if (this.walllist.length == canreach) {
                reachableNodelist.push({ key: Number(key), distence: P2Pdistance(obj.x, obj.y, node[0], node[1]) })

            }

        }
        return reachableNodelist
    }

}


export { Wall }