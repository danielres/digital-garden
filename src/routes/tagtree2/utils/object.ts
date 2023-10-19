export function groupByKey<K extends keyof T, T>(list: T[], key: K): Record<K, T[]> {
  return list.reduce(
    (hash, obj) => ({
      ...hash,
      [obj[key] as K]: (hash[obj[key] as K] || []).concat(obj),
    }),
    {} as Record<K, T[]>
  )
}
