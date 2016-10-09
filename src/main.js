import "./monkey"
import * as L                  from "partial.lenses"
import Atom                    from "kefir.atom"
import React                   from "karet"
import makeStored, {expireNow} from "atom.storage"
import makeUndo                from "atom.undo"
import {bind}                  from "karet.util"

import BMI               from "./bmi-control"
import * as BM           from "./bmi-meta"
import Checkbox          from "./checkbox"
import Checkboxes        from "./checkboxes"
import WithUndoRedo      from "./with-undo-redo"
import Clock             from "./clock"
import Counter           from "./counter"
import InputAdd          from "./input-add"
import Phonebook         from "./phonebook-control"
import * as PM           from "./phonebook-meta"
import Scroll            from "./scroll"
import Converter         from "./converter"
import BigTable, * as BT from "./big-table-control"
import {scope}           from "./util"

const Undo = props => makeUndo({Atom, ...props})
const Stored = ({key, ...props}) =>
  makeStored({key: `karet-examples:${key}`,
              storage: localStorage,
              time: 15*60*1000, // 15 minutes
              Atom,
              debounce: 250, ...props})
expireNow({storage: localStorage, regex: /^karet-examples:/})

const Src = ({src, lines = ""}) =>
  <a target="_blank"
     href={`https://github.com/calmm-js/karet-examples/blob/master/src/${src}${lines}`}>{src}</a>

const HL = ({id, children}) => <h2 id={id}><a href={`#${id}`}>{children}</a></h2>

export default () => <main>
    <h1>Karet Examples</h1>

    <a href="https://github.com/calmm-js/karet-examples">GitHub</a>

    <section>
      <HL id="big-table">Big table</HL>
      {scope(() => {
        const model = Atom(BT.mock)

        const Slider = ({prop, ...props}) =>
          <label>{prop}: {model.view(prop)}
            <input type="range" {...props} style={{width: "100%"}}
                   {...bind({value: model.lens(prop, L.normalize(Number))})}/>
          </label>

        return <div>
            <Slider min={50} max={1000} prop="tableHeight"/>
            <Slider min={0} max={10000} prop="rowCount"/>
            <Slider min={10} max={50} prop="rowHeight"/>
            <BigTable {...{model}}/>
          </div>})}
      <ul>
        <li><Src src="big-table-control.js"/></li>
        <li><Src src="main.js" lines="#L46-L60"/></li>
      </ul>
    </section>

    <section>
      <HL id="counter">Simple counter</HL>
      <Counter value={Stored({key: "counter", value: 0})}/>
      <ul>
        <li><Src src="counter.js"/></li>
        <li><Src src="main.js" lines="#L69"/></li>
      </ul>
    </section>

    <section>
      <HL id="clock">Simple clock</HL>
      <Clock/>
      <ul>
        <li><Src src="clock.js"/></li>
        <li><Src src="main.js" lines="#L78"/></li>
      </ul>
    </section>

    <section>
      <HL id="checkbox">Simple checkbox</HL>
      <Checkbox checked={Stored({key: "checkbox", value: false})}/>
      <ul>
        <li><Src src="checkbox.js"/></li>
        <li><Src src="main.js" lines="#L87"/></li>
      </ul>
    </section>

    <section>
      <HL id="converter">Celcius &lt;-&gt; Fahrenheit converter</HL>
      <Converter celcius={Stored({key: "celcius", value: 0})}/>
      <ul>
        <li><Src src="converter.js"/></li>
        <li><Src src="main.js" lines="#L96"/></li>
      </ul>
    </section>

    <section>
      <HL id="undo-redo-checkboxes">Checkboxes with Undo-Redo</HL>
      {scope((checkeds = Undo({value: [true, false, true],
                               Atom: value => Stored({key: "undo-redo-checkboxes",
                                                      value})})) =>
             <WithUndoRedo undo={checkeds.undo}
                           redo={checkeds.redo}>
               <Checkboxes checkeds={checkeds.lens(L.define([]))}/>
             </WithUndoRedo>)}
      <ul>
        <li><Src src="with-undo-redo.js"/></li>
        <li><Src src="checkboxes.js"/></li>
        <li><Src src="main.js" lines="#L105-L111"/></li>
      </ul>
    </section>

    <section>
      <HL id="input-add">Input Add</HL>
      <InputAdd/>
      <ul>
        <li><Src src="input-add.js"/></li>
        <li><Src src="main.js" lines="#L121"/></li>
      </ul>
    </section>

    <section>
      <HL id="scroll">Scroll</HL>
      <Scroll/>
      <ul>
        <li><Src src="scroll.js"/></li>
        <li><Src src="main.js" lines="#L130"/></li>
      </ul>
    </section>

    <section>
      <HL id="phonebook">Phonebook</HL>
      {scope((phonebook = Stored({key: "phonebook",
                                  value: PM.mock,
                                  Atom: value => Undo({value})})) =>
             <WithUndoRedo undo={phonebook.undo}
                           redo={phonebook.redo}>
               <Phonebook {...{phonebook}}/>
             </WithUndoRedo>)}
      <ul>
        <li><Src src="phonebook-control.js"/></li>
        <li><Src src="phonebook-meta.js"/></li>
        <li><Src src="main.js" lines="#L139-L145"/></li>
      </ul>
    </section>

    <section>
      <HL id="bmi">BMI control</HL>
      <BMI/>
      <ul>
        <li><Src src="bmi-control.js"/></li>
        <li><Src src="bmi-meta.js"/></li>
        <li><Src src="main.js" lines="#L155"/></li>
      </ul>
    </section>

    <section>
      <HL id="bmi-shared">BMI controls with a shared model</HL>
      <div style={{display: "flex"}}>
        {scope((bmi = Stored({key: "bmi-shared", value: BM.mock})) =>
               [<BMI key="1" bmi={bmi}/>,
                <BMI key="2" bmi={bmi}/>])}
      </div>
      <ul>
        <li><Src src="main.js" lines="#L166-L168"/></li>
      </ul>
    </section>
  </main>
