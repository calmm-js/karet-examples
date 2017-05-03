import * as R     from "ramda"
import * as React from "karet"
import * as U     from "karet.util"

export default ({elems = U.atom([]), entry = U.atom("")}) =>
  <div>
    <div>
      <input type="text" {...U.bind({value: entry})}/>
      <button onClick={() => {const elem = entry.get().trim()
                              if (elem)
                                U.holding(() => {elems.modify(R.append(elem))
                                                 entry.set("")})}}>
        Add
      </button>
    </div>
    <ul>{U.seq(elems,
               U.indices,
               U.mapCached(i => <li key={i}>{U.view(i, elems)}</li>))}</ul>
  </div>
