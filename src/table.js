import * as React from "karet"
import K, * as U  from "karet.util"

export default ({
  head = U.variable(),
  body = U.variable(),
  filter = () => true,
  ordering = ([i], [j]) => i - j,
  TH = ({value}) => <th>{value}</th>,
  TD = ({value}) => <td>{value}</td>
}) =>
  <table>
    <thead>
      <tr>
        {U.seq(head,
               U.indices,
               U.mapCached(c => <TH key={c} column={c} value={U.view(c, head)}/>))}
      </tr>
    </thead>
    <tbody>
      {U.seq(K(filter, ordering, body, (filter, ordering, xs) =>
               xs.map((r, i) => [i, r]).filter(filter).sort(ordering).map(([i]) => i)),
             U.mapCached(r => {
               const row = U.view(r, body)
               return <tr key={r}>
                 {U.seq(row,
                        U.indices,
                        U.mapCached(c => <TD key={c} row={c} value={U.view(c, row)}/>))}
               </tr>}))}
    </tbody>
  </table>
