import Atom, {holding} from "kefir.atom"
import K, {string}     from "karet.util"
import React           from "karet"

export const RestrictedInput = ({value, meta: {format, parse}, ...props}) => {
  const edited = Atom(undefined)
  const shown = K(value, edited, (value, edited) =>
                  edited === undefined ? format(value) : edited)
  const exit = e => {edited.set()
                     e.target.blur()}
  const validity = K(shown, s => parse(s) !== undefined ? "valid" : "invalid")
  return <input className={string`restricted-input ${validity}`}
                value={shown}
                onChange={({target: {value: input}}, result = parse(input)) =>
                          result !== undefined
                          ? holding(() => {edited.set()
                                           value.set(result)})
                          : edited.set(input)}
                onKeyDown={e => e.key === "Escape" && exit(e)}
                onBlur={exit}
                {...props}/>
}

export const number = {
  format: n => n.toString(),
  parse: s => {
    const n = parseFloat(s)
    return n.toString() === s ? n : undefined
  }
}

export const NumberInput = ({meta = number, type="number", ...props}) =>
  <RestrictedInput {...{meta, type}} {...props}/>
