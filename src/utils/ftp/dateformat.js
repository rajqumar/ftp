export default function dateformat(date) {
  var dd = new Date(date);
  var formatted_date = `${dd.getUTCFullYear()}-${String(dd.getUTCMonth() + 1).padStart(2, '0')}-${String(
    dd.getUTCDate()
  ).padStart(2, '0')}`;
  return formatted_date;
}
