import * as U from "karet.util"
import React  from "karet"

export default ({title, units, value, ...props}) =>
  <div>
    <div>
      {title}: <span className={`${title}-value`}>
                 {U.round(value)}
               </span>
      {units}
    </div>
    <input type="range" {...U.bind({value})} {...props}/>
  </div>
