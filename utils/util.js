function formatDate(date, flag) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var divider = flag ? "-" : "";
  return [year, month, day].map(formatNumber).join(divider);
}

function dateForeword(date, num, flag) {
  var time = date.getTime() + 3600 * 1000 * 24 * num;
  date.setTime(time);
  return formatDate(date, flag);
}

module.exports = {
  formatDate: formatDate,
  dateForeword: dateForeword
}

// --------------------------------------
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}