import * as R          from "ramda"
import Atom, {holding} from "kefir.atom"
import K, {bind}       from "karet.util"
import React           from "karet"

import * as U          from "./util"

export default ({elems = Atom([]), entry = Atom("")}) =>
  <div>
    <div>
      <input type="text" {...bind({value: entry})}/>
      <button onClick={() => {const elem = entry.get().trim()
                              if (elem)
                                holding(() => {elems.modify(R.append(elem))
                                               entry.set("")})}}>
        Add
      </button>
    </div>
    <ul>{K(elems, U.mapi((elem, i) => <li key={i}>{elem}</li>))}</ul>
  </div>
