export const cart = [
    
]
export function addToCart(productId) {

    let matchingItem;
    cart.forEach(cartItem => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;
        }
    })
    if (matchingItem) {
        matchingItem.quantity += 1
    }else{
        cart.push({
            productId: productId,
            quantity: 1 
        });
    }
}

export function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach(product => cartQuantity += product.quantity);  
    document.querySelector('.cart-quantity').innerHTML = cartQuantity
    
    // setInterval(() => {
    // console.log(cart);
    // }, 3000);
}