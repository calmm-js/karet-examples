import * as React from "karet"
import K, * as U  from "karet.util"

import {NumberInput} from "./restricted-input"

export default ({celcius = U.atom(0), fahrenheit = U.variable()}) =>
  <p>
    <NumberInput type="text" value={celcius}/>°C
    <br/>
    <NumberInput type="text" value={fahrenheit}/>°F
    {K(celcius, c => c * 9/5 + 32).into(fahrenheit)}
    {K(fahrenheit, f => 5/9 * (f - 32)).into(celcius)}
  </p>

// NOTE: The above pattern of using a cycle of updates (c -> f -> c) is not
// typically a good idea!
