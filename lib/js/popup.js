/*
* @Author: lolik
* @Date: 2023-1-7
* Prompt pop-up
*/




HTMLElement.prototype.appendHTML = function (html) {
    var divTemp = document.createElement("div")
    var nodes = null
    var fragment = document.createDocumentFragment();
    divTemp.innerHTML = html;
    nodes = divTemp.childNodes;
    for (var i = 0, length = nodes.length; i < length; i += 1) {
        fragment.appendChild(nodes[i].cloneNode(true));
    }
    this.appendChild(fragment);
    nodes = null;
    fragment = null;
};
function J(s) {
    return document.querySelector(s)
}
function JC(s) {
    return document.querySelectorAll(s)
}
function createBox(idname) {
    var PopupBox = `
    <div class="Popup-Box" id="${idname}" >
    </div>
`
    J("body").appendHTML(PopupBox)
}
class Popup {
    static id
    static msg(obj) {
        //赋值
        // console.log(obj);
        if (obj==undefined ) {
            obj={}
        }
         obj.id = crypto.randomUUID()
        createBox("Popup-msg-" + obj.id)

        // console.log(obj.id);

        this.id = obj.id
        obj.time = obj.time ?? 2
        obj.type = obj.type ?? 'info'
        obj.title = obj.title ?? "默认标题"
        obj.content = obj.content ?? "默认内容"
        obj.position = obj.position ?? "右上"
        obj.drag = obj.drag ?? false
        obj.fadeout = obj.fadeout ?? 500

        var Qid = this.id
        var content = obj.content
        var type = obj.type
        var time = obj.time

        obj.beforecreate && obj.beforecreate()//回调
                //创建
        J("#Popup-msg-" + Qid).style.display = "block"
        J("#Popup-msg-" + Qid).classList.add("Popup-Box")
        switch (type) {
            case 'info':
                J("#Popup-msg-" + Qid).innerHTML = `<div class="close" 
                 id="close-${Qid}">&times;</div>
                    <h3><span>消息</span></h3>
                    <div id="Popup-content-${Qid}">${content}</div>`
                J("#Popup-msg-" + Qid).classList.add("Popup-msg-info")
                animation()
                break;
            case 'warning':
                J("#Popup-msg-" + Qid).innerHTML = `<div class="close" 
                id="close-${Qid}">&times;</div>
                    <h3><span>警告</span></h3>
                    <div id="Popup-content-${Qid}">${content}</div>`
                J("#Popup-msg-" + Qid).classList.add("Popup-msg-warning")
                animation()
                break;
            case 'fixed':
                J("#Popup-msg-" + Qid).innerHTML = `<div class="close" 
                id="close-${Qid}">&times;</div>
                    <h3><span>固定消息</span></h3>
                    <div id="Popup-content-${Qid}">${content}</div>`
                J("#Popup-msg-" + Qid).classList.add("Popup-msg-info", "Popup-msg-fixed")
                break;
            case 'choice':
                J("#Popup-msg-" + Qid).innerHTML = `<div class="close" 
                id="close-${Qid}">&times;</div>
                    <h3><span>选择</span></h3>
                    <div id="Popup-content-${Qid}">${content}</div>
                        `
                J("#Popup-msg-" + Qid).classList.add("Popup-msg-info", "Popup-msg-fixed", "Popup-msg-choice")
                break;
            default:
                console.error("type属性错误 id=" + Qid)
                J("#Popup-msg-" + Qid).innerHTML = `<div class="close" 
                id="close-${Qid}">&times;</div><h3><span></span></h3>
                <div id="Popup-content-${Qid}"></div>
                `
                J("#Popup-msg-" + Qid).style.display = "none"
                break;
        }
        //创建完成
        obj.aftercreate && obj.aftercreate()//回调

        //设置配置项
        this.setTitle(obj.title)
        this.setContent(obj.content)
        this.setWidth(obj.width)
        this.setHeigth(obj.height)
        this.setBgcolor(obj.bgcolor)
        this.setPosition(obj.position)
        this.setDrag(obj.drag)
        J("#close-" + Qid).onclick = (e) => close(e.target.id.split("close-")[1])

        function animation() {
            J("#Popup-msg-" + Qid).classList.add('Popup-to')
            setTimeout(() => {
                if (J("#Popup-msg-" + Qid) != null) {
                    J("#Popup-msg-" + Qid).classList.remove('Popup-to')
                    J("#Popup-msg-" + Qid).classList.add('Popup-go')
                    setTimeout(() => {
                        close(Qid)
                    }, 1000);
                }

            }, (time + 1) * 1000);
        }
        close = (Qid) => {
            this.fadeOut(J("#Popup-msg-" + Qid), obj.fadeout)
            setTimeout(() => {
                obj.onclose && obj.onclose()//回调
            }, obj.fadeout);

        }
        return this
    }
    static fadeOut(e, time) {
        var count = (function () {
            var timer;
            var i = 0;
            function change(tar) {
                i++;
                var num = 1 - i / 20;
                e.style.opacity = num;
                if (i === tar) {
                    clearTimeout(timer);
                    e.remove()
                    return false;
                }
                timer = setTimeout(function () {
                    change(tar)
                }, time / 20)
            }
            return change;
        })()
        count(20)

    }
    static setPosition(cas) {
        var T = J("#Popup-msg-" + this.id)
        if (cas instanceof Array) {
            T.style.top = cas[1] + "px"
            T.style.left = cas[0] + "px"
            return this
        }
        switch (cas) {
            case '右上':
                break;
            case '右下':
                T.style.top="unset"
                T.style.bottom = 0
                break;
            case '左上':
                T.style.left = 0
                break;
            case '左下':
                T.style.top="unset"
                T.style.bottom = 0
                T.style.right="unset"
                T.style.left = 0
                break;
            case '中间':
                T.style.top = "50px"
                T.style.left = (document.body.clientWidth - T.clientWidth) / 2 + "px"
                break;
            default:
                break;
        }
        return this
    }
    static setHeigth(h) {
        if (h === undefined | h <= 0) {
            return this
        }
        J("#Popup-msg-" + this.id).style.height = h + "px"
        return this
    }
    static setWidth(w) {
        if (w === undefined | w <= 0) {
            return this
        }
        J("#Popup-msg-" + this.id).style.width = w + "px"
        return this
    }
    static setTitle(t) {
        J("#Popup-msg-" + this.id + ">h3>span").innerText = t
        return this
    }
    static setContent(c) {
        J("#Popup-content-" + this.id).innerHTML = c
        return this
    }
    static setDrag(B) {
        B = B ?? false
        if (B) {
            J("#Popup-msg-" + this.id).classList.add("Popup-Box-drag")
            this.candrag("Popup-msg-" + this.id)
        }
        return this
    }
    static setBgcolor(bg) {
        if (bg === undefined | bg == "") {
            return this
        }
        J("#Popup-msg-" + this.id).style.backgroundColor = bg
        return this
    }
    static getid() {
        return this.id
    }
    static candrag(id) {
        var z
        var drag = document.getElementById(id);
        drag.onmousedown = function (event) {
            z = drag.style.zIndex
            drag.style.zIndex = 20
            var diffX = event.clientX - drag.offsetLeft;
            var diffY = event.clientY - drag.offsetTop;
            if (diffX > (drag.offsetWidth - 50) || diffY > 30) {
                return
            }
            // console.log(diffX, diffY,drag.offsetWidth);
            if (typeof drag.setCapture !== 'undefined') {
                drag.setCapture();
            }
            document.onmousemove = function (event) {
                var moveX = event.clientX - diffX;
                var moveY = event.clientY - diffY;
                if (moveX < 0) {
                    moveX = 0
                } else if (moveX > window.innerWidth - drag.offsetWidth) {
                    moveX = window.innerWidth - drag.offsetWidth
                }
                if (moveY < 0) {
                    moveY = 0
                } else if (moveY > window.innerHeight - drag.offsetHeight) {
                    moveY = window.innerHeight - drag.offsetHeight
                }
                drag.style.left = moveX + 'px';
                drag.style.top = moveY + 'px'
            }
            document.onmouseup = function (event) {
                this.onmousemove = null;
                this.onmouseup = null;
                drag.style.zIndex = z
                if (typeof drag.releaseCapture != 'undefined') {
                    drag.releaseCapture();

                }
            }
        }
    }
    static ergodic() {
        var boxList = JC(".Popup-Box")
        boxList.forEach(box => {
            console.log(box.id);
        });
    }


    msgx(obj) {
        // console.log(obj);
        Popup.msg(obj)
        return this
    }
    static bqm
    static msgQueue(intervalTime = 1,objlist = [] ) {
        var timelist = []
        for (let i = 0; i < objlist.length; i++) {
            if (objlist[i].type == "fixed" | objlist[i].type == "choice") {
                objlist[i].type = 'info'
            }
            objlist[i].time = objlist[i].time ?? 2
            var t = objlist[i - 1] ?? { time: 0 }
            timelist.push(Number(t.time) * 1000 + (intervalTime+1) * 1000)
        }
        var pp = new Popup()
        this.bqm = new BlockQueue(pp.msgx, objlist, timelist)
        this.bqm.run()
        return this
    }
}

class BlockQueue {
    L = []
    totalTime = 0
    onRun = false
    static func
    static funcArg
    static start
    constructor(func, funcArg, L) {
        if (L.length != funcArg.length) {
            console.error("数组参数长度不一致" + L + funcArg)
        }
        this.L = L
        this.func = func
        this.funcArg = funcArg
    }
    run() {
        this.onRun = true
        this.start = (new Date()).getTime()
        var nowL = 0
        for (let i = 0; i < this.L.length; i++) {
            nowL = nowL + this.L[i]
            setTimeout(() => {
                // console.log(this.funcArg[i]);
                this.func(this.funcArg[i])
                this.L.unshift()
                this.funcArg.unshift()
            }, nowL - this.L[0]);
        }
        this.totalTime = nowL
    }
    static getStatu() {
        var nowtime = (new Date()).getTime()
        var endtime = Number(this.start) + Number(this.totalTime)
        if (endtime <= nowtime) {
            this.onRun = false
        } else {
            this.onRun = true
        }
        return this.onRun

    }

}





