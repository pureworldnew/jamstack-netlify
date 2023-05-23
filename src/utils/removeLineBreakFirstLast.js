export default function removeLineBreakFirstLast(string) {
   return string.replace(/^\s+|\s+$/g, "");
}
