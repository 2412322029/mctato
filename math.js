/**
 * 一个物体与多个物体x方向投影检测
 * @param {Array} objlist 
 * @param {Object} obj 
 * @returns {Array} 筛选后的对象列表
 */
function Xtest(objlist, obj) {
    var filterObjlist = []
    objlist.forEach(e => {
        if (Math.abs(e.x - obj.x) <= (e.w + obj.w) / 2) {
            e.showBox(obj.w, obj.h)
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
function Ytest(objlist, obj) {
    var filterObjlist = []
    objlist.forEach(e => {
        e.showBox(obj.w, obj.h)
        if (Math.abs(e.y - obj.y) <= (e.h + obj.h) / 2) {
            filterObjlist.push(e)
        }
    });
    return filterObjlist
}
/**
 * X优先投影检测
 */
function XYtest(objlist, obj) {
    return Ytest(Xtest(objlist, obj), obj)
}
/**
 * Y优先投影检测
 */
function YXtest(objlist, obj) {
    return Xtest(Ytest(objlist, obj), obj)
}


function P2Pdistance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2+ (y1 - y2) ** 2)
}