import * as R    from "ramda"
import Atom      from "kefir.atom"
import K, {bind} from "karet.util"
import React     from "karet"

export default ({elems = Atom([]), entry = Atom("")}) =>
  <div>
    <div>
      <input type="text" {...bind({value: entry})}/>
      <button onClick={() => {const elem = entry.get().trim()
                              if (elem) {
                                elems.modify(R.append(elem))
                                entry.set("")}}}>
        Add
      </button>
    </div>
    <ul>
      {K(elems, elems => elems.map((elem, i) => <li key={i}>{elem}</li>))}
    </ul>
  </div>
