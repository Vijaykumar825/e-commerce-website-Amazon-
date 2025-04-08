export const orders = JSON.parse(localStorage.getItem('orders')) || [];
console.log('Initial orders from localStorage:', orders);  // Add this

export function addOrder(order) {
  console.log('Adding order:', order);  // Add this
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  console.log('Saving orders:', orders);  // Add this
  localStorage.setItem('orders', JSON.stringify(orders));
}

addOrder();