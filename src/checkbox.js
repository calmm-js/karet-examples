import Atom      from "kefir.atom"
import K, {bind} from "karet.util"
import React     from "karet"

export default ({checked = Atom(false)}) =>
  <div>
    <label><input type="checkbox" {...bind({checked})}/>Toggle me</label>
    <p>{K(checked, c => c ? "ON" : "off")}</p>
  </div>
