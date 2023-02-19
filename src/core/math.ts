import { baseSquare } from "./entities/base";

/**
 * 一个物体与多个物体x方向投影检测
 * @param {Array} objlist 
 * @param {Object} obj 
 * @returns {Array} 筛选后的对象列表
 */
function Xtest<T extends baseSquare>(objlist: Array<T>, obj: baseSquare): Array<T> {
    var filterObjlist: Array<T> = []
    objlist.forEach(e => {
        if (Math.abs(e.x - obj.x) <= (e.w + obj.w) / 2) {
            e.showBox(obj.w, obj.h)//检测时显示碰撞箱
            filterObjlist.push(e)
        }
    });
    return filterObjlist
}
/**
 * 一个物体与多个物体y方向投影检测
 * @param {Array} objlist 
 * @param {Object} obj 
 * @returns {Array} 筛选后的对象列表
 */
function Ytest<T extends baseSquare>(objlist: Array<T>, obj: baseSquare): Array<T> {
    var filterObjlist: Array<T> = []
    objlist.forEach(e => {
        e.showBox(obj.w, obj.h)//检测时显示碰撞箱
        if (Math.abs(e.y - obj.y) <= (e.h + obj.h) / 2) {
            filterObjlist.push(e)
        }
    });
    return filterObjlist
}
/**
 * X优先投影检测
 */
function XYtest<T extends baseSquare>(objlist: Array<T>, obj: baseSquare): Array<T> {
    return Ytest(Xtest(objlist, obj), obj)
}
/**
 * Y优先投影检测
 */
function YXtest<T extends baseSquare>(objlist: Array<T>, obj: baseSquare): Array<T> {
    return Xtest(Ytest(objlist, obj), obj)
}

/**
 * 两点之间的直线距离
 * @param {Number} x1 
 * @param {Number} y1 
 * @param {Number} x2 
 * @param {Number} y2 
 * @returns 
 */
function P2Pdistance(x1: number, y1: number, x2: number, y2: number) {
    return Math.floor(Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2))
}

function adsorbent<T extends baseSquare>(objlist: Array<T>, obj: baseSquare, d: number = 100): Array<T> {
    var filterObjlist: Array<T> = []
    objlist.forEach(e => {
        if (P2Pdistance(e.x, e.y, obj.x, obj.y) <= d) {
            filterObjlist.push(e)
        }
    });
    return filterObjlist
}
//判断两个线段是否相交 两个线段的端点坐标分别为(x1,y1),(x2,y2),(x3,y3),(x4,y4)
function lineIntersect(p1: number[], p2: number[]) {
    var x1 = p1[0]
    var y1 = p1[1]
    var x2 = p1[2]
    var y2 = p1[3]
    var x3 = p2[0]
    var y3 = p2[1]
    var x4 = p2[2]
    var y4 = p2[3]
    var denominator, a, b, numerator1, numerator2, result: any = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((y4 - y3) * (x2 - x1)) - ((x4 - x3) * (y2 - y1));
    if (denominator == 0) {
        return result.onLine1 && result.onLine2;;
    }
    a = y1 - y3;
    b = x1 - x3;
    numerator1 = ((x4 - x3) * a) - ((y4 - y3) * b);
    numerator2 = ((x2 - x1) * a) - ((y2 - y1) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;
    result.x = x1 + (a * (x2 - x1));
    result.y = y1 + (a * (y2 - y1));
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    return result.onLine1 && result.onLine2;
}


// 输入是邻接矩阵和起始顶点和终止顶点
function dijkstra(adjMatrix: any[][], start: any, end: any) {
    let n = adjMatrix.length; // 顶点个数
    let visited = []; //存储每个顶点是否已经访问过
    let distance = []; // 存储起始顶点到每个顶点的最短距离 
    let predecessor = [];// 存储每个顶点的前驱顶点 
    for (let i = 0; i < n; i++) {// 初始化访问数组为全false，
        visited[i] = false;
        distance[i] = 10000;
        predecessor[i] = null;
    }
    distance[start] = 0;// 将起始顶点到自己的距离设为0
    for (let i = 0; i < n; i++) { // 遍历每次找出未访问过的最近的顶点，并更新其邻接顶点的距离和前驱 
        let u = -1;
        let minDistance = 10000;
        for (let j = 0; j < n; j++) {
            if (!visited[j] && distance[j] < minDistance) {
                u = j;
                minDistance = distance[j];
            }
        }
        if (u === -1) break;// 如果没有找到合适的u,图不连通退出循环     
        visited[u] = true;// 标记u已经访问过    
        for (let v = 0; v < n; v++) {// 遍历u的所有邻接顶点v，更新
            if (!visited[v] && adjMatrix[u][v] > 0 && distance[u] + adjMatrix[u][v] < distance[v]) {
                distance[v] = distance[u] + adjMatrix[u][v];
                predecessor[v] = u;
            }
        }
        if (visited[end]) break;
    }
    let path: any = [];
    if (distance[end] === 10000) return path;// 终点不可达，返回空路径
    let currentVertex = end;// 回溯前驱链表，并将每个前驱加入路径中
    while (currentVertex !== null) {
        path.unshift(currentVertex);
        currentVertex = predecessor[currentVertex];
    }
    return [path, distance[end]];
}

function noOut<T extends baseSquare>(obj: T) {
    var ho = 30
    if (obj.x - obj.w / 2 - ho <= 0) {
        obj.x = obj.w / 2 + ho
    }
    if (obj.x + obj.w / 2 + ho >= 2000) {
        obj.x = 2000 - obj.w / 2 - ho
    }
    if (obj.y - obj.h / 2 - ho <= 0) {
        obj.y = obj.h / 2 + ho
    }
    if (obj.y + obj.h / 2 + ho >= 1125) {
        obj.y = 1125 - obj.h / 2 - ho
    }
}

export { XYtest, YXtest, P2Pdistance, adsorbent, dijkstra, lineIntersect, noOut };