import Atom         from "kefir.atom"
import K, {fromIds} from "karet.util"
import React        from "karet"

import TextInput from "./text-input"
import * as M    from "./phonebook-meta"

const Contact = ({contact}) =>
  <div>
    <TextInput value={contact.lens(M.Contact.name)}/>
    <TextInput value={contact.lens(M.Contact.number)}/>
    <button onClick={() => contact.modify(M.Contact.remove)}>Remove</button>
  </div>

const Contacts = ({contacts}) =>
  <div>
    {fromIds(K(contacts, M.Contacts.indices), i =>
     <Contact key={i} contact={contacts.lens(i)}/>)}
  </div>

export default ({phonebook = Atom(M.mock)}) =>
  <div>
    <button onClick={() => phonebook.modify(M.Phonebook.addContact())}>
      New
    </button>
    <Contacts contacts={phonebook.lens(M.Phonebook.contacts)}/>
  </div>
