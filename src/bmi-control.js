import * as U from "karet.util"
import React  from "karet"

import * as M from "./bmi-meta"
import Slider from "./slider"

const BMI = ({bmi}) =>
  <div className={U.string`bmi ${M.BMI.classification(bmi)}`}>
    <Slider title="Height" units="cm" min={140} max={210} value={M.BMI.height(bmi)}/>
    <Slider title="Weight" units="kg" min={40}  max={140} value={M.BMI.weight(bmi)}/>
    <div>BMI: <span className="BMI-value">{U.seq(M.BMI.bmi(bmi), U.lift(Math.round))}</span></div>
  </div>

export default ({bmi = U.atom(M.mock)} = {}) => <BMI bmi={M.BMI.augment(bmi)}/>
