import { baseSquare } from "./base";
import { ctx } from '../world'
import { lineIntersect, P2Pdistance } from "../math";

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
    static walllist: Array<baseSquare> = []
    static init() {
        Wall.walllist.push(// 170<x<1830 , 150<y<1000
            new Wall(ctx, 600, 550, 550),
            new Wall(ctx, 1400, 550, 300),
            new Wall(ctx, 1000, 550, 800, false),

        )
    }
    static drawall() {
        Wall.walllist.forEach((e) => {
            e.draw()
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
    static nodeCoords: any = {
        0: [300, 500],
        1: [600, 150],
        2: [1400, 325],
        3: [1650, 500],
        4: [1400, 775],
        5: [600, 950],
        6: [900, 500],
    }
    //邻接表
    static adjList: any = {
        0: [1, 5],
        1: [0, 2, 6],
        2: [1, 3, 6],
        3: [2, 4],
        4: [3, 5],
        5: [4, 0],
        6: [1, 2],
    }
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
var adjMatrix = Wall.adjListToMatrix(Wall.adjList, Wall.nodeCoords)
Wall.adjMatrix = adjMatrix
export { Wall }