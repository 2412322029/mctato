import { Effects } from "../effects";
import { P2Pdistance } from "../math";
import { ctx, player1 } from "../world";
import { baseSquare } from "./base";
import { player } from "./myself";

class heal extends baseSquare {
    imgp: number[];
    size: number;
    constructor(x: number, y: number, w = 20, h = 20) {
        super(ctx, x, y, w, h);
        this.ctx = ctx
        this.imgp = [9, 8]
        this.size = 40
        this.show()
    }
    static HPS = 20
    show() {
        if (P2Pdistance(player1.x, player1.y, this.x, this.y) <= player.adsorbentPosition) {
            Effects.linkto(player1, this, player.adsorbentSpeed)
        }
        super.drawImg(this.imgp, this.size, this.size)
    }
    give(who: { HP: number } | any) {
        Effects.list.push(new Effects.damText(ctx, this.x, this.y, "+ " + heal.HPS, 1000, "green"))
        who.HP += heal.HPS
    }
}
class supply extends heal {
    constructor(x: number, y: number, w = 20, h = 20) {
        super(x, y, w, h);
        this.imgp = [8, 0]
        this.size = 40
        this.show()
    }
    static MPS = 10
    give(who: { MP: number } | any) {
        Effects.list.push(new Effects.damText(this.ctx, this.x, this.y, "+ " + supply.MPS, 1000, "blue"))
        who.MP += supply.MPS
    }
}
var list: any = []
function loop() {
    list.forEach((i: any) => {
        i.show()
    });
}
const items = {
    heal,
    supply,
    loop,
    list
}
export { items }
