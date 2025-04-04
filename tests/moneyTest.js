import { formatCurrency } from "../scripts/utils/money.js";

console.log('test suite :  formatCurrency');

console.log('Converts cents to dollers');

if(formatCurrency(2095) === '20.95') {
  console.log('passed');
}
else{
  console.log('Failed');
}
console.log('works with 0(zeros');

if(formatCurrency(0) === '0.00') {
  console.log('passed');
}
else{
  console.log('Failed');
}
console.log('working roundoff ')
if(formatCurrency(2000.5) === '20.01') {
  console.log('passed');
}
else{
  console.log('Failed');
}
console.log('checking round off excatly correct');
if(formatCurrency(2000.4) === '20.00') {
  console.log('passed');
}
else{
  console.log('Failed');
}