import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder} from "../../data/orders.js";

export function renderPaymentSummary(){

  let productpriceCents=0;
  let ShippingPriceCents = 0;
  cart.forEach((cartitem) => {
    const product=getProduct(cartitem.productId);
    productpriceCents +=product.priceCents * cartitem.quantity;

    const deliveryOption = getDeliveryOption(cartitem.deliveryOptionId);
    ShippingPriceCents  += deliveryOption.priceCents;
  });
  const totalbeforeTaxCents = productpriceCents + ShippingPriceCents;
  const taxCents = totalbeforeTaxCents * 0.1;
  const totalCents = totalbeforeTaxCents + taxCents;

  const paymentsummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">$${formatCurrency(productpriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(ShippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalbeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>

    
    
    `;
    document.querySelector('.js-payment-summary').innerHTML = paymentsummaryHTML;
    document.querySelector('.js-place-order')
      .addEventListener('click', async () => {
        try{
          const response = await fetch('https://supersimplebackend.dev/orders',{
            method:'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              cart: cart
            })
          });
          const order = await response.json();
          addOrder(order);

        } catch(error) {
          console.log('Unexpected error! Try again later');

        }

        window.location.href = 'Orders.html';
        
      }); 
  
}

