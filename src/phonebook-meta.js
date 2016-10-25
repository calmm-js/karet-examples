import * as L from "partial.lenses"
import * as R from "ramda"
import * as U from "karet.util"

export const mock =
  [{name: "Mr Digits", number: "1-23-456789"}]

export const Contact = {
  create: ({name = "", number = ""} = {}) => ({name, number}),
  id: U.view("id"),
  name: U.view("name"),
  number: U.view("number")
}

export const Phonebook = {
  contacts: U.view(L.define([])),
  addContact: R.pipe(Contact.create, R.append)
}
