import { baseSquare } from "./base";
import {ctx} from './world'

export class Wall{
    static walllist:Array<baseSquare>=[]
    static init(){
        Wall.walllist.push(
            new baseSquare(ctx,300,500,100,100,"red"),
            new baseSquare(ctx,500,300,200,100,"red")
        )
    }
    static drawall(){
        Wall.walllist.forEach((e)=>{
            e.draw()
        })
    }
}
//这是更改