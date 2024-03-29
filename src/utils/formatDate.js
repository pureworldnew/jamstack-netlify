function padTo2Digits(num) {
   return num.toString().padStart(2, "0");
}

export function formatDate(date) {
   return `${[
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
   ].join("-")} ${[
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
   ].join(":")}`;
}

export function formatDateMin(date) {
   return `${[
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
   ].join("/")} ${[
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
   ].join(":")}`;
}
