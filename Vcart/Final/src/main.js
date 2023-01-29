// get Elements
const minus = document.querySelector('.counter__item-minus')
const plus = document.querySelector('.counter__item-plus')
const quantity = document.querySelector('.counter__item-quantity')
const cardContainer = document.querySelector('.card-container')


let count = 0;

// Quantity updater
// minus.addEventListener('click', (e) => {
//     if (count > 0)
//         quantity.innerText = --count;
// });
// plus.addEventListener('click', (e) => {
//     quantity.innerText = ++count;
// });


let generatorCard = () => {
    return cardContainer.innerHTML = shopItemsData
        .map((obj) => {
            let { id, title, description, img, price, quantity } = obj;
            let search = basket.find(obj => obj.id === id);
            return `<div id=product-id-${id} class="card card--vertical">
                <div class="card__header">
                    <img src="${img}" alt="" srcset="">
                </div>
                <div class="card__body">
                    <h3 class="card__title">${title}</h3>
                    <p class="card__description">${description}</p>
                    <div class="card__price-tag display--flex flex--space-between">
                        <h4 class="item-price">$${price}</h4>
                        <section class="counter">
                            <span class="counter__item counter__item-minus" onclick=decrement(${id})>-</span>
                            <span id=${id} class="counter__item counter__item-quantity">
                            ${(search === undefined) ? 0 : search.item}
                            </span>
                            <span class="counter__item counter__item-plus" onclick=increment(${id})>+</span>
                        </section>
                    </div>
                </div>
            </div>
        `;
        })
        .join('');
    console.log(abc);
};

let basket = JSON.parse(localStorage.getItem('data')) || [];
generatorCard();

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
    localStorage.setItem('data', JSON.stringify(basket));
};
let decrement = (id) => {
    let search = basket.find((val) => val.id === id);
    if (search !== undefined) {
        if (search.item === 0) return;
        else search.item -= 1;

        update(id);
        basket = basket.filter(obj => obj.item !== 0);
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