import * as R       from "ramda"
import K, {fromIds} from "karet.util"
import React        from "karet"

import Checkbox from "./checkbox"

const RemovableCheckbox = ({checked}) =>
  <div style={{margin: "0.5em"}}>
    <button onClick={() => checked.set()}>Remove</button>
    <Checkbox {...{checked}}/>
  </div>

export default ({checkeds}) =>
  <div>
    <button onClick={() => checkeds.modify(R.append(false))}>New</button>
    <div style={{display: "flex", flexWrap: "wrap"}}>
      {fromIds(K(checkeds, R.pipe(R.length, R.range(0))), i =>
        <RemovableCheckbox key={i} checked={checkeds.lens(i)}/>)}
    </div>
  </div>
