import { cart , addToCart , updateCartQuantity , removeCartItem , saveCartToStorage } from "../data/cart.js";
import { products , getMatchingItem , loadpage} from "../data/products.js";
import {deliveryOptions , deliveryPriceCents} from "../data/deliveryOptions.js";
import {formatPrice} from "../scripts/utils/utils.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

loadpage(renderCheckOut)

function renderCheckOut() {
        
        // as the name says it renders cartsummary🫡
        renderCartSummary();
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
            ${matchingItem.getprice()}
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
    renderOrderSummary();
    function renderOrderSummary() {
        updateCartQuantity('.total-product-in-cart');
        // defining all the veriables needed for the order summary
        const totalprice = {
            totalPriceCents: 0,
            totalShippingPriceCents: 0,
            totalPriceCentsBeforeTax: 0,
            totalPriceCentsAfterTax: 0,
            orderTotalPrice: 0
        }
        cart.forEach(cartItem => {
            let matchingItem = getMatchingItem(cartItem);  
            totalprice.totalPriceCents += matchingItem.priceCents * cartItem.quantity;
            totalprice.totalShippingPriceCents += deliveryPriceCents(cartItem.deliveryOptionId) * cartItem.quantity;
        })
        totalprice.totalPriceCentsBeforeTax = totalprice.totalPriceCents + totalprice.totalShippingPriceCents;
        totalprice.totalPriceCentsAfterTax = totalprice.totalPriceCentsBeforeTax * 0.1;
        totalprice.orderTotalPrice = totalprice.totalPriceCentsAfterTax + totalprice.totalPriceCentsBeforeTax
        
        // renders all the prices for the user to see
        document.querySelector('.payment-summary-money-alltotal').innerHTML = `$${formatPrice(totalprice.totalPriceCents)}`;
        document.querySelector('.payment-summary-money-shipping').innerHTML = `$${formatPrice(totalprice.totalShippingPriceCents)}`;    
        document.querySelector('.payment-summary-money-subtotal').innerHTML = `$${formatPrice(totalprice.totalPriceCentsBeforeTax)}`;
        document.querySelector('.payment-summary-money-tax').innerHTML = `$${formatPrice(totalprice.totalPriceCentsAfterTax)}`;
        document.querySelector('.payment-summary-money-total').innerHTML = `$${formatPrice(totalprice.orderTotalPrice)}`;
    }
}