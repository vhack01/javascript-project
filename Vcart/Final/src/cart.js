const totalBill = document.querySelector('.total-bill');
const cartContainer = document.querySelector('.cart-area');
let basket = JSON.parse(localStorage.getItem('data')) || [];

let generatorCartItem = () => {
    if (basket.length !== 0) {
        return cartContainer.innerHTML = basket.map(obj => {
            let cartItem = shopItemsData.find(val => val.id === obj.id);
            return `<div class="card card--horizontal" id=product-id-${cartItem.id}>
            <img src="./images/close.svg" alt="" srcset="" class="card__close" onclick=removeItem(${cartItem.id})>
            <div class="card__header">
                <img src=${cartItem.img} alt="" srcset="">
            </div>
            <div class="card__body">
                <div class="title-bar">
                    <h3 class="card__title">${cartItem.title}</h3>
                    <span class="price-tag">$${cartItem.price}</span>
                </div>

                <section class="counter">
                    <span class="counter__item counter__item-minus" onclick=decrement(${cartItem.id})>-</span>
                    <span class="counter__item counter__item-quantity" id=${cartItem.id}>${obj.item}</span>
                    <span class="counter__item counter__item-plus" onclick=increment(${cartItem.id})>+</span>
                </section>
                <h4 class="item__total-cost">$${obj.item * cartItem.price}</h4>
            </div>
        </div>`;
        }).join('');

    }
    else {
        cartContainer.innerHTML = ``;
        totalBill.innerHTML = `
        <h4 class="total-bill__header">Cart is Empty</h4>
        <div class="btn--cart display--flex flex--center">
            <a href="./index.html" target="_self"><button type="submit" class="btn btn--checkout">Back to
                    Home</button></a>
        </div>
        `;
    }
};
generatorCartItem();
let increment = (id) => {

    let search = basket.find((val) => val.id === id);
    if (search === undefined) {
        basket.push({
            id: id,
            item: 1
        });
    }
    else {
        search.item += 1;
    }
    update(id);
    generatorCartItem();
    localStorage.setItem('data', JSON.stringify(basket));
};
let decrement = (id) => {
    let search = basket.find((val) => val.id === id);
    if (search !== undefined) {
        console.log(basket, search);
        if (search.item === 0) return;
        else search.item -= 1;

        update(id);
        basket = basket.filter(obj => obj.item !== 0);
        generatorCartItem();
        localStorage.setItem('data', JSON.stringify(basket));
    }
};
let update = (id) => {
    const card = document.getElementById(id);
    let search = basket.find((val) => val.id === id);
    if (search === undefined) return;
    else
        card.innerText = search.item;

    basketSize();
    totalAmount();
};

let basketSize = () => {
    let total = 0;
    total = basket.map(obj => obj.item);
    if (total.length > 0)
        total = total.reduce((a, b) => a + b);
    else
        total = 0;

    document.querySelector('.cart-size').innerText = total;
};

basketSize();

let removeItem = (id) => {
    console.log(id);
    basket = basket.filter((obj) => obj.id !== id);
    totalAmount();
    basketSize()
    generatorCartItem();
    localStorage.setItem('data', JSON.stringify(basket));
};


let totalAmount = () => {
    if (basket.length > 0) {
        let sum = basket
            .map(obj => {
                return obj.item * shopItemsData.find(val => val.id === obj.id).price
            }).reduce((prev, curr) => prev + curr);
        totalBill.innerHTML = `
            <h4 class="total-bill__header">Total Bill: $<span id="total-bill">${sum}</span></h4>
            <div class="btn--cart display--flex flex--center">
                <a href="./index.html" target="_self"><button type="submit" class="btn btn--checkout">Checkout</button></a>
                <a href="#" target="_self"><button type="submit" class="btn btn--clearCart" onclick=clearCart()>Clear
                        cart</button></a>
            </div>
            `;
    }
    else {

    }
};

totalAmount();

let clearCart = () => {
    basket = [];
    localStorage.removeItem('data');
    basketSize();
    generatorCartItem();
}