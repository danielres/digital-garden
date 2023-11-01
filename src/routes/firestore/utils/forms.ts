interface NestedObject {
  [key: string]: string | NestedObject
}

export function extractNestedInputs(data: { [key: string]: string }): NestedObject {
  const result: NestedObject = {}

  for (const key in data) {
    const nestedMatch = key.match(/^(\w+)\[(\w+)\]\[(\w+)\]$/)
    if (nestedMatch) {
      const outerKey = nestedMatch[1]
      const id = nestedMatch[2]
      const property = nestedMatch[3]

      if (!result[outerKey]) result[outerKey] = {}

      const outerObject = result[outerKey] as NestedObject
      if (!outerObject[id]) outerObject[id] = {}

      const innerObject = outerObject[id] as NestedObject
      innerObject[property] = data[key]
    } else {
      result[key] = data[key]
    }
  }

  return result
}
