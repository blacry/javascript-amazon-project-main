// it is an immutable list, ill never mutate it
export const deliveryOptions = [
{       
    id: 1,
    deliveryDays:7,
    priceCents:0,
},
{
    id: 2,
    deliveryDays:3,
    priceCents:499,
},
{
    id: 3,
    deliveryDays:1,
    priceCents:999, 
},
]
export default deliveryOptions

export function deliveryPriceCents(deliveryId) {
    let deliveryPriceCents = 0;
    deliveryOptions.forEach(deliveryOption => {
        deliveryOption.id == deliveryId ? deliveryPriceCents = deliveryOption.priceCents : ''
    });
    return deliveryPriceCents || deliveryOptions[0].priceCents 
}
