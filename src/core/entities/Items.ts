import { ctx2 } from "../effects";
import { ctx } from "../world";
import { baseSquare } from "./base";

class heal extends baseSquare {
    constructor(x: number, y: number, w = 20, h = 20) {
        super(ctx2);
        this.ctx = ctx
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.drawImg()
    }
    static HPS = 20
    drawImg() {
        return super.drawImg([9, 8], 40, 40)
    }
    give(who: { HP: number }) {
        who.HP += heal.HPS
    }
    showBox() { }
}
class supply extends baseSquare {
    constructor(x: number, y: number, w = 20, h = 20) {
        super(ctx2);
        this.ctx = ctx
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.drawImg()
    }
    static MPS = 10
    drawImg() {
        return super.drawImg([8, 0], 40, 40)
    }
    give(who: { MP: number }) {
        who.MP += supply.MPS
    }
    showBox() { }
}
var list: any = []
function loop() {
    list.forEach((i: any) => {
        i.drawImg()
    });
}
const items = {
    heal,
    supply,
    loop,
    list
}
export { items }
