export const capitalizeFirstLetter = (t) => {
  return t.charAt(0).toUpperCase() + t.replace(t.charAt(0), '')
}