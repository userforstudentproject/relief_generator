import { ViewBox } from "./generator_interface/viewbox.mjs";
import { Vec } from './relief_gen/vec.mjs'


// Test ViewBox
const canvasHTML = document.getElementById('generator_viewbox')
const viewBox = new ViewBox(canvasHTML)
const viewBoxObj = new ViewBox.Box(() => console.log('on click my obj'), new Vec(50, 50), new Vec(100, 100))
viewBox.addObj(viewBoxObj)
