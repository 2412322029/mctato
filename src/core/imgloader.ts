import bgurl from '../assets/bg.png'
import spiriturl from "../assets/spirit.png"

const imgload = {
    bg: new Image(),
    spirit: new Image(),
    init: () => { Promise }
}

imgload.init = () => {
    return new Promise(function (resolve, reject) {
        imgload.bg.src = bgurl
        imgload.spirit.src = spiriturl
    })
}

export { imgload }