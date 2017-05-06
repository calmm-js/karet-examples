import * as React from "karet"
import * as U     from "karet.util"

import {NumberInput} from "./restricted-input"

export default ({celcius = U.atom(0), fahrenheit = U.variable()}) =>
  <p>
    <NumberInput type="text" value={celcius}/>°C
    <br/>
    <NumberInput type="text" value={fahrenheit}/>°F
    {U.seq(celcius, U.lift(c => c * 9/5 + 32), U.set(fahrenheit))}
    {U.seq(fahrenheit, U.lift(f => 5/9 * (f - 32)), U.set(celcius))}
  </p>

// NOTE: The above pattern of using a cycle of updates (c -> f -> c) is not
// typically a good idea!
