import * as R from "ramda"
import * as U from "karet.util"
import React  from "karet"

export default ({value = U.atom(0)}) =>
  <div>
    <div>Count: {value}</div>
    <button onClick={() => value.modify(R.add(+1))}>+</button>
    <button onClick={() => value.modify(R.add(-1))}>-</button>
  </div>
