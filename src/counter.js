import * as R from "ramda"
import Atom   from "kefir.atom"
import React  from "karet"

export default ({value = Atom(0)}) =>
  <div>
    <div>Count: {value}</div>
    <button onClick={() => value.modify(R.add(+1))}>+</button>
    <button onClick={() => value.modify(R.add(-1))}>-</button>
  </div>
