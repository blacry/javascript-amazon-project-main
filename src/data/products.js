import { formatPrice } from "../scripts/utils/utils.js";
class ProductsClass {
	id;
	image;
	name;
	rating;
	priceCents;
	keywords;
	constructor(productDetails) {
		this.id = productDetails.id;
		this.image = productDetails.image;
		this.name = productDetails.name;
		this.rating = productDetails.rating;
		this.priceCents = productDetails.priceCents;
		this.keywords = productDetails.keywords;
	}
	getStarsUrl() {
		return `images/ratings/rating-${this.rating.stars * 10}.png`;
	}
	getprice(){
		return `$${formatPrice(this.priceCents)}`
	}
}
class ClothingClass extends ProductsClass {
	sizeChartLink;
	constructor(productDetails) {
		super(productDetails)
		this.sizeChartLink = productDetails.sizeChartLink;
	}
}

export let products = []; // this is the variable that holds the products
//it loads the products from the backend and saves it in the variable products of type array🫡	
export function loadProductsFetch() {
	const promise = fetch('https://supersimplebackend.dev/products')
	.then(response => response.json())
	.then(productData => {
		products = productData.map(productDetails => productDetails.type === 'clothing' ? new ClothingClass(productDetails) : new ProductsClass(productDetails));
	})
	return promise
}
// it takes cartItem and returns the matching productItem form the products array🫠
export function getMatchingItem(cartItem) {
	let matchingItem;
	products.forEach(productItem => cartItem.productId == productItem.id ? matchingItem = productItem : '' );
	return matchingItem
}
export async function loadpage(fun){   
	await loadProductsFetch()
	fun()
}