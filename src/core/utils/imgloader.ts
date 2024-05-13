import bgurl from '../../assets/bg.png'
import spiriturl from "../../assets/spirit.png"
import turl from '../../assets/2023-03-11 003040.jpg'

const imgload = {
    bg: new Image(),
    spirit: new Image(),
    t:new Image(),
    init: () => { Promise }
}

imgload.init = () => {
    return new Promise(function (resolve, reject) {
        imgload.bg.src = bgurl
        imgload.spirit.src = spiriturl
        imgload.t.src = turl
    })
}

export { imgload }