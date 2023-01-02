export function fix(n: string | number) {
  const number = Number(n)
  return number < 10 ? `0${number}` : number
}
