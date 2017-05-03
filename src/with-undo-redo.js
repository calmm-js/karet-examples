import * as R     from "ramda"
import * as React from "karet"
import K          from "karet.util"

export default ({undo, redo, ...props}) =>
  <div>
    <div>
      <button disabled={K(undo.has, R.not)} onClick={undo}>Undo</button>
      <button disabled={K(redo.has, R.not)} onClick={redo}>Redo</button>
    </div>
    <div {...props}/>
  </div>
