import * as R     from "ramda"
import * as React from "karet"
import * as U     from "karet.util"

export default ({value = U.atom(0)}) =>
  <div>
    <div>Count: {value}</div>
    <button onClick={() => value.modify(R.add(+1))}>+</button>
    <button onClick={() => value.modify(R.add(-1))}>-</button>
  </div>
