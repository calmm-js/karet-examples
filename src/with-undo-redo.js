import * as React from "karet"
import * as U     from "karet.util"

export default ({undo, redo, ...props}) =>
  <div>
    <div>
      <button disabled={U.not(undo.has)} onClick={undo}>Undo</button>
      <button disabled={U.not(redo.has)} onClick={redo}>Redo</button>
    </div>
    <div {...props}/>
  </div>
