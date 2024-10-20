import { cart , addToCart , updateCartQuantity , removeCartItem } from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

//updates the cart quantity😒
updateCartQuantity('.return-to-home-cart-list');

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
              Delivery date: Tuesday, June 21
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
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        `
});

renderCart();

document.querySelectorAll('.delete-quantity-link').forEach( delbtn => {        
        delbtn.addEventListener('click', () => {
            const productId = delbtn.dataset.productId;
            removeCartItem(productId)
            document.querySelector(`#cart-item-container-${productId}`).remove()
            updateCartQuantity('.return-to-home-cart-list')
        });
});

function renderCart() {
    document.querySelector('.order-summary').innerHTML = cartSummaryHTML;
}

// setInterval(() => {
//     console.log(cart);
// }, 300);