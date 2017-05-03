import * as R     from "ramda"
import * as React from "karet"
import * as U     from "karet.util"

import Checkbox from "./checkbox"

const RemovableCheckbox = ({checked}) =>
  <div style={{margin: "0.5em"}}>
    <button onClick={() => checked.remove()}>Remove</button>
    <Checkbox {...{checked}}/>
  </div>

export default ({checkeds}) =>
  <div>
    <button onClick={() => checkeds.modify(R.append(false))}>New</button>
    <div style={{display: "flex", flexWrap: "wrap"}}>
      {U.seq(checkeds,
             U.indices,
             U.mapCached(i => <RemovableCheckbox key={i} checked={U.view(i, checkeds)}/>))}
    </div>
  </div>
