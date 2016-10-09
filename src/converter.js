import Atom      from "kefir.atom"
import K, {bind} from "karet.util"
import React     from "karet"

export default ({value = Atom("0")}) =>
  <p><input {...bind({value})}/>°C is {K(value, c => c * 9/5 + 32)}°F</p>
