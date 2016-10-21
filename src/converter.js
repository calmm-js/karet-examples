import Atom   from "kefir.atom"
import K      from "karet.util"
import React  from "karet"

import {NumberInput} from "./restricted-input"

export default ({celcius = Atom(0), fahrenheit = Atom()}) =>
  <p>
    <NumberInput type="text" value={celcius}/>°C
    <br/>
    <NumberInput type="text" value={fahrenheit}/>°F
    {K(celcius, c => c * 9/5 + 32).into(fahrenheit)}
    {K(fahrenheit, f => 5/9 * (f - 32)).into(celcius)}
  </p>

// NOTE: The above pattern of using a cycle of updates (c -> f -> c) is not
// typically a good idea!
