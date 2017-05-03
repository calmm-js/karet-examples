import * as Kefir from "kefir"
import * as React from "karet"
import K          from "karet.util"

const oncePerSecond = Kefir.constant().merge(Kefir.interval(1000))

export default () =>
  <div>
    {K(oncePerSecond, () => new Date().toString())}
  </div>
