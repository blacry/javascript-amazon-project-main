import { cart , addToCart , updateCartQuantity , removeCartItem } from "../data/cart.js";
import { products } from "../data/products.js";
import deliveryOptions from "../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

//updates the cart quantity😒
updateCartQuantity('.return-to-home-cart-list');
//renders the cart
renderCartSummary();

// this makes delete btn interactive
document.querySelectorAll('.delete-quantity-link').forEach( delbtn => {        
    delbtn.addEventListener('click', () => {
        const productId = delbtn.dataset.productId;
        removeCartItem(productId)
        document.querySelector(`#cart-item-container-${productId}`).remove()
        updateCartQuantity('.return-to-home-cart-list')
    });
});

//gets the date needed via ext lib dayjs🫲😁🫱
function realTimeDate(chooseDate) {
    const deliveryDate = dayjs().add( chooseDate , 'days' ).format('dddd, MMMM D')
    return deliveryDate
}

//dynaaaaaamic my ass... 
//it dynamiclly gets the date and displays and reduces redundent HTML
function deliveryOptionsHTML(matchingItem , cartItem) {
    let html = `` 
    let checkedDate = ''
    deliveryOptions.forEach(deliveryOption => {
        const deliveryDate = realTimeDate(deliveryOption.deliveryDays);
        const deliveryPrice = deliveryOption.priceCents == 0 ? 'FREE' : `$${((deliveryOption.priceCents/100).toFixed(2))} `
        const isChecked = deliveryOption.id == cartItem.deliveryOptionId
        checkedDate = isChecked ? deliveryDate : checkedDate
        html += `
        <div class="delivery-option">
            <input type="radio" ${isChecked ? 'checked' : ''}
            id="${deliveryOption.deliveryDays}-${matchingItem.id}"  
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
            <div>
            <label for="${deliveryOption.deliveryDays}-${matchingItem.id}" class="delivery-option-date">
            ${deliveryDate}
            </label>
            <div class="delivery-option-price">
                ${deliveryPrice} -- shipping
            </div>
            </div>
        </div>
            `
    });
    return {html, checkedDate}
}
    
// as the name says it renders cartsummary🫡
function renderCartSummary() {
    //one more dynamic shit😭
    let cartSummaryHTML = ''
    cart.forEach(cartItem => {
    
        //it gets the id from the product list to get all the needed data about the product
        let matchingItem;
        products.forEach(productItem => {
            if (productItem.id === cartItem.productId) {
            matchingItem = productItem;
            }
        });  
        // this is the html, do i need to explain even that to you 😑
        cartSummaryHTML += ` 
        <div class="cart-item-container" id="cart-item-container-${matchingItem.id}">
        <div class="delivery-date">
        Delivery date: ${deliveryOptionsHTML(matchingItem ,cartItem).checkedDate}
        </div>
        
        <div class="cart-item-details-grid">
        <img class="product-image" 
        src="${matchingItem.image}">
        
        <div class="cart-item-details">
        <div class="product-name">
        ${matchingItem.name}
        </div>
        <div class="product-price">
        $${(matchingItem.priceCents / 100).toFixed(2) }
        </div>
        <div class="product-quantity">
        <span>
        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary">
        Update
        </span>
        <span class="delete-quantity-link link-primary" data-product-id = ${matchingItem.id}>
        Delete
        </span>
        </div>
        </div>
        <div class="delivery-options">
        <div class="delivery-options-title">
        Choose a delivery option:
        </div>
        
        ${deliveryOptionsHTML(matchingItem ,cartItem).html}
        
        </div>
        </div>
        </div>
        </div>
        `
    });

    document.querySelector('.order-summary').innerHTML = cartSummaryHTML;
}
    
// setInterval(() => {
//     console.log(cart);
// }, 300);