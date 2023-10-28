export function onlyUnique<T>(value: T, index: number, array: T[]) {
  return array.indexOf(value) === index
}

export function onlyUniqueObjects<T>(value: T, index: number, array: T[]) {
  return array.map((e) => JSON.stringify(e)).indexOf(JSON.stringify(value)) === index
}
