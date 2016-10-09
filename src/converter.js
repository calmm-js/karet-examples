import Atom   from "kefir.atom"
import React  from "karet"

import {NumberInput} from "./restricted-input"

export default ({celcius = Atom(0), fahrenheit = Atom()}) =>
  <p>
    <NumberInput type="text" value={celcius}/>°C
    <br/>
    <NumberInput type="text" value={fahrenheit}/>°F
    {celcius.do(c => fahrenheit.set(c * 9/5 + 32))}
    {fahrenheit.do(f => celcius.set(5/9 * (f - 32)))}
  </p>

// NOTE: The above pattern of using a cycle of updates (c -> f -> c) is not
// typically a good idea!
