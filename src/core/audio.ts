import { Howl, Howler } from 'howler';
import buiurl from "../assets/audio/bui.mp3"
import behiturl from '../assets/audio/behit.mp3'
import dieurl from '../assets/audio/dei.wav'
import angerurl from '../assets/audio/anger.wav'
import noshooturl from '../assets/audio/noshoot.mp3'
import geturl from '../assets/audio/get.mp3'
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
const get = new Howl({
    src: [geturl]
});
const noshoot = new Howl({
    src: [noshooturl]
});
const audio = {
    bui,
    behit,
    die,
    anger,
    get,
    noshoot
}
export { audio,Howler }