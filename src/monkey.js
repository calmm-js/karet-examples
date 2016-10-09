import * as Kefir from "kefir"
import K          from "karet.util"

Kefir.Observable.prototype.mapK = function (mapping) {
  return K(this, mapping)
}

Kefir.Observable.prototype.do = function (action) {
  return this.mapK(v => {
    action(v)
    return null
  })
}
