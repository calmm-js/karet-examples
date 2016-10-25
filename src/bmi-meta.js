import * as L from "partial.lenses"
import * as R from "ramda"
import * as U from "karet.util"

export const mock = {height: 180, weight: 80}

export const bmi = U.lift(({height, weight}) => weight/(height * height * 0.0001))
export const weight = U.lift(({bmi, height}) => height * height * 0.0001 * bmi)

export const classification = U.lift(bmi =>
  bmi < 15   ? "bmi-underweight bmi-underweight-severely"
: bmi < 18.5 ? "bmi-underweight"
: bmi < 25   ? "bmi-normal"
: bmi < 30   ? "bmi-overweight"
: bmi < 35   ? "bmi-obese"
: bmi < 40   ? "bmi-obese bmi-obese-severely"
:              "bmi-obese bmi-obese-very")

export const BMI = {
  augment: U.view(L.augment({bmi})),
  bmi: U.view("bmi"),
  height: U.view("height"),
  weight: U.view("weight"),
  classification: R.pipe(U.view("bmi"), classification)
}
