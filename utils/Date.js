export function GetFormattedDate(date){
 let value = '';
 let month = date.getMonth() + 1;
 let day = date.getDate();
 const year = date.getFullYear();
 month = month < 10 ? `0${month}` : month;
 day = day < 10 ? `0${day}` : day;
 value = `${day}-${month}-${year}`;
 return value;
}