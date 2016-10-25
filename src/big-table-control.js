import * as L    from "partial.lenses"
import * as R    from "ramda"
import K, * as U from "karet.util"
import React     from "karet"

import * as Window from "./window"

export const mock = {
  tableHeight: 250,
  rowHeight: 30,
  rowCount: 10000,
  columns: ["ID", "ID * 10", "Random Number"],
  toRow: id => [`${id}`, `${id * 10}`, `${Math.floor(Math.random() * 100)}`]
}

const cellWidth = columns =>
  K(Window.innerWidth, columns, (innerWidth, columns) =>
    ({width: innerWidth / columns.length + "px"}))

const visibleRows = ({tableHeight, rowHeight, rowCount}, scrollTop) =>
  ({begin: Math.floor(scrollTop / rowHeight),
    end: Math.min(rowCount, Math.ceil((scrollTop + tableHeight) / rowHeight))})

const THead = ({columns}) =>
  <thead>
    <tr>
      {U.seq(columns, U.mapIndexed((column, i) =>
             <th key={i} style={cellWidth(columns)}>{column}</th>))}
    </tr>
  </thead>

const TBody = ({model, visibleRows}) =>
  <tbody>
    {U.seq(K(visibleRows, ({begin, end}) => R.range(begin, end)),
           U.mapCached(i =>
             <tr key={i}
                 style={{position: "absolute",
                         top: K(model, ({rowHeight}) => i * rowHeight + "px"),
                         borderBottom: "1px solid grey"}}>
               {K(model.view(L.props("toRow", "columns")), ({toRow, columns}) =>
                  toRow(i).map((column, i) =>
                    <td style={cellWidth(columns)} key={i}>{column}</td>))}
             </tr>))}
  </tbody>

export default ({model = mock, scrollTop = U.atom(0)}) =>
  <div>
    <table style={{width: "100%",
                   overflowX: "hidden",
                   borderBottom: "1px solid black"}}>
      <THead columns={K(model, R.prop("columns"))}/>
    </table>
    <div {...U.bindProps({ref: "onScroll", scrollTop})}
         style={{position: "relative",
                 overflowX: "hidden",
                 borderBottom: "1px solid black",
                 height: K(model, ({tableHeight}) => tableHeight + "px")}}>
      <table style={{height: K(model, ({rowCount, rowHeight}) =>
                               rowCount * rowHeight + "px")}}>
        <TBody {...{model, visibleRows: K(model, scrollTop, visibleRows)}}/>
      </table>
    </div>
  </div>
