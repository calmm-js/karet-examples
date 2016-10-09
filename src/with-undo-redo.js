import * as R from "ramda"
import K      from "karet.util"
import React  from "karet"

export default ({undo, redo, ...props}) =>
  <div>
    <div>
      <button disabled={K(undo.has, R.not)} onClick={undo}>Undo</button>
      <button disabled={K(redo.has, R.not)} onClick={redo}>Redo</button>
    </div>
    <div {...props}/>
  </div>
