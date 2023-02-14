import { baseSquare } from "./base";
import { ctx } from '../world'

class Wall extends baseSquare {
    constructor(ctx: CanvasRenderingContext2D, x?: number, y?: number, w?: number, h?: number) {
        super(ctx, x, y, w, h);
    }
    // drawImg(position = [9, 9]) {
    //     this.ctx.drawImage(this.img, position[0] * 100, position[1] * 100, 100, 100,
    //         this.x - this.w / 2, this.y - this.h / 2, this.w, this.h
    //     )
    //     return this
    // }
    static walllist: Array<baseSquare> = []
    static init() {
        Wall.walllist.push(// 170<x<1830 
            // new Wall(ctx, 170, 150, 100, 100),
            // new Wall(ctx, 1830, 1000, 100, 100),

            new Wall(ctx, 600, 550, 10, 700),
            new Wall(ctx, 1400, 550, 10, 500),
            new Wall(ctx, 1000, 550, 700, 10),

        )
    }
    static drawall() {
        Wall.walllist.forEach((e) => {
            e.draw()
            // e.drawImg()
        })
    }
}
export {Wall}