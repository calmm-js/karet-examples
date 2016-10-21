import React  from "karet"
import {bind} from "karet.util"

export default ({title, units, value, ...props}) =>
  <div>
    <div>{title}: {value}{units}</div>
    <input type="range" {...props} {...bind({value})}/>
  </div>
