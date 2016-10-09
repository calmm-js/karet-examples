import Atom               from "kefir.atom"
import K, {bind, classes} from "karet.util"
import React              from "karet"

import * as M from "./bmi-meta"

const Slider = ({title, units, value, ...props}) =>
  <div>
    <div>{title}: {value}{units}</div>
    <input type="range" {...props} {...bind({value})}/>
  </div>

const BMI = ({bmi}) =>
  <div {...classes("bmi", K(bmi, M.BMI.classification))}>
    <Slider title="Weight" units="kg" min={40}  max={140} value={bmi.lens(M.BMI.weight)}/>
    <Slider title="Height" units="cm" min={140} max={210} value={bmi.lens(M.BMI.height)}/>
    <div>BMI: <span className="bmi-value">{K(bmi, M.BMI.bmi)}</span></div>
  </div>

export default ({bmi = Atom(M.mock)} = {}) => <BMI bmi={bmi.lens(M.BMI.augment)}/>
