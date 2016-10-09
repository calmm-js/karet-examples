import * as Kefir from "kefir"
import K          from "karet.util"

Kefir.Observable.prototype.mapK = function (f) {
  return K(this, f)
}

Kefir.Observable.prototype.set = function (settable) {
  return this.mapK(v => {
    settable.set(v)
    return null
  })
}
