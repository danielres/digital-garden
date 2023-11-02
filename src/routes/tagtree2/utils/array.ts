export function onlyUnique<T>(value: T, index: number, array: T[]) {
  return array.indexOf(value) === index
}

export function onlyUniqueObjects<T>(value: T, index: number, array: T[]) {
  return array.map((e) => JSON.stringify(e)).indexOf(JSON.stringify(value)) === index
}

export function countOccurrences(arr: string[]): { [key: string]: number } {
  return arr.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1
    return acc
  }, {} as { [key: string]: number })
}
