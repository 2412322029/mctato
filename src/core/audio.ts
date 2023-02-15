import { Howl, Howler } from 'howler';
import buiurl from "../assets/bui.mp3"
import behiturl from '../assets/behit.mp3'
import dieurl from '../assets/dei.wav'
import angerurl from '../assets/anger.wav'
Howler.volume(0.2);
// navigator.mediaDevices.getUserMedia({ audio: true }); 
const bui = new Howl({
    src: [buiurl],
    volume:0.1
});
const behit = new Howl({
    src: [behiturl],
    volume:0.1
});
const die = new Howl({
    src: [dieurl]
});
const anger = new Howl({
    src: [angerurl]
});
const audio = {
    bui,
    behit,
    die,
    anger
}
export { audio,Howler }