import * as React from "karet"
import * as U     from "karet.util"

export default ({title, units, value, ...props}) =>
  <div>
    <div>
      {title}: <span className={U.string`${title}-value`}>
                 {U.round(value)}
               </span>
      {units}
    </div>
    <input type="range"
           value={value}
           onChange={U.getProps({value})}
           {...props}/>
  </div>
