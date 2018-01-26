export const deepCopy = (obj) => { // 对象深拷贝
  if (typeof obj !== 'object') {
    return obj
  }
  const newobj = {}
  for (const attr in obj) {
    newobj[attr] = deepCopy(obj[attr])
  }
  return newobj
}

export function compareSameArrayOrObject(val1, val2) {
  return JSON.stringify(val1) === JSON.stringify(val2)
}

export function cLog(arg1, arg2) {
  if (process.env.NODE_ENV === 'production') {
    return
  }
  typeof arg2 !== 'undefined' ? console.log(arg1, arg2) : console.log(arg1)
}
