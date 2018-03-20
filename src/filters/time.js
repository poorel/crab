
export const time = (input) => {
  // input = input.toString().slice((input.toString().length-3));
  input = Math.ceil(input / 1000)
  return input
}
