import * as L                  from "partial.lenses"
import * as R                  from "ramda"
import * as React              from "karet"
import K, * as U               from "karet.util"
import makeStored, {expireNow} from "atom.storage"
import makeUndo                from "atom.undo"

import * as BM           from "./bmi-meta"
import * as PM           from "./phonebook-meta"
import BMI               from "./bmi-control"
import BMIs              from "./bmi-split"
import BigTable, * as BT from "./big-table-control"
import Checkbox          from "./checkbox"
import Checkboxes        from "./checkboxes"
import Clock             from "./clock"
import Converter         from "./converter"
import Counter           from "./counter"
import InputAdd          from "./input-add"
import Phonebook         from "./phonebook-control"
import Scroll            from "./scroll"
import Table             from "./table"
import WithUndoRedo      from "./with-undo-redo"
import {NumberInput}     from "./restricted-input"

const Undo = props => makeUndo({Atom: U.atom, ...props})

const Stored = ({key, ...props}) =>
  makeStored({key: `karet-examples:${key}`,
              storage: localStorage,
              time: 15*60*1000, // 15 minutes
              Atom: U.atom,
              debounce: 250, ...props})

expireNow({storage: localStorage, regex: /^karet-examples:/})

const Src = ({src, lines = ""}) =>
  <a target="_blank"
     href={`https://github.com/calmm-js/karet-examples/blob/master/src/${src}${lines}`}>{src}</a>

const HL = ({id, children}) => <h2 id={id}><a href={`#${id}`}>{children}</a></h2>

export default () =>
  <main>
    <h1>Karet Examples</h1>

    <a href="https://github.com/calmm-js/karet-examples">GitHub</a>

    <section>
      <HL id="big-table">Big table</HL>
      {U.scope(() => {
        const model = U.atom(BT.mock)

        const Slider = ({prop, ...props}) =>
          <label>{prop}: {U.view(prop, model)}
            <input type="range" {...props} style={{width: "100%"}}
                   {...U.bind({value: U.view([prop, L.normalize(Number)], model)})}/>
          </label>

        return <div>
            <Slider min={50} max={1000} prop="tableHeight"/>
            <Slider min={0} max={10000} prop="rowCount"/>
            <Slider min={10} max={50} prop="rowHeight"/>
            <BigTable {...{model}}/>
          </div>})}
      <ul>
        <li><Src src="big-table-control.js"/></li>
        <li><Src src="main.js" lines="#L50-L64"/></li>
      </ul>
    </section>

    <section>
      <HL id="counter">Simple counter</HL>
      <Counter value={Stored({key: "counter", value: 0})}/>
      <ul>
        <li><Src src="counter.js"/></li>
        <li><Src src="main.js" lines="#L73"/></li>
      </ul>
    </section>

    <section>
      <HL id="clock">Simple clock</HL>
      <Clock/>
      <ul>
        <li><Src src="clock.js"/></li>
        <li><Src src="main.js" lines="#L82"/></li>
      </ul>
    </section>

    <section>
      <HL id="checkbox">Simple checkbox</HL>
      <Checkbox checked={Stored({key: "checkbox", value: false})}/>
      <ul>
        <li><Src src="checkbox.js"/></li>
        <li><Src src="main.js" lines="#L91"/></li>
      </ul>
    </section>

    <section>
      <HL id="converter">Celcius &lt;-&gt; Fahrenheit converter</HL>
      <Converter celcius={Stored({key: "celcius", value: 0})}/>
      <ul>
        <li><Src src="converter.js"/></li>
        <li><Src src="main.js" lines="#L100"/></li>
      </ul>
    </section>

    <section>
      <HL id="undo-redo-checkboxes">Checkboxes with Undo-Redo</HL>
      {U.scope((checkeds = Undo({value: [true, false, true],
                               Atom: value => Stored({key: "undo-redo-checkboxes",
                                                      value})})) =>
             <WithUndoRedo undo={checkeds.undo}
                           redo={checkeds.redo}>
               <Checkboxes checkeds={checkeds.view(L.define([]))}/>
             </WithUndoRedo>)}
      <ul>
        <li><Src src="with-undo-redo.js"/></li>
        <li><Src src="checkboxes.js"/></li>
        <li><Src src="main.js" lines="#L109-L115"/></li>
      </ul>
    </section>

    <section>
      <HL id="input-add">Input Add</HL>
      <InputAdd/>
      <ul>
        <li><Src src="input-add.js"/></li>
        <li><Src src="main.js" lines="#L125"/></li>
      </ul>
    </section>

    <section>
      <HL id="scroll">Scroll</HL>
      <Scroll/>
      <ul>
        <li><Src src="scroll.js"/></li>
        <li><Src src="main.js" lines="#L134"/></li>
      </ul>
    </section>

    <section>
      <HL id="phonebook">Phonebook</HL>
      {U.scope((phonebook = Stored({key: "phonebook",
                                  value: PM.mock,
                                  Atom: value => Undo({value})})) =>
             <WithUndoRedo undo={phonebook.undo}
                           redo={phonebook.redo}>
               <Phonebook {...{phonebook}}/>
             </WithUndoRedo>)}
      <ul>
        <li><Src src="phonebook-control.js"/></li>
        <li><Src src="phonebook-meta.js"/></li>
        <li><Src src="main.js" lines="#L143-L149"/></li>
      </ul>
    </section>

    <section>
      <HL id="bmi">BMI control</HL>
      <BMI/>
      <ul>
        <li><Src src="bmi-control.js"/></li>
        <li><Src src="slider.js"/></li>
        <li><Src src="bmi-meta.js"/></li>
        <li><Src src="main.js" lines="#L159"/></li>
      </ul>
    </section>

    <section>
      <HL id="bmi-shared">BMI controls with a shared model</HL>
      <div style={{display: "flex"}}>
        {U.scope((bmi = Stored({key: "bmi-shared", value: BM.mock})) =>
               [<BMI key="1" bmi={bmi}/>,
                <BMI key="2" bmi={bmi}/>])}
      </div>
      <ul>
        <li><Src src="main.js" lines="#L170-L174"/></li>
      </ul>
    </section>

    <section>
      <HL id="bmis">BMI-split and BMI with a shared model</HL>
      {U.scope((height = U.atom(180), weight = U.atom(80), bmi = U.variable()) =>
             <div style={{display: "flex"}}>
               <BMIs       {...{bmi, height, weight}}/>
               <BMI bmi={U.molecule({height, weight})}/>
               <BMIs       {...{bmi, height, weight}}/>
               <label>BMI <NumberInput type="text" value={bmi}/></label>
             </div>)}
      <ul>
        <li><Src src="bmi-split.js"/></li>
        <li><Src src="main.js" lines="#L182-L188"/></li>
      </ul>
    </section>

    <section>
      <HL id="table">Table</HL>
      {U.scope(() => {
        const model = U.atom({numColumns: 5,
                              numRows: 10,
                              filterPattern: "",
                              sortColumn: 0})

        const numColumns = U.view("numColumns", model)
        const numRows = U.view("numRows", model)

        const table = U.view("table", model)

        const filterPattern = U.view("filterPattern", model)
        const sortColumn = U.view("sortColumn", model)

        const filter = K(K(filterPattern, p => new RegExp(p)), re =>
                         r => R.any(t => re.test(t), r[1]))
        const ordering = K(sortColumn, k => {
          if (!k)
            return ([i], [j]) => i - j
          const c = Math.abs(k) - 1
          if (k < 0)
            return R.comparator((l, r) => l[1][c] > r[1][c])
          else
            return R.comparator((l, r) => l[1][c] < r[1][c])
        })

        const TH = ({value, column}) =>
          <th>
            <button onClick={
              () => sortColumn.modify(c => (c ===  column+1 ? -column-1 :
                                            c === -column-1 ?         0 :
                                            column+1))}>
              {K(sortColumn, value, (c, v) =>
                 `${c === column+1 ? "+" : c === -column-1 ? "-" : " "}${v}`)}
            </button>
          </th>
        const TD = ({value}) => <td><input type="text" {...U.bind({value})}/></td>

        const nonNegInt = R.pipe(Number, x => 0 <= x ? x : 0, Math.round)

        return <div>
            <input type="number" {...U.bind({value: U.view(L.normalize(nonNegInt), numColumns)})}/>
            <input type="number" {...U.bind({value: U.view(L.normalize(nonNegInt), numRows)})}/>
            <input type="text" placeholder="filter regexp" {...U.bind({value: filterPattern})}/>
            <Table {...{head: U.view(["head", L.define([])], table),
                        body: U.view(["body", L.define([])], table),
                        TH, TD,
                        filter, ordering}}/>
            {K(numColumns, numRows, (numColumns, numRows) =>
               table.set({
                 head: R.range(0, numColumns),
                 body: U.seq(
                   R.range(0, numRows),
                   R.map(() => U.seq(
                     R.range(0, numColumns),
                     R.map(() => Math.round(Math.random() * 1000).toString()))))}))}
          </div>})}
      <ul>
        <li><Src src="table.js"/></li>
        <li><Src src="main.js" lines="#L158-197"/></li>
      </ul>
    </section>

    <section>
      <HL id="sliders">Sliders</HL>
      {U.scope((n = U.atom(10), sliders = U.view(L.define([]), U.variable())) =>
               <div>
                 <input type="number"
                        {...U.bind({value: U.view(L.rewrite(R.pipe(Number,
                                                                   Math.round,
                                                                   R.max(0))),
                                                  n)})}/>
                 {U.seq(sliders,
                        U.mapElems((value, i) =>
                          <div key={i}>
                            <input type="range"
                                   min="0"
                                   max="500"
                                   value={value}
                                   onChange={U.getProps({value})}/>
                            <button onClick={() => value.remove()}>Remove</button>
                            {value}
                          </div>))}
                 {U.seq(n,
                        U.range(0),
                        U.map(_ => Math.round(Math.random()*500)),
                        U.lift1(ss => sliders.set(ss)))}
               </div>)}
    </section>

    <section>
      <HL id="sliders-with-ids">Sliders with Ids</HL>
      {U.scope((n = U.atom(10), sliders = U.view(L.define([]), U.variable())) =>
               <div>
                 <input type="number"
                        {...U.bind({value: U.view(L.rewrite(R.pipe(Number,
                                                                   Math.round,
                                                                   R.max(0))),
                                                  n)})}/>
                 {U.seq(sliders,
                        U.mapElemsWithIds(s => s.id, (slider, id) => {
                          const value = U.view("value", slider)
                          return <div key={id}>
                              <input type="range"
                                     min="0"
                                     max="500"
                                     value={value}
                                     onChange={U.getProps({value})}/>
                              <button onClick={() => slider.remove()}>Remove</button>
                              {value}
                            </div>}))}
                 {U.seq(n,
                        U.range(0),
                        U.map(i => ({id: i.toString(),
                                     value: Math.round(Math.random()*500)})),
                        U.lift1(ss => sliders.set(ss)))}
               </div>)}
    </section>
  </main>
