export type NestedObject = {
  [key: string]: string | number | NestedObject
}

export function nestedify(obj: { [key: string]: string }, acc: NestedObject = {}): NestedObject {
  return Object.keys(obj).reduce((currentObj: NestedObject, key: string) => {
    const parts = key.split('.')
    parts.reduce((currentObj: NestedObject, part: string, idx: number) => {
      if (idx === parts.length - 1) {
        // It's the last part, set the value
        currentObj[part] =
          obj[key] === '' ? '' : isNaN(Number(obj[key])) ? obj[key] : Number(obj[key])
      } else {
        // Not the last part, ensure this level of nesting exists
        currentObj[part] = currentObj[part] || ({} as NestedObject)
      }
      return currentObj[part] as NestedObject
    }, currentObj)
    return currentObj
  }, acc)
}

export type FormOnSubmitEvent = Event & { currentTarget: EventTarget & HTMLFormElement }
export type FormOnSubmit = (e: FormOnSubmitEvent) => void

export function getFormOnSubmitEventValues(e: FormOnSubmitEvent) {
  return Object.fromEntries(new FormData(e.currentTarget))
}
