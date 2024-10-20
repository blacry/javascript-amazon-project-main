//retrives the stored cart from localstorage and saves it in variable cart of type array
export let cart = JSON.parse( localStorage.getItem('cart')) || [
    {
        productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e" ,
        quantity: 2 ,
        deliveryOptionId: '1'
    },
    {
        productId: "dd82ca78-a18b-4e2a-9250-31e67412f98d" ,
        quantity: 2 ,
        deliveryOptionId: '2'
    },
    {
        productId: "77919bbe-0e56-475b-adde-4f24dfed3a04" ,
        quantity: 2 ,
        deliveryOptionId: '3'
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d" ,
        quantity: 1 ,
        deliveryOptionId: '1'
    }
]
//it adds obj to the cart😒
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
            quantity: 1 ,
            deliveryOptionId: '1'
        });
    }
    saveCartToStorage()
}
//it updated the quantity value of obj inside the cart😒
export function updateCartQuantity(HTMLclass) {
    let cartQuantity = 0;
    cart.forEach(product => cartQuantity += product.quantity);  
    document.querySelector(HTMLclass).innerHTML = cartQuantity
}
//it removes a obj from the cart😒
export function removeCartItem(productId) {
    cart = cart.filter((cartItem) => cartItem.productId !== productId);
    saveCartToStorage()
}
// it saves the cart to localstorage😒
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart) )    
}

// setInterval(() => {
// console.log(cart);
// }, 3000);