import * as React from "karet"
import * as U     from "karet.util"

import TextInput from "./text-input"
import * as M    from "./phonebook-meta"

const Contact = ({contact}) =>
  <div>
    <TextInput value={M.Contact.name(contact)}/>
    <TextInput value={M.Contact.number(contact)}/>
    <button onClick={() => contact.remove()}>Remove</button>
  </div>

const Contacts = ({contacts}) =>
  <div>
    {U.seq(contacts,
           U.indices,
           U.mapCached(i => <Contact key={i} contact={U.view(i, contacts)}/>))}
  </div>

export default ({phonebook = U.atom(M.mock)}) =>
  <div>
    <button onClick={() => phonebook.modify(M.Phonebook.addContact())}>
      New
    </button>
    <Contacts contacts={M.Phonebook.contacts(phonebook)}/>
  </div>
