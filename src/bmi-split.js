import * as React from "karet"
import K, * as U  from "karet.util"

import Slider from "./slider"

import * as M from "./bmi-meta"

export default ({weight = U.atom(80),
                 height = U.atom(180),
                 bmi = U.variable()}) =>
  <div className={U.string`bmi ${M.classification(bmi)}`}>
    <Slider title="Height" units="cm"     min={140} max={210} value={height}/>
    <Slider title="Weight" units="kg"     min={40}  max={140} value={weight}/>
    <Slider title="BMI"    units="kg/cm²" min={9}   max={71}  value={bmi}/>
    {K(height, height => M.bmi({height, weight: weight.get()})).into(bmi)}
    {K(weight, weight => M.bmi({weight, height: height.get()})).into(bmi)}
    {K(bmi,    bmi    => M.weight({bmi, height: height.get()})).into(weight)}
  </div>
