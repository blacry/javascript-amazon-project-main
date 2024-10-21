import { cart , addToCart , updateCartQuantity , removeCartItem , saveCartToStorage } from "../data/cart.js";
import { products , getMatchingItem } from "../data/products.js";
import {deliveryOptions , deliveryPriceCents} from "../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

// as the name says it renders cartsummary🫡
function renderCartSummary() {
//     //one more dynamic shit😭
    let cartSummaryHTML = ''
    cart.forEach(cartItem => {
        
        const matchingItem = getMatchingItem(cartItem);

        // this is the html, do i need to explain even that to you 😑
        cartSummaryHTML += ` 
        <div class="cart-item-container" id="cart-item-container-${matchingItem.id}">
        <div class="delivery-date">
        Delivery date: ${renderDeliveryOptionsHTML(matchingItem ,cartItem).checkedDate}
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
        
        ${renderDeliveryOptionsHTML(matchingItem ,cartItem).html}
        
        </div>
        </div>
        </div>
        </div>
        `
    });
    document.querySelector('.order-summary').innerHTML = cartSummaryHTML;

    //updates the cart quantity😒
    updateCartQuantity('.return-to-home-cart-list');
        
    // this makes delete btn interactive
    document.querySelectorAll('.delete-quantity-link').forEach( delbtn => {        
        delbtn.addEventListener('click', () => {
            const productId = delbtn.dataset.productId;
            removeCartItem(productId)
            document.querySelector(`#cart-item-container-${productId}`).remove()
            updateCartQuantity('.return-to-home-cart-list')
            renderOrderSummary()
        });
    });
    
    //it updates the cart pointer for delivery date😒
    document.querySelectorAll('.js-delivery-option').forEach(element => {
        // element.onclick = updateCartPointer(storeItem[0], storeItem[1]);
        element.addEventListener('click', () => {
            const storeItem = element.getAttribute('data-store-item').split(',');
            updateCartPointer(storeItem[0], storeItem[1]);
            renderOrderSummary()
        });
    });
     //it updates the cart pointer for delivery date😒
    function updateCartPointer(deliveryId ,productId) {
        cart.forEach(cartItem => cartItem.productId == productId ? cartItem.deliveryOptionId = deliveryId : '' );
        saveCartToStorage()
        renderCartSummary()
    }
    
}
renderCartSummary();
//gets the date needed via ext lib dayjs🫲😁🫱
function realTimeDate(chooseDate) {
    const deliveryDate = dayjs().add( chooseDate , 'days' ).format('dddd, MMMM D')
    return deliveryDate
}
//dynaaaaaamic my ass... 
//it dynamiclly gets the date and displays and reduces redundent HTML
function renderDeliveryOptionsHTML(matchingItem , cartItem) {
    let html = `` 
    let checkedDate = ''
    deliveryOptions.forEach(deliveryOption => {
        const deliveryDate = realTimeDate(deliveryOption.deliveryDays);
        const deliveryPrice = deliveryOption.priceCents == 0 ? 'FREE' : `$${((deliveryOption.priceCents/100).toFixed(2))} `
        const isChecked = deliveryOption.id == cartItem.deliveryOptionId
        checkedDate = isChecked ? deliveryDate : checkedDate
        html += `
        <div class="delivery-option js-delivery-option" data-store-item="${deliveryOption.id},${cartItem.productId}">
        <input type="radio" ${isChecked ? 'checked' : ''}
        id="${deliveryOption.deliveryDays}-${matchingItem.id}"  
        class="delivery-option-input"
        name="delivery-option-${matchingItem.id}">
        <label for="${deliveryOption.deliveryDays}-${matchingItem.id}" class="delivery-option-date">
        <div class="delivery-option-date-text">
        ${deliveryDate}
        </div>
        <div class="delivery-option-price">
        ${deliveryPrice} -- shipping
        </div>
        </label>
        </div>
        `
    });
    return {html, checkedDate}
}


//as the name says it renders the order summary🫡
function renderOrderSummary() {
    
    updateCartQuantity('.total-product-in-cart');

    let totalPriceCents = 0;
    let totalShippingPriceCents = 0;
    cart.forEach(cartItem => {
        let matchingItem = getMatchingItem(cartItem);  
        totalPriceCents += matchingItem.priceCents * cartItem.quantity;
        let deliveryPriceInCents = deliveryPriceCents(cartItem.deliveryOptionId);
        totalShippingPriceCents += deliveryPriceInCents * cartItem.quantity;
    })
    let totalPriceCentsBeforeTax = totalPriceCents + totalShippingPriceCents;
    let totalPriceCentsAfterTax = totalPriceCentsBeforeTax * 0.1;
    let orderTotalPrice = totalPriceCentsAfterTax + totalPriceCentsBeforeTax
    document.querySelector('.payment-summary-money-alltotal').innerHTML = `$${(totalPriceCents/100).toFixed(2)}`;
    document.querySelector('.payment-summary-money-shipping').innerHTML = `$${(totalShippingPriceCents/100).toFixed(2)}`;
    document.querySelector('.payment-summary-money-subtotal').innerHTML = `$${(totalPriceCentsBeforeTax/100).toFixed(2)}`;
    document.querySelector('.payment-summary-money-tax').innerHTML = `$${(totalPriceCentsAfterTax/100).toFixed(2)}`;
    document.querySelector('.payment-summary-money-total').innerHTML = `$${(orderTotalPrice/100).toFixed(2)}`;
    
}
renderOrderSummary();