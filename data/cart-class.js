class Cart {
  cartitems;
  #localStorageKey;

  constructor (localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStrorage();

  }
  #loadFromStrorage() {
    this.cartitems = JSON.parse(localStorage.getItem(this.#localStorageKey));
  
    if(!this.cartitems){
      this.cartitems = [{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2,
        deliveryOptionId : '1'
      
      },{
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1,
        deliveryOptionId : '2'
      }];
    
    
    }
  
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartitems));
  }
  addtoCart(productId) {
    let machingitem;
  
    this.cartitems.forEach((cartitem) => {
      if(productId === cartitem.productId){
        machingitem = cartitem;
  
      }
  
    });
  
    if(machingitem){
      machingitem.quantity += 1;
    } else{
      this.cartitems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId : '1'
        
      });
  
    }
  
    this.saveToStorage();
  }
  removeFromCart(productId) {
  
    const newCart = [];
    this.cartitem.forEach((cartitem) => {
      if(cartitem.productId != productId){
        newCart.push(cartitem);
      }
  
    });
  
    cart = newCart;
  
    this.saveToStorage();
  }
  updateDeliveryOption(productId,deliveryOptionId) {
    let machingitem;
  
    this.cartitems.forEach((cartitem) => {
      if(productId === cartitem.productId){
        machingitem = cartitem;
  
      }
  
    });
  
    machingitem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  
  }

}



const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');


console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);


