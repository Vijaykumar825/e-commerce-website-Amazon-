export const cart = [];
export function addtoCart(productId) {
  let machingitem;

  cart.forEach((cartitem) => {
    if(productId === cartitem.productId){
      machingitem = cartitem;

    }

  });

  if(machingitem){
    machingitem.quantity += 1;
  } else{
    cart.push({
      productId: productId,
      quantity: 1
    });

  }

}