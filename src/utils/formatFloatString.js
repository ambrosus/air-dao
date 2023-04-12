export default function formatFloatString(floatString) {
  // regex matches a string of digits,
  // optionally followed by a decimal point and up to 3 digits
  const regex = /^[0-9]{1,}(\.0{0,}[1-9]{0,3})?/;
  return regex.exec(floatString)[0];
}
