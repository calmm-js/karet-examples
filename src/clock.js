import * as React from "karet"
import * as U     from "karet.util"

export default () =>
  <div>
    {U.seq(U.interval(1000, 0),
           U.startWith(0),
           U.lift(_ => new Date().toString()))}
  </div>
