import * as React from "karet"
import * as U     from "karet.util"

export default ({checked = U.atom(false)}) =>
  <div>
    <label><input type="checkbox" {...U.bind({checked})}/>Toggle me</label>
    <p>{U.ifte(checked, "ON", "off")}</p>
  </div>
