import * as L    from "partial.lenses"
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

const tableHeight = U.view("tableHeight")
const rowHeight = U.view("rowHeight")
const rowCount = U.view("rowCount")
const columns = U.view("columns")

const cellWidth = columns =>
  ({width: U.string`${U.divide(Window.innerWidth, U.length(columns))}px`})

const THead = ({columns}) =>
  <thead>
    <tr>
      {U.seq(columns, U.mapIndexed((column, i) =>
             <th key={i} style={cellWidth(columns)}>{column}</th>))}
    </tr>
  </thead>

const TBody = ({model, scrollTop}) =>
  <tbody>
    {U.seq(U.range(U.floor(U.divide(scrollTop, rowHeight(model))),
                   U.min(rowCount(model),
                         U.ceil(U.divide(U.add(scrollTop, tableHeight(model)),
                                         rowHeight(model))))),
           U.mapCached(i =>
             <tr key={i}
                 style={{position: "absolute",
                         top: U.string`${U.multiply(i, rowHeight(model))}px`,
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
      <THead columns={columns(model)}/>
    </table>
    <div {...U.bindProps({ref: "onScroll", scrollTop})}
         style={{position: "relative",
                 overflowX: "hidden",
                 borderBottom: "1px solid black",
                 height: U.string`${tableHeight(model)}px`}}>
      <table style={{height: U.string`${U.multiply(rowCount(model), rowHeight(model))}px`}}>
        <TBody {...{model, scrollTop}}/>
      </table>
    </div>
  </div>
