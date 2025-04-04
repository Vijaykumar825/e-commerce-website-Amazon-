import { cart, removeFromCart, saveToStorage, updateDeliveryOption } from '../data/cart.js';
import { product } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js'


function renderOrderSummary(){
    let cartSummayHTML = '';
    cart.forEach((cartitem)=> {
      const productId = cartitem.productId;
      let machingproduct;
      product.forEach((product)=>{
        if (product.id === productId){
          machingproduct = product;
        }
      });
      
      const deliveryOptionId = cartitem.deliveryOptionId;
      let deliveryOption;
      
      deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId){
          deliveryOption = option;
        }
      });

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      
      cartSummayHTML += `
        <div class="cart-item-container js-cart-item-container-${machingproduct.id}">
          <div class="delivery-date">
            Delivery date: ${dateString}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${machingproduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${machingproduct.name}
              </div>
              <div class="product-price">
                $${formatCurrency(machingproduct.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${cartitem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${machingproduct.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(machingproduct,cartitem)}
            </div>
          </div>
        </div>
      `;
    });

    function deliveryOptionsHTML(machingproduct, cartitem) {
      let html = '';

      deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
        const priceString = deliveryOption.priceCents === 0 
          ? 'Free' 
          : `$${formatCurrency(deliveryOption.priceCents)} - `;
        const isChecked = deliveryOption.id === cartitem.deliveryOptionId;
        
        html += `
          <div class="delivery-option js-delivery-option"
            data-product-id="${machingproduct.id}" data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
              ${isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${machingproduct.id}"
              data-product-id="${machingproduct.id}"
              data-delivery-option-id="${deliveryOption.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>
        `;
      });

      return html;
    }

    document.querySelector('.js-order-summary').innerHTML = cartSummayHTML;

    // Delete link event listeners
    document.querySelectorAll('.js-delete-link')
      .forEach((link) => {
        link.addEventListener('click', () => {
          const productId = link.dataset.productId;
          removeFromCart(productId);
          const container = document.querySelector(`.js-cart-item-container-${productId}`);
          container.remove();
        });
      });

    // Delivery option change event listeners
    document.querySelectorAll('.delivery-option-input')
      .forEach((radio) => {
        radio.addEventListener('change', () => {
          const productId = radio.dataset.productId;
          const deliveryOptionId = radio.dataset.deliveryOptionId;
          
          // Update the cart
          cart.forEach((item) => {
            if (item.productId === productId) {
              item.deliveryOptionId = deliveryOptionId;
            }
          });
          
          saveToStorage();
          
          // Update the delivery date display
          deliveryOptions.forEach((option) => {
            if (option.id === deliveryOptionId) {
              const today = dayjs();
              const deliveryDate = today.add(option.deliveryDays, 'days');
              const dateString = deliveryDate.format('dddd, MMMM D');
              
              const container = document.querySelector(
                `.js-cart-item-container-${productId}`
              );
              if (container) {
                container.querySelector('.delivery-date').textContent = 
                  `Delivery date: ${dateString}`;
              }
            }
          });
        });
      });


    document.querySelectorAll('.js-delivery-option').forEach((element) => {
      element.addEventListener('click',() => {

        const{productId,deliveryOptionId} = element.dataset
        updateDeliveryOption(productId,deliveryOptionId);
        renderOrderSummary();


      });

    });


}

renderOrderSummary();

/*import { cart, removeFromCart, saveToStorage } from '../data/cart.js';
import { product } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js'
//hello();
//const today  = dayjs();
//const delivery_date = today.add(7, 'days');
//console.log(delivery_date.format('dddd, MMMM D'));
//console.log(delivery_date);


let cartSummayHTML = '';


cart.forEach((cartitem)=> {
  const productId = cartitem.productId;
  let machingproduct;
  product.forEach((product)=>{
    if (product.id === productId){
      machingproduct = product;

    }

  });
  //console.log(machingproduct);
  const deliveryOptionId = cartitem.deliveryOptionId;

  let deliveryOption;
  
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId){
      deliveryOption = option;
    }

  });

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMMM D');
  //console.log(dateString);
  
  cartSummayHTML +=
  `
    <div class="cart-item-container js-cart-item-container-${machingproduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${machingproduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${machingproduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(machingproduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartitem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${machingproduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(machingproduct,cartitem)}
        </div>
      </div>
    </div>


  `;

});


function deliveryOptionsHTML(machingproduct, cartitem) {
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = deliveryOption.priceCents === 0 
      ? 'Free' 
      : `$${formatCurrency(deliveryOption.priceCents)} - `;
    const isChecked = deliveryOption.id === cartitem.deliveryOptionId;
    //console.log(dateString);
    
    html += `
      <div class="delivery-option">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${machingproduct.id}"
          data-product-id="${machingproduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `;
  });

  return html;
}



document.querySelector('.js-order-summary').innerHTML = cartSummayHTML;
document.querySelectorAll('.js-delete-link')
  .forEach((link)=>{
    link.addEventListener('click',() => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      //console.log(cart);
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      function deliveryOptionsHTML();

    });

  });
*/