export function parse(value = '') {
  if (value) {
    try {
      return eval(value.slice(1))
    } catch (error) {
      console.warn('skipping parse error', error.message)
    }
  }
  return value
}