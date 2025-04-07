import { renderOrderSummary } from "./checkOut/ordersummary.js";
import { renderPaymentSummary } from "./checkOut/paymentsummary.js";
import { loadProducts } from "../data/products.js";
//import '../data/cart-class.js'
//import '../data/backend_practice.js';
loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();

});
