import {Howl, Howler} from 'howler';
import buiurl from "../assets/bui.mp3"
import behiturl from '../assets/behit.mp3'
Howler.volume(0.2);

// navigator.mediaDevices.getUserMedia({ audio: true }); 
const bui = new Howl({
  src: [buiurl],
  volume: 0.2,
});
const behit = new Howl({
    src: [behiturl]
  });
const audio={
    bui,
    behit
}
export {audio}