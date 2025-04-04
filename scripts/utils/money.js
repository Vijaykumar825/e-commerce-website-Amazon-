export function formatCurrency(priceCents){
  return(Math.roundSSS(priceCents) / 100).toFixed(2);

}