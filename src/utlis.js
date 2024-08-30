export function getDataFromString(dataString) {
  const tokens = dataString.split("-");
  return new Date(Number(tokens[0]), Number(tokens[1]) - 1, Number(tokens[2]));
}
