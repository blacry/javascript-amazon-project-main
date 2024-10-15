export let cart = JSON.parse( localStorage.getItem('cart')) || [
    {
        productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e" ,
        quantity: 2 ,
    },
    {
        productId: "dd82ca78-a18b-4e2a-9250-31e67412f98d" ,
        quantity: 2 ,
    },
    {
        productId: "77919bbe-0e56-475b-adde-4f24dfed3a04" ,
        quantity: 2 ,
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d" ,
        quantity: 1 ,
    }
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
    saveCartToStorage()
}
export function updateCartQuantity(HTMLclass) {
    let cartQuantity = 0;
    cart.forEach(product => cartQuantity += product.quantity);  
    document.querySelector(HTMLclass).innerHTML = cartQuantity
    
}

export function removeCartItem(productId) {
    cart = cart.filter((cartItem) => cartItem.productId !== productId);
    saveCartToStorage()
}

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart) )    
}







// setInterval(() => {
// console.log(cart);
// }, 3000);