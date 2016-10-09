import * as Kefir from "kefir"
import K          from "karet.util"
import React      from "karet"

const oncePerSecond = Kefir.constant().merge(Kefir.interval(1000))

export default () =>
  <div>
    {K(oncePerSecond, () => new Date().toString())}
  </div>
